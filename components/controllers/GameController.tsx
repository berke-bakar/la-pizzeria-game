import { RefObject, useContext, useEffect, useMemo, useRef } from "react";
import AudioManager from "./AudioManager";
import { useAtom } from "jotai";
import { gamePhaseControllerAtom } from "@/constants/constants";
import { CustomerRefProps } from "../models/Customer";
import { GamePhase } from "@/constants/types";
import {
  CatmullRomCurve3,
  LineCurve3,
  LoopOnce,
  LoopRepeat,
  Vector3,
} from "three";
import { useFrame } from "@react-three/fiber/native";
import { damp3 } from "maath/easing";
import { WorldContext } from "@/context/PhysicsProvider";
import { PizzaMakerRefProps } from "../PizzaMaker";
import { PizzaBoxRefProps } from "../models/PizzaBox";
import { OvenRefProps } from "../models/Oven";
import { useToppings } from "@/hooks/useToppings";
import { SHAPE_TYPES } from "cannon-es";

type GameControllerProps = {
  pizzaMakerRef: RefObject<PizzaMakerRefProps>;
  customerRef: RefObject<CustomerRefProps>;
  ovenRef: RefObject<OvenRefProps>;
  pizzaBoxRef: RefObject<PizzaBoxRefProps>;
};

const characters = [
  "casualMan",
  "casualWoman",
  "punk",
  "suitMan",
  "suitWoman",
  "worker",
];

const GameController = ({
  pizzaMakerRef,
  customerRef,
  ovenRef,
  pizzaBoxRef,
}: GameControllerProps) => {
  const world = useContext(WorldContext);
  const audioManager = useMemo(() => AudioManager.getInstance(), []);
  const [currentGamePhase, updateGamePhase] = useAtom(gamePhaseControllerAtom);
  const currentCustomerAnimTime = useRef(0);
  const currentPizzaAnimTime = useRef(0);
  const currentCustomerAnimation = useRef(customerRef.current?.actions["Idle"]);
  const { clearToppings } = useToppings();

  const customerPaths = useMemo(
    () => ({
      customerPath1: new LineCurve3(
        new Vector3(0, 0, -18),
        new Vector3(0, 0, -4)
      ),
      customerPath2: new LineCurve3(
        new Vector3(0, 0, -6),
        new Vector3(6, 0, -6)
      ),
      customerPath3: new CatmullRomCurve3([
        new Vector3(6, 0, -6),
        new Vector3(5, 0, -12),
        new Vector3(3, 0, -12),
        new Vector3(0, 0, -18),
      ]),
    }),
    []
  );

  const pizzaPaths = useMemo(
    () => ({
      pizzaToOven: new CatmullRomCurve3([
        new Vector3(0, 0, 0),
        new Vector3(0, 0.5, 4.2),
        new Vector3(0.8, 1.2, 6.2),
        new Vector3(1.6, 0.9, 8.2),
      ]),
      pizzaToBox: new CatmullRomCurve3([
        new Vector3(1.6, 0.9, 8.2),
        new Vector3(1.1, 1.2, 6.2),
        new Vector3(0.6, 0.5, 4.2),
        new Vector3(5.5, 0, 0),
      ]),
    }),
    []
  );

  const currentCustomerPath = useMemo(() => {
    if (currentGamePhase.subphase === "customerWalk")
      return currentGamePhase.phase === "start"
        ? customerPaths.customerPath1
        : currentGamePhase.phase === "pizzaTakeOut"
        ? customerPaths.customerPath2
        : customerPaths.customerPath3;
    return null;
  }, [currentGamePhase]);

  const currentPizzaPath = useMemo(() => {
    if (currentGamePhase.subphase === "pizzaToOven")
      return pizzaPaths.pizzaToOven;
    else if (currentGamePhase.subphase === "pizzaToBox")
      return pizzaPaths.pizzaToBox;
    return null;
  }, [currentGamePhase]);

  const resetCharacter = () => {
    // Preventing the same character to be generated twice
    customerRef.current?.setSelectedCharacter((selectedCharacter) => {
      const availableChars =
        selectedCharacter !== ""
          ? characters.filter((val) => val !== selectedCharacter)
          : characters;
      const randomIndex = Math.floor(Math.random() * availableChars.length);
      if (customerRef.current && customerRef.current.group.current) {
        customerRef.current.group.current.visible = false;
        customerRef.current.group.current?.position.set(0, 0, -18);
        customerRef.current.group.current.rotation.set(0, 0, 0);
      }

      return availableChars[randomIndex];
    });
  };

  const changeAnimation = (phaseIndex: GamePhase) => {
    const prevAnim = currentCustomerAnimation.current;
    currentCustomerAnimation.current = customerRef.current?.actions["Idle"];

    if (phaseIndex.subphase === "customerWalk") {
      currentCustomerAnimation.current =
        customerRef.current?.actions["Walking"];
    } else if (
      phaseIndex.phase === "takingOrder" &&
      phaseIndex.subphase === "takeOrderDialogue"
    ) {
      currentCustomerAnimation.current =
        customerRef.current?.actions["Ordering3"];
    } else if (phaseIndex.subphase === "reaction") {
      currentCustomerAnimation.current =
        customerRef.current?.actions["Surprised"];
      currentCustomerAnimation.current!.clampWhenFinished = true;
    }
    // Change animation, only when needed
    if (
      currentCustomerAnimation.current &&
      currentCustomerAnimation.current !== prevAnim
    ) {
      currentCustomerAnimTime.current = 0;
      if (phaseIndex.subphase === "reaction") {
        console.log("loop once");
        currentCustomerAnimation.current.setLoop(LoopOnce, 1);
      } else {
        currentCustomerAnimation.current.setLoop(LoopRepeat, Infinity);
      }
      if (prevAnim) {
        currentCustomerAnimation.current
          .reset()
          .crossFadeFrom(prevAnim, 0.5, false)
          .play();
      } else {
        currentCustomerAnimation.current.reset().fadeIn(0.5).play();
      }
    }
  };

  useEffect(() => {
    const onAnimFinish = (e: any) => {
      console.log("anim finished:", e.action.getClip().name);
      updateGamePhase("advancePhase");
    };

    const onCustomerAnimFinish = (e: any) => {
      const clipName = e.action.getClip().name;
      if (clipName === "Surprised") {
        updateGamePhase("advancePhase");
      }
    };

    if (customerRef.current)
      customerRef.current.mixer.addEventListener(
        "finished",
        onCustomerAnimFinish
      );
    if (pizzaBoxRef.current)
      pizzaBoxRef.current.mixer.addEventListener("finished", onAnimFinish);
    if (ovenRef.current)
      ovenRef.current.mixer.addEventListener("finished", onAnimFinish);
    return () => {
      if (customerRef.current)
        customerRef.current.mixer.removeEventListener(
          "finished",
          onCustomerAnimFinish
        );
      if (pizzaBoxRef.current)
        pizzaBoxRef.current.mixer.removeEventListener("finished", onAnimFinish);
      if (ovenRef.current)
        ovenRef.current.mixer.removeEventListener("finished", onAnimFinish);
    };
  }, []);

  useEffect(() => {
    if (currentGamePhase.subphase === "generateCustomer") {
      resetCharacter();
      pizzaMakerRef.current?.group.current?.position.set(0, 0.01, 0);
      clearToppings();
      updateGamePhase("advancePhase");
    } else if (currentGamePhase.subphase === "takeOrderDialogue") {
      setTimeout(() => {
        //TODO: Remove later
        updateGamePhase("advancePhase");
      }, 2000);
    } else if (currentGamePhase.nextButtonText === "Bake" && world) {
      [...world.bodies].forEach((val) =>
        val.shapes[0].type !== SHAPE_TYPES.PLANE ? world.removeBody(val) : null
      );
    } else if (currentGamePhase.subphase === "ovenClose") {
      const action = ovenRef.current?.actions["Close"];
      ovenRef.current?.mixer.stopAllAction();
      if (action) {
        action.clampWhenFinished = true;
        action.reset().setLoop(LoopOnce, 1).play();
      }
    } else if (currentGamePhase.subphase === "waiting") {
      setTimeout(() => {
        updateGamePhase("advancePhase");
      }, 3000);
    } else if (currentGamePhase.subphase === "ovenOpen") {
      const action = ovenRef.current?.actions["Open"];
      if (action) {
        action.clampWhenFinished = true;
        action
          .crossFadeFrom(ovenRef.current?.actions["Close"]!, 0.5, false)
          .setLoop(LoopOnce, 1)
          .play();
      }
    } else if (currentGamePhase.subphase === "pizzaToBox") {
      customerRef.current?.group.current?.rotation.set(0, Math.PI / 2, 0);
    } else if (currentGamePhase.subphase === "packaging") {
      const action = pizzaBoxRef.current?.actions["LidClose"];
      if (action) {
        action.loop = LoopOnce;
        action.clampWhenFinished = true;
        action.reset().play();
      }
    } else if (
      currentGamePhase.nextButtonText &&
      currentGamePhase.nextButtonText === "Deliver"
    ) {
      customerRef.current?.group.current?.rotation.set(0, 0, 0);
    } else if (currentGamePhase.subphase === "pizzaReveal") {
      const action = pizzaBoxRef.current?.actions["LidOpen"];
      if (action) {
        pizzaBoxRef.current?.mixer.stopAllAction();
        action.loop = LoopOnce;
        action.reset().play();
      }
    } else if (currentGamePhase.subphase === "getPaid") {
      // TODO: Implement this part
      // TODO: Calculate toppings worth with a max value
      // TODO: Calculate emotional damage and increase decrease value according to that.
      updateGamePhase("advancePhase");
    }

    changeAnimation(currentGamePhase);
  }, [currentGamePhase]);

  useFrame((state, delta) => {
    if (currentCustomerPath && customerRef.current?.group.current) {
      currentCustomerAnimTime.current = Math.min(
        currentCustomerAnimTime.current + delta * 0.2,
        1
      );
      const pointOnPath = currentCustomerPath.getPointAt(
        currentCustomerAnimTime.current
      );
      damp3(
        customerRef.current?.group.current?.position as Vector3,
        pointOnPath,
        0.3,
        delta
      );
      if (currentCustomerAnimTime.current >= 1) {
        currentCustomerAnimTime.current = 0;
        updateGamePhase("advancePhase");
      }
    }
    // Update game phase when the customer reaches the target
    if (currentPizzaPath && pizzaMakerRef.current?.group.current) {
      currentPizzaAnimTime.current = Math.min(
        currentPizzaAnimTime.current + delta,
        1
      );
      const pointOnPath = currentPizzaPath.getPointAt(
        currentPizzaAnimTime.current
      );
      damp3(
        pizzaMakerRef.current?.group.current.position,
        pointOnPath,
        0.1,
        delta
      );
      if (currentPizzaAnimTime.current >= 1) {
        currentPizzaAnimTime.current = 0;
        updateGamePhase("advancePhase");
      }
    }
  });

  return null;
};

export default GameController;

import { RefObject, useContext, useEffect, useMemo, useRef } from "react";
import AudioManager from "./AudioManager";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  customerOrderAtom,
  gamePhaseControllerAtom,
  overlayTextAtom,
  showFooterAtom,
  typingFinishedAtom,
} from "@/constants/constants";
import { CustomerRefProps } from "../models/Customer";
import { GamePhase } from "@/constants/types";
import {
  AnimationAction,
  CatmullRomCurve3,
  EulerOrder,
  LineCurve3,
  LoopOnce,
  LoopRepeat,
  Vector3,
} from "three";
import { useFrame } from "@react-three/fiber/native";
import { damp3, dampE, linear } from "maath/easing";
import { WorldContext } from "@/context/PhysicsProvider";
import { PizzaMakerRefProps } from "../PizzaMaker";
import { PizzaBoxRefProps } from "../models/PizzaBox";
import { OvenRefProps } from "../models/Oven";
import { useToppings } from "@/hooks/useToppings";
import { SHAPE_TYPES } from "cannon-es";
import { generateRandomPos } from "@/utils/utils";
import { selectedToppingAtom } from "../models/ToppingsContainer";
import EndOfDay from "../UI/EndOfDay";

type GameControllerProps = {
  pizzaMakerRef: RefObject<PizzaMakerRefProps>;
  customerRef: RefObject<CustomerRefProps>;
  ovenRef: RefObject<OvenRefProps>;
  pizzaBoxRef: RefObject<PizzaBoxRefProps>;
  gameSceneVisible: boolean;
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
  gameSceneVisible,
}: GameControllerProps) => {
  const world = useContext(WorldContext);
  const audioManager = useMemo(() => AudioManager.getInstance(), []);
  const selectedTopping = useAtomValue(selectedToppingAtom);
  const [currentGamePhase, updateGamePhase] = useAtom(gamePhaseControllerAtom);
  const addTopping = useToppings((state) => state.addTopping);

  const currentCustomerType = useRef<
    "casualMan" | "casualWoman" | "punk" | "suitMan" | "suitWoman" | "worker"
  >("casualMan");
  const currentCustomerAnimTime = useRef(0);
  const currentPizzaAnimTime = useRef(0);
  const currentCustomerAnimation = useRef(customerRef.current?.actions["Idle"]);
  const { clearToppings } = useToppings();
  const setShowFooter = useSetAtom(showFooterAtom);
  const setCustomerOrder = useSetAtom(customerOrderAtom);
  const setOverlayText = useSetAtom(overlayTextAtom);
  const typingFinished = useAtomValue(typingFinishedAtom);

  const todaysCustomerCount = useRef(0);
  const currentCustomerIndex = useRef(0);

  const customerPaths = useMemo(
    () => ({
      customerPath1: new LineCurve3(
        new Vector3(0, 0, -18),
        new Vector3(0, 0, -5)
      ),
      customerPath2: new LineCurve3(
        new Vector3(0, 0, -5),
        new Vector3(6.25, 0, -5)
      ),
      customerPath3: new CatmullRomCurve3([
        new Vector3(6.25, 0, -5),
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
        new Vector3(1.8, 0.77, 8.8),
      ]),
      pizzaToBox: new CatmullRomCurve3([
        new Vector3(1.6, 0.9, 8.2),
        new Vector3(1.1, 1.2, 6.2),
        new Vector3(0.6, 0.6, 4.2),
        new Vector3(6.25, -0.1, -0.7),
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

  const currentCustomerRotation = useMemo(() => {
    if (currentGamePhase.subphase === "customerRotate")
      return [0, -Math.PI, 0] as [
        x: number,
        y: number,
        z: number,
        order?: EulerOrder | undefined
      ];
    return null;
  }, [currentGamePhase]);

  const currentPizzaPath = useMemo(() => {
    if (currentGamePhase.subphase === "pizzaToOven")
      return pizzaPaths.pizzaToOven;
    else if (currentGamePhase.subphase === "pizzaToBox")
      return pizzaPaths.pizzaToBox;
    return null;
  }, [currentGamePhase]);

  const currentPizzaBoxRotation = useMemo(() => {
    if (currentGamePhase.subphase === "pizzaRotate")
      return [0, Math.PI, 0] as [
        x: number,
        y: number,
        z: number,
        order?: EulerOrder | undefined
      ];
    return null;
  }, [currentGamePhase]);

  const resetOrder = () => {
    // const order = generateOrder();
    setCustomerOrder({
      order: ["anchovies", "bacon", "mushroom"],
      selectedCharacter: currentCustomerType.current,
      show: false,
    });
  };

  const resetCharacter = () => {
    // Preventing the same character to be generated twice.
    currentCustomerIndex.current = currentCustomerIndex.current + 1;
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
      currentCustomerType.current = availableChars[randomIndex] as
        | "casualMan"
        | "casualWoman"
        | "punk"
        | "suitMan"
        | "suitWoman"
        | "worker";
      return currentCustomerType.current;
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
    if (gameSceneVisible) {
      // audioManager
      //   .loadAudio("../../assets/sounds/ShakeAndBake.mp3", "bgMusic")
      //   .then(() => {
      //     audioManager.playSection("bgMusic", 0, 116);
      //   });
      todaysCustomerCount.current = Math.floor(Math.random() * 4 + 1);
      currentCustomerIndex.current = 0;
      setShowFooter(false);
    } else {
      setShowFooter(true);
    }
  }, [gameSceneVisible]);

  useEffect(() => {
    const onAnimFinish = (e: {
      action: AnimationAction;
      direction: number;
    }) => {
      if (e.action.getClip().name === "LidClose" && pizzaMakerRef.current) {
        pizzaMakerRef.current.setFrustumCulled(true);
      }
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
    if (typingFinished) {
      const timeoutId = setTimeout(() => {
        setCustomerOrder((prev) => ({ ...prev, show: false }));
        updateGamePhase("advancePhase");
      }, 1500);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [typingFinished]);

  useEffect(() => {
    if (gameSceneVisible) {
      if (currentGamePhase.subphase === "generateCustomer") {
        resetCharacter();
        resetOrder();
        pizzaMakerRef.current?.group.current?.position.set(0, 0.01, 0);
        clearToppings();
        updateGamePhase("advancePhase");
      } else if (currentGamePhase.subphase === "takeOrderDialogue") {
        // reset box rotation and animation while not looking
        pizzaBoxRef.current?.group.current?.rotation.set(0, 0, 0);
        pizzaBoxRef.current?.mixer.stopAllAction();
        setCustomerOrder((prev) => ({ ...prev, show: true }));
      } else if (currentGamePhase.specialButtonText === "Ready") {
        pizzaMakerRef.current!.handlePointerDown.current = (e) => {
          addTopping(
            selectedTopping,
            generateRandomPos(1, 1, [2.5, 2.5, -3.2])
          );
        };
      } else if (currentGamePhase.nextButtonText === "Bake" && world) {
        pizzaMakerRef.current!.handlePointerDown.current = undefined;
        [...world.bodies].forEach((val) =>
          val.shapes[0].type !== SHAPE_TYPES.PLANE
            ? world.removeBody(val)
            : null
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
      } else if (currentGamePhase.subphase === "pizzaReveal") {
        const action = pizzaBoxRef.current?.actions["Peek"];
        if (action) {
          pizzaBoxRef.current?.mixer.stopAllAction();
          action.loop = LoopOnce;
          action.clampWhenFinished = true;
          action.reset().play();
        }
      } else if (currentGamePhase.subphase === "getPaid") {
        // TODO: Implement this part
        // TODO: Calculate toppings worth with a max value
        // TODO: Calculate emotional damage and increase decrease value according to that.
        updateGamePhase("advancePhase");
      } else if (currentGamePhase.phase === "endGame") {
        // Check if it is end of day, otherwise serve new customer
        if (todaysCustomerCount.current === currentCustomerIndex.current) {
          setOverlayText({
            OverlayItem: EndOfDay,
            show: true,
            closeable: false,
          });
        } else {
          updateGamePhase("advancePhase");
        }
      }

      changeAnimation(currentGamePhase);
    }
  }, [currentGamePhase, gameSceneVisible]);

  useFrame((state, delta) => {
    // console.log(state.gl.info);
    if (currentCustomerPath && customerRef.current?.group.current) {
      currentCustomerAnimTime.current = Math.min(
        currentCustomerAnimTime.current + delta * 0.3,
        1
      );
      const pointOnPath = currentCustomerPath.getPointAt(
        currentCustomerAnimTime.current
      );
      damp3(
        customerRef.current?.group.current?.position as Vector3,
        pointOnPath,
        0,
        currentCustomerAnimTime.current
      );

      if (currentCustomerAnimTime.current >= 1) {
        currentCustomerAnimTime.current = 0;
        // Rotate to counter at the end of the walking
        if (
          currentGamePhase.phase === "pizzaTakeOut" &&
          currentGamePhase.subphase === "customerWalk"
        ) {
          customerRef.current?.group.current?.rotation.set(0, 0, 0);
        }
        updateGamePhase("advancePhase");
      }
    }

    if (currentCustomerRotation && customerRef.current?.group.current) {
      const isMoved = dampE(
        customerRef.current?.group.current?.rotation,
        currentCustomerRotation,
        1,
        delta,
        0.2,
        linear
      );
      if (!isMoved) {
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
      const isMoved = damp3(
        pizzaMakerRef.current?.group.current.position,
        pointOnPath,
        0.2,
        delta
      );
      if (!isMoved) {
        currentPizzaAnimTime.current = 0;
        updateGamePhase("advancePhase");
      }
    }

    if (currentPizzaBoxRotation && pizzaBoxRef.current?.group.current) {
      const isMoved = dampE(
        pizzaBoxRef.current?.group.current.rotation,
        currentPizzaBoxRotation,
        1,
        delta,
        0.1,
        linear
      );
      if (!isMoved) {
        updateGamePhase("advancePhase");
      }
    }
  });

  return null;
};

export default GameController;

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import type {
  BuilderState,
  FinishId,
  PhotoTransform,
  PlayerInfo,
  SizeId,
  Stats,
  TemplateId,
} from "./types";
import { clearState, loadState, saveState } from "./storage";

export const INITIAL_STATE: BuilderState = {
  currentStep: 1,
  completedSteps: [],
  template: "gold",
  photo: null,
  info: {
    firstName: "",
    lastName: "",
    displayName: "",
    position: "ST",
    preferredFoot: "right",
    jerseyNumber: "10",
    nationality: "EE",
    club: "JK SEPPS",
    birthYear: "",
    captain: false,
    mvp: false,
  },
  overall: 82,
  stats: { pac: 78, sho: 80, pas: 74, dri: 82, def: 45, phy: 72 },
  finish: "matte",
  size: "medium",
  quantity: 1,
};

type Action =
  | { type: "hydrate"; payload: BuilderState }
  | { type: "reset" }
  | { type: "goto"; step: number }
  | { type: "next" }
  | { type: "back" }
  | { type: "complete"; step: number }
  | { type: "setTemplate"; template: TemplateId }
  | { type: "setPhoto"; photo: PhotoTransform | null }
  | { type: "updatePhotoTransform"; patch: Partial<Pick<PhotoTransform, "offsetX" | "offsetY" | "scale">> }
  | { type: "setInfo"; patch: Partial<PlayerInfo> }
  | { type: "setOverall"; overall: number }
  | { type: "setStats"; patch: Partial<Stats> }
  | { type: "setFinish"; finish: FinishId }
  | { type: "setSize"; size: SizeId }
  | { type: "setQuantity"; quantity: number };

function reducer(state: BuilderState, action: Action): BuilderState {
  switch (action.type) {
    case "hydrate":
      return action.payload;
    case "reset":
      return { ...INITIAL_STATE };
    case "goto":
      return { ...state, currentStep: clampStep(action.step) };
    case "next": {
      const next = clampStep(state.currentStep + 1);
      const completed = ensureCompleted(state.completedSteps, state.currentStep);
      return { ...state, currentStep: next, completedSteps: completed };
    }
    case "back":
      return { ...state, currentStep: clampStep(state.currentStep - 1) };
    case "complete":
      return {
        ...state,
        completedSteps: ensureCompleted(state.completedSteps, action.step),
      };
    case "setTemplate":
      return { ...state, template: action.template };
    case "setPhoto":
      return { ...state, photo: action.photo };
    case "updatePhotoTransform":
      if (!state.photo) return state;
      return { ...state, photo: { ...state.photo, ...action.patch } };
    case "setInfo":
      return { ...state, info: { ...state.info, ...action.patch } };
    case "setOverall":
      return { ...state, overall: clamp(action.overall, 40, 99) };
    case "setStats":
      return { ...state, stats: { ...state.stats, ...clampStats(action.patch) } };
    case "setFinish":
      return { ...state, finish: action.finish };
    case "setSize":
      return { ...state, size: action.size };
    case "setQuantity":
      return { ...state, quantity: clamp(action.quantity, 1, 99) };
    default:
      return state;
  }
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.round(n)));
}
function clampStep(n: number) {
  return clamp(n, 1, 9);
}
function clampStats(patch: Partial<Stats>): Partial<Stats> {
  const out: Partial<Stats> = {};
  for (const [k, v] of Object.entries(patch)) {
    out[k as keyof Stats] = clamp(v as number, 1, 99);
  }
  return out;
}
function ensureCompleted(list: number[], step: number) {
  if (list.includes(step)) return list;
  return [...list, step].sort((a, b) => a - b);
}

interface BuilderContextValue {
  state: BuilderState;
  dispatch: React.Dispatch<Action>;
  reset: () => void;
  isStepReachable: (step: number) => boolean;
}

const BuilderContext = createContext<BuilderContextValue | null>(null);

export function BuilderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const hydrated = useRef(false);

  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    const loaded = loadState();
    if (loaded) dispatch({ type: "hydrate", payload: loaded });
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    saveState(state);
  }, [state]);

  const reset = useCallback(() => {
    clearState();
    dispatch({ type: "reset" });
  }, []);

  const isStepReachable = useCallback(
    (step: number) => step === 1 || state.completedSteps.includes(step - 1) || state.completedSteps.includes(step),
    [state.completedSteps],
  );

  const value = useMemo(
    () => ({ state, dispatch, reset, isStepReachable }),
    [state, reset, isStepReachable],
  );

  return <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>;
}

export function useBuilder() {
  const ctx = useContext(BuilderContext);
  if (!ctx) throw new Error("useBuilder must be used inside BuilderProvider");
  return ctx;
}
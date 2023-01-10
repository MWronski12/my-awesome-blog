import { createGlobalState } from "react-hooks-global-state";

const initialState = { user: null };
const { useGlobalState } = createGlobalState(initialState);

export { useGlobalState };

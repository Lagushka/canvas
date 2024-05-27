import { PayloadAction } from '@reduxjs/toolkit';

type Setter<State, Value> = (
  state: State,
  action: PayloadAction<Value>,
) => void;

type GetStateSetter = <
  State,
  Key extends keyof State,
  Value extends State[Key],
>(
  key: Key,
) => Setter<State, Value>;

export const getStateSetter: GetStateSetter = (key) => (state, action) => {
  state[key] = action.payload;
};

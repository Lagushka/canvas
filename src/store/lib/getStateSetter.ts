import { PayloadAction } from '@reduxjs/toolkit';

type Setter<State, Key extends keyof State> = (
  state: State,
  action: PayloadAction<State[Key]>,
) => void;

type GetStateSetter = <State, Key extends keyof State>(
  key: Key,
) => Setter<State, Key>;

export const getStateSetter: GetStateSetter = (key) => (state, action) => {
  state[key] = action.payload;
};

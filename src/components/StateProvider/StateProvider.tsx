'use client';
import { store } from '@/store/store';
import React, { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

export const StateProvider: FC<PropsWithChildren> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

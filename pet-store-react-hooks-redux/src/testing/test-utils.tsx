import { type RenderOptions, render } from '@testing-library/react';
import React, { type PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import {
  type ApplicationState,
  type Store,
  createStore,
} from '~infrastructure/redux/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<ApplicationState>;
  store?: Store;
}

export function wrapWithRedux(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = createStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren): React.JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

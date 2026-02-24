"use client";

import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "@/src/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { ensureCardUids } from "@/src/store/boardsSlice";

export default function ReduxProviderClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
        onBeforeLift={() => {
          // Ensure any hydrated cards have uids before rendering children
          store.dispatch(ensureCardUids());
        }}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}

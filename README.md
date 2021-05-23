> # @reactivers/context-binder

[![npm version](https://badge.fury.io/js/@reactivers%2Fcontext-binder.svg)](//www.npmjs.com/package/@reactivers/context-binder)

# Welcome

## Introduction

> ```@reactivers/context-binder``` provides to use ```context``` in a component without unnecesseary rerenders.

## Getting Started

### Installation

```bash
npm install --save @reactivers/context-binder

yarn add @reactivers/context-binder
```

# Usage

## Open in [CodeSandbox](https://codesandbox.io/s/react-context-binder-with-reactiverscontext-binder-wd1e5)

```tsx

import { createContext, FC, useCallback, useState } from 'react';
import { ContextBinder } from '@reactivers/context-binder';

interface Counter {
  counter: number;
  increase: () => void;
  decrease: () => void;
}

const CounterContext = createContext<Counter>({} as Counter);

const CounterProvider: FC = ({ children }) => {
  const [counter, setCounter] = useState(0);

  const increase = useCallback(() => {
    setCounter(old => old + 1)
  }, [])

  const decrease = useCallback(() => {
    setCounter(old => old - 1)
  }, [])

  return (
    <CounterContext.Provider value={{
      counter,
      increase,
      decrease
    }}>
      {children}
    </CounterContext.Provider>
  )

}

const App = () => {
  return (
    <div className="sample-page center">
      <div style={{ textAlign: 'center' }}>
        <CounterText />
        <DecreaseButton />
        <IncreaseButton />
      </div>
    </div>
  );
}

const CounterText = ContextBinder(
  CounterContext,
  {
    counter: c => c.counter
  },
  ({ context }) => {
    const { counter } = context;
    console.log("Counter render")
    return (
      <h1>Counter: {counter}</h1>
    )
  }
)

const DecreaseButton = ContextBinder(
  CounterContext, {
  decrease: c => c.decrease
}, ({ context }) => {
  const { decrease } = context;
  console.log("DecreaseButton render")
  return (
    <button onClick={decrease}>Decrease</button>
  )
}
)

const IncreaseButton = ContextBinder(
  CounterContext,
  {
    increase: c => c.increase
  }
  , ({ context }) => {
    const { increase } = context;
    console.log("IncreaseButton render")
    return (
      <button onClick={increase}>Increase</button>
    )
  }
)

const AppWrapper = () => {
  return (
    <CounterProvider>
      <App />
    </CounterProvider>
  )
}

export default AppWrapper;

```
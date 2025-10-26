---
title: "A Deep Dive into React Hooks"
date: "2024-06-15"
tags: ["React", "JavaScript", "Web Development", "Frontend"]
excerpt: "Explore the power and flexibility of React Hooks, from useState and useEffect to creating your own custom hooks for maximum code reusability."
image: "deep-dive-into-react-hooks"
---

React Hooks, introduced in React 16.8, revolutionized how we write components. They allow us to use state, lifecycle methods, and other React features in functional components, eliminating the need for class components in most cases.

This deep dive will cover the fundamental hooks, advanced hooks, and the power of creating your own custom hooks.

## The Basics: `useState` and `useEffect`

### `useState`

The `useState` hook is your primary tool for managing state within a component. It returns a stateful value and a function to update it.

```javascript
import React, { useState } from 'react';

function Counter() {
  // The "count" state variable is initialized to 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
In this example, `useState(0)` declares a state variable named `count`. React preserves this state between re-renders. `setCount` is the function that allows you to update `count`. When you call `setCount`, React re-renders the `Counter` component with the new `count` value.

### `useEffect`

The `useEffect` hook lets you perform side effects in function components. Common side effects include data fetching, setting up subscriptions, and manually changing the DOM. It's a combination of `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` from the class component world.

```javascript
import React, { useState, useEffect } from 'react';

function UserGreeting({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This function will be called after the component renders
    setLoading(true);
    fetch(`https://api.example.com/users/${userId}`)
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
    
    // Cleanup function: runs before the component unmounts
    // or before the effect runs again.
    return () => {
      console.log(`Cleaning up effect for user ${userId}`);
    };
  }, [userId]); // Dependency array: Only re-run the effect if userId changes

  if (loading) {
    return 'Loading...';
  }

  return <p>Hello, {user.name}</p>;
}
```
The dependency array `[userId]` is crucial. It tells React to skip re-running the effect if the `userId` prop hasn't changed, preventing unnecessary network requests and potential infinite loops.

## Advanced Hooks: `useContext`, `useReducer`, and `useRef`

### `useContext`
This hook allows you to subscribe to React context without introducing nesting. It makes it easy to pass data through the component tree without having to pass props down manually at every level.

```javascript
// theme-context.js
const ThemeContext = React.createContext('light');

// App.js
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// Toolbar.js
function Toolbar() {
  const theme = useContext(ThemeContext); // 'dark'
  return <div className={`theme-${theme}`}>...</div>;
}
```

### `useReducer`
For more complex state logic, `useReducer` is often a better choice than `useState`. It's particularly useful when you have state that involves multiple sub-values or when the next state depends on the previous one.

```javascript
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

## Creating Custom Hooks

The real power of hooks is unlocked when you start creating your own. Custom hooks are a way to extract component logic into reusable functions. A custom hook is a JavaScript function whose name starts with ”use” and that may call other Hooks.

For example, let's create a hook to fetch window dimensions:

```javascript
import { useState, useEffect } from 'react';

function useWindowSize() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  
  useEffect(() => {
    const handleResize = () => setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return size;
}

// How to use it:
function MyComponent() {
  const [width, height] = useWindowSize();
  return <p>Window size: {width} x {height}</p>;
}
```

By extracting this logic, we can reuse it in any component that needs to know the window size, without duplicating code. This makes our components cleaner and more focused on their specific rendering job.

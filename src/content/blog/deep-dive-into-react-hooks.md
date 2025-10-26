---
title: "A Deep Dive into React Hooks"
date: "2024-06-15"
tags: "React, JavaScript, Web Development"
excerpt: "Explore the power and flexibility of React Hooks, from useState and useEffect to creating your own custom hooks for maximum code reusability."
image: "deep-dive-into-react-hooks"
---

React Hooks revolutionized how we write components. They allow us to use state and other React features without writing a class. Let's explore some of the most common hooks.

## useState

The `useState` hook is the most basic hook. It lets you add React state to function components.

```javascript
import React, { useState } from 'react';

function Counter() {
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

## useEffect

The `useEffect` hook lets you perform side effects in function components. Data fetching, setting up a subscription, and manually changing the DOM are all examples of side effects.

```javascript
import React, { useState, useEffect } from 'react';

function UserGreeting({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserData(userId).then(data => {
      setUser(data);
    });
  }, [userId]); // Only re-run the effect if userId changes

  if (!user) {
    return 'Loading...';
  }

  return <p>Hello, {user.name}</p>;
}
```

This is just the tip of the iceberg. Custom hooks allow you to extract component logic into reusable functions, further cleaning up your components and improving maintainability. Happy coding!

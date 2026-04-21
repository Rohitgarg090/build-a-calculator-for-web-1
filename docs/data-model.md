# Calculator App — Data Model Documentation

## Overview

This is a **purely client-side** personal web calculator built with **Next.js** and **Tailwind CSS**.
There is **no database**, **no authentication**, and **no backend persistence**.
All state is ephemeral and lives entirely in the browser via React hooks.

---

## Architecture Decision

| Concern             | Decision                          | Reason                                  |
|---------------------|-----------------------------------|-----------------------------------------|
| Database            | ❌ None                           | No data needs to persist                |
| Authentication      | ❌ None                           | Personal-use, single user               |
| API Routes          | ❌ None                           | All logic runs client-side              |
| State Management    | ✅ React `useState` / `useReducer` | Lightweight, sufficient for calculator  |
| Storage (optional)  | ✅ `localStorage` (optional)      | For future preference persistence       |

---

## Client-Side State Shape

This represents the **ephemeral runtime state** managed inside the React component tree.
It is NOT stored in a database.

```
┌─────────────────────────────────────────┐
│           CalculatorState               │
├─────────────────────────────────────────┤
│ currentInput   : string                 │  ← Number currently being typed
│ previousInput  : string                 │  ← First operand stored in memory
│ operator       : '+' | '-' | '*' | '/'  │  ← Active arithmetic operator
│ result         : string | null          │  ← Output after '=' is pressed
│ expression     : string                 │  ← Full display string e.g. "8 + 3"
│ hasError       : boolean                │  ← true on divide-by-zero etc.
└─────────────────────────────────────────┘
```

---

## State Transition Diagram

```
[IDLE / Fresh Start]
        │
        ▼
[User types digit] ──────────────────────────────────────────┐
        │                                                     │
        ▼                                                     │
[currentInput updated]                                        │
        │                                                     │
        ▼                                                     │
[User presses operator]                                       │
        │                                                     │
        ▼                                                     │
[previousInput = currentInput]                                │
[operator = selected operator]                                │
[currentInput = '']                                           │
        │                                                     │
        ▼                                                     │
[User types second number] ◄──────────────────────────────────┘
        │
        ▼
[User presses '=']
        │
        ├──► [result = evaluate(previousInput, operator, currentInput)]
        │
        ├──► [hasError = true]  ← if divide by zero or invalid
        │
        ▼
[Result displayed]
        │
        ▼
[User presses 'C' / 'AC']
        │
        ▼
[State reset to IDLE]
```

---

## Optional Future Extensions

If you ever want to extend this app, here are suggested data models:

### 1. Calculation History
```
┌─────────────────────────────┐
│      CalculationHistory     │
├─────────────────────────────┤
│ id          : cuid (PK)     │
│ expression  : string        │  ← e.g. "12 + 7"
│ result      : string        │  ← e.g. "19"
│ createdAt   : DateTime      │
└─────────────────────────────┘
```

### 2. User Preferences
```
┌─────────────────────────────┐
│       UserPreference        │
├─────────────────────────────┤
│ id            : cuid (PK)   │
│ theme         : string      │  ← 'dark' | 'light'
│ decimalPlaces : int         │  ← default: 10
│ soundEnabled  : boolean     │  ← button click sounds
│ createdAt     : DateTime    │
│ updatedAt     : DateTime    │
└─────────────────────────────┘
```

---

## ER Diagram (Future State)

```
┌──────────────────────┐         ┌──────────────────────┐
│  CalculationHistory  │         │    UserPreference     │
├──────────────────────┤         ├──────────────────────┤
│ id (PK)              │         │ id (PK)               │
│ expression           │         │ theme                 │
│ result               │         │ decimalPlaces         │
│ createdAt            │         │ soundEnabled          │
└──────────────────────┘         │ createdAt             │
                                 │ updatedAt             │
                                 └──────────────────────┘

Note: No relationships between tables — both are standalone.
No foreign keys or joins required.
```

---

## Summary

> **For the current scope: no database, schema, or migrations are needed.**
> The app is intentionally minimal — a clean, distraction-free tool for personal arithmetic.
> All logic and state live in the browser. No data leaves the client.

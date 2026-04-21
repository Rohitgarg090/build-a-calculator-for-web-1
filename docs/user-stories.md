# User Stories

## S-001 — View the Calculator
**As a** personal user,
**I want to** open the app and immediately see the calculator,
**so that** I can start computing without any setup or login.

**Acceptance Criteria:**
- The calculator is visible on page load at `/`
- No authentication or onboarding flow exists
- Layout is centered and uncluttered

---

## S-002 — Enter Numbers
**As a** user,
**I want to** click digit buttons (0–9) or press number keys on my keyboard,
**so that** I can input numbers into the calculator.

**Acceptance Criteria:**
- Clicking any digit appends it to the current input shown in the display
- Keyboard digit keys produce the same result as clicking buttons
- Leading zeros are handled gracefully (e.g. `007` normalizes to `7`)

---

## S-003 — Perform Basic Arithmetic
**As a** user,
**I want to** use +, −, ×, ÷ operators,
**so that** I can perform basic calculations.

**Acceptance Criteria:**
- Clicking an operator after a number stores the first operand and the operator
- The display updates to reflect the chosen operator or ongoing expression
- Keyboard keys `+`, `-`, `*`, `/` map to the respective operators

---

## S-004 — See the Result
**As a** user,
**I want to** press `=` or hit `Enter`,
**so that** I can see the computed result in the display.

**Acceptance Criteria:**
- The result replaces the current display value
- The result can be used as the first operand for a subsequent operation
- Pressing `=` multiple times does not chain unintended operations

---

## S-005 — Use Decimal Numbers
**As a** user,
**I want to** input decimal values using the `.` button,
**so that** I can work with non-integer numbers.

**Acceptance Criteria:**
- Only one decimal point is allowed per number
- Clicking `.` when a decimal already exists has no effect

---

## S-006 — Clear the Calculator
**As a** user,
**I want to** press the `C` button or `Escape` key,
**so that** I can reset the calculator to its initial state.

**Acceptance Criteria:**
- Display resets to `0`
- All stored operands and operators are cleared

---

## S-007 — Delete Last Digit
**As a** user,
**I want to** press the `⌫` button or `Backspace` key,
**so that** I can correct a mis-typed digit without full reset.

**Acceptance Criteria:**
- The last character is removed from the current input
- If only one digit remains, display reverts to `0`

---

## S-008 — Handle Division by Zero
**As a** user,
**I want to** see a clear error message when I divide by zero,
**so that** I understand the operation is invalid.

**Acceptance Criteria:**
- Display shows `Error` or `Cannot divide by 0`
- Pressing `C` clears the error and resets the calculator

---

## S-009 — Use the Calculator on Any Screen Size
**As a** user on a mobile or desktop device,
**I want to** have a properly sized and tappable calculator UI,
**so that** I can use it comfortably on any device.

**Acceptance Criteria:**
- Buttons are large enough to tap on mobile (minimum 44×44px touch target)
- Layout does not overflow or break on small screens
- Tailwind responsive utilities handle sizing adjustments
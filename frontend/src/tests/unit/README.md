# Unit Tests

Add one test file per utility function in `src/utils/`.

## Pattern

```typescript
// src/tests/unit/formatDate.test.ts
import { describe, it, expect } from "vitest";
import { formatDate } from "@/utils/formatDate";

describe("formatDate", () => {
  it("formats ISO string to readable date", () => {
    expect(formatDate("2024-01-15T00:00:00Z")).toBe("Jan 15, 2024");
  });

  it("returns fallback for null input", () => {
    expect(formatDate(null)).toBe("—");
  });

  it("handles invalid date string gracefully", () => {
    expect(formatDate("not-a-date")).toBe("Invalid date");
  });
});
```

## Naming

- File: `[functionName].test.ts`
- Test: `describe('[functionName]', () => { ... })`
- Cover: happy path + null/undefined input + error/edge case

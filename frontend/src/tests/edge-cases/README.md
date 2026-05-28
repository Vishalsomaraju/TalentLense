# Edge Case Tests

Test the paths that break in production — null inputs, empty results, network failures.

## Pattern

```typescript
// src/tests/edge-cases/apiFailure.test.ts
import { describe, it, expect, vi } from "vitest";
import { fetchItems } from "@/services/itemService";

describe("fetchItems — edge cases", () => {
  it("returns error response on network failure", async () => {
    vi.spyOn(global, "fetch").mockRejectedValueOnce(new Error("Network error"));
    const result = await fetchItems();
    expect(result.data).toBeNull();
    expect(result.error).toBeTruthy();
  });

  it("handles empty Firestore collection gracefully", async () => {
    // mock empty snapshot
    const result = await fetchItems();
    expect(Array.isArray(result.data)).toBe(true);
  });
});
```

## Cover these scenarios for every service function

- Network timeout / offline
- Empty collection / null document
- Malformed API response
- Unauthenticated request hitting auth-required endpoint

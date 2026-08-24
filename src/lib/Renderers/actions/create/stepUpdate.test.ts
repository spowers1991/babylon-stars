import assert from "node:assert/strict";
import { stepUpdate } from "./stepUpdate";

const calls: number[] = [];
const config = {
  id: "testRenderer",
  name: "Test Renderer",
  interval: 100,
  step: () => calls.push(Date.now()),
};
const lastUpdates: Record<string, number> = {};

stepUpdate(config, 40, lastUpdates);
assert.equal(calls.length, 0, "should not run before the interval is reached");

stepUpdate(config, 60, lastUpdates);
assert.equal(calls.length, 1, "should run once when accumulated time crosses the interval");

stepUpdate(config, 50, lastUpdates);
assert.equal(calls.length, 1, "should keep the remainder of elapsed time after a trigger");

// A very large frame (simulating a delayed or suspended frame) should still
// trigger only one step to avoid compounded catch-up updates.
const largeCalls: number[] = [];
const largeConfig = {
  id: "largeFrameRenderer",
  name: "Large Frame Renderer",
  interval: 100,
  step: () => largeCalls.push(Date.now()),
};
const largeLastUpdates: Record<string, number> = {};
stepUpdate(largeConfig, 500, largeLastUpdates);
assert.equal(largeCalls.length, 1, "a large frame should trigger exactly one step, not multiple catch-up steps");

console.log("delta-time scheduler test passed");

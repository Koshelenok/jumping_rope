import JumpingMoment from "./models/JumpingMoment";
import {PlanItem} from "./contracts";
import {
  createJumpingMomentWithStartTimeDuration,
  planItemToArray,
  planItemsToArray,
  getStatisticsByMoments
} from "./utils";

afterEach(() => {
  cleanup();
});

describe("Check utils", function () {
  test("createJumpingMomentWithStartTimeDuration", () => {
    const start = new Date(
      Math.floor(Date.now() / 1000 / 60) * 60 * 1000 + 1 * 60 * 1000
    );
    const duration = 0.5;
    const jumping = createJumpingMomentWithStartTimeDuration(
      "test",
      start,
      duration
    );
    expect(jumping.start.getTime()).toBe(start.getTime());
    expect(jumping.end.getTime() - jumping.start.getTime()).toBe(
      duration * 60 * 1000
    );
  });
});

describe("Create arrays of JumpingMoment", function () {
  test("Plan item to array", () => {
    const planItem: PlanItem = { type: "jump", duration: 0.5, times: 10 };
    const start = new Date(
      Math.floor(Date.now() / 1000 / 60) * 60 * 1000 + 1 * 60 * 1000
    );

    const items = planItemToArray(planItem, start);

    expect(items.length).toBe(planItem.times * 2 - 1);
    expect(items[0].start.getTime()).toBe(start.getTime());

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      expect(item instanceof JumpingMoment).toBe(true);
      expect(item.end.getTime() - item.start.getTime()).toBe(
        planItem.duration * 60 * 1000
      );
      expect(item.type).toBe(i % 2 === 0 ? planItem.type : "rest"));
    }
  });

  test("Plan items to array", () => {
    const planItems: PlanItem[] = [
      { type: "jump", duration: 0.5, times: 10 },
      { type: "jump", duration: 1, times: 8 },
      { type: "jump", duration: 2, times: 4 },
    ];

    const start = new Date(
      Math.floor(Date.now() / 1000 / 60) * 60 * 1000 + 1 * 60 * 1000
    );

    const items = planItemsToArray(JSON.parse(JSON.stringify(planItems)), start);
    const expectedCount: number = planItems.reduce((acc, cur) => acc + (cur.times * 2 - 1), planItems.length - 1);
    expect(items.length).toBe(expectedCount);
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const diff = (item.end.getTime() - item.start.getTime()) / 1000 / 60;
      expect(diff).toBe(i % 2 !== 0 ? 0.5: diff);
      expect(item instanceof JumpingMoment).toBe(true);
      if (i % 2 !== 0) {
        expect(item.type).toBe("rest"));
      }
    }
  });

  test("Get Statistics by planitems", () => {
    const planItems: PlanItem[] = [
      { type: "jump", duration: 0.5, times: 5 },
      { type: "jump", duration: 1, times: 9 },
      { type: "jump", duration: 1.5, times: 4 },
      { type: "jump", duration: 2, times: 4, },
      { type: "jump", duration: 1.5, times: 3, },
    ];

    const start = new Date(
      Math.floor(Date.now() / 1000 / 60) * 60 * 1000 + 1 * 60 * 1000
    );

    const moments = planItemsToArray(JSON.parse(JSON.stringify(planItems)), start);
    const statistics = getStatisticsByMoments(moments);
    expect(statistics.duration.total).toBe(42);
    expect(statistics.duration.rest).toBe(12);
    expect(statistics.duration.jumping).toBe(30);
  });
});

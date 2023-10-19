import JumpingMoment from "./JumpingMoment";

afterEach(() => {
  cleanup();
});

const getTestDates = () => {
  const start = new Date(
    Math.floor(Date.now() / 1000 / 60) * 60 * 1000 + 1 * 60 * 1000
  );
  const end = new Date(
    Math.floor(Date.now() / 1000 / 60) * 60 * 1000 + 31 * 60 * 1000
  );
  const between = new Date(
    Math.floor(Date.now() / 1000 / 60) * 60 * 1000 + 15 * 60 * 1000
  );
  return { start, end, between };
};

describe("Create JumpingMoment", () => {
  test("check JumpingMoment activity methods", () => {
    const { start, end, between } = getTestDates();
    const moment = new JumpingMoment("rest", start, end);
    expect(moment.isBetween(between)).toBe(true);
    expect(moment.isActive()).toBe(false);
  });
  test("check JumpingMoment percentage methods", () => {
    const { start, end, between } = getTestDates();
    const moment = new JumpingMoment("rest", start, end);
    expect(moment.getPercentByDate(between)).toBe(46);
    expect(moment.getCurrentPercent()).toBe(0);
  });
});

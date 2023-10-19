import JumpingMoment from "./models/JumpingMoment";
import { PlanItem } from "./contracts";

export const createJumpingMomentWithStartTimeDuration = (
  type: string,
  start: Date,
  duration: number
): JumpingMoment => {
  const end = new Date(start.getTime() + duration * 60 * 1000);
  return new JumpingMoment(type, start, end);
};

export const planItemToArray = (
  item: PlanItem,
  start: Date
): JumpingMoment[] => {
  let items = [];
  while (items.length < item.times * 2 - 1) {
    const moment = createJumpingMomentWithStartTimeDuration(
      items.length % 2 === 0 ? item.type : "rest",
      start,
      items.length % 2 === 0 ? item.duration : 0.5
    );
    start = moment.end;
    items.push(moment);
  }
  return items;
};

export const planItemsToArray = (
  items: PlanItem[],
  start: Date
): JumpingMoment[] => {
  let moments: JumpingMoment[] = [];
  while (items.length) {
    const item: PlanItem | undefined = items.shift();
    if (item) {
      moments = moments.concat(planItemToArray(item, start));
      start = moments[moments.length - 1].end;
      if (items.length) {
        moments.push(
          createJumpingMomentWithStartTimeDuration("rest", start, 0.5)
        );
      }
      start = moments[moments.length - 1].end;
    }
  }
  return moments;
};

export const getStatisticsByMoments = (moments: JumpingMoment[]) => {
  const total = moments
    .map((moment: JumpingMoment) => {
      const minutes =
        (moment.end.getTime() - moment.start.getTime()) / 1000 / 60;
      return minutes;
    })
    .reduce((acc, current) => acc + current, 0);
  const rest = moments
    .map((moment: JumpingMoment) => {
      if (moment.type === "rest") {
        const minutes =
          (moment.end.getTime() - moment.start.getTime()) / 1000 / 60;
        return minutes;
      }
      return 0;
    })
    .reduce((acc, current) => acc + current, 0);

  return {
    duration: {
      total,
      rest,
      jumping: total - rest
    }
  };
};

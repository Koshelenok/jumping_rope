import Operation from "../Operation";
import OperationsManager from "../OperationsManager";
import JumpingMoment from "../../models/JumpingMoment";

class CurrentMoment implements Operation {
  constructor(private moments: JumpingMoment[], private area: HTMLElement) {}
  action(manager: OperationsManager) {
    const info = this.area.querySelector(".info"),
      progress = this.area.querySelector(".progress"),
      span = progress?.querySelector("span");

    const moment = this.moments.find((item) => item.isActive());
    if (this.area) {
      if (moment) {
        const percantage = moment.getCurrentPercent();
        info?.innerHTML = `${moment.type}: ${moment.minutes()}m ${percantage}%`;
        if (moment.type === "rest") {
          progress?.classList.remove("progress-green");
          progress?.classList.add("progress-orange");
        }
        if (moment.type === "jump") {
          progress?.classList.remove("progress-orange");
          progress?.classList.add("progress-green");
        }
        span?.style.width = percantage + "%";
      }
    }
  }
}

export default CurrentMoment;

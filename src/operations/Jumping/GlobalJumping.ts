import Operation from "../Operation";
import OperationsManager from "../OperationsManager";
import JumpingMoment from "../../models/JumpingMoment";

class GlobalJumping implements Operation {
  private moment: JumpingMoment;
  private area: HTMLElement;

  constructor(moments: JumpingMoment[], area: HTMLElement) {
    this.moment = new JumpingMoment(
      "global",
      moments[0].start,
      moments[moments.length - 1].end
    );
    this.area = area;
  }
  action(manager: OperationsManager) {
    const info = this.area.querySelector(".info"),
      progress = this.area.querySelector(".progress"),
      span = progress?.querySelector("span");
    if (this.area) {
      const percantage = this.moment.getCurrentPercent();
      info?.innerHTML = `${
        this.moment.type
      }: ${this.moment.minutes()}m ${percantage}%`;
      span?.style.width = percantage + "%";
    }
  }
}

export default GlobalJumping;

import { PlanItem } from "../../contracts";
import JumpingMoment from "../../models/JumpingMoment";
import { planItemsToArray } from "../../utils";
import AbstractOperationComposite from "../AbstractOperationComposite";
import OperationsManager from "../OperationsManager";
import CurrentMoment from "./CurrentMoment";
import GlobalJumping from "./GlobalJumping";

const PLAN: PlanItem[] = [
  { type: "jump", duration: 0.5, times: 5 },
  { type: "jump", duration: 1, times: 9 },
  { type: "jump", duration: 1.5, times: 4 },
  { type: "jump", duration: 2, times: 4 },
  { type: "jump", duration: 1.5, times: 3 }
];

class JumpingOperation extends AbstractOperationComposite {
  private moments: JumpingMoment[];

  constructor(
    globalElement: HTMLElement,
    currentElement: HTMLElement,
    start: Date
  ) {
    super();

    this.moments = planItemsToArray(PLAN, start);

    this.add(new GlobalJumping(this.moments, globalElement));
    this.add(new CurrentMoment(this.moments, currentElement));
  }
}

export default JumpingOperation;

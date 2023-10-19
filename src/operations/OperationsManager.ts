import AbstractOperationComposite from "./AbstractOperationComposite";

const TIMER_DELAY = 400;

class OperationsManager extends AbstractOperationComposite {
  public static _instance: OperationsManager | null = null;
  private isStoped: boolean = false;

  private constructor() {
    super();
  }
  public static getInstance() {
    if (!OperationsManager._instance) {
      OperationsManager._instance = new OperationsManager();
    }
    return OperationsManager._instance;
  }
  public start() {
    this.setIsStoped(false);
    const self: OperationsManager = this;
    this.timerId = setTimeout(function rec() {
      self.action(self);
      if (!self.isStoped) {
        setTimeout(rec, TIMER_DELAY);
      }
    }, TIMER_DELAY);
  }
  public stop() {
    this.setIsStoped(true);
  }
  private setIsStoped(value: boolean): void {
    this.isStoped = value;
  }
}

export default OperationsManager;

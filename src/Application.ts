import OperationsManager from "./operations/OperationsManager";
import JumpingOperation from "./operations/Jumping/JumpingOperation";
import ShowTimeOperation from "./operations/ShowTimeOperation";

class Application {
  public static _instance: Application | null = null;

  private constructor() {}
  public static getInstance() {
    if (!Application._instance) {
      Application._instance = new Application();
    }
    return Application._instance;
  }
  run() {
    console.log("Application.js run");

    const operationsManager = OperationsManager.getInstance();
    operationsManager.add(
      new ShowTimeOperation(document.getElementById("time"))
    );

    const jumpingStart = new Date(
      Math.floor(Date.now() / 1000 / 60) * 60 * 1000 + 0.5 * 60 * 1000
    );
    operationsManager.add(
      new JumpingOperation(
        document.getElementById("jumping_global"),
        document.getElementById("jumping_current"),
        jumpingStart
      )
    );

    operationsManager.start();
  }
}
export default Application;

import Operation from "./Operation";
import OperationsManager from "./OperationsManager";

abstract class AbstractOperationComposite implements Operation {
  private operations: Operation[] = [];
  action(manager: OperationsManager) {
    this.operations.forEach((operation: Operation) => {
      return operation.action(manager);
    });
  }
  add(operation: Operation) {
    this.operations.push(operation);
  }
}
export default AbstractOperationComposite;

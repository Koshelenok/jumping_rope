import OperationsManager from "./OperationsManager";

interface Operation {
  action(manager: OperationsManager): void;
}

export default Operation;

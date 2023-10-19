import Operation from "./Operation";
import OperationsManager from "./OperationsManager";

class ShowTimeOperation implements Operation {
  private area: HTMLElement | null;
  constructor(area: HTMLElement) {
    this.area = area;
  }
  action(operationManger: OperationsManager) {
    const current = new Date();
    this.setValue(
      [current.getHours(), current.getMinutes(), current.getSeconds()]
        .map((item: number) => {
          const itemStringify: string = item.toString();
          return (itemStringify.length === 1 ? "0" : "") + itemStringify;
        })
        .join(":")
    );
  }
  private setValue(value: string) {
    if (this.area) {
      this.area.innerHTML = value;
    }
  }
}

export default ShowTimeOperation;

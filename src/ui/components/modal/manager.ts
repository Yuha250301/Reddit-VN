import { ModalType } from "./const";
import ModalAction from "ui/action/modal";
import EventEmitter from "utils/event-emitter";
class ModalManager {
  private opens: ModalType[];
  private handler: Map<ModalType, Function>;
  constructor() {
    this.opens = []; //prepare for multi layer modal, now we only have one modal in app but future we need add z-index for multi layer modal
    this.handler = new Map<ModalType, Function>(); // handler for action open or close modal if need update UI, ex: reset page when close modal show error transaction
  }
  addModal(type: ModalType, data?: any) {
    EventEmitter.emit(ModalAction.OPEN_MODAL, {type, data});
    this.opens.push(type);
  }
  removeAllModal() {
    this.opens.forEach((item) => {
      EventEmitter.emit(ModalAction.CLOSE_MODAL, item);
    });
    this.opens = [];
  }
  removeModal(type: ModalType) {
    EventEmitter.emit(ModalAction.CLOSE_MODAL, type);
  }
  closeCommonModal() {
    EventEmitter.emit(ModalAction.CLOSE_COMMON_MODAL);
  }
}
const manager = new ModalManager();
export default manager;
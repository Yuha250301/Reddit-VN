export enum ModalAction {
  OPEN_MODAL = "OPEN_MODAL",
  CLOSE_MODAL = "CLOSE_MODAL",
  CLOSE_COMMON_MODAL = "CLOSE_COMMON_MODAL",
}

export enum ModalType {
  ERROR_MODAL = "ERROR_MODAL",
  NOTE_MODAL = "NOTE_MODAL",
  DELETE_MODAL = "DELETE_MODAL",
  NAME_MODAL = "NAME_MODAL",
  PREVIEW_MODAL = "PREVIEW_MODAL",
  ANNOUCE_MODAL = "ANNOUCE_MODAL"
}

export type ModalInfo = {
  [key in ModalType]: {
    title: string;
    large: boolean;
    content: React.FC<ContentModalProps>;
  };
};

export interface ContentModalProps {
  handleCloseModal: () => void;
  content?: string;
}


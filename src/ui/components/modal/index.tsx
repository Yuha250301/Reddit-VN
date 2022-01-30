import React, { useState, useEffect } from "react";
import EventEmitter from "utils/event-emitter";
import AnnouceModal from "./annouce-modal";
import { ModalType, ModalAction, ModalInfo } from "./const";
import DeleteModal from "./delete-modal";
import ErrorModal from "./error-modal";
import CustomizedDialogs from "./modal-ui";
import NameModal from "./name-modal";
import NoteModal from "./note-modal";
import PreviewModal from "./preview-modal";

const modalInfo: ModalInfo = {
  [ModalType.NOTE_MODAL]: {
    title: "WANNA SAY SOMETHING?",
    large: false,
    content: NoteModal,
  },
  [ModalType.NAME_MODAL]: {
    title: "TRANSLATED BY",
    large: false,
    content: NameModal,
  },
  [ModalType.DELETE_MODAL]: {
    title: "ARE YOU SURE TO DELETE THIS TRANSLATION?",
    large: false,
    content: DeleteModal,
  },
  [ModalType.PREVIEW_MODAL]: {
    title: "PREVIEW YOUR POST",
    large: false,
    content: PreviewModal,
  },
  [ModalType.ERROR_MODAL]: {
    title: "⚠ OOPS! SOMETHING WENT WRONG.",
    large: false,
    content: ErrorModal,
  },
  [ModalType.ANNOUCE_MODAL]: {
    title: "THÔNG BÁO",
    large: false,
    content: AnnouceModal,
  },
};

const Modal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<ModalType>();
  const [inner, setInner] = useState<string>("");

  const handleOpenModal = ({ type, data }: { type: ModalType; data: any }) => {
    if (type === ModalType.ANNOUCE_MODAL && !data) return;
    setInner(data);
    setType(type);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setType(type);
  };

  useEffect(() => {
    const handleOpen = EventEmitter.addListener(
      ModalAction.OPEN_MODAL,
      handleOpenModal,
    );

    const handleClose = EventEmitter.addListener(
      ModalAction.CLOSE_MODAL,
      handleCloseModal,
    );
    return () => {
      handleOpen.remove;
      handleClose.remove;
    };
  }, []);

  if (!open || !type) return null;
  else {
    const { title, large, content: ModalContent } = modalInfo[type];
    return (
      <CustomizedDialogs
        title={title}
        open={open}
        setOpen={setOpen}
        large={large}
      >
        <ModalContent handleCloseModal={handleCloseModal} content={inner} />
      </CustomizedDialogs>
    );
  }
};

export default Modal;

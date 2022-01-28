import React, { useState, useEffect } from 'react';
import EventEmitter from 'utils/event-emitter';
import { ModalType, ModalAction } from "./const"
import CustomizedDialogs from "./modal-ui";

interface ModalProps { }

const Modal: React.FC<ModalProps> = () => {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState<ModalType>();
    const [data, setData] = useState<any>();

    useEffect(() => {
        const handleOpen = EventEmitter.addListener(
            ModalAction.OPEN_MODAL,
            ({ type, data }: { type: ModalType; data: any }) => {
                setOpen(true);
                setType(type);
                if (data) setData(data);
            }
        );

        const handleClose = EventEmitter.addListener(
            ModalAction.CLOSE_MODAL,
            () => {
                setOpen(false);
                setType(type);
            }
        )
        return () => {
            handleOpen.remove;
            handleClose.remove;
        }
    }, []);

    if (!open) return null;
    return <CustomizedDialogs title={data.title} open={open} large={data.large}>{data.content}</CustomizedDialogs>
};

export default Modal;

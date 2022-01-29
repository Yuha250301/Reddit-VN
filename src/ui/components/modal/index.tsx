import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import EventEmitter from 'utils/event-emitter';
import ToolCus from '../common/tool-custom';
import { ModalType, ModalAction } from "./const"
import CustomizedDialogs from "./modal-ui";
import copyToClipBoard from "utils/copyToClipboard";


const saveIcon = require("assets/img/save_icon.svg").default;
const copyIcon = require("assets/img/copy_icon.svg").default;

interface ModalProps { }
interface ContentModal {
    title: string;
    large: boolean;
    content: JSX.Element | null;
}

const EMPTY_MODAL: ContentModal = {
    title: "",
    large: false,
    content: null,
};

const Modal: React.FC<ModalProps> = () => {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState<ModalType>();
    const [contentModal, setContentModal] = useState<ContentModal>(EMPTY_MODAL);
    const [copy, setCopy] = useState("COPY");
    const [dataReq, setDataReq] = useState("");

    const previewContent = "";

    const handleOpenModal = ({ type, data }: { type: ModalType; data?: any }) => {
        setOpen(true);
        setType(type);
        handleContentModal(type, data?.callback, data?.content);
    }

    const handleCloseModal = () => {
        setOpen(false);
        setType(type);
    };

    useEffect(() => {
        const handleOpen = EventEmitter.addListener(
            ModalAction.OPEN_MODAL,
            handleOpenModal
        );

        const handleClose = EventEmitter.addListener(
            ModalAction.CLOSE_MODAL,
            handleCloseModal
        )
        return () => {
            handleOpen.remove;
            handleClose.remove;
        }
    }, []);

    useEffect(() => {
        handleContentModal(ModalType.PREVIEW_MODAL);
    }, [copy])

    useEffect(() => {
        if (type)
            handleContentModal(type);
    }, [dataReq])

    const handleContentModal = (type: ModalType, callback?: Function, dynamicContent?: string) => {
        const handleConfirm = (e: any) => {
            if (e) e.preventDefault();
            if (callback) callback();
            handleCloseModal();
        };
        switch (type) {
            case ModalType.NOTE_MODAL:
                setContentModal({
                    title: "WANNA SAY SOMETHING?",
                    large: false,
                    content: (
                        <>
                            <textarea
                                placeholder="Vietnamese translation."
                                className="rounded"
                                rows={18}
                                style={{
                                    padding: 0,
                                    width: "98%",
                                    border: "16px solid #111111",
                                    backgroundColor: "#111111",
                                    color: "#fff",
                                    boxSizing: "border-box",
                                    outline: "none",
                                }}
                                value={dataReq}
                                onChange={(e) => setDataReq(e.target.value)}
                            />
                            <div className={clsx("d-flex", "justify-content-center", "mt-3")}>
                                <ToolCus
                                    icon={saveIcon}
                                    content="SAVE"
                                    bgColor="#E85B25"
                                    height="4.8vh"
                                    width="144px"
                                    onClick={() => {
                                        console.log(dataReq);
                                        handleCloseModal();
                                    }}
                                />
                            </div>
                        </>
                    ),
                });
                break;
            case ModalType.NAME_MODAL:
                setContentModal({
                    title: "TRANSLATED BY",
                    large: false,
                    content: (
                        <>
                            <textarea
                                placeholder="Vietnamese translation."
                                className="rounded"
                                rows={18}
                                style={{
                                    padding: 0,
                                    width: "98%",
                                    border: "16px solid #111111",
                                    backgroundColor: "#111111",
                                    color: "#fff",
                                    boxSizing: "border-box",
                                    outline: "none",
                                }}
                                value={dataReq}
                                onChange={(e) => setDataReq(e.target.value)}
                            />
                            <div className={clsx("d-flex", "justify-content-center", "mt-3")}>
                                <ToolCus
                                    icon={saveIcon}
                                    content="SAVE"
                                    bgColor="#E85B25"
                                    height="4.8vh"
                                    width="144px"
                                    onClick={() => {
                                        console.log(dataReq);
                                        handleCloseModal();
                                    }}
                                />
                            </div>
                        </>
                    ),
                });
                break;
            case ModalType.DELETE_MODAL:
                setContentModal({
                    title: "ARE YOU SURE TO DELETE THIS TRANSLATION?",
                    large: false,
                    content: (
                        <>
                            <div className={clsx("d-flex", "justify-content-center", "m-4")}>
                                <div className="me-5">
                                    <ToolCus
                                        content="YES"
                                        bgColor="#FFFFFF"
                                        height="4.8vh"
                                        width="144px"
                                        onClick={handleConfirm}
                                    />
                                </div>
                                <ToolCus
                                    content="NO"
                                    bgColor="#E85B25"
                                    height="4.8vh"
                                    width="144px"
                                    onClick={handleCloseModal}
                                />
                            </div>
                        </>
                    ),
                });
                break;
            case ModalType.PREVIEW_MODAL:
                setContentModal({
                    title: "PREVIEW YOUR POST",
                    large: true,
                    content: (
                        <>
                            <div
                                style={{
                                    padding: 0,
                                    height: "60vh",
                                    width: "100%",
                                    border: "16px solid #111111",
                                    borderRadius: "20px",
                                    backgroundColor: "#111111",
                                    color: "#fff",
                                    boxSizing: "border-box",
                                }}
                            >
                                {previewContent}
                            </div>
                            <div className={clsx("d-flex", "justify-content-center", "mt-3")}>
                                <ToolCus
                                    icon={copyIcon}
                                    content={copy}
                                    bgColor="#E85B25"
                                    height="4.8vh"
                                    width="144px"
                                    onClick={() => { copyToClipBoard(previewContent, setCopy); }}
                                />
                            </div>
                        </>
                    ),
                });
                break;
            case ModalType.ERROR_MODAL:
                setContentModal({
                    title: "⚠ OOPS! SOMETHING WENT WRONG.",
                    large: false,
                    content: (
                        <>
                            <h5 style={{ color: "#fff", textAlign: "center" }}>{dynamicContent ? dynamicContent : "I think we have some error but i can't be sure what that's?"}</h5>
                            <div className={clsx("d-flex", "justify-content-center", "mt-3")}>
                                <ToolCus
                                    content="SORRY"
                                    bgColor="#E85B25"
                                    height="4.8vh"
                                    width="144px"
                                    onClick={() => { copyToClipBoard(previewContent, setCopy); }}
                                />
                            </div>
                        </>
                    ),
                });
                break;
        }
    };

    if (!open) return null;
    return <CustomizedDialogs title={contentModal.title} open={open} setOpen={setOpen} large={contentModal.large}>{contentModal.content}</CustomizedDialogs>
};

export default Modal;

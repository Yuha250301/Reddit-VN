import React from "react";
import clsx from "clsx";
import { useRecoilState } from "recoil";

import noteAtom from "ui/state/note-atom";
import ToolCus from "../common/tool-custom";
import { ContentModalProps } from "./const";

const saveIcon = require("assets/img/save_icon.svg").default;

const NoteModal: React.FC<ContentModalProps> = ({ handleCloseModal }) => {
  const [note, setNote] = useRecoilState<string>(noteAtom);
  return (
    <>
      <textarea
        placeholder="Có gì muốn nhắn nhủ thì gửi ở đây nha"
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
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <div className={clsx("d-flex", "justify-content-center", "mt-3")}>
        <ToolCus
          icon={saveIcon}
          content="SAVE"
          bgColor="#E85B25"
          height="4.8vh"
          width="144px"
          onClick={handleCloseModal}
        />
      </div>
    </>
  );
};

export default NoteModal;

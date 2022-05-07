import {useEffect, useRef} from 'react';
import translate from "utils/translate-helper";

const getSelectionText = () => {
  let text = "";
  if (window.getSelection) {
    text = (window.getSelection() || "").toString();
  } else text = "Not support";
  return text;
};
const endSelect = (ref: HTMLElement) => {
  const sourceText = getSelectionText();
  if (sourceText === "") {
    if (ref) ref.style.opacity = "0";
  } else {
    if (ref)
      translate(sourceText)
        .then((result) => (ref.innerHTML = result.resultText))
        .catch((err) => {
          console.log(err);
          ref.innerHTML = "Có lỗi xảy ra trong quá trình translate";
        });
  }
};
const useTranslate = (popoverRef: any) => {
  const selectionEndTimeout = useRef<ReturnType<typeof setTimeout>>();
  const selecting = () => {
    // wait 500 ms after the last selection change event
    if (selectionEndTimeout.current) {
      clearTimeout(selectionEndTimeout.current);
    }
    selectionEndTimeout.current = setTimeout(() => {
      endSelect(popoverRef.current);
    }, 500);
  };
  useEffect(() => {
    document.addEventListener("selectionchange", selecting);
    return () => {
      document.removeEventListener("selectionchange", selecting);
    };
  }, []);
};

export default useTranslate;

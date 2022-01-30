export default function copyToClipBoard(
  previewContent: string,
  callback: (value: void) => void | PromiseLike<void>,
) {
  navigator.clipboard
    .writeText(previewContent)
    .then(callback)
    .catch(function (err: any) {
      console.log("CopyErr: Browser not supported", err);
      const el = document.createElement("input");
      el.innerText = previewContent;
      const oldContentEditable = el.contentEditable,
        oldReadOnly = el.readOnly,
        range = document.createRange();

      el.contentEditable = "true";
      el.readOnly = true;
      range.selectNodeContents(el);

      var s = window.getSelection();
      s?.removeAllRanges();
      s?.addRange(range);

      el.setSelectionRange(0, 999999); // A big number, to cover anything that could be inside the element.

      el.contentEditable = oldContentEditable;
      el.readOnly = oldReadOnly;

      document.execCommand("copy");
      callback();
    });
}

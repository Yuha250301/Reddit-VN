const parseContent = (content: string) => {
  let parser = new DOMParser();
  let dom = parser.parseFromString(
    "<!doctype html><body>" + content,
    "text/html",
  );
  let decodedString = dom.body.textContent;
  return decodedString;
};

export default parseContent;

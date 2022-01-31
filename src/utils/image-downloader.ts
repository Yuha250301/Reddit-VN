const get = async (
  url: string,
  type: "json" | "arraybuffer" = "json",
  additionHeader?: any,
) => {
  {
    const request: RequestInit = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      ...(!!additionHeader && additionHeader),
    };
    const fetchResult = await fetch(url, request);
    const result = await (type === "json"
      ? fetchResult.json()
      : fetchResult.arrayBuffer());

    if (fetchResult.ok) {
      return result;
    }

    const responseError = {
      type: "Error",
      message: "Something went wrong",
    };

    let error = new Error();
    error = { ...error, ...responseError };
    throw error;
  }
};

const getFileNameWithExtension = (url: string) => {
  const regex = /[^/\\&\?]+\.\w{3,4}(?=[\?&].*$|$)/;
  const m = regex.exec(url);
  if (m && m.length) return m[0];
  else return (Math.random() + 1).toString(36).substring(7);
};

const getFileExtension = (url: string) => {
  const fileNameWithExt = getFileNameWithExtension(url);

  return fileNameWithExt.substring(fileNameWithExt.lastIndexOf("."));
};

const isHost = (url: string) => {
  return (
    url.indexOf(".jpg") !== -1 ||
    url.indexOf(".png") !== -1 ||
    url.indexOf(".gif") !== -1 ||
    url.indexOf(".gifv") !== -1
  );
};
const saveAs = (data: any, name: string) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", name); //or any other extension
  document.body.appendChild(link);
  link.click();
};
const downloadImg = async (url: string, id: string) => {
  if (isHost(url)) {
    const response = await get(
      "https://young-moon-cab4.tnah-work.workers.dev/?" + url,
      "arraybuffer",
      {
        Accept: "application/image/*",
      },
    );
    saveAs(response, "RVN-" + id + getFileExtension(url));
  } else if (
    url.startsWith("http://imgur.com/a/") ||
    url.startsWith("https://imgur.com/a/")
  ) {
    const albumID = url.substring(url.lastIndexOf("/") + 1);
    const response = await get(
      "https://api.imgur.com/3/album/" + albumID,
      "json",
      {
        authorization: "Client-ID 0d6763dedc73059",
      },
    );
    const { default: JSZip } = await import("jszip");
    const zip = new JSZip();
    const queue = response.data.data.images.map((image: any) => {
      return get(
        "https://young-moon-cab4.tnah-work.workers.dev/?" + image.link,
        "arraybuffer",
      )
        .then((response) => {
          zip.file(image.id + getFileExtension(url), response, {
            base64: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
    await Promise.all(queue);
    let data = await zip.generateAsync({ type: "uint8array" });
    saveAs(data, "RVN-" + albumID + ".zip");
  } else if (
    url.startsWith("http://imgur.com/") ||
    url.startsWith("https://imgur.com/")
  ) {
    const imageID = url.substring(url.lastIndexOf("/") + 1);
    const response = await get(
      "https://api.imgur.com/3/image/" + imageID,
      "arraybuffer",
      {
        authorization: "Client-ID 0d6763dedc73059",
      },
    );
    saveAs(response, "RVN-" + id + getFileExtension(url));
  }
};
export default downloadImg;

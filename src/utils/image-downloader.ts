import axios from "axios";
import JSZip from "jszip";

const getFileNameWithExtension = (url: string) => {
  const regex = /[^/\\&\?]+\.\w{3,4}(?=[\?&].*$|$)/;
  const m = regex.exec(url);
  if(m && m.length) return m[0];
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
    const response = await axios.get(
      "https://young-moon-cab4.tnah-work.workers.dev/?" + url,
      {
        responseType: "arraybuffer",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/image/*",
        },
      },
    );
    saveAs(response.data, "RVN-" + id + getFileExtension(url));
  } else if (
    url.startsWith("http://imgur.com/a/") ||
    url.startsWith("https://imgur.com/a/")
  ) {
    const albumID = url.substring(url.lastIndexOf("/") + 1);
    const response = await axios.get(
      "https://api.imgur.com/3/album/" + albumID,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: "Client-ID 0d6763dedc73059",
        },
      },
    );
    const zip = new JSZip();
    const queue = response.data.data.images.map((image: any) => {
      return axios
        .get("https://young-moon-cab4.tnah-work.workers.dev/?" + image.link, {
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          zip.file(image.id + getFileExtension(url), response.data, {
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
    const response = await axios.get(
      "https://api.imgur.com/3/image/" + imageID,
      {
        responseType: "arraybuffer",
        headers: {
          "Content-Type": "application/json",
          authorization: "Client-ID 0d6763dedc73059",
        },
      },
    );
    saveAs(response.data, "RVN-" + id + getFileExtension(url));
  }
};
export default downloadImg;

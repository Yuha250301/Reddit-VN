export function getPathFromUrl(url: string) {
  return url.split(/[?#]/)[0];
}


export const parseUrlLink = (url: string) => {
  if (!url) return "";
  const regex = /(?:^.+?)(?:reddit.com\/r)(?:\/[\w\d]+){2}(?:\/)([\w\d]*)/g;
  const match = regex.exec(url);
  if (match && match.length > 1) return match[1];
  else return "";
};

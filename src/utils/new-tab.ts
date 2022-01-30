export const openInNewTab = (url: string) => {
  const newWindow = window.open(url, "_blank");
  if (newWindow) newWindow.focus();
};

//@ts-ignore
import Worker from "worker-loader!../worker/fetcher";
import { PostData } from "data/post-manager";

const parseInfo = (postInfo: any) => {
  return {
    subReddit: postInfo.subreddit_name_prefixed,
    shortenLink: "https://redd.it/" + postInfo.id,
    title: postInfo.title,
    text: postInfo.selftext_html,
    author: postInfo.author,
    id: postInfo.id,
    url: postInfo.url,
    link: "https://www.reddit.com" + postInfo.permalink,
  };
};

const worker = new Worker();
let crawlListeners: any = {};
let id = 1;
worker.addEventListener("message", (event: any) => {
  switch (event.data.cmd) {
    case "crawl-result":
      crawlListeners[event.data.id](JSON.parse(event.data.data));
      delete crawlListeners[event.data.id];
      break;
    default:
      break;
  }
});
//Hàm thu thập thông tin của 1 post trả về comment (root) và info của post đó
const crawler = async (url: string, isFull: boolean = true) => {
  worker.postMessage({
    cmd: "crawl",
    id,
    data: JSON.stringify({ url, isFull }),
  });
  const result = await new Promise<PostData>((resolve) => {
    crawlListeners[id] = resolve;
    id++;
  });
  return result;
};

const parsePopularPost = (response: any) => {
  if (response?.data?.children) {
    let allPost = response.data.children.map((post: any) => {
      return parseInfo(post.data);
    });
    return allPost;
  } else return null;
};

export { crawler, parsePopularPost };

if ("function" === typeof importScripts) {
  if (typeof idb === "undefined")
    self.importScripts("https://cdn.jsdelivr.net/npm/idb@7/build/umd.js");
  class PostParser {
    standardlizeUrl = (url) => {
      url = url.trim().replace(/(\/+)$/, "");
      const regex = new RegExp("(?!www)redd.it/[^s]{2,}");
      const wwwRegex = new RegExp("https?://reddit.[^s]{2,}");
      if (wwwRegex.test(url)) url = url.replace(/reddit/, "www.reddit");
      if (regex.test(url)) {
        url = url.replace(/redd.it/, "www.reddit.com");
      }
      return url + ".json";
    };
    parseUrlLink = (url) => {
      if (!url) return "";
      const regex = /(?:^.+?)(?:reddit.com\/r)(?:\/[\w\d]+){2}(?:\/)([\w\d]*)/g;
      const match = regex.exec(url);
      if (match && match.length > 1) return match[1];
      else return "";
    };
    //Get award, max 3 award: platium -> gold -> silver -> another awards
    getAward = (data) => {
      let count = 0;
      let result = data.all_awardings.reduce((award, item) => {
        if (
          item.name === "Platinum" ||
          item.name === "Gold" ||
          item.name === "Silver"
        ) {
          count++;
          const plural = item.count > 1 ? "s" : "";
          return (award =
            award + `x${item.count} ${item.name.toLowerCase()}${plural} - `);
        } else return award;
      }, "");
      if (count < 3) {
        return data.all_awardings
          .reduce((award, item) => {
            if (
              item.name !== "Platinum" &&
              item.name !== "Gold" &&
              item.name !== "Silver" &&
              count < 3
            ) {
              count++;
              return (award =
                award +
                `x${item.count} ${
                  item.name === "Press F"
                    ? "press F"
                    : item.name.toLowerCase().replace(/\(pro\)/, "pro")
                } - `);
            } else return award;
          }, result)
          .replace(/(\ \-\ )$/, "");
      } else return result.replace(/(\ \-\ )$/, "");
    };
    //Parse upvote: 11600 -> 11.6k
    upvoteParse = (upvotes) => {
      if (upvotes > 1000) {
        let first = Math.floor(upvotes / 1000);
        let second = Math.floor((upvotes - first * 1000) / 100);
        return first + "." + second + "k" + " points";
      } else
        return upvotes > 1 || upvotes < -1
          ? `${upvotes} points`
          : `${upvotes} point`;
    };
    //Get a post info except its comments
    parseInfo = (postInfo) => {
      const mediaData = postInfo.media ? postInfo.media.reddit_video : null;
      function getAllWords(text) {
        const allWordsIncludingDups = text.split("");
        const wordSet = allWordsIncludingDups.reduce(function (prev, current) {
          prev[current] = true;
          return prev;
        }, {});
        return Object.keys(wordSet);
      }
      const author = postInfo.author;
      const indexed_author = getAllWords(author);
      return {
        subReddit: postInfo.subreddit_name_prefixed,
        shortenLink: "https://redd.it/" + postInfo.id,
        title: postInfo.title,
        text: postInfo.selftext,
        awards: this.getAward(postInfo),
        num_comments: postInfo.num_comments,
        author,
        indexed_author,
        upvotes: this.upvoteParse(parseInt(postInfo.ups)),
        id: postInfo.id,
        fallbackUrl: mediaData ? mediaData.fallback_url.split("?")[0] : "",
        url: postInfo.url,
        isVideo: postInfo.is_video,
        isImage:
          postInfo.post_hint === "image" || postInfo.domain === "imgur.com",
        link: "https://www.reddit.com" + postInfo.permalink,
      };
    };
    //Get a comment info
    parseComment = (commentInfo, prefix) => {
      if (commentInfo.data.author) {
        function getAllWords(text) {
          const allWordsIncludingDups = text.split("");
          const wordSet = allWordsIncludingDups.reduce(function (
            prev,
            current,
          ) {
            prev[current] = true;
            return prev;
          },
          {});
          return Object.keys(wordSet);
        }
        const author = "u/" + commentInfo.data.author;
        const indexed_author = getAllWords(author);
        commentInfo.data.prefix = prefix;
        commentInfo.data.upvotes = this.upvoteParse(
          parseInt(commentInfo.data.ups),
        );
        commentInfo.data.awards = commentInfo.data.all_awardings
          ? this.getAward(commentInfo.data)
          : "";
        return commentInfo.data;
      } else return null;
    };
  }

  class Fetcher {
    constructor(url, isFull, callback) {
      this.isFull = isFull;
      this.dbName = "reddit-post";
      this.helper = new PostParser();
      this.url = this.helper.standardlizeUrl(url);
      this.isDataExist = false;
      this.maxBatch = 5;
      this.callback = callback;
      this.moreChild = [];
      this.db = null;
    }
    async createObjectStore(storeName) {
      const database = await idb.openDB(this.dbName);
      const version = parseInt(database.version);
      const storeNames = database.objectStoreNames;
      await database.close();
      if (!storeNames.contains(storeName)) {
        //need add storeName
        this.db = await idb.openDB(this.dbName, version + 1, {
          upgrade(db) {
            // Create a store of objects
            const store = db.createObjectStore(storeName, {
              keyPath: "id",
            });
            store.createIndex("by_indexed_author", "indexed_author", {
              unique: false,
              multiEntry: true,
            });
            store.createIndex("by_author", "author", { unique: false });
          },
        });
      } else {
        this.isDataExist = true;
        console.log("Post already fetched");
      }
    }
    status = (response) => {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    };
    json = (response) => {
      return response.json();
    };
    parsePost = async (json) => {
      const postInfo = json[0].data.children[0].data;
      const bodyRoot = this.helper.parseInfo(postInfo);
      this.root = bodyRoot;
      this.root.rootComments = [];
      try {
        if (!this.isDataExist) await this.db.put(this.id, bodyRoot);
        await this.getCommentsFromJSON(json);
      } catch (err) {
        console.log("open error in parse post", err);
      }
    };
    fetchUrl = (url, isOK, json, parsePost, callback) => {
      return fetch(url)
        .then(isOK)
        .then(json)
        .then(parsePost)
        .then(callback)
        .catch(function (error) {
          console.log("request failed", error.message);
        });
    };
    fetch = async (more, location, prefix, callback) => {
      callback = callback || null;
      try {
        if (!more) {
          this.id = this.helper.parseUrlLink(this.url);
          if (!this.db) await this.createObjectStore(this.id);
          await this.fetchUrl(
            this.url,
            this.status,
            this.json,
            this.parsePost,
            callback,
          );
        } else if (this.isFull) {
          let listPromises = [];
          let i = 0;
          const domain = "https://www.reddit.com";
          while (i < this.moreChild.length) {
            const url = domain + location + this.moreChild[i] + ".json";
            if (listPromises.length < this.maxBatch) {
              listPromises.push(
                this.fetchUrl(
                  url,
                  this.status,
                  this.json,
                  (json) => this.getCommentsFromJSON(json, prefix),
                  callback,
                ),
              );
            } else if (listPromises.length == this.maxBatch) {
              await Promise.all(listPromises);
              listPromises = [];
            }
            i++;
          }
        }
      } catch (e) {
        throw e;
      }
    };
    getCommentsFromJSON = async (json, prefix = "") => {
      if (json[1].data.children[0]) {
        this.location = json[1].data.children[0].data.permalink;
        this.location = this.location.replace(
          "/" + json[1].data.children[0].data.id,
          "",
        );
      }
      return await this.getCommentsFromArray(json[1].data.children, prefix);
    };
    //Recursively go through the object tree and compile all the comments
    getCommentsFromArray = async (arr, prefix) => {
      let listMoreFetchPromise = [];
      await Promise.all(
        arr.map(async (item) => {
          if (item.kind == "more") {
            this.moreChild = item.data.children;
            listMoreFetchPromise.push(this.fetch(true, this.location, prefix));
          } else if (typeof item !== "undefined") {
            const data = this.helper.parseComment(item, prefix);
            if (data) {
              if (!this.isDataExist) await this.db.put(this.id, data);
              this.root.rootComments.push({
                id: data.id,
                user: data.author,
                reward:
                  (data.upvotes || "") +
                  (data.upvotes && data.awards ? " | " : "") +
                  (data.awards || ""),
              });
              if (
                typeof item.data.replies !== "undefined" &&
                item.data.replies !== ""
              ) {
                this.getCommentsFromArray(
                  item.data.replies.data.children,
                  prefix + ">",
                );
              }
            }
          }
        }),
      );
      await Promise.all(listMoreFetchPromise);
    };
  }
  self.addEventListener(
    "message",
    (event) => {
      switch (event.data.cmd) {
        case "crawl": {
          const { url, isFull } = JSON.parse(event.data.data);
          const fetcher = new Fetcher(url, isFull, () => {
            console.log("Done fetch");
          });
          fetcher
            .fetch()
            .then(async () => {
              self.postMessage({
                cmd: "crawl-result",
                data: JSON.stringify(fetcher.root),
                id: event.data.id,
              });
            })
            .catch((e) => console.log(e));
          break;
        }
      }
    },
    false,
  );
}

let urls = Array.from({ length: 10 }, (v, k) => k);
let maxConnect = 5;
let fetch = (url) => {
  return new Promise((resolve) => {
    setTimeout(resolve(url), 1000);
  });
};

let callback = () => {
  console.log("运行完了");
};

let sendRequest = (urls, maxConnect, callback) => {
  let pending_count = 0;
  let ids = 0;
  let _fetch = async (url) => {
    if (!url) return false;
    pending_count += 1;
    console.log("start 并发数：" + pending_count);
    await fetch(url);
    pending_count -= 1;
    console.log("done 并发数：" + pending_count);
    _fetch(urls[ids++]);
    if (!pending_count) {
      callback();
    }
  };
  if (pending_count < maxConnect) {
    _fetch(urls[ids++]);
  }
};
sendRequest(urls, maxConnect, callback);

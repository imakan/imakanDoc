let { URL, URLSearchParams } = require("url");
const myURL = new URL("https://example.org/?abc=123&as=121&abc=22332");
const params = new URLSearchParams("foo=bar&foo=baz");
// console.log(myURL.searchParams.getAll('abcds'));
for (const name of params.keys()) {
  console.log(name);
}

const { createServer } = require("http2");
try {
  const server = createServer().listen(0, function() {
    throw 1;
  });
  server.on("error", () => {
    console.log(2);
  });
  server.on("listening", () => {
    console.log(3);
  });
  server.on("close", () => {
    console.log(4);
  });
} catch (e) {
  console.log(e);
}

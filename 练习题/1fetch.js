(function() {
  interface FetchOptions {
    url: string;
    data?: {
      [key: string]: any
    };
  }
  function fetch(option: FetchOptions) {}

  let moduleName = fetch;
  if (typeof exports == "object") {
    module.exports = moduleName;
  } else if (typeof defined === "function" && define.amd) {
    define(function() {
      return {
        FetchOptions,
        moduleName
      };
    });
  } else {
    this.moduleName = moduleName;
  }
});


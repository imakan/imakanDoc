var restoreIpAddresses = function (s) {
  const ans = [];
  const choices = [];
  const l = s.length;

  // 辅助函数
  function parseIP() {
    const IP = choices.join("");
    if (IP.split(".").every((e) => parseInt(e) < 256)) ans.push(IP);
  }

  function backtrack(i = 0, pointCount = 0, last = -1, sliceLength = 0) {
    // 递归终止，尝试添加有效 IP
    if (pointCount === 3 && i === l) parseIP();
    // 越界直接返回，或许可以不需要，但放在这里更安全
    else if (pointCount > 3 || i > l) return;
    // 回溯：递归 + 回退前清理现场
    else {
      // 一共两种可能
      const canPushNumber =
        (sliceLength > 0 &&
          sliceLength < 3 &&
          choices[last + 1 - sliceLength] != "0") ||
        sliceLength === 0;
      const canPushPoint = sliceLength > 0 && sliceLength <= 3;

      // 分别对两种可能进行操作
      if (canPushNumber) {
        choices[last + 1] = s[i];
        backtrack(i + 1, pointCount, last + 1, sliceLength + 1);
      }
      if (canPushPoint) {
        choices[last + 1] = ".";
        backtrack(i, pointCount + 1, last + 1, 0);
      }
      // 回退之前清理现场
      choices.length = last + 1;
    }
  }

  backtrack();
  return ans;
};

console.log(restoreIpAddresses("25525511135"));

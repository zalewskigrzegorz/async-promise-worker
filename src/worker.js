export default () => {
  const emulateLongReq = async (time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(performance.now());
      }, time);
    });
  };

  // eslint-disable-next-line no-restricted-globals
  self.addEventListener(
    "message",
    async function (e) {
      const data = e.data;
      switch (data.cmd) {
        case "start":
          const start = performance.now();
          emulateLongReq(data.delay).then((results) => {
            // eslint-disable-next-line no-restricted-globals
            self.postMessage(results - start);
          });
          break;
        default:
          // eslint-disable-next-line no-restricted-globals
          self.postMessage("Unknown command: " + data.msg);
      }
    },
    false
  );
};

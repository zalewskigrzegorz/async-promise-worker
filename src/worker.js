export default () => {
  const emulateLongReq = async (time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(performance.now());
      }, time);
    });
  };
  const heavyLoad = async (number) => {
    return new Promise((resolve) => {
      let result = 0;
      for (let i = Math.pow(number, 3); i >= 0; i--) {
        result += Math.atan(i) * Math.tan(i);
      }
      resolve(performance.now());

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
          if (data.heavy) {
            heavyLoad(data.delay).then((results) => {
              // eslint-disable-next-line no-restricted-globals
              self.postMessage(results - start);
            });
          } else {
            emulateLongReq(data.delay).then((results) => {
              // eslint-disable-next-line no-restricted-globals
              self.postMessage(results - start);
            });
          }

          break;
        default:
          // eslint-disable-next-line no-restricted-globals
          self.postMessage("Unknown command: " + data.msg);
      }
    },
    false
  );
};

export default async (number) => {
  return new Promise((resolve) => {
    let result = 0;
    for (let i = Math.pow(number, 3); i >= 0; i--) {
      result += Math.atan(i) * Math.tan(i);
    }
    resolve(performance.now());

  });
};

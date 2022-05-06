export default async (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(performance.now());
    }, time);
  });
};

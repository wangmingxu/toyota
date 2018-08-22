export const delay = time => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, time);
});

const promisify = (func, opt) => new Promise((resolve, reject) => {
  func({
    ...(opt || {}),
    success(res) {
      resolve(res);
    },
    fail(err) {
      reject(err);
    },
  });
});

export default promisify;

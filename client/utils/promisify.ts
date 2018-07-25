export const sleep = time =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });

const promisify = func =>
  new Promise((resolve, reject) => {
    func({
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
    });
  });

export default promisify;

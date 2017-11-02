function succ(data, msg = 'ok', status = 0) {
  return {
    status, data, msg,
  };
}

function fail(data, msg = 'error', status = 1) {
  return {
    status, data, msg,
  };
}

module.exports = {
  '/mocksucc': (req, res) => {
    res.json(succ({
      id: 10086,
      name: 'Hello World',
    }));
  },
  '/mockfail': (req, res) => {
    res.json(fail({
      id: 957,
      name: 'Hello World',
    }));
  },
};

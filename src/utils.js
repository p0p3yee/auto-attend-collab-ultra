module.exports = {
  doWait: s => new Promise(resolve => setTimeout(resolve, 1000 * s))
};

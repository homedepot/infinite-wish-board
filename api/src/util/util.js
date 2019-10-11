const util = {};

util.sleep = (duration = 1234) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, duration);
  });
}

/**
 * this is really only used for testing
 */
util.retry = async (action, retries = 10, delay = 1234) => {
  let count = 0
  while(true) {
    try {
      return action()
    } catch (error) {
      count = count + 1
      if (count > retries) {
        throw error
      } else {
        await util.sleep(delay)        
      }
    }
  }
}



module.exports = util;
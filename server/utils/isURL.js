const isURL = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }
  
  module.exports = {
    isURL
  };
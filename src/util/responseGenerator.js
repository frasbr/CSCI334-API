// @param - status:   a number referring to a particular http response code
// @param - data: a js object containing any information that should be sent back to the user
module.exports = (status, data) => {
  return {
    status,
    data
  };
};

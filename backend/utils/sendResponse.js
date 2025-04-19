const sendResponse = function (res, status, data) {
  return res.status(status).json({ status: 'success', data: data });
};
module.exports = sendResponse;

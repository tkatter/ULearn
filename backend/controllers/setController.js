exports.getAllSets = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    // results: doc.length,
    data: {
      message: 'hello from the server',
    },
  });
};

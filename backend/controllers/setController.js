const Set = require('../models/setModel');

exports.getAllSets = async (req, res, next) => {
  try {
    const sets = await Set.find();

    res.status(200).json({
      status: 'success',
      results: sets.length,
      data: {
        sets,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getSet = async (req, res, next) => {
  try {
    const id = req.params.setId;
    const set = await Set.find({ _id: id }).populate('notes');

    res.status(200).json({
      status: 'success',
      data: {
        set,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.createSet = async (req, res, next) => {
  try {
    const newSet = await Set.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        set: newSet,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

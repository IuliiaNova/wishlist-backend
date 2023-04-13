const { v4: uuidv4 } = require('uuid');
const Wish = require("../models/Wish");

const addWish = async (req, res) => {
  const { wish } = req.body;
  const wishId = uuidv4();

  try {
    const wishToAdd = new Wish({
      wish,
      wishId,
    });

    await wishToAdd.save();

    return res.status(200).json({
      ok: true,
      todo: wishToAdd,
    });
  } catch (error) {
    return res.status(503).json({
      ok: false,
      msg: "Ooops, something happened...",
    });
  }
};

const getWishes = async (req, res) => {
  try {
    const wishes = await Wish.find();

    return res.status(200).json({ ok: true, wishes });
  } catch (error) {
    return res.status(503).json({ ok: false, msg: "Ooops, something happened..." });
  }
};

const deleteWish = async (req, res) => {
  const { id } = req.params;

  try {
    const found = await Wish.deleteOne({ wishId: id });

    return res.status(200).json({
      ok: true,
      msg: "The wish was deleted",
    });
  } catch (error) {
    res.status(503).json({ ok: false, msg: "Ooops, something happened..." });
  }
};

const updateWish = async (req, res) => {
  const { wishId, wish } = req.body;

  try {
    await Wish.findOneAndUpdate({
      wishId: wishId,
      wish: wish,
    });
    return res.status(200).json({
      ok: true,
      msg: "The wish was updated",
    });
  } catch (error) {
    res.status(503).json({ ok: false, msg: "Ooops, something happened..." });
  }
};

module.exports = { addWish, getWishes, deleteWish, updateWish };
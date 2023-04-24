const Wish = require("../models/wish.model");
const UserModel = require('../models/user.model')

/*const addWish = async (req, res) => {
  const { wishTitle, state } = req.body;
  const { id } = req.params

  if(!wishTitle) return res.status(400).send({ msg: 'Please put your task' })
  if(!id) return res.status(400).send({ msg: 'UsrID needed' })

  try {
    const user = await UserModel.findById(id);

    const wishToAdd = await Wish.create({
      wishTitle: wishTitle,
      state: "Active"
    })

    user.wishes.push(wishToAdd._id);
    user.save();
    res.status(201).send({ data: wishToAdd})

  } catch (error) {
    return res.status(503).send({ message: error.message});
  }
};*/


const addWish = async (req, res) => {
  const { wishTitle, state } = req.body;
  const { id } = req.params

  if(!wishTitle) return res.status(400).send({ msg: 'Please put your task' })
  if(!id) return res.status(400).send({ msg: 'UsrID needed' })

  try {
    const user = await UserModel.findById(id)
    const wishToAdd = new Wish();

    wishToAdd.wishTitle = wishTitle;
    wishToAdd.state = "Active"

    const response =  await wishToAdd.save();
    console.log(response)

    return res.status(200).json({
      ok: true,
      wish: wishToAdd,
    });
  } catch (error) {
    return res.status(503).json({
      ok: false,
      msg: "Ooops, something happened...",
      error
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

/*const getWishes = async (req, res) => {
  const {id } = req.params
  try {
    const wishes = await UserModel.findById(id).populate('wish')

    res.status(200).send({ data: wishes});
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
};*/

const deleteWish = async (req, res) => {
  const { id } = req.params;

  try {
    const found = await Wish.deleteOne({ _id: id });

    return res.status(200).json({
      ok: true,
      msg: "The wish was deleted",
    });
  } catch (error) {
    res.status(503).json({ ok: false, msg: "Ooops, something happened..." });
  }
};

const updateWish = async (req, res) => {
  const { wishId, wishTitle, state } = req.body;
  
  try {
    await Wish.findOneAndUpdate({
      wishId: wishId,
      wishTitle: wishTitle,
      state: state
    });
    return res.status(200).json({
      ok: true,
      msg: "The wish was updated",
    });
  } catch (error) {
    res.status(503).json({ ok: false, msg: "Ooops, something happened..." });
  }
};

const updateWishState = async (req, res) => {
  const { wishId, wishTitle, state } = req.body;

  try {
    await Wish.findOneAndUpdate({
      wishId: wishId,
      wishTitle: wishTitle,
      state: state
    });
    return res.status(200).json({
      ok: true,
      msg: "The wishstate was updated",
    });
  } catch (error) {
    res.status(503).json({ ok: false, msg: "Ooops, something happened..." });
  }
};

module.exports = { addWish, getWishes, deleteWish, updateWish, updateWishState };
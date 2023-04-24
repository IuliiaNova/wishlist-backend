const mongoose = require("mongoose");
const Wish = require("../models/wish.model");
const User = require('../models/user.model');


const addWish = async (req, res) => {
  const { wish, userID } = req.body;

  if (!wish || !userID) {
    return res.status(503).json({
      ok: false,
      msg: 'Please put your task'
    })
  }

  try {
    const newWish = new Wish({
      wishTitle: wish,
      state: "Active",
      key: userID,
    });

    const user = await User.findByIdAndUpdate(
      { _id: userID },
      { $push: { wishes: newWish } },
      { new: true }
    );

    if (!user) {
      return res.status(503).json({
        ok: false,
        msg: 'Ooops something happend',
      });
    }

    await newWish.save();

    const userResp = await user.populate("wishes");

    return res.status(201).json({
      ok: true,
      user: userResp,
    });
  } catch (error) {
    return res.status(503).json({
      ok: false,
      msg: "Ooops, something happened...",
      error
    });
  };
}



const deleteWish = async (req, res) => {
  const { wish, userID } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction()

  try {
    await Wish.findByIdAndDelete(wish._id ).session(session); 
    const user = await User.findById(userID).session(session); 

    if(!user){
      await session.abortTransaction();
      session.endSession();
      return res.status(503).json({
        ok: false,
        msg: "User not found",
      });
    }

    user.wishes.pull(wish._id);
    await user.save();

    await session.commitTransaction();
    session.endSession();
    const updateUser = await user.populate("wishes");

    return res.status(200).json({
      ok: true,
      user: updateUser,
    });
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
    session.endSession();
    return res.status(503).json({ 
      ok: false, 
      msg: "Ooops, something happened..." });
  }
};



const updateWish = async (req, res) => {
  const { wishId, wishTitle, userID } = req.body;

  try {
    await Wish.findByIdAndUpdate({
      wishId,
      wishTitle: wishTitle,
      new: true,
    });
    const user = await User.findById(userID).populate("wishes");
    return res.status(200).json({
      ok: true,
      user
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({ 
      ok: false, 
      msg: "Ooops, something happened..." });
  }
};



const updateWishState = async (req, res) => {
  const { wish, state, userID } = req.body;

  try {
    await Wish.findOneAndUpdate(
      { _id: wish._id},
      { state: state},
      { new: true}
    );

    const user = await User.findOne({ _id: userID }).populate("wishes");
    return res.status(200).json({
      ok: true,
      user
    });
  } catch (error) {
    return res.status(503).json({ 
      ok: false, 
      msg: "Ooops, something happened...",
     });
    }
  }


module.exports = {
  addWish,
  deleteWish,
  updateWish,
  updateWishState
};
const User = require('../models/user.model');
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const createJWT = require("../helper/createJWT");


const createUser = async (req, res) => {
  const { user } = req.body;
  const { name, email, password } = user;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "User already exists, use your email to Log in"
      })
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      userID: uuidv4(),
      wishes: [],
    });

    await newUser.save();

    const { userID, wishes, _id } = newUser;
    const token = await createJWT(_id);
    return res.status(200).json({
      ok: true,
      user: { name, email, password, userID, wishes, _id, token }
    });

  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      msg: "Ooops, something wrong"
    })
  }
}



const createUserGoogle = async (req, res) => {
  const { user } = req.body;
  const { name, email } = user;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "User already exists, use your email to Log in"
      })
    }

    const newUser = new User({
      name,
      email,
      userID: uuidv4(),
      wishes: [],
    });

    await newUser.save();

    const { userID, wishes, _id } = newUser;
    const token = await createJWT(_id);
    return res.status(200).json({
      ok: true,
      user: { name, email, password, userID, wishes, _id, token }
    });

  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      msg: "Ooops, something wrong"
    })
  }
}



const loginUser = async (req, res) => {
  const { email: loginEmail, password } = req.body.user;

  try {
    const user = await User.findOne({ email: loginEmail }).populate("wishes");

    if (!user) {
      return res.status(503).json({
        ok: false,
        msg: "User and password don't match",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(503).json({
        ok: false,
        msg: "User and password don't match",
      });
    }

    const token = await createJWT(user._id);
    const { name, email, userID, wishes, _id } = user;

    return res.status(200).json({
      ok: true,
      user: { name, email, userID, wishes, _id, token }
    });

  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      msg: "Ooops, something wrong"
    })
  }
}



const loginUserGoogle = async (req, res) => {
  const loginEmail = req.body.user;

  try {
    const user = await User.findOne({ email: loginEmail }).populate("wishes");

    if (!user) {
      return res.status(503).json({
        ok: false,
        msg: "User and password don't match",
      });
    }

    const { name, email, wishes, _id } = user;
    const token = await createJWT(user._id);

    return res.status(200).json({
      ok: true,
      user: { name, email, wishes, _id, token }
    });

  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      msg: "Ooops, something wrong"
    })
  }
}

module.exports = {
  createUser,
  loginUser,
  createUserGoogle,
  loginUserGoogle
}
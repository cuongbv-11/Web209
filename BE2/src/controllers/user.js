import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function signup(req, res) {
  const data = req.body;
  const userExist = await User.findOne({ email: data.email });

  if (userExist) {
    return res.json({
      message: `Đã tồn tại email ${data.email}`,
    });
  }
  const passwordHashed = await bcryptjs.hash(data.password, 10);
  data.password = passwordHashed;
  User.create(data)
    .then((newData) => {
      res.json(newData);
    })
    .catch((err) => {
      res.json({ message: err });
    });
}

export async function signin(req, res) {
  try {
    const data = req.body;
    const userExist = await User.findOne({ email: data.email });

    if (!userExist) {
      return res.json({ message: "Sai tài khoản" });
    }

    const isCheck = await bcryptjs.compare(data.password, userExist.password);

    if (!isCheck) {
      return res.json({ message: "Sai mật khẩu" });
    }
    userExist.password = undefined;
    const token = await jwt.sign(
      { email: userExist.name, id: userExist._id },
      process.env.KEY_SECRET,
      { expiresIn: "1h" }
    );
    res.json({
      message: "Đăng nhập thành công",
      userExist,
      token,
    });
  } catch (error) {
    res.json(error);
  }
}

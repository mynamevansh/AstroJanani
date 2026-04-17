const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");
const { JWT_EXPIRES_IN } = require("../config/constants");

async function register(req, res, next) {
  try {
    const { name, email, password, zodiacSign, dob } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        zodiacSign,
        dob: dob ? new Date(dob) : null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        zodiacSign: true,
        dob: true,
        createdAt: true,
      },
    });

    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.status(200).json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          zodiacSign: user.zodiacSign,
          dob: user.dob,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  register,
  login,
};

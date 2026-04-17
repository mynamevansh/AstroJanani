const { z } = require("zod");
const { ZODIAC_SIGNS } = require("../config/constants");

const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email format").transform((email) => email.toLowerCase()),
  password: z.string().min(8, "Password must be at least 8 characters"),
  zodiacSign: z.enum(ZODIAC_SIGNS),
  dob: z.iso.date().optional(),
});

const loginSchema = z.object({
  email: z.email("Invalid email format").transform((email) => email.toLowerCase()),
  password: z.string().min(1, "Password is required"),
});

module.exports = {
  registerSchema,
  loginSchema,
};

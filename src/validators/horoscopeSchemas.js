const { z } = require("zod");
const { ZODIAC_SIGNS } = require("../config/constants");

const todayHoroscopeQuerySchema = z.object({
  zodiac: z.enum(ZODIAC_SIGNS),
});

const createHoroscopeSchema = z.object({
  zodiacSign: z.enum(ZODIAC_SIGNS),
  date: z.iso.date(),
  shortText: z.string().trim().min(1, "shortText is required"),
  fullText: z.string().trim().min(1, "fullText is required"),
  luckyNumber: z.number().int().min(1).max(99),
  luckyColor: z.string().trim().min(1, "luckyColor is required"),
});

module.exports = {
  todayHoroscopeQuerySchema,
  createHoroscopeSchema,
};

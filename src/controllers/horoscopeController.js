const prisma = require("../config/prisma");

function startOfUTCDate(date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

async function getTodayHoroscope(req, res, next) {
  try {
    const { zodiac } = req.query;
    const todayUtc = startOfUTCDate(new Date());

    const horoscope = await prisma.horoscope.findUnique({
      where: {
        zodiacSign_date: {
          zodiacSign: zodiac,
          date: todayUtc,
        },
      },
    });

    if (!horoscope) {
      return res.status(404).json({
        success: false,
        message: "Today's horoscope not found for this zodiac sign",
      });
    }

    return res.status(200).json({
      success: true,
      data: horoscope,
    });
  } catch (error) {
    return next(error);
  }
}

async function createHoroscope(req, res, next) {
  try {
    const { zodiacSign, date, shortText, fullText, luckyNumber, luckyColor } = req.body;
    const utcDate = startOfUTCDate(new Date(date));

    const horoscope = await prisma.horoscope.upsert({
      where: {
        zodiacSign_date: {
          zodiacSign,
          date: utcDate,
        },
      },
      update: {
        shortText,
        fullText,
        luckyNumber,
        luckyColor,
      },
      create: {
        zodiacSign,
        date: utcDate,
        shortText,
        fullText,
        luckyNumber,
        luckyColor,
      },
    });

    return res.status(201).json({
      success: true,
      data: horoscope,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getTodayHoroscope,
  createHoroscope,
};

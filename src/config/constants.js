const ZODIAC_SIGNS = [
  "ARIES",
  "TAURUS",
  "GEMINI",
  "CANCER",
  "LEO",
  "VIRGO",
  "LIBRA",
  "SCORPIO",
  "SAGITTARIUS",
  "CAPRICORN",
  "AQUARIUS",
  "PISCES",
];

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

module.exports = {
  ZODIAC_SIGNS,
  JWT_EXPIRES_IN,
};

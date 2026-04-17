const express = require("express");
const {
  getTodayHoroscope,
  createHoroscope,
} = require("../controllers/horoscopeController");
const validateRequest = require("../middleware/validateRequest");
const {
  todayHoroscopeQuerySchema,
  createHoroscopeSchema,
} = require("../validators/horoscopeSchemas");

const router = express.Router();

router.get("/horoscope/today", validateRequest(todayHoroscopeQuerySchema, "query"), getTodayHoroscope);
router.post("/horoscope", validateRequest(createHoroscopeSchema), createHoroscope);

module.exports = router;

const allowedOrigins = (
  process.env.CLIENT_ORIGINS || "http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const validateOrigin = (req, res, next) => {
  const origin = req.get("Origin");

  // Browser requests should provide an Origin header.
  // Allow missing Origin only in local development,
  // so tools like Postman can still be used.
  if (!origin) {
    if (process.env.NODE_ENV !== "production") {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: "Request origin is required.",
    });
  }

  if (!allowedOrigins.includes(origin)) {
    return res.status(403).json({
      success: false,
      message: "Request origin is not allowed.",
    });
  }

  next();
};

module.exports = validateOrigin;
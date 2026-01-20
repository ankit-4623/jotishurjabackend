import aj from "../config/ratelimitConfig.js";

export const rateLimitmiddleware = async (req, res, next) => {
  try {
    // For testing or Postman, disable bot detection
    const decision = await aj.protect(req, { requested: 1, bot: false });

    // Check if Arcjet denied the request
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res
          .status(429)
          .json({ error: "Too Many Requests - Rate limit exceeded" });
      }

      if (decision.reason.isBot()) {
        return res.status(403).json({ error: "Bot detected - Access denied" });
      }

      // Other deny reason
      return res.status(403).json({ error: "Forbidden" });
    }

    // ✅ If not denied, continue to next middleware
    next();
  } catch (error) {
    console.error("Error in ARCJET middleware:", error);

    if (!res.headersSent) {
      return res
        .status(500)
        .json({ message: "ARCJET middleware internal server error" });
    }
  }
};

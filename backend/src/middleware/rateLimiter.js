import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-rate-limit");

    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests, please try again later." });
    }

    next(); // only run if success
  } catch (error) {
    console.error("Rate Limiter Error:", error);
    next(error);
  }
};

export default rateLimiter;

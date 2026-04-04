const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 100;

const requestsByIp = new Map();

const getClientIp = (req) =>
  req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown";

const rateLimit = (req, res, next) => {
  const ip = getClientIp(req);
  const now = Date.now();
  const requestLog = requestsByIp.get(ip);

  if (!requestLog || now > requestLog.resetTime) {
    requestsByIp.set(ip, {
      count: 1,
      resetTime: now + WINDOW_MS,
    });

    return next();
  }

  if (requestLog.count >= MAX_REQUESTS) {
    return res.status(429).json({
      message: "Too many requests, please try again later",
    });
  }

  requestLog.count += 1;
  next();
};

module.exports = rateLimit;

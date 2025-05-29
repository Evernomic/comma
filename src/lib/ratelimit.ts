import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";
export const rateLimit = {
  bookmark: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(1, "1 h"),
    prefix: "clicks",
    analytics: true,
  }),
  analytics: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(1, "5 h"),
    prefix: "analytics",
    analytics: true,
  }),
  subscribe: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "5 h"),
    prefix: "subscribe",
    analytics: true,
  }),
  newsletter: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(2, "1 d"),
    prefix: "newsletter",
    analytics: true,
  }),
  protection: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1 h"),
    prefix: "unlock",
    analytics: true,
  }),
};

import { proxiesList } from './../database/proxies-list';

// Note: in real scenarios, we should get these values from the database!
export const config = {
  proxiesList,
  ratelimit: {
    timeout: 5 * 60 * 60 * 1000, // 5h
    totalRequests: 600,
  },
};

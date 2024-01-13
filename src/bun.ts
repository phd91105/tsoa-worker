import fetch from './app';

// Bun.js handler for debugging
export default {
  fetch(request: Request) {
    return fetch(request, process.env);
  },
};

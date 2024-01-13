import 'reflect-metadata';
import fetch from './app';

// Bun.js handler for debugging
export default {
  port: 8787,
  fetch(request: Request) {
    return fetch(request, process.env);
  },
};

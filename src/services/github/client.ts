import axios from 'axios';
import { env } from '@/config/env';

export const githubClient = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
    ...(env.VITE_GITHUB_TOKEN && { Authorization: `token ${env.VITE_GITHUB_TOKEN}` }),
  },
});

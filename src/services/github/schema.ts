import { z } from 'zod';

export const GithubUserSchema = z.object({
  public_repos: z.number(),
  followers: z.number(),
});

export const GithubRepoSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  stargazers_count: z.number(),
  language: z.string().nullable(),
  pushed_at: z.string(),
  html_url: z.string(),
});

export const GithubReposSchema = z.array(GithubRepoSchema);

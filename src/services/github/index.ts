import { githubClient } from './client';
import { GithubUserSchema, GithubReposSchema } from './schema';
import { profileConfig } from '@/config/profile';

export interface GithubStats {
  publicRepos: number;
  followers: number;
  totalStars: number;
  topLanguages: string[];
  recentRepos: {
    name: string;
    description: string | null;
    pushedAt: string;
    url: string;
  }[];
}

export async function fetchGithubStats(): Promise<GithubStats> {
  const username = profileConfig.github.username;

  const [userRes, reposRes] = await Promise.all([
    githubClient.get(`/users/${username}`),
    githubClient.get(`/users/${username}/repos?per_page=100&sort=pushed`)
  ]);

  const user = GithubUserSchema.parse(userRes.data);
  const repos = GithubReposSchema.parse(reposRes.data);

  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);

  const langCounts = repos.reduce((acc: Record<string, number>, repo) => {
    if (repo.language) {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
    }
    return acc;
  }, {});

  const topLanguages = Object.entries(langCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([lang]) => lang);

  const recentRepos = repos
    .slice(0, 3)
    .map(repo => ({
      name: repo.name,
      description: repo.description,
      pushedAt: repo.pushed_at,
      url: repo.html_url
    }));

  return {
    publicRepos: user.public_repos,
    followers: user.followers,
    totalStars,
    topLanguages,
    recentRepos
  };
}

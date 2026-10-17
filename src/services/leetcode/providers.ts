import axios from 'axios';
import { LeetCodeStats, LeetCodeStatsSchema } from './schema';
import { env } from '@/config/env';
import { profileConfig } from '@/config/profile';

export interface LeetCodeProvider {
  fetchStats(username: string): Promise<LeetCodeStats>;
}

// Adapts responses from community endpoints like alfa-leetcode-api
export class CommunityLeetCodeProvider implements LeetCodeProvider {
  async fetchStats(username: string): Promise<LeetCodeStats> {
    // Note: The structure here depends on the specific community API used.
    // Assuming a common structure returned by alfa-leetcode-api or similar.
    const res = await axios.get(`https://alfa-leetcode-api.onrender.com/userProfile/${username}`);
    const data = res.data;

    // Mapping raw data to domain schema
    return LeetCodeStatsSchema.parse({
      totalSolved: data.totalSolved,
      easySolved: data.easySolved,
      mediumSolved: data.mediumSolved,
      hardSolved: data.hardSolved,
      ranking: data.ranking,
      acceptanceRate: data.acceptanceRate
    });
  }
}

export class ServerlessLeetCodeProvider implements LeetCodeProvider {
  async fetchStats(username: string): Promise<LeetCodeStats> {
    if (!env.VITE_LEETCODE_SERVERLESS_URL) {
       throw new Error("Serverless URL not configured");
    }
    const res = await axios.get(`${env.VITE_LEETCODE_SERVERLESS_URL}?username=${username}`);
    return LeetCodeStatsSchema.parse(res.data);
  }
}

export function getLeetCodeProvider(): LeetCodeProvider {
  if (env.VITE_LEETCODE_PROVIDER === 'serverless') {
    return new ServerlessLeetCodeProvider();
  }
  return new CommunityLeetCodeProvider();
}

export async function fetchLeetCodeStats(): Promise<LeetCodeStats> {
    const provider = getLeetCodeProvider();
    return provider.fetchStats(profileConfig.leetcode.username);
}

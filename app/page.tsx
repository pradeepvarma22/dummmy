'use client'
import axios from 'axios'; // Import Axios
import { useState, useEffect } from 'react';

const query = `
query getUserProfile($username: String!) {
  allQuestionsCount {
    difficulty
    count
  }
  matchedUser(username: $username) {
    contributions {
      points
    }
    profile {
      reputation
      ranking
    }
    submissionCalendar
    submitStats {
      acSubmissionNum {
        difficulty
        count
        submissions
      }
      totalSubmissionNum {
        difficulty
        count
        submissions
      }
    }
  }
}
`;

const scoring = {
  easy: 10,
  medium: 20,
  hard: 30,
};
interface LeetCodeScore {
  username: string;
  score: number; 
}
export default function Home() {
  const [usernames, setUsernames] = useState(['pradeepvarma_22', 'user2']);
  const [scores, setScores] = useState<LeetCodeScore[]>([]);

  useEffect(() => {
    fetchLeetCodeScores();
  });

  const fetchLeetCodeScores = async () => {
    try {
      const response = await axios.post('https://leetcode.com/graphql/', {
        usernames,
      });

      if (!response.data) {
        throw new Error('Failed to fetch LeetCode scores');
      }

      setScores(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>LeetCode Scores</h1>
      <button onClick={fetchLeetCodeScores}>Fetch Scores</button>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>
            <p>Username: {score.username}</p>
            <p>Score: {score.score}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

import React, {useEffect, useState} from "react";
import "./PinnedRepos.scss"; // create your own styles

export default function PinnedRepos({username}) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://gh-pinned-repos.egoist.dev/?username=${username}`)
      .then(res => res.json())
      .then(data => {
        setRepos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch pinned repos:", err);
        setLoading(false);
      });
  }, [username]);

  if (loading) return <p>Loading pinned repositories...</p>;

  return (
    <div className="pinned-repos">
      <h2>Pinned Repositories</h2>
      <div className="repos-grid">
        {repos.map(repo => (
          <a
            key={repo.link}
            href={repo.link}
            target="_blank"
            rel="noopener noreferrer"
            className="repo-card"
          >
            <h3>{repo.repo}</h3>
            <p>{repo.description}</p>
            <div className="repo-meta">
              <span>⭐ {repo.stars}</span>
              <span>🍴 {repo.forks}</span>
              <span>📝 {repo.language}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

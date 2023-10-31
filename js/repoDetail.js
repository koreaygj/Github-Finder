import { config } from "./githubToken.js";

const baseURL = "https://api.github.com/";

export async function getRepoDetails(userName) {
  const URL = `${baseURL}users/${userName}/repos?sort-author-date-asc`;
  const options = {
    method: "GET",
    Authorization: `Bearer ${config.githubToken}`,
  };
  try {
    const response = await fetch(URL, options);
    if (!response.ok) throw new Error("404 error");
    const json = await response.json();
    const prevList = document.querySelector(".repo-list");
    prevList.remove();
    printRepos(json);
    showRepos("true");
    return "success";
  } catch (err) {
    showRepos("false");
    return "404";
  }
}

function printRepos(repos) {
  const repoContainer = document.querySelector(".user-repo-container");
  const repoList = document.createElement("div");
  repoList.className = "repo-list";
  for (let i = 0; i < 10; i++) {
    repoList.appendChild(getRepo(repos[i]));
  }
  repoContainer.appendChild(repoList);
}

function getRepo(repo) {
  const repoBox = document.createElement("div");
  repoBox.className = "repo-box";
  const repoName = document.createElement("div");
  repoName.className = "repo-name";
  const repoDetails = document.createElement("div");
  repoDetails.className = "repo-details";
  const repoLanguage = document.createElement("div");
  repoLanguage.className = "repo-item";
  const repoStarCnt = document.createElement("div");
  repoStarCnt.className = "repo-item";
  const repoForkCnt = document.createElement("div");
  repoForkCnt.className = "repo-item";
  const repoWatchers = document.createElement("div");
  repoWatchers.className = "repo-item";

  repoName.innerHTML = repo.name;
  repoName.addEventListener("click", () => {
    window.open(`${repo.html_url}`);
  });

  repoLanguage.innerHTML = repo.language;
  repoStarCnt.innerHTML = `stars: ${repo.stargazers_count}`;
  repoForkCnt.innerHTML = `forks: ${repo.forks_count}`;
  repoWatchers.innerHTML = `watchers: ${repo.watchers}`;

  repoBox.appendChild(repoName);
  repoBox.appendChild(repoDetails);
  repoDetails.appendChild(repoLanguage);
  repoDetails.appendChild(repoStarCnt);
  repoDetails.appendChild(repoForkCnt);
  repoDetails.appendChild(repoWatchers);

  return repoBox;
}

function showRepos(show) {
  const repoContainer = document.querySelector(".user-repo-container");
  if (show) {
    if (!repoContainer.classList.contains("visible"))
      repoContainer.classList.add("visible");
  } else {
    if (repoContainer.classList.contains("visible"))
      repoContainer.classList.remove("visible");
  }
}

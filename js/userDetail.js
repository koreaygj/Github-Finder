import { config } from "./githubToken.js";

const baseURL = "https://api.github.com/";
const userInfo = {
  avatar: "",
  userName: "",
  fullName: "",
  company: "",
  location: "",
  blog: "",
  followers: 0,
  following: 0,
  publicRepo: 0,
  createdAt: "",
};

export async function getUserDetails(userName) {
  const URL = `${baseURL}users/${userName}`;
  const options = {
    method: "GET",
    Authorization: `Bearer ${config.githubToken}`,
  };
  try {
    const response = await fetch(URL, options);
    if (!response.ok) throw new Error("404 error");
    const json = await response.json();
    saveUserDetails(json);
    printUserInfo(userInfo);
    showUserInfo(true);
    printNotFound(false);
    return "success";
  } catch (err) {
    showUserInfo(false);
    printNotFound(true);
    return "404";
  }
}

function saveUserDetails(response) {
  userInfo.avatar = response.avatar_url;
  userInfo.userName = response.login;
  userInfo.fullName = response.name;
  userInfo.company = response.company;
  userInfo.location = response.location;
  userInfo.blog = response.blog;
  userInfo.followers = response.followers;
  userInfo.following = response.following;
  userInfo.publicRepo = response.public_repos;
  userInfo.createdAt = response.created_at;
}

function printUserInfo(userInfo) {
  const userContainer = document.querySelector(".user-container");

  const avatar = userContainer.querySelector(".user-avatar");
  const profileLink = userContainer.querySelector(".user-profile-link");
  const userName = userContainer.querySelector(".user-name");
  const fullName = userContainer.querySelector(".user-fullname");
  const company = userContainer.querySelector(".user-company");
  const location = userContainer.querySelector(".user-location");
  const blog = userContainer.querySelector(".user-blog");
  const followers = userContainer.querySelector(".user-followers");
  const following = userContainer.querySelector(".user-following");
  const publicRepo = userContainer.querySelector(".user-public-repo");
  const createdAt = userContainer.querySelector(".user-created-at");

  const githubCommitLog = userContainer.querySelector(".github-grass");

  avatar.src = userInfo.avatar;
  profileLink.setAttribute("href", `https://github.com/${userInfo.userName}`);
  profileLink.innerHTML = "view profile";
  profileLink.addEventListener("click", () =>
    window.open(`https://github.com/${userInfo.userName}`)
  );

  userName.innerHTML = `${userInfo.userName}'s profile`;
  fullName.innerHTML = `name:   ${userInfo.fullName}`;
  company.innerHTML = `company:   ${userInfo.company}`;
  location.innerHTML = `location:   ${userInfo.location}`;
  blog.innerHTML = `blog:   ${userInfo.blog}`;
  followers.innerHTML = `followers:   ${userInfo.followers}`;
  following.innerHTML = `following:   ${userInfo.following}`;
  publicRepo.innerHTML = `public repository:    ${userInfo.publicRepo}`;
  createdAt.innerHTML = `created at:    ${userInfo.createdAt}`;

  githubCommitLog.src = `https://ghchart.rshah.org/${userInfo.userName}`;
}

function showUserInfo(show) {
  const userContainer = document.querySelector(".user-container");
  if (show) {
    if (!userContainer.classList.contains("visible"))
      userContainer.classList.add("visible");
  } else {
    if (userContainer.classList.contains("visible"))
      userContainer.classList.remove("visible");
  }
}

function printNotFound(show) {
  const notFound = document.querySelector(".not-found");
  if (show) notFound.classList.add("visible");
  else notFound.classList.remove("visible");
}

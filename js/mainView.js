import { getUserDetails } from "./userDetail.js";

const search = document.querySelector(".search");

async function searchUser() {
  const userName = search.value;
  await getUserDetails(userName);
}

search.addEventListener("change", searchUser);

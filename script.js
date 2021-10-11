// let user ={email: "abc", lastName: "Last Name", firstName: "First Name"}
let noPages = 0;
let currentPage = 1;
let selectedPage = 0;
let currentUsersPerPage = [];
let currentUserDiv = document.querySelector(".current-users");
let navigation = document.querySelector(".pagination");

function cleanup() {
  currentUserDiv.innerHTML = "";
  navigation.childNodes.forEach((navItem) => (navItem.classList = "page-item"));
}

function clickNavigation(event) {
  selectedPage = event.target.textContent.trim();
  cleanup();
  axios
    .get("https://reqres.in/api/users/", {
      params: {
        page: selectedPage,
      },
    })
    .then((response) => {
      currentPage = response.data.page;
      currentUsersPerPage = response.data.data;
      event.target.parentNode.classList = "page-item active";
      for (let i = 0; i <= currentUsersPerPage.length; i++) {
        currentUserDiv.innerHTML += generateUserCard(currentUsersPerPage[i]);
      }
    });
}

function generateNavigationElement(pageNumber, navigationEl) {
  //creating 2 elements, as per Bootstrap example
  let newEl = document.createElement("li");
  let newLink = document.createElement("a");
  newLink.href = "#";
  newLink.classList.add("page-link");
  newLink.innerHTML = `${pageNumber}`;

  //adding click event for the link
  newLink.addEventListener("click", clickNavigation);
  newEl.classList.add("page-item");
  newEl.appendChild(newLink);
  navigationEl.appendChild(newEl);
}

function generateNavigation() {
  for (let i = 1; i <= noPages; i++) {
    generateNavigationElement(i, navigation);
  }
}

function generateUserCard(user) {
  console.log(user.avatar);
  return `
    <div class="card flex-row justify-content-center align-items-center p-2" >
        <img src="${user.avatar}" class="card-img-top" alt="user profile picture">
        <div class="card-body">
        <h6 class="card-title">${user.first_name} ${user.last_name}</h6>
        <p class="card-text">${user.email}</p>
        </div>
  </div>`;
}

function getUserData() {
  axios
    .get("https://reqres.in/api/users/", {
      params: {
        page: currentPage,
      },
    })
    .then((response) => {
      noPages = response.data.total_pages;
      currentPage = response.data.page;
      currentUsersPerPage = response.data.data;
      generateNavigation();
      navigation.childNodes[1].classList = "page-item active";
      for (let i = 0; i <= currentUsersPerPage.length; i++) {
        currentUserDiv.innerHTML += generateUserCard(currentUsersPerPage[i]);
      }
    });
}

getUserData();

const user = document.querySelector(".user_name");

window.onload = () => {
  if (!sessionStorage.user) {
    window.location.href = "/login";
  } else {
    user.innerHTML = sessionStorage.user;
  }
};

const logout = () => {
  sessionStorage.clear();
  window.location.href = "/login";
};

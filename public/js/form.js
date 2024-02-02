const fullname = document.querySelector("#fullname");
const username = document.querySelector("#username");
const password = document.querySelector("#password");

function registerUser() {
  fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullname: fullname.value,
      username: username.value,
      password: password.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      validateUser(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while registering.");
    });
}

function loginUser() {
  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      validateData(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

const validateUser = (data) => {
  if (data.message === "User registered successfully") {
    window.location.href = "/login";
  }
};

function validateData(data) {
  if (!data.user) {
    alert(data.message);
  } else {
    sessionStorage.user = data.user?.fullname;
    window.location.href = "/home";
  }
}

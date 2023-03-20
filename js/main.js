document.querySelector(".hamburger").addEventListener("click", function () {
  document.querySelector(".open-menu-wrapper").classList.toggle("open");
});

document.querySelector(".close").addEventListener("click", function () {
  document.querySelector(".open-menu-wrapper").classList.toggle("open");
});

const bookForm = document.getElementById("book-form");

bookForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const bookMessage = document.getElementById("book-message");
  bookMessage.innerText = "";

  let validation = true;

  let appointment = {
    name: document.getElementById("book-name").value,
    email: document.getElementById("book-email").value,
    service: document.getElementById("book-service").value,
    phone: document.getElementById("book-phone").value,
    date: document.getElementById("book-date").value,
    time: document.getElementById("book-time").value,
    message: document.getElementById("book-message").value,
  };

  for (let i = 0; i < bookForm.length - 3; i++) {
    if (bookForm[i].value === "") {
      validation = false;
      bookForm[i].classList.add("error");
    } else {
      bookForm[i].classList.remove("error");
    }
  }

  if (validation) {
    bookAppointment(appointment);
  } else {
    bookMessage.classList.add("error");
    bookMessage.innerText = `Please fill required fields`;
  }
});

const bookAppointment = (appointment) => {
  const bookMessage = document.getElementById("book-message");

  fetch("https://akademia108.pl/api/ajax/post-appointment.php", {
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    method: "POST",
    body: JSON.stringify(appointment),
  })
    .then((res) => res.json())
    .then((json) => {
      bookMessage.innerText = `Thank you ${json.appointment.name}. Your salon visit is set!`;
    })
    .catch((error) => {
      console.log(error);
      bookMessage.classList.add("error");
      bookMessage.innerText = "It is currently not possible to make an appointment. Sorry";
    });
};

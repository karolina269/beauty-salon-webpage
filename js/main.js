document.querySelector(".hamburger").addEventListener("click", function () {
  document.querySelector(".open-menu-wrapper").classList.toggle("open");
});

document.querySelector(".close").addEventListener("click", function () {
  document.querySelector(".open-menu-wrapper").classList.toggle("open");
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
      bookMessage.classList.add("send");
      bookMessage.innerText = `Thank you ${json.appointment.name}. Your salon visit is set!`;
    })
    .catch((error) => {
      console.log(error);
      bookMessage.classList.add("error");
      bookMessage.innerText = "It is currently not possible to make an appointment. Sorry";
    });
};

const bookForm = document.getElementById("book-form");

bookForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const bookMessage = document.document.getElementById("book-message");
  let formFields = document.getElementsByClassName("form-field");
  let allFields = false;
  let appointment = {
    name: document.getElementById("book-name").value,
    email: document.getElementById("book-email").value,
    service: document.getElementById("book-service").value,
    phone: document.getElementById("book-phone").value,
    date: document.getElementById("book-date").value,
    time: document.getElementById("book-time").value,
    message: document.getElementById("book-message").value,
  };

  for (let i = 0; i < formFields.length; i++) {
    if (formFields[i].value === "") {
      allFields = false;
      formFields[i].classList.add("error");
    } else {
      allFields = true;
      formFields[i].classList.remove("error");
    }
  }

  if (allFields) {
    createAppointment(appointment);
  } else {
    bookMessage.classList.add("error");
    bookMessage.innerText = `Please fill required fields`;
  }
});

//FORM CONTACT & SEARCHBAR

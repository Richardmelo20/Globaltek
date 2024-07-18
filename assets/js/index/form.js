document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const phoneInput = document.getElementById("phone");
  const alertBox = document.getElementById("alert");
  const emailInput = document.getElementById("email");

  phoneInput.addEventListener("input", formatPhone);

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (validateForm()) {
      submitForm();
    }
  });

  function formatPhone() {
    const value = phoneInput.value.replace(/\D/g, "");
    let formattedValue = "";

    if (value.length > 0) {
      formattedValue = `(${value.slice(0, 2)}`;
    }
    if (value.length > 2) {
      formattedValue += `) ${value.slice(2, 7)}`;
    }
    if (value.length > 7) {
      formattedValue += `-${value.slice(7, 11)}`;
    }

    phoneInput.value = formattedValue;
  }

  function validateForm() {
    const inputs = form.querySelectorAll("input[required], textarea[required]");
    let valid = true;

    inputs.forEach((input) => {
      if (!input.value) {
        input.classList.add("error");
        valid = false;
      } else {
        input.classList.remove("error");
      }
    });

    const email = emailInput.value;
    if (!email.endsWith("@gmail.com")) {
      emailInput.classList.add("error");
      valid = false;
    } else {
      emailInput.classList.remove("error");
      valid = true;
    }

    const phoneValue = phoneInput.value.replace(/\D/g, "");
    if (phoneValue.length !== 11) {
      phoneInput.classList.add("error");
      valid = false;
    } else {
      phoneInput.classList.remove("error");
    }

    return valid;
  }

  function submitForm() {
    const formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData,
      mode: "no-cors", // Adicionado para evitar problemas de CORS
    })
      .then((response) => {
        if (response.ok || response.type === "opaque") {
          // Verificação para resposta 'opaque'
          form.reset();
          showAlert();
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }

  function showAlert() {
    console.log("aqui");
    alertBox.classList.add("show");
    setTimeout(() => {
      alertBox.classList.remove("show");
    }, 5000); // O alerta ficará visível por 5 segundos
  }
});

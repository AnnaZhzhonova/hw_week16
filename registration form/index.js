const registerForm = document.forms.registration;
const formElements = registerForm.elements;

//проверка имени
const formName = formElements.name;
function checkName() {
  const formattedName = formName.value.trim();
  const minlength = parseInt(formName.getAttribute("minlength"));
  const maxlength = parseInt(formName.getAttribute("maxlength"));
  const errorName = registerForm.querySelector(".error-name");
  if (formattedName.length < minlength) {
    errorName.textContent = "Минимальное колличество символов 3";
    return false;
  } else if (formattedName.length > maxlength) {
    errorName.textContent = "Максимальное колличество символов 20";
    return false;
  } else {
    return true;
  }
}

//проверка почты
const formEmail = formElements.email;
function checkEmail() {
  const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const errorEmail = registerForm.querySelector(".error-email");
  if (formEmail.value.match(mailFormat)) {
    errorEmail.textContent = "";
    return true;
  } else {
    errorEmail.textContent = "Пожалуйста, введите корректный email";
    return false;
  }
}
//проверка возраста
const formAge = formElements.age;

function checkAge() {
  const ageNumber = parseInt(formAge.value);
  const errorAge = registerForm.querySelector(".error-age");
  if (ageNumber >= 100) {
    errorAge.textContent = "Введите корректный возраст";
    return false;
  } else {
    return true;
  }
}

//проверка пароля
const formPassword = formElements.password;

function checkPassword() {
  const errorPassword = registerForm.querySelector(".error-password");
  const passwordFormat =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,20}$/;
  const isValidPassword = formPassword.value.match(passwordFormat);

  if (!isValidPassword) {
    errorPassword.textContent = "Пожалуйста, введите корректный пароль";
  }

  return isValidPassword;
}
//Повтор пароля
const formPasswordRepeat = formElements.passwordRepeat;
const errorPasswordRepeat = registerForm.querySelector(
  ".error-password--repeat"
);

function checkRepeatedPassword() {
  if (formPassword.value !== formPasswordRepeat.value) {
    return (errorPasswordRepeat.textContent = "пароли не совпадают");
  }
}
//Проверка согласия
const formAgreement = formElements.agreement;
function checkAgreement() {
  return formAgreement.checked;
}
//валидация формы
function validate(form, inputs, error) {
  let result = true;
  const checkedName = checkName();
  const chechedEmail = checkEmail();
  const checkedAge = checkAge();
  const checkedPassword = checkPassword();
  const checkedRepeatedPassword = checkRepeatedPassword();
  const checkedAgreement = checkAgreement();
  for (let input of inputs) {
    if (
      input.value === "" ||
      checkedName === false ||
      chechedEmail === false ||
      checkedAge === false ||
      checkedPassword === false ||
      checkedRepeatedPassword === false ||
      checkedAgreement === false
    ) {
      return (error.textContent = `Пожалуйста, заполните все обязательные поля`);
      result = false;
    }
  }
  error.textContent = ``;
  return result;
}

const errorMessage = document.querySelector(".error");
const popMessage = document.querySelector(".pop-block");
//отправка формы
registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (validate(this, formElements, errorMessage) === true) {
    popMessage.classList.add("pop-block--show");
    this.reset();
  }
});
document
  .querySelector(".pop-block__btn")
  .addEventListener("click", function () {
    popMessage.classList.remove("pop-block--show");
  });

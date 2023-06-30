const registerForm = document.forms.registration;
const formElements = registerForm.elements;
const formName = formElements.name;
const formEmail = formElements.email;
const formAge = formElements.age;
const formProfession = formElements.profession;
const formPassword = formElements.password;
const formPasswordRepeat = formElements.passwordRepeat;
const formAgreement = formElements.agreement;

const errorMessage = document.querySelector(".error");

//проверка почты
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

//валидация формы
function validation(form, inputs, error) {
  let result = true;

  const chechedEmail = checkEmail();
  for (let input of inputs) {
    if (input.value === "" || chechedEmail === false) {
      return (error.textContent = `Пожалуйста, заполните все обязательные поля`);
      result = false;
    }
  }
  error.textContent = ``;
  return result;
}

//отправка формы
registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (validation(this, formElements, errorMessage) === true) {
    console.log(`Регистрация завершена`);
    this.reset();
  }
});

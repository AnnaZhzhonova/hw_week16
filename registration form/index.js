const registerForm = document.forms.registration;
const formElements = registerForm.elements;

//проверка имени
const formName = formElements.name;

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

//проверка пароля
const formPassword = formElements.password;
const formPasswordRepeat = formElements.passwordRepeat;

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

const errorMessage = document.querySelector(".error");
//отправка формы
registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  if (validation(this, formElements, errorMessage) === true) {
    console.log(`Регистрация завершена`);
    this.reset();
  }
});

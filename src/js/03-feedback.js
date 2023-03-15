import throttle from 'lodash.throttle';

const formTextArea = document.querySelector(`.feedback-form textarea`);
const form = document.querySelector(`form`);
const emailLabel = document.querySelector(`.feedback-form input`);
const STORAGE_KEY = `feedback-form-state`;
let formData = {};

const saveData = evt => {
  const value = evt.target.value;
  const name = evt.target.name;
  formData[name] = value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};


const submitForm = evt => {
  evt.preventDefault();
  const {
    elements: { email, message },
  } = evt.currentTarget;
  if (email.value === '' || message.value === '') {
    return alert(`Please fill all fields`);
  }
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  evt.target.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = {};
};


const populateTextArea = evt => {
  const parcedMessageToSave = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (parcedMessageToSave) {
    formTextArea.value = parcedMessageToSave.message;
    emailLabel.value = parcedMessageToSave.email;
  }
};


populateTextArea();
//
form.addEventListener(`submit`, submitForm);
form.addEventListener(`input`, throttle(saveData, 500));
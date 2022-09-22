import throttle from 'lodash.throttle';

const LOCAL_STORAGE_FORM = 'feedback-form-state';
const formRef = document.querySelector('.feedback-form');
initPage();

const onFormChange = event => {
  const { name, value } = event.target;

  try {
    let saveData = localStorage.getItem(LOCAL_STORAGE_FORM);
    if (saveData) {
      saveData = JSON.parse(saveData);
    } else {
      saveData = {};
    }
    saveData[name] = value;
    const stringifyData = JSON.stringify(saveData);
    localStorage.setItem(LOCAL_STORAGE_FORM, stringifyData);
  } catch (error) {
    console.log(error);
  }
};

const throttledOnFormChange = throttle(onFormChange, 500);
formRef.addEventListener('input', throttledOnFormChange);

function initPage() {
  const saveData = localStorage.getItem(LOCAL_STORAGE_FORM);
  if (!saveData) {
    return;
  }
  try {
    const parceData = JSON.parse(saveData);
    Object.entries(parceData).forEach(([name, value]) => {
      formRef.elements[name].value = value;
    });
  } catch (error) {
    console.error(error);
  }
}

const onFormSubmit = event => {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;
  const formData = {
    email: email.value,
    message: message.value,
  };
  console.log(formData);
  event.currentTarget.reset();
  localStorage.removeItem(LOCAL_STORAGE_FORM);
};

formRef.addEventListener('submit', onFormSubmit);

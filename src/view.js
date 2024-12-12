import onChange from 'on-change';

const handleAppState = (elements, state) => {
  const { input, button } = elements;
  if (state.appState.isFilling === false) {
    input.disabled = true;
    button.disabled = true;
  }
  input.disabled = false;
  button.disabled = false;
  input.value = '';
};

const renderTimers = (elements, state) => {
  const { timers } = elements;
  timers.textContent = '';
  if (state.timersList.length === 0) {
    timers.textContent = '';
  }
  state.timersList.forEach((timer) => {
    const liElement = document.createElement('li');
    liElement.setAttribute('id', timer.id);
    const spanElement = document.createElement('span');
    spanElement.innerHTML = timer.timeLeft;
    liElement.append(spanElement);
    const btnElement = document.createElement('button');
    btnElement.setAttribute('data-type', 'closing');
    btnElement.textContent = 'Clear timer';
    liElement.append(btnElement);
    timers.append(liElement);
  });
};

export default (elements, state) => {
  const watchedState = onChange(state, (path) => {
    switch (path) {
       case 'appState.isFilling':
         handleAppState(elements, state);
         break;
       case 'timersList':
         renderTimers(elements, state);
         break;
       default:
         break;  
    }
  });

  return watchedState;
};

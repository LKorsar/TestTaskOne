import _ from 'lodash';
import './styles.css';
import view from './view.js';

const setTimer = (time, state, id) => {
  const delay = time * 1000;
  const startTime = Date.now() + delay;
  const timer = setInterval(() => {
    let currentDelay = Math.round(((startTime - Date.now())) / 1000);
    console.log(currentDelay);
    const timerToChange = state.timersList.filter((t) => t.id === id);
    timerToChange.timeLeft = currentDelay;
    const indexOfTimer = (state.timersList).indexOf(timerToChange);
    state.timersList.splice(indexOfTimer, 1, timerToChange);
    if (currentDelay === 0) {
      clearInterval(timer);
      state.timersList.splice(indexOfTimer, 1);
    }
  }, 1000);
  
};

const app = () => {
  const elements = {
    input: document.getElementById('time-input'),
    button: document.getElementById('add-timer'),
    timers: document.getElementById('timers'),
  };

  const state = {
    appState: {
      isFilling: true,
    },
    timersList: [],
    inputValue: '',
  };

  const watchedState = view(elements, state);

  elements.input.addEventListener('change', (e) => {
    const newValue = e.target.value;
    watchedState.inputValue = newValue;
  });

  elements.button.addEventListener('click', () => {
    watchedState.appState.isFilling = false;
    const time = watchedState.inputValue;
    const timerId = _.uniqueId();
    watchedState.timersList.push({ id: timerId, timeLimit: time, timeLeft: time });
    setTimer(time, watchedState, timerId);
    watchedState.inputValue = '';
    watchedState.appState.isFilling = true;
  });

  const timerClearBtns = document.querySelectorAll('li');
  timerClearBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const clickedTimer= e.target.value;
      const clickedTimerId = clickedTimer.id;
      watchedState.timersList.filter((t) => t.id !== clickedTimerId);
    });
  });
};

export default app;
import _ from 'lodash';
import './styles.css';
import view from './view.js';

const setTimer = (time, state) => {
  const timer = setInterval(() => {
    if (time > 0) {
      time -= 1;
    }
    clearInterval(timer);
  }, 1000);
  state.timersList.push({id: _.uniqueId(), timeLimit: time, timer: timer});
  return timer;
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
    setTimer(time, watchedState);
    watchedState.inputValue = '';
    watchedState.appState.isFilling = true;
    console.log(watchedState);
  });

  const timerClearBtns = document.querySelectorAll('li');
  timerClearBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const clickedTimer= e.target.value;
      console.log(clickedTimer);
      const clickedTimerId = clickedTimer.id;
      watchedState.timersList.filter((t) => t.id !== clickedTimerId);
    });
  });
};

export default app;
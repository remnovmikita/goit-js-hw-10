import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

// глобальна змінна, доступна у всьому файлі
let userSelectedDate = null;
const buttonTime = document.querySelector("[data-start]");
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");
const input = document.querySelector("#datetime-picker");
// const btnStop = document.querySelector('.stop-timer');

buttonTime.disablet = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const pickedDate = selectedDates[0];
    if (pickedDate <= new Date()) {
       buttonTime.style.backgroundColor  = "#cfcfcf";
    buttonTime.style.color = "#989898";
    buttonTime.disablet = true;
        iziToast.warning({
            close: true,
            message: 'Please choose a date in the future',
            position: 'topRight',
});
      return;
    }
    userSelectedDate = pickedDate;
    buttonTime.disablet = false;
     buttonTime.style.backgroundColor  = "#4e75ff";
    buttonTime.style.color = "#fff";
    
  },
};

flatpickr("#datetime-picker", options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
 function addLeadingZero(value){
  return String(value).padStart(2, '0');
}


buttonTime.addEventListener("click", () => {

  if (!userSelectedDate) {
    buttonTime.disabled = true;
    buttonTime.style.backgroundColor  = "#cfcfcf";
    buttonTime.style.color = "#989898";
    return;
  }
  const timer = setInterval(() =>{
  const diff = userSelectedDate - new Date();
  if (diff <= 0){
    clearInterval(timer);
    daysEl.textContent = "00";
    hoursEl.textContent = "00"
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    buttonTime.disabled = false;
    input.disabled = false;
    buttonTime.style.backgroundColor  = "#4e75ff";
    buttonTime.style.color = "#fff";
    return
  }
  const {days , hours, minutes, seconds} = convertMs(diff);
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
    buttonTime.disabled = true;
    input.disabled = true;
    buttonTime.style.backgroundColor  = "#cfcfcf";
    buttonTime.style.color = "#989898";
    }, 1000);
});

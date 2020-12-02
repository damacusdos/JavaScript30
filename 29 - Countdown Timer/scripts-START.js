let countDown;
const timerDisplay = document.querySelector('.display__time-left');
const endtimeDisplay = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  clearInterval(countDown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimer(seconds);
  endTime(then);

  countDown = setInterval(() => {
    const secondLeft = Math.round((then - Date.now()) / 1000);
    if(secondLeft < 0) {
      clearInterval(countDown);
      return
    }
    displayTimer(secondLeft)
  }, 1000)
}

function displayTimer(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainSeconds = seconds % 60;
  const display = `${minutes} : ${remainSeconds < 10 ? '0' : ''}${remainSeconds}`;
  timerDisplay.textContent = display;
  document.title = display;
}

function endTime(timeStamp) {
  const end = new Date(timeStamp);
  const hours = end.getHours();
  const minutes = end.getMinutes();
  endtimeDisplay.textContent = `Be Back At ${hours} : ${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
})

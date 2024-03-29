import setupModal from './lib/modal.js'
import spawnNotification from './lib/notification.js'

setupModal('modal-time-application', 'time-application', 'close-time-application')

const start = document.getElementById('button-start')
const stop = document.getElementById('button-stop')
const save = document.getElementById('button-save')
const reset = document.getElementById('button-reset')
const time = document.getElementById('stopwatch-time')
const listSave = document.getElementById('list-save')
let seconds = 0
let minutes = 0
let hours = 0
let milliseconds = 0
let t

function add () {
  milliseconds++
  if (100 === milliseconds) {
    milliseconds = 0
    seconds++
  }
  if (60 === seconds) {
    seconds = 0
    minutes++
  }
  if (60 === minutes) {
    minutes = 0
    hours++
  }

  time.textContent =
    (hours ? (9 < hours ? hours : '0' + hours) : '00') +
    ':' +
    (minutes ? (9 < minutes ? minutes : '0' + minutes) : '00') +
    ':' +
    (9 < seconds ? seconds : '0' + seconds) +
    ':' +
    (9 < milliseconds ? milliseconds : '0' + milliseconds)

  timer()
}

function timer () {
  t = setTimeout(add, 10)
}

/* Start button */
start.onclick = timer

/* Stop button */

stop.onclick = function () {
  clearTimeout(t)
}

/* Reset button */

reset.onclick = function () {
  time.textContent = '00:00:00:00'

  milliseconds = 0

  seconds = 0

  minutes = 0

  hours = 0
}

save.onclick = function () {
  listSave.innerHTML +=
    '<li>' +
    (hours ? (9 < hours ? hours : '0' + hours) : '00') +
    ':' +
    (minutes ? (9 < minutes ? minutes : '0' + minutes) : '00') +
    ':' +
    (9 < seconds ? seconds : '0' + seconds) +
    ':' +
    (9 < milliseconds ? milliseconds : '0' + milliseconds) +
    '</li>'
}

const getBtnMinus = document.getElementsByClassName('btn-minus')
const getBtnPlus = document.getElementsByClassName('btn-plus')

for (let i = 0; i < getBtnPlus.length; i++) {
  getBtnPlus[i].addEventListener('click', function () {
    // eslint-disable-next-line
    singleVibration(100)
    const getNumber = this.parentElement.querySelector('input[type=number]')
    const getNumberValue = parseInt(getNumber.value)
    const newNumberValue = getNumberValue + 1
    getNumber.value = newNumberValue
  })
}

for (let i = 0; i < getBtnMinus.length; i++) {
  getBtnMinus[i].addEventListener('click', function () {
    // eslint-disable-next-line
    singleVibration(100)
    const getNumber = this.parentElement.querySelector('input[type=number]')
    const getNumberValue = parseInt(getNumber.value)
    const newNumberValue = getNumberValue - 1
    getNumber.value = newNumberValue
    if (0 > newNumberValue) {
      getNumber.value = 0
    }
  })
}

const finishDiv = document.createElement('h3')
finishDiv.innerHTML = 'Finished'
const timerWrapper = document.getElementsByClassName('timer-wrapper')[0]

function firstStopCountdown () {
  pauseCountdown()
  const music = new Audio(
    '../assets/sounds/mixkit-clown-horn-at-circus-715.wav'
  )
  music.play()
  // eslint-disable-next-line
  multiVibration([150, 150, 500])
  timerWrapper.appendChild(finishDiv)
  spawnNotification('The timer have ended', '../assets/img/logo_viper.png', 'Time\'s up!')
}

function startCountdown () {
  let hours = Number(document.getElementById('hours-value-timer').value)
  let minutes = Number(document.getElementById('minutes-value-timer').value)
  let seconds = Number(document.getElementById('seconds-value-timer').value)

  window.countdown = setInterval(function () {
    if (0 === hours && 0 === minutes && 0 === seconds) {
      firstStopCountdown()
    } else if (0 !== hours && 0 === minutes && 0 === seconds) {
      hours--
      minutes = 59
      seconds = 59
    } else if (0 !== minutes && 0 === seconds) {
      seconds = 59
      minutes--
    } else if (0 !== seconds) {
      seconds--
    }
    document.getElementById('hours-value-timer').value = hours
    document.getElementById('minutes-value-timer').value = minutes
    document.getElementById('seconds-value-timer').value = seconds
  }, 1000)
  document.getElementById('hours-value-timer').disabled = true
  document.getElementById('minutes-value-timer').disabled = true
  document.getElementById('seconds-value-timer').disabled = true

  pauseCountdownButton.style.display = 'inline-block'
  stopCountdownButton.style.display = 'none'
}

function pauseCountdown () {
  clearInterval(window.countdown)
  document.getElementById('hours-value-timer').disabled = false
  document.getElementById('minutes-value-timer').disabled = false
  document.getElementById('seconds-value-timer').disabled = false

  pauseCountdownButton.style.display = 'none'
  stopCountdownButton.style.display = 'inline-block'
}

function stopCountdown () {
  if (
    'undefined' !== typeof timerWrapper.lastChild &&
    'H3' === timerWrapper.lastChild.nodeName
  ) {
    timerWrapper.removeChild(timerWrapper.lastChild)
  }

  document.getElementById('hours-value-timer').value = 0
  document.getElementById('minutes-value-timer').value = 0
  document.getElementById('seconds-value-timer').value = 0
}

const startCountdownButton = document.getElementById('start-countdown')
startCountdownButton.addEventListener('click', startCountdown)

const stopCountdownButton = document.getElementById('stop-countdown')
stopCountdownButton.addEventListener('click', stopCountdown)

const pauseCountdownButton = document.getElementById('pause-countdown')
pauseCountdownButton.addEventListener('click', pauseCountdown)

pauseCountdownButton.style.display = 'none'

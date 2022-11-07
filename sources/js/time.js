// Modal

const modalTime = document.getElementById('modal-time-application')

// Get the button that opens the modal
const btnTime = document.getElementById('time-application')
console.log(btnTime)

// Get the <span> element that closes the modal
const spanTime = document.getElementById('close-time-application')
console.log(spanTime)

// When the user clicks the button, open the modal
btnTime.onclick = function () {
  modalTime.style.display = 'block'
  console.log('Get the modal')
}

// When the user clicks on <span> (x), close the modal
spanTime.onclick = function () {
  modalTime.style.display = 'none'
}

window.onload = function () {
  let seconds = 0
  let tens = 0
  const appendTens = document.getElementById('tens')
  const appendSeconds = document.getElementById('secs')
  const buttonStart = document.getElementById('button-start')
  const buttonSave = document.getElementById('button-save')
  const buttonStop = document.getElementById('button-stop')
  const buttonReset = document.getElementById('button-reset')
  const listSave = document.getElementById('list-save')
  let Interval

  buttonStart.onclick = function () {
    clearInterval(Interval)
    Interval = setInterval(startTimer, 10)
  }

  buttonSave.onclick = function () {
    listSave.innerHTML += '<li>' + seconds + ':' + tens + '</li>'
  }

  buttonStop.onclick = function () {
    clearInterval(Interval)
  }

  buttonReset.onclick = function () {
    clearInterval(Interval)
    tens = '00'
    seconds = '00'
    appendTens.innerHTML = tens
    appendSeconds.innerHTML = seconds
    listSave.innerHTML = ''
  }

  function startTimer () {
    tens++

    if (9 >= tens) {
      appendTens.innerHTML = '0' + tens
    }

    if (9 < tens) {
      appendTens.innerHTML = tens
    }

    if (99 < tens) {
      seconds++
      appendSeconds.innerHTML = '0' + seconds
      tens = 0
      appendTens.innerHTML = '0' + 0
    }

    if (9 < seconds) {
      appendSeconds.innerHTML = seconds
    }
  }

  // Divider

  // let hours = 0
  const minutesCountdown = document.getElementById('minutes-value-timer').value
  const secondsCountdown = document.getElementById('seconds-value-timer').value
  const appendMinutesCountdown = document.getElementById('minutes-timer')
  const appendSecondsCountdown = document.getElementById('seconds-timer')
  const buttonStartCountdown = document.getElementById('button-start-timer')
  const buttonStopCountdown = document.getElementById('button-stop-timer')
  // const buttonResetCountdown = document.getElementById('button-reset-timer')
  let IntervalCountdown

  buttonStartCountdown.onclick = function () {
    clearInterval(IntervalCountdown)
    IntervalCountdown = setInterval(startCountdown, 1000)
  }

  buttonStopCountdown.onclick = function () {
    clearInterval(IntervalCountdown)
  }

  function startCountdown () {
    appendSecondsCountdown.innerHTML = secondsCountdown
    appendMinutesCountdown.innerHTML = minutesCountdown
    /*
    secondsCountdown--

    if (9 >= secondsCountdown) {
      appendSecondsCountdown.innerHTML = '0' + secondsCountdown
    }

    if (9 < secondsCountdown) {
      appendSecondsCountdown.innerHTML = secondsCountdown
    }

    if (0 > seconds) {
      minutesCountdown--
      secondsCountdown = 60
      appendMinutesCountdown.innerHTML = minutesCountdown
    }

    if (9 < minutesCountdown) {
      appendMinutesCountdown.innerHTML = minutesCountdown
    } */
  }
}

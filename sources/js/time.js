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
  const buttonStop = document.getElementById('button-stop')
  const buttonReset = document.getElementById('button-reset')
  let Interval

  buttonStart.onclick = function () {
    clearInterval(Interval)
    Interval = setInterval(startTimer, 10)
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
}

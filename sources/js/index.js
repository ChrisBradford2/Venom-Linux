console.log('Hello, ESGI!')

/**
 * Custom right click
 *
 * @param {object} ctx
 * @param {Request} ctx.request
 * @param {Response} ctx.response
 */
const contextMenu = document.getElementById('context-menu')
const scope = document.querySelector('body')

// Prevent the menu from going out of bounds.
const normalizePosition = (mouseX, mouseY) => {
  const { left: scopeOffsetX, top: scopeOffsetY } =
    scope.getBoundingClientRect()

  const scopeX = mouseX - scopeOffsetX
  const scopeY = mouseY - scopeOffsetY

  const outOfBoundsOnX = scopeX + contextMenu.clientWidth > scope.clientWidth
  const outOfBoundsOnY = scopeY + contextMenu.clientHeight > scope.clientHeight

  let normalizedX = mouseX
  let normalizedY = mouseY

  // Normalize on X
  if (outOfBoundsOnX) {
    normalizedX = scopeOffsetX + scope.clientWidth - contextMenu.clientWidth
  }

  // Normalize on Y
  if (outOfBoundsOnY) {
    normalizedY = scopeOffsetY + scope.clientHeight - contextMenu.clientHeight
  }

  return { normalizedX, normalizedY }
}

// Display the menu only on right-click.
scope.addEventListener('contextmenu', (event) => {
  event.preventDefault()

  const { offsetX: mouseX, offsetY: mouseY } = event

  const { normalizedX, normalizedY } = normalizePosition(mouseX, mouseY)

  contextMenu.style.top = `${normalizedY}px`
  contextMenu.style.left = `${normalizedX}px`

  contextMenu.classList.remove('visible')

  setTimeout(() => {
    contextMenu.classList.add('visible')
  })
})

// Close the menu when the user clicks outside.
scope.addEventListener('click', (e) => {
  contextMenu.classList.remove('visible')
})

/**
 * Get current time date
 */
const getCurrentTimeDate = () => {
  const currentTimeDate = new Date()

  const weekday = new Array(7)
  weekday[0] = 'Sunday'
  weekday[1] = 'Monday'
  weekday[2] = 'Tuesday'
  weekday[3] = 'Wednesday'
  weekday[4] = 'Thuesday'
  weekday[5] = 'Friday'
  weekday[6] = 'Saturday'

  const month = new Array(12)
  month[0] = 'Jan'
  month[1] = 'Feb'
  month[2] = 'Mar'
  month[3] = 'Apr'
  month[4] = 'May'
  month[5] = 'Jun'
  month[6] = 'Jul'
  month[7] = 'Aug'
  month[8] = 'Sep'
  month[9] = 'Oct'
  month[10] = 'Nov'
  month[11] = 'Dec'

  let hours = currentTimeDate.getHours()

  let minutes = currentTimeDate.getMinutes()
  minutes = 10 > minutes ? '0' + minutes : minutes

  let seconds = currentTimeDate.getSeconds()
  seconds = 10 > seconds ? '0' + seconds : seconds

  const AMPM = 12 <= hours ? 'PM' : 'AM'

  if (12 === hours) {
    hours = 12
  } else {
    hours = hours % 12
  }

  const currentHour = `${hours}`
  const currentMinutes = `${minutes}`
  const currentSeconds = `${seconds}`
  const currentAMPM = `${AMPM}`

  const currentDay = weekday[currentTimeDate.getDay()]
  const currentDate = currentTimeDate.getDate()
  const currentMonth = month[currentTimeDate.getMonth()]
  const currentYear = currentTimeDate.getFullYear()

  document.getElementById('hours').innerHTML = currentHour
  document.getElementById('minutes').innerHTML = currentMinutes
  document.getElementById('seconds').innerHTML = currentSeconds
  document.getElementById('ampm').innerHTML = currentAMPM
  // document.getElementById('time').innerHTML = currentTime
  document.getElementById('day').innerHTML = currentDay + ', '
  document.getElementById('date').innerHTML = currentDate + ' '
  document.getElementById('month').innerHTML = currentMonth + ' '
  document.getElementById('year').innerHTML = currentYear + ' '

  document.getElementById('time-hours').innerHTML = currentHour + ':'
  document.getElementById('time-minutes').innerHTML = currentMinutes + ':'
  document.getElementById('time-seconds').innerHTML = currentSeconds + ' '
  document.getElementById('time-ampm').innerHTML = currentAMPM
  // document.getElementById('time').innerHTML = currentTime
  document.getElementById('time-day').innerHTML = currentDay + ', '
  document.getElementById('time-date').innerHTML = currentDate + ' '
  document.getElementById('time-month').innerHTML = currentMonth + ' '
  document.getElementById('time-year').innerHTML = currentYear + ' '

  document.getElementById('hours-mobile').innerHTML = currentHour
  document.getElementById('minutes-mobile').innerHTML = currentMinutes
  document.getElementById('seconds-mobile').innerHTML = currentSeconds
  document.getElementById('ampm-mobile').innerHTML = currentAMPM
  // document.getElementById('time').innerHTML = currentTime
  document.getElementById('day-mobile').innerHTML = currentDay + ', '
  document.getElementById('date-mobile').innerHTML = currentDate + ' '
  document.getElementById('month-mobile').innerHTML = currentMonth + ' '
  document.getElementById('year-mobile').innerHTML = currentYear + ' '

  setTimeout(getCurrentTimeDate, 500)
}
getCurrentTimeDate()

// Modal

const modal = document.getElementById('modal-new-file')

// Get the button that opens the modal
const btn = document.getElementById('new-file')

// Get the <span> element that closes the modal
const span = document.getElementById('close-new-file')

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = 'block'
  console.log('Get the modal')
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = 'none'
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = 'none'
  }
}

// When the user clicks on 'esc' key, close the modal
window.onkeydown = function (event) {
  if (27 === event.keyCode) {
    modal.style.display = 'none'
  }
}

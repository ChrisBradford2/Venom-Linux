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
  minutes = minutes < 10 ? '0' + minutes : minutes

  const AMPM = hours >= 12 ? 'PM' : 'AM'

  if (hours === 12) {
    hours = 12
  } else {
    hours = hours % 12
  }

  const currentTime = `${hours}:${minutes}${AMPM}`
  const currentDay = weekday[currentTimeDate.getDay()]

  const currentDate = currentTimeDate.getDate()
  const currentMonth = month[currentTimeDate.getMonth()]
  const CurrentYear = currentTimeDate.getFullYear()

  const fullDate = `${currentDate} ${currentMonth} ${CurrentYear}`

  document.getElementById('time').innerHTML = currentTime
  document.getElementById('day').innerHTML = currentDay
  document.getElementById('date').innerHTML = fullDate

  setTimeout(getCurrentTimeDate, 500)
}
getCurrentTimeDate()

// Modal

// eslint-disable-next-line no-undef
newModal('modal-new-file', 'new-file')

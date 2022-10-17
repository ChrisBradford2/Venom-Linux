/* eslint-disable prefer-const */

// Modal

const modal2 = document.getElementById('modal-settings-application')

// Get the button that opens the modal
const btn2 = document.getElementById('settings-application')
console.log(btn2)

// Get the <span> element that closes the modal
const span2 = document.getElementById('close-settings-application')
console.log(span2)

// When the user clicks the button, open the modal
btn2.onclick = function () {
  modal2.style.display = 'block'
  console.log('Get the modal')
}

// When the user clicks on <span> (x), close the modal
span2.onclick = function () {
  modal2.style.display = 'none'
}

// When the user clicks anywhere outside of the modal, close it.
window.onclick = function (event) {
  if (event.target === modal2) {
    modal2.style.display = 'none'
  }
}

// eslint-disable-next-line no-unused-vars
function openCity (evt, cityName) {
  let i, x, tablinks
  x = document.getElementsByClassName('city')
  for (i = 0; i < x.length; i++) {
    x[i].style.display = 'none'
  }
  tablinks = document.getElementsByClassName('tablink')
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' red', '')
  }
  document.getElementById(cityName).style.display = 'block'
  evt.currentTarget.className += ' red'
}

function changeToggleStateForDisplay (element, target) {
  element.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      console.log(element + ' is checked')
      document.getElementById(target).style.display = 'none'
    } else {
      console.log(element + ' is not checked')
      document.getElementById(target).style.display = 'inline'
    }
  })
}

if (false === document.getElementById('checkbox-hour').checked || false === document.getElementById('checkbox-minutes').checked) {
  document.getElementById('separator-hour-minute').innerHTML = ':'
} else {
  document.getElementById('separator-hour-minute').innerHTML = ''
}
if (false === document.getElementById('checkbox-minutes').checked || false === document.getElementById('checkbox-seconds').checked) {
  document.getElementById('separator-minute-seconds').innerHTML = ':'
} else {
  document.getElementById('separator-hour-seconds').innerHTML = ''
}

// eslint-disable-next-line prefer-const, no-undef
let setSpeedInterval = setInterval(MeasureConnectionSpeed, 2000) // setting the loop with time interval
console.log(setSpeedInterval)
/*
const myInputArea = document.getElementById('number-timeout')
myInputArea.addEventListener('input', (e) => {
  let myInputText = e.target.value
  let myInputNumber = myInputText * 1000
  console.log(myInputNumber)
  setSpeedInterval = 0
  // eslint-disable-next-line no-undef
  setSpeedInterval = setInterval(MeasureConnectionSpeed, myInputNumber)
  console.log(setSpeedInterval)
}) */

const checkboxDayShow = document.getElementById('checkbox-day')
changeToggleStateForDisplay(checkboxDayShow, 'day')

const checkboxDateShow = document.getElementById('checkbox-date')
changeToggleStateForDisplay(checkboxDateShow, 'date')

const checkboxMonthShow = document.getElementById('checkbox-month')
changeToggleStateForDisplay(checkboxMonthShow, 'month')

const checkboxYearShow = document.getElementById('checkbox-year')
changeToggleStateForDisplay(checkboxYearShow, 'year')

const checkboxHour = document.getElementById('checkbox-hour')
changeToggleStateForDisplay(checkboxHour, 'hours')

const checkboxMinutes = document.getElementById('checkbox-minutes')
changeToggleStateForDisplay(checkboxMinutes, 'minutes')

const checkboxSeconds = document.getElementById('checkbox-seconds')
changeToggleStateForDisplay(checkboxSeconds, 'seconds')

const checkboxDate = document.getElementById('checkbox-date')
changeToggleStateForDisplay(checkboxDate, 'date')

const checkboxBattery = document.getElementById('checkbox-battery')
changeToggleStateForDisplay(checkboxBattery, 'battery')

const checkboxNetworkShow = document.getElementById('checkbox-network-show')
changeToggleStateForDisplay(checkboxNetworkShow, 'speed-network')

const checkboxVibrationShow = document.getElementById('checkbox-vibration-state')
changeToggleStateForDisplay(checkboxVibrationShow, 'vibration')

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

// When the user clicks on 'esc' key, close the modal
window.onkeydown = function (event) {
  if (27 === event.keyCode) {
    modal2.style.display = 'none'
  }
}

// eslint-disable-next-line no-unused-vars
function openCity(evt, cityName) {
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

function changeToggleStateForDisplay(element, target) {
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

const checkboxVibrationToggle = document.getElementById('checkbox-vibration-toggle')

const white = '#FFFFFF'
const grey = '#808080'
const black = '#000000'

const elements = document.getElementsByTagName('*')
const body = document.getElementsByTagName('body')
const buttons = document.getElementsByTagName('button')
const modalContents = document.getElementsByClassName('modal-content')
const modalHeaders = document.getElementsByClassName('modal-header')
const sidebars = document.getElementsByClassName('sidebar')
const inputs = document.getElementsByTagName('input')
const selects = document.getElementsByTagName('select')

let setting = {
  id: 1,
  dateSetting: {
    day: checkboxDayShow.checked,
    date: checkboxDateShow.checked,
    month: checkboxMonthShow.checked,
    year: checkboxYearShow.checked
  },
  hoursSetting: {
    hours: checkboxHour.checked,
    minutes: checkboxMinutes.checked,
    seconds: checkboxSeconds.checked
  },
  vibration: {
    vibrationShowState: checkboxVibrationShow.checked,
    vibrationToggle: checkboxVibrationToggle.checked
  },
  battery: checkboxBattery.checked,
  network: {
    networkShow: checkboxNetworkShow.checked
  }
}

document.getElementById('checkbox-theme-mode').addEventListener('change', (event) => {
  if (false === event.currentTarget.checked) {
    for (const element of elements) {
      element.style.color = black
    }
    for (const button of buttons) {
      button.style.backgroundColor = white
    }
    body[0].style.backgroundColor = white
    body[0].style.backgroundImage = "url('../assets/img/background_light.png')"
    document.getElementsByClassName('nav')[0].style.backgroundColor = grey
    document.getElementById('context-menu').style.backgroundColor = white
    for (const modalContent of modalContents) {
      modalContent.style.backgroundColor = grey
    }
    for (const modalHeader of modalHeaders) {
      modalHeader.style.backgroundColor = white
    }
    for (const sidebar of sidebars) {
      sidebar.style.backgroundColor = white
    }
    document.getElementById('close-settings-application').style.color = white
    for (const input of inputs) {
      input.style.backgroundColor = white
    }
    for (const select of selects) {
      select.style.backgroundColor = white
    }
  } else {
    for (const element of elements) {
      element.style.color = null
    }
    for (const button of buttons) {
      button.style.backgroundColor = null
    }
    body[0].style.backgroundColor = null
    body[0].style.backgroundImage = null
    document.getElementsByClassName('nav')[0].style.backgroundColor = null
    document.getElementById('context-menu').style.backgroundColor = null
    for (const modalContent of modalContents) {
      modalContent.style.backgroundColor = null
    }
    for (const modalHeader of modalHeaders) {
      modalHeader.style.backgroundColor = null
    }
    for (const sidebar of sidebars) {
      sidebar.style.backgroundColor = null
    }
  }
})

function UdateObject(db, object) {
  const transaction = db.transaction('settingStore', 'readwrite')
  const objectStore = transaction.objectStore('settingStore')
  const req = objectStore.get(1)

  req.onsuccess = () => {
    const setting = request.result
    setting = object
  }

  const request = indexedDB.open('SettingSave', 1)
  let db
  // Create the object store
  request.onupgradeneeded = (event) => {
    db = event.target.result
    db.createObjectStore('settingStore', { keyPath: 'id' })
  }

  // Add the object to the store
  request.onsuccess = (event) => {
    db = event.target.result
    const transaction = db.transaction('settingStore', 'readwrite')
    const objectStore = transaction.objectStore('settingStore')
    objectStore.add(setting)
  }

  document.getElementById('save-settings').addEventListener('click', () => {
    setting = {
      id: 1,
      dateSetting: {
        day: checkboxDayShow.checked,
        date: checkboxDateShow.checked,
        month: checkboxMonthShow.checked,
        year: checkboxYearShow.checked
      },
      hoursSetting: {
        hours: checkboxHour.checked,
        minutes: checkboxMinutes.checked,
        seconds: checkboxSeconds.checked
      },
      vibration: {
        vibrationShowState: checkboxVibrationShow.checked,
        vibrationToggle: checkboxVibrationToggle.checked
      },
      battery: checkboxBattery.checked,
      network: {
        networkShow: checkboxNetworkShow.checked
      }
    }

    saveObject(db, setting)
  })

/* eslint-disable prefer-const */

// eslint-disable-next-line no-undef
setupModal('modal-settings-application', 'settings-application', 'close-settings-application')

// eslint-disable-next-line no-unused-vars
function openTab (evt, id) {
  let i, x, tablinks
  x = document.getElementsByClassName('city')
  for (i = 0; i < x.length; i++) {
    x[i].style.display = 'none'
  }
  tablinks = document.getElementsByClassName('tablink')
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' red', '')
  }
  document.getElementById(id).style.display = 'block'
  evt.currentTarget.className += ' red'
}

// allow to update the setting saved in the indexedDB
function udateObject (object) {
  let db = request.result
  const transaction = db.transaction('setting', 'readwrite')
  const objectStore = transaction.objectStore('setting')
  objectStore.put(object)
}

// Create the settingSave database
const request = indexedDB.open('SettingSave', 1)

// Create object store and save the setting
request.onupgradeneeded = (event) => {
  let db = event.target.result
  const objectStore = db.createObjectStore('setting', { keyPath: 'id' })

  objectStore.transaction.oncomplete = (event) => {
    const transaction = db.transaction('setting', 'readwrite')
    const objectStore = transaction.objectStore('setting')
    objectStore.add(setting)
  }
}

function changeToggleStateForDisplay (element, target) {
  element.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      document.getElementById(target).style.display = 'none'
    } else {
      document.getElementById(target).style.display = 'inline'
    }
  })
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

request.onsuccess = (event) => {
  let db = event.target.result
  let transaction = db.transaction('setting', 'readwrite')
  let objectStore = transaction.objectStore('setting')
  let request = objectStore.get(1)

  request.onsuccess = (event) => {
    let setting = event.target.result
    // udpate the setting checkbox

    checkboxDateShow.checked = setting.dateSetting.date
    changeToggleStateForDisplay(checkboxDateShow, 'date')

    checkboxDayShow.checked = setting.dateSetting.day
    changeToggleStateForDisplay(checkboxDayShow, 'day')

    checkboxHour.checked = setting.hoursSetting.hours
    changeToggleStateForDisplay(checkboxHour, 'hours')

    checkboxMinutes.checked = setting.hoursSetting.minutes
    changeToggleStateForDisplay(checkboxMinutes, 'minutes')

    checkboxSeconds.checked = setting.hoursSetting.seconds
    changeToggleStateForDisplay(checkboxSeconds, 'seconds')

    checkboxMonthShow.checked = setting.dateSetting.month
    changeToggleStateForDisplay(checkboxMonthShow, 'month')

    checkboxYearShow.checked = setting.dateSetting.year
    changeToggleStateForDisplay(checkboxYearShow, 'year')

    checkboxBattery.checked = setting.battery
    changeToggleStateForDisplay(checkboxBattery, 'battery')

    checkboxNetworkShow.checked = setting.network.networkShow
    changeToggleStateForDisplay(checkboxNetworkShow, 'speed-network')

    checkboxVibrationShow.checked = setting.vibrationShowState
    changeToggleStateForDisplay(checkboxVibrationShow, 'vibration')

    checkboxVibrationToggle.checked = setting.vibrationToggle
    changeToggleStateForDisplay(checkboxVibrationToggle, 'vibration-toggle')

    document.getElementById('checkbox-theme-mode').checked = setting.darkMode
    changeToggleStateForDisplay(document.getElementById('checkbox-theme-mode'), 'theme-mode')
  }
}

if (false === document.getElementById('checkbox-hour').checked || false === document.getElementById('checkbox-minutes').checked) {
  document.getElementById('separator-hour-minute').innerHTML = ':'
} else {
  document.getElementById('separator-hour-minute').innerHTML = ''
}
if (false === document.getElementById('checkbox-hour').checked || false === document.getElementById('checkbox-minutes').checked) {
  document.getElementById('separator-hour-minute-mobile').innerHTML = ':'
} else {
  document.getElementById('separator-hour-minute-mobile').innerHTML = ''
}
if (false === document.getElementById('checkbox-minutes').checked || false === document.getElementById('checkbox-seconds').checked) {
  document.getElementById('separator-minute-seconds').innerHTML = ':'
} else {
  document.getElementById('separator-hour-seconds').innerHTML = ''
}
if (false === document.getElementById('checkbox-minutes').checked || false === document.getElementById('checkbox-seconds').checked) {
  document.getElementById('separator-minute-seconds-mobile').innerHTML = ':'
} else {
  document.getElementById('separator-hour-seconds-mobile').innerHTML = ''
}

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
  },
  darkMode: document.getElementById('checkbox-theme-mode').checked
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
    body[0].style.backgroundImage = 'url(\'../assets/img/background_light.png\')'
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
    for (const input of inputs) {
      input.style.backgroundColor = null
    }
    for (const select of selects) {
      select.style.backgroundColor = null
    }
  }
})
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
    },
    darkMode: document.getElementById('checkbox-theme-mode').checked
  }
  udateObject(setting)
})

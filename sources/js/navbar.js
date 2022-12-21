/* eslint-disable no-unused-vars */

/**
 * Speed test
 */

const imageAddr = document.getElementById('domain-ping')
const downloadSize = 5000000 // bytes

const InitiateSpeedDetection = () => {
  window.setTimeout(MeasureConnectionSpeed, 1)
}

if (window.addEventListener) {
  window.addEventListener('load', InitiateSpeedDetection, false)
} else if (window.attachEvent) {
  window.attachEvent('onload', InitiateSpeedDetection)
}

const MeasureConnectionSpeed = () => {
  let startTime, endTime
  const download = new Image()
  download.onload = function () {
    endTime = (new Date()).getTime()
    showResults()
  }

  download.onerror = function () {
    if (isValidHttpUrl(imageAddr.value)) {
      document.getElementById('speed-test').innerHTML = 'Invalid URL'
    } else if ('false' === navigator.onLine) {
      document.getElementById('speed-test').innerHTML = 'No connexion'
    } else {
      document.getElementById('speed-test').innerHTML = 'Image not found'
    }
  }

  // eslint-disable-next-line prefer-const
  startTime = (new Date()).getTime()
  const cacheBuster = '?nnn=' + startTime
  download.src = imageAddr.value + cacheBuster

  const showResults = () => {
    const duration = (endTime - startTime) / 1000
    const bitsLoaded = downloadSize * 8
    const speedBps = (bitsLoaded / duration).toFixed(2)
    const speedKbps = (speedBps / 1024).toFixed(2)
    const speedMbps = (speedKbps / 1024).toFixed(2)
    document.getElementById('speed-test').innerHTML = speedMbps + ' Mbps'
  }
}

const timeInterval = document.getElementById('number-timeout')
let interval = setInterval(MeasureConnectionSpeed, timeInterval.value * 1000)

timeInterval.addEventListener('change', function () {
  clearInterval(interval)
  interval = setInterval(MeasureConnectionSpeed, timeInterval.value * 1000)
})

function isValidHttpUrl (string) {
  let url
  try {
    url = new URL(string)
  } catch (_err) {
    return false
  }
  return 'http:' === url.protocol || 'https:' === url.protocol
}

imageAddr.addEventListener('change', function () {
  if (isValidHttpUrl(imageAddr.value)) {
    clearInterval(interval)
    interval = setInterval(MeasureConnectionSpeed, timeInterval.value * 1000)
  }
})

/**
 * Battery
 */

function getBatteryPerMinutes () {
  navigator.getBattery()
    .then(function (battery) {
      const level = battery.level
      const levelStatus = (level * 100)
      const levelPercent = Math.round(levelStatus) + ' %' // Prevent battery to be decimal.
      const batteryIsCharging = battery.charging
      const icon = document.getElementById('battery-icon')
      const span = document.getElementById('battery-span')
      function addClass (className) {
        icon.classList.add(className)
      }
      if (false === batteryIsCharging) {
        if (0.1 > level) {
          addClass('fa-battery-empty')
        } else if (0.3 > level) {
          addClass('fa-battery-quarter')
        } else if (0.6 > level) {
          addClass('fa-battery-half')
        } else if (0.9 > level) {
          addClass('fa-battery-three-quarters')
        } else {
          addClass('fa-battery-full')
        }
      } else if (true === batteryIsCharging && 1 === level) {
        addClass('fa-plug-circle-check')
      } else {
        addClass('fa-plug-circle-bolt')
      }
      span.innerHTML = levelPercent
    })
}
setInterval(getBatteryPerMinutes(), 30000)

/**
 * Vibration
 */

function singleVibration (time) {
  // vibrate device for ${time} milliseconds
  if (true === vibrationIsAllowed) {
    window.navigator.vibrate(time)
  }
}

function multiVibration (array) {
  // Basically it is performed as a series of [VIBRATION] [PAUSE] [VIBRATION] [PAUSE] [VIBRATION] [PAUSE]...
  if (true === vibrationIsAllowed) {
    window.navigator.vibrate(array)
  }
}

let vibrationIsAllowed = true
const iconVibration = document.getElementById('vibration-state-icon')
const spanVibration = document.getElementById('vibration-state-text')

function checkVibrationToggle () {
  document.getElementById('checkbox-vibration-toggle').checked = true
}

function uncheckVibrationToggle () {
  document.getElementById('checkbox-vibration-toggle').checked = false
}

function toggleVibrationState () {
  vibrationIsAllowed = !vibrationIsAllowed
  if (true === vibrationIsAllowed) {
    iconVibration.classList.replace('fa-mobile', 'fa-mobile-screen')
    spanVibration.innerHTML = 'Vibration On'
    multiVibration([300, 100, 200, 50, 300])
    checkVibrationToggle()
  } else {
    iconVibration.classList.replace('fa-mobile-screen', 'fa-mobile')
    spanVibration.innerHTML = 'Vibration Off'
    uncheckVibrationToggle()
  }
}

if (true === vibrationIsAllowed) {
  iconVibration.classList.add('fa-mobile-screen')
  spanVibration.innerHTML = 'Vibration On'
  checkVibrationToggle()
} else {
  iconVibration.classList.add('fa-mobile')
  spanVibration.innerHTML = 'Vibration Off'
  uncheckVibrationToggle()
}

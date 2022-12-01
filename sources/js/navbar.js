/* eslint-disable no-unused-vars */

/**
 * Speed test
 */

const imageAddr = 'https://venom-linux-seven.vercel.app/assets/img/background_dark.png'
const downloadSize = 4995374 // bytes

function ShowProgressMessage (msg) {
  if (console) {
    if ('string' === typeof msg) {
      console.log(msg)
    } else {
      for (let i = 0; i < msg.length; i++) {
        console.log(msg[i])
      }
    }
  }

  const oProgress = document.getElementById('progress')
  if (oProgress) {
    const actualHTML = ('string' === typeof msg) ? msg : msg.join('<br />')
    oProgress.innerHTML = actualHTML
  }
}

function InitiateSpeedDetection () {
  window.setTimeout(MeasureConnectionSpeed, 1)
};

if (window.addEventListener) {
  window.addEventListener('load', InitiateSpeedDetection, false)
} else if (window.attachEvent) {
  window.attachEvent('onload', InitiateSpeedDetection)
}

function MeasureConnectionSpeed () {
  let startTime, endTime
  const download = new Image()
  download.onload = function () {
    endTime = (new Date()).getTime()
    showResults()
  }

  download.onerror = function (_err, _msg) {
    document.getElementById('speed-test').innerHTML = 'No connexion'
  }

  // eslint-disable-next-line prefer-const
  startTime = (new Date()).getTime()
  const cacheBuster = '?nnn=' + startTime
  download.src = imageAddr + cacheBuster

  function showResults () {
    const duration = (endTime - startTime) / 1000
    const bitsLoaded = downloadSize * 8
    const speedBps = (bitsLoaded / duration).toFixed(2)
    const speedKbps = (speedBps / 1024).toFixed(2)
    const speedMbps = (speedKbps / 1024).toFixed(2)
    document.getElementById('speed-test').innerHTML = speedMbps + ' Mbps'
  }
}

const timeInterval = document.getElementById('number-timeout')
let intervalHasChanged = false

let interval = setInterval(MeasureConnectionSpeed, timeInterval.value * 1000) // setting the loop with time interval
console.log('initial : ' + interval)

timeInterval.addEventListener('change', (e) => {
  intervalHasChanged = true
  timeInterval.value = e.target.value
  clearInterval(interval)
  interval = setInterval(MeasureConnectionSpeed, timeInterval.value * 1000) // setting the loop with time interval
  console.log('modified : ' + interval)
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

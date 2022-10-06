/**
 * Speed test
 */

var imageAddr = "https://venom-linux-seven.vercel.app/assets/img/background_dark.png"; 
var downloadSize = 4995374; //bytes

function ShowProgressMessage(msg) {
    if (console) {
        if (typeof msg == "string") {
            console.log(msg);
        } else {
            for (var i = 0; i < msg.length; i++) {
                console.log(msg[i]);
            }
        }
    }
    
    var oProgress = document.getElementById("progress");
    if (oProgress) {
        var actualHTML = (typeof msg == "string") ? msg : msg.join("<br />");
        oProgress.innerHTML = actualHTML;
    }
}

function InitiateSpeedDetection() {
    window.setTimeout(MeasureConnectionSpeed, 1);
};    

if (window.addEventListener) {
    window.addEventListener('load', InitiateSpeedDetection, false);
} else if (window.attachEvent) {
    window.attachEvent('onload', InitiateSpeedDetection);
}

function MeasureConnectionSpeed() {
    var startTime, endTime;
    var download = new Image();
    download.onload = function () {
        endTime = (new Date()).getTime();
        showResults();
    }
    
    download.onerror = function (err, msg) {
        document.getElementById("speed-test").innerHTML = "No connexion"
    }
    
    startTime = (new Date()).getTime();
    var cacheBuster = "?nnn=" + startTime;
    download.src = imageAddr + cacheBuster;
    
    function showResults() {
        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = downloadSize * 8;
        var speedBps = (bitsLoaded / duration).toFixed(2);
        var speedKbps = (speedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);
        document.getElementById("speed-test").innerHTML = speedMbps + " Mbps"
    }
}
var interval = setInterval(MeasureConnectionSpeed, 2000); //setting the loop with time interval

/**
 * Battery
 */

navigator.getBattery()
  .then(function(battery) {
    let level = battery.level;
    let levelPercent = (level * 100) + " %";
    let batteryIsCharging = battery.charging;
    let icon = document.getElementById("battery");
    let span = document.getElementById("battery-span");
    function addClass(className) {
        icon.classList.add(className);
    }
    if (batteryIsCharging === false) {
        if (level < 0.1) {
            addClass("fa-battery-empty")
        } else if (level < 0.3) {
            addClass("fa-battery-quarter")
        } else if (level < 0.6) {
            addClass("fa-battery-half")
        } else if (level < 0.9) {
            addClass("fa-battery-three-quarters")
        } else {
            addClass("fa-battery-full")
        }
    } else if (batteryIsCharging === true && level == 1) {
        addClass("fa-plug-circle-check")
    } else {
        addClass("fa-plug-circle-bolt")
    }
    span.innerHTML = levelPercent
});

/**
 * Vibration
 */

function singleVibration(time) {
    // vibrate device for ${time} milliseconds
    window.navigator.vibrate(time);
}

function multiVibration(array) {
    // Basically it is performed as a series of [VIBRATION] [PAUSE] [VIBRATION] [PAUSE] [VIBRATION] [PAUSE]...
    window.navigator.vibrate(array);
}

let vibrationIsAllowed = true;
let iconVibration = document.getElementById("vibration-state-icon");
let spanVibration = document.getElementById("vibration-state-text");

function toggleVibrationState() {
    vibrationIsAllowed = !vibrationIsAllowed;
    if (vibrationIsAllowed == true) {
        iconVibration.classList.replace("fa-mobile", "fa-mobile-screen")
        spanVibration.innerHTML = "Vibration On";
        multiVibration([300, 100, 200, 50, 300]);
    } else {
        iconVibration.classList.replace("fa-mobile-screen", "fa-mobile")
        spanVibration.innerHTML = "Vibration Off"
    }
}

if (vibrationIsAllowed == true) {
    iconVibration.classList.add("fa-mobile-screen")
    spanVibration.innerHTML = "Vibration On"
} else {
    iconVibration.classList.add("fa-mobile")
    spanVibration.innerHTML = "Vibration Off"
}

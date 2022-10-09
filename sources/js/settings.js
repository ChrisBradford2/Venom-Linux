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

// When the user clicks anywhere outside of the modal, close it
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

const checkboxDate = document.getElementById('checkbox-date')
changeToggleState(checkboxDate)

function changeToggleState (element) {
  element.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
      console.log(element + ' is checked')
      document.getElementById('day').style.display = 'none'
    } else {
      console.log(element + ' is not checked')
      document.getElementById('day').style.display = 'inline'
    }
  })
}

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

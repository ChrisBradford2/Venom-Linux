// eslint-disable-next-line no-unused-vars
function newModal (modalId, btnId, spanId) {
  // Get the modal
  const modal = document.getElementById(modalId)

  // Get the button that opens the modal
  const btn = document.getElementById(btnId)
  console.log(btn)

  // Get the <span> element that closes the modal
  const span = document.getElementById(spanId)
  console.log(span)

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
}

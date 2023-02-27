// eslint-disable-next-line no-unused-vars
function setupModal (modal, btn, span) {
  const modalEl = document.getElementById(modal)
  const btnEl = document.getElementById(btn)
  const closeEl = document.getElementById(span)

  btnEl.onclick = function () {
    modalEl.style.display = 'block'
  }

  closeEl.onclick = function () {
    modalEl.style.display = 'none'
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target === modalEl) {
      modalEl.style.display = 'none'
    }
  }

  // When the user clicks on 'esc' key, close the modal
  window.onkeydown = function (event) {
    if (27 === event.keyCode) {
      modalEl.style.display = 'none'
    }
  }
}

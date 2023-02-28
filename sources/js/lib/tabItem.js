/* eslint-disable prefer-const */
// eslint-disable-next-line no-unused-vars
function openTabisx (evt, id) {
  let i, x, tablinks
  x = document.getElementsByClassName('tab-item')
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

/* eslint-disable no-undef */
// Modal

const modal3 = document.getElementById('modal-calculator')

// Get the button that opens the modal
const btn3 = document.getElementById('calculator-application')
console.log(btn3)

// Get the <span> element that closes the modal
const span3 = document.getElementById('close-calculator')
console.log(span3)

// When the user clicks the button, open the modal
btn3.onclick = function () {
  modal3.style.display = 'block'
  console.log('Get the modal')
}

// When the user clicks on <span> (x), close the modal
span3.onclick = function () {
  modal3.style.display = 'none'
}

// When the user clicks anywhere outside of the modal, close it.
window.onclick = function (event) {
  if (event.target === modal3) {
    modal3.style.display = 'none'
  }
}

const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator--keys')
const display = document.getElementById('screen')
let isComplexStatement = false
let actions = []

/**
* For each key we add an event listener
* */
keys.addEventListener('click', e => {
  // we get clicked key, the action realised, the displayed number and the type previous key typed using data attributs
  const key = e.target
  const action = key.dataset.action
  const keyContent = key.textContent
  let displayedNum = display.textContent
  const previousKeyType = calculator.dataset.previousKeyType

  // Check if the user has used more than one operator to activate the complex statement mode
  if (1 <= actions.length && !actions.includes('calculate')) {
    isComplexStatement = true
  }

  /**
   * Reset of the screen in cas of 0, operator or error
   */
  if (!action) {
    if ('0' === displayedNum || 'operator' === previousKeyType || 'Error' === displayedNum) {
      display.textContent = keyContent
      calculator.dataset.previousKeyType = ''
    } else {
      display.textContent = displayedNum + keyContent
    }
  }

  // We retrieve the last value, operator that were set on calculator's dataset and then get the displayed value thus, allowing to know the first and second value
  const firstValue = calculator.dataset.firstValue
  const operator = calculator.dataset.operator
  const secondValue = displayedNum

  /**
   * complex statement mode
   * Allow the user to make many statement e.g. : 1+1+1+1+1/2
   */
  if (action && 'clear' !== action && isComplexStatement) {
    if (firstValue && operator && secondValue !== undefined) {
      displayedNum = calculate(firstValue, operator, secondValue)
      display.textContent = displayedNum
    }
  }

  /**
   * Setting of the first value and type of operation to do
   */
  if (
    'plus' === action ||
    'minus' === action ||
    'multiply' === action ||
    'divide' === action
  ) {
    calculator.dataset.previousKeyType = 'operator'
    calculator.dataset.firstValue = displayedNum
    calculator.dataset.operator = action
    actions.push(action)
  }

  /**
   * Other actions
  */

  if ('decimal' === action) {
    singleVibration(100)
    display.textContent = displayedNum + '.'
    actions.push(action)
  }

  if ('clear' === action) {
    singleVibration(100)
    display.textContent = '0'
    calculator.dataset.firstValue = 0
    calculator.dataset.operator = ''
    displayedNum = 0
  }

  if ('opposite' === action) {
    singleVibration(100)
    displayedNum = -displayedNum
    display.textContent = displayedNum
  }

  if ('calculate' === action) {
    multiVibration([100, 100, 50, 100, 50, 100])
    actions.push(action)
    displayedNum = calculate(firstValue, operator, secondValue)
    console.log(displayedNum)
    if ('0' !== displayedNum && operator !== undefined) display.textContent = calculate(firstValue, operator, secondValue)
    isComplexStatement = false
    actions = []
  }

  console.log(actions)
})

/**
 *
 * @param {string} firstValue
 * @param {string} operator
 * @param {string} secondValue
 * @returns {string|int}
 */
function calculate (firstValue, operator, secondValue) {
  console.log(firstValue, operator, secondValue)
  let result = 0
  switch (operator) {
    case 'plus':
      result = parseFloat(firstValue) + parseFloat(secondValue)
      break
    case 'minus':
      result = parseFloat(firstValue) - parseFloat(secondValue)
      break
    case 'multiply':
      result = parseFloat(firstValue) * parseFloat(secondValue)
      break
    case 'divide':
      result = parseFloat(firstValue) / parseFloat(secondValue)
      break
  }

  if (!isNaN(result) && result !== Infinity) {
    return result
  }

  return 'Error'
}

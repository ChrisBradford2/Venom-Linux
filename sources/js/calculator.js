
const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator--keys')
const display = document.getElementById('screen')

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
  let isComplexStatement = false

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

  const firstValue = calculator.dataset.firstValue
  const operator = calculator.dataset.operator
  const secondValue = displayedNum

  /**
   * Allow the user to make many statement e.g. : 1+1+1+1+1/2
   */
  if (action && 'clear' !== action) {
    if (firstValue && operator && secondValue !== undefined) {
      displayedNum = calculate(firstValue, operator, secondValue)
      display.textContent = displayedNum
      isComplexStatement = true
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
  }

  /**
   * Other actions
  */

  if ('decimal' === action) {
    display.textContent = displayedNum + '.'
  }

  if ('clear' === action) {
    display.textContent = '0'
    calculator.dataset.firstValue = 0
    calculator.dataset.operator = ''
    displayedNum = 0
  }

  if ('opposite' === action) {
    displayedNum = -displayedNum
    display.textContent = displayedNum
  }

  if ('calculate' === action) {
    displayedNum = calculate(firstValue, operator, secondValue)
    if ('0' !== displayedNum && operator !== undefined) display.textContent = calculate(firstValue, operator, secondValue)
    // we have to fix the first value to 0 in case of complex statement to avoid doing firstValue + firstValue
    if (isComplexStatement) calculator.dataset.firstValue = 0
  }
})

/**
 *
 * @param {string} firstValue
 * @param {string} operator
 * @param {string} secondValue
 * @returns {string|int}
 */
function calculate (firstValue, operator, secondValue) {
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

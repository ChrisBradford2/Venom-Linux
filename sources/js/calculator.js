
const calculator = document.getElementById('calculator')

const keys = calculator.querySelector('.calculator--keys')

let keysTyped = []

keys.addEventListener('click', (event) => {
  if (event.target.matches('button')) {
    const key = event.target
    // use of data attributes to recognize the type of action executed
    const action = key.dataset.action
    const keyTyped = key.textContent
    const screen = document.getElementById('screen')
    const displayedNumber = screen.textContent
    // use data attributes to store the type of the previous key typed
    const previousKeyType = calculator.dataset.previousKeyType

    if (!action) {
      if (displayedNumber === '0') {
        if (previousKeyType !== '') {
          screen.textContent = `${displayedNumber}${keyTyped}`
          console.log('first')
        }
        screen.textContent = keyTyped
        console.log('second 1')
      } else {
        console.log('second 2')
        screen.textContent = `${displayedNumber}${keyTyped}`
      }
    }

    switch (action) {
      case 'plus':
        display(displayedNumber, '+', screen)
        calculator.dataset.previousKeyType = 'operator'
        break
      case 'minus':
        display(displayedNumber, '-', screen)
        calculator.dataset.previousKeyType = 'operator'
        break
      case 'multiply':
        display(displayedNumber, '*', screen)
        calculator.dataset.previousKeyType = 'operator'
        break
      case 'divide':
        display(displayedNumber, '/', screen)
        calculator.dataset.previousKeyType = 'operator'
        break
      case 'decimal':
        display(displayedNumber, '.', screen)
        break
      case 'clear':
        display(0, null, screen)
        keysTyped = []
        break
      case 'equal':

        keysTyped.push(displayedNumber)
        calculate(keysTyped)
        break
      default:
        calculator.dataset.previousKeyType = ''
        break
    }
  }
  console.log(keysTyped)
  console.log(calculator.dataset.previousKeyType)
})

function display(number, operator, screen) {
  console.log('third')
  if (operator) {
    // eslint-disable-next-line no-return-assign
    return screen.textContent = `${number}${operator}`
  }
  // eslint-disable-next-line no-return-assign
  return screen.textContent = `${number}`
}

function calculate(keysTyped) {
  const keys = []
  let equation = 0;

  for (let i = 0; i < keysTyped[0].length; i++) {
    keys.push(keysTyped[0][i])
  }

  keys.reduce((previousValue, currentValue) => {
    console.log(previousValue, currentValue)

    /*if (!parseInt(e)) {
      switch (e) {
        case '*':
          equation = equation
          break
      }
    }*/
  })

}

/**
 * Class Application
 *
 * @param {Application} object
 */
class Application {
  constructor (tag, icon, name, link, target) {
    this.tag = tag
    /* String : Path of the svg icon

    Directory and extension are already defined, please
    ONLY set the name file. */
    this.icon = icon
    // String : Name of the application
    this.name = name
    // String : Link to redirect
    this.link = link
    // Boolean : Should the link be opened in a new tab ?
    this.target = target
  }
}

const figma = new Application(
  'a',
  'figma',
  'Figma',
  'https://www.figma.com/file/SZWyC97gtK3khQtp0NgFEE/OS-project?node-id=0%3A1',
  true
)
const github = new Application(
  'a',
  'github',
  'Github',
  'https://github.com/ChrisBradford2/Venom-Linux'
)
const settings = new Application(
  'div',
  'settings',
  'Settings',
  'https://fonts.googleapis.com'
)

// Add the application in the array :
const applicationList = [github, figma, settings]

// eslint-disable-next-line no-unused-vars
function formdata () {
  const newFileName = document.getElementById('new-file-name').value
  console.log(newFileName)
  const newFile = new Application('div', 'file', newFileName, '#')
  console.log(newFile)
  applicationList.push(newFile)
  console.log(applicationList)
  const initialSize = applicationList.length
  const size = initialSize - (initialSize - 1)
  console.log(size)

  // Storing data:
  const applicationJSON = JSON.stringify(newFile)
  localStorage.setItem('applicationText', applicationJSON)

  // Retrieving data:
  const text = localStorage.getItem('applicationText')
  const obj = JSON.parse(text)

  // Inject the div to application's list section.
  document.getElementById('application-list').innerHTML += `
  <div class="desktop--app-list--icon">
          <${obj.tag} id="${obj.icon}-${size}-application">
          <img src="assets/icons/${obj.icon}.svg" alt="${obj.icon} text file application" />
          <p>${obj.name}.txt</p>
      </a>
  </div>
  `

  document.getElementById('new-file-name').value = ''
  document.getElementById('modal-new-file').style.display = 'none'
}

applicationList.forEach(function (application) {
  // Storing data:
  const applicationJSON = JSON.stringify(application)
  localStorage.setItem('applicationItem', applicationJSON)

  // Retrieving data:
  const text = localStorage.getItem('applicationItem')
  const obj = JSON.parse(text)

  // Set condition of the target="_blank".
  let blank
  if (true === obj.target) {
    blank = ' target="_blank"'
  } else {
    blank = ''
  }

  // Set condition of the target="_blank".
  let isLink
  if ('a' === obj.tag) {
    isLink = ` href="${obj.link}"`
  } else {
    isLink = ''
  }

  // Inject the div to application's list section.
  document.getElementById('application-list').innerHTML += `
    <${obj.tag} class="desktop--app-list--icon" id="${obj.icon}-application"${isLink}${blank}>
      <img src="assets/icons/${obj.icon}.svg" alt="${obj.icon} application" />
      <p>${obj.name}</p>
    </a>
   `
})

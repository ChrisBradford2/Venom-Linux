/**
 * Class Application
 *
 * @param {Application} object
 */
class Application {
  constructor(icon, name, link, target) {
    // String : Path of the svg icon
    this.icon = icon; // Directory and extension are already defined, please ONLY set the name file.
    // String : Name of the application
    this.name = name;
    // String : Link to redirect
    this.link = link;
    // Boolean : Should the link be opened in a new tab ?
    this.target = target;
  }
}

const figma = new Application(
  "figma",
  "Figma",
  "https://www.figma.com/file/SZWyC97gtK3khQtp0NgFEE/OS-project?node-id=0%3A1",
  true
);
const github = new Application(
  "github",
  "Github",
  "https://github.com/ChrisBradford2/Venom-Linux"
);
const firefox = new Application(
  "firefox",
  "Firefox",
  "https://fonts.googleapis.com"
);

let applicationList = [github, figma, firefox];

applicationList.forEach(function (application) {
  // Storing data:
  const applicationJSON = JSON.stringify(application);
  localStorage.setItem("applicationItem", applicationJSON);

  // Retrieving data:
  let text = localStorage.getItem("applicationItem");
  let obj = JSON.parse(text);
  // console.log(obj);

  var blank;
  if (obj.target === true) {
    blank = 'target="_blank"';
  } else {
    blank = "";
  }

  document.getElementById("application-list").innerHTML += `
      <div class="desktop--app-list--icon">
          <a href="${obj.link}" ${blank}>
              <img src="assets/icons/${obj.icon}.svg" alt="${obj.icon} application" />
              <p>${obj.name}</p>
          </a>
      </div>
      `;
});

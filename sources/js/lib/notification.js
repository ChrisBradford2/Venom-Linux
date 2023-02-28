/* eslint-disable no-unused-vars */
const spawnNotification = (body, icon, title) => {
  if ('granted' !== Notification.permission) {
    Notification.requestPermission().then((permission) => {
      if ('granted' === permission) {
        const options = {
          body,
          icon
        }
        const n = new Notification(title, options)
        new Audio('../assets/sounds/welcome.wav').play()
      }
    })
  } else {
    const options = {
      body,
      icon
    }
    const n = new Notification(title, options)
  }
}

export default spawnNotification

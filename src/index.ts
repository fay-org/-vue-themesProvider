import './common.less'

const btn: Element = document.querySelector('#btn')
let theme = 'light'
const root: Element = document.querySelector('html')
root.classList.remove('light', 'dark')
root.classList.add(theme)
btn.addEventListener('click', () => {
  if (theme === 'light') {
    theme = 'dark'
  } else {
    theme = 'light'
  }
  root.classList.remove('light', 'dark')
  root.classList.add(theme)
})

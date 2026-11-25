// 화면 위쪽에 도달한 섹션에 맞춰 메뉴의 밑줄을 옮긴다.
const sections = document.querySelectorAll('main section')
const links = document.querySelectorAll('nav a')
const header = document.querySelector('.site-header')

function markCurrentSection() {
  let current = sections[0]
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= header.offsetHeight + 12) current = section
  }
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
    current = sections[sections.length - 1]
  }
  for (const link of links) {
    if (link.hash === '#' + current.id) link.setAttribute('aria-current', 'location')
    else link.removeAttribute('aria-current')
  }
}

window.addEventListener('scroll', markCurrentSection, { passive: true })
window.addEventListener('resize', markCurrentSection)
markCurrentSection()

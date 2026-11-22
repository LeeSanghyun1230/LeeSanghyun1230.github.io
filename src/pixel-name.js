// Hand-drawn 5 × 7 lettering. The heading retains its accessible name.
const glyphs = {
  S:[15,16,16,14,1,1,30], A:[14,17,17,31,17,17,17],
  N:[17,25,25,21,19,19,17], G:[15,16,16,23,17,17,15],
  H:[17,17,17,31,17,17,17], Y:[17,17,10,4,4,4,4],
  U:[17,17,17,17,17,17,14], L:[16,16,16,16,16,16,31],
  E:[31,16,16,30,16,16,31], '.':[0,0,0,0,0,12,12]
}
export function drawName(heading) {
  const canvas = document.createElement('canvas')
  canvas.width = 47
  canvas.height = 16
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  for (const [line,word] of ['SANGHYUN','LEE.'].entries()) {
    Array.from(word).forEach((letter,index) => {
      ctx.fillStyle = letter === '.' ? '#9af5bb' : '#f6f2e3'
      glyphs[letter].forEach((row,y) => {
        for (let x=0;x<5;x++) if (row & (16 >> x)) ctx.fillRect(index*6+x,line*9+y,1,1)
      })
    })
  }
  canvas.className = 'pixel-name'
  canvas.setAttribute('aria-hidden','true')
  heading.replaceChildren(canvas)
}

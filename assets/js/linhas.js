/*--------------------
Init
--------------------*/
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
let cell, dpr

/*--------------------
Draw
--------------------*/
let draw = () => {
  ctx.fillStyle = 'red'
  ctx.filter = 'blur(1px)'
  ctx.font = `bold ${canvas.width * .15}px Arial`
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.fillText('{Arthur}', canvas.width * .5, canvas.height * .5)
  ctx.filter = 'none'
  let Lines = []
  for (let y = 0; y < canvas.height; y+=cell) {
    for (let x = 0; x < canvas.width; x+=cell) {
      Lines.push({
        x: x,
        y: y,
        p: ctx.getImageData(x + cell/2, y + cell/2, 1, 1).data[3] > 0
      })
    }
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.lineWidth = 1.3
  ctx.strokeStyle = '#ffffff71'
  ctx.beginPath()
  Lines.forEach(p => {
    if (p.p) {
      ctx.moveTo(p.x, p.y)
      ctx.lineTo(p.x + cell, p.y + cell)
    } else {
      ctx.moveTo(p.x, p.y + cell)
      ctx.lineTo(p.x + cell, p.y)
    }
  })
  ctx.stroke()
}
/*--------------------
Init
--------------------*/
const init = () => {
  dpr = window.devicePixelRatio
  canvas.style.width = `${window.innerWidth}px`
  canvas.style.height = `${window.innerHeight}px`
  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr
  cell = window.innerWidth < 500 ? dpr > 1 ? 1 : 1 : dpr > 1 ? 10 : 10
  draw()  
}

function onWindowResize() {
init()
}

function mudaLinha() {
  init()
  ctx.strokeStyle = 'black'
  ctx.stroke()
}

init()
onWindowResize();
window.addEventListener("resize", onWindowResize);
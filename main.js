const dd = (val) => console.log(val)
const canvas = document.querySelector('#canvas1')
const song = document.querySelector('#song')
const ctx = canvas.getContext('2d')
canvas.height = window.innerHeight
canvas.width =  window.innerWidth

let particleArray = []
const numberOfParticles = 200;
ctx.lineCap = 'round'

const pumpkin = new Image()
pumpkin.src = 'pumpkins.png'


class Particle {
    constructor(){
        this.radius = Math.random() * 200 + 20
        this.x = Math.random() * canvas.width
        this.y = canvas.height + this.radius * 2
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 5 + 1
        this.angle = Math.random() * 360
        this.spin = Math.random() < 0.5 ? 1 : -1
        this.frameX = Math.floor(Math.random() * 3)
        this.frameY = Math.floor(Math.random() * 3)
        this.spriteSize = 900/3
    }
    update(){
        this.angle += 5
        this.x += this.speedX
        this.y -= this.speedY
        if(this.radius > 1) this.radius -= 0.5
        return this
    }
    draw(){
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle * Math.PI/360 * this.spin)
        ctx.drawImage(
            pumpkin, 
            this.frameX * this.spriteSize, 
            this.frameY * this.spriteSize,
            this.spriteSize,
            this.spriteSize,
            0 - this.radius/2,
            0 - this.radius/2,
            this.radius,
            this.radius
        )
        ctx.translate(- this.x, - this.x)
        ctx.restore()
        return this
    }
}

function init(){
    song.play()
    for(let i = 0; i < numberOfParticles; i++){
        particleArray.push(new Particle())
    }
}
init()
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if(particleArray.length < numberOfParticles){
        particleArray.push(new Particle())
    }
    for(let i = 0; i < particleArray.length; i++){
        dd(particleArray[i])
        if(particleArray[i].radius < 1) particleArray.splice(i,1)
        particleArray[i].update()
        particleArray[i].draw()
    }
    requestAnimationFrame(animate)
}


animate()


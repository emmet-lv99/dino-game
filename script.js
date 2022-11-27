import {setupGround, updateGround} from './ground.js'

// 배율을 위한 기본 사이즈
const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001 

// 게임 전체를 감싸는 엘리먼트 선택
const worldElem = document.querySelector('[data-world]')
const scoreElem = document.querySelector('[data-score]')
const startScreenElem = document.querySelector('[data-start-screen]')

setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)
document.addEventListener("keydown", handleStart, {once: true})


let lastTime
let speedScale
let score

function update(time) {
  if (lastTime === null) {
    lastTime = time 
    window.requestAnimationFrame(update)
    return
  }
  const delta = time - lastTime
  
  updateGround(delta, speedScale)
  updateSpeedScale(delta)
  updateScore(delta)

  lastTime = time
  window.requestAnimationFrame(update)
}


function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE
}

function updateScore(delta) {
  score += delta * .01
  scoreElem.textContent = Math.floor(score)
}

function handleStart() {
  lastTime = null
  speedScale = 1
  score = 0
  setupGround()
  startScreenElem.classList.add('hide')
  // 애니메이션 실행 함수
  window.requestAnimationFrame(update)
}

// 배율 조절을 위한 fn
function setPixelToWorldScale() {

  let worldToPixelScale
  if(window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT
  }
  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`
}


/////




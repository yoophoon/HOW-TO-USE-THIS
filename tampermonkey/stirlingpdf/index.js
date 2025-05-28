let toggleMenuSVG=`<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1746676731177" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7815" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"><path d="M733.312 671.68l58.112 52.096L1024 515.456l-232.576-208.32-58.112 52.032 131.584 117.952h-280.32v69.76h288l-139.264 124.8zM511.488 896H0v-69.824h511.488V896z m0-698.176H0V128h511.488v69.824z m0 349.056H0v-69.76h511.488v69.76z" fill="currentcolor" p-id="7816"></path></svg>`
let toggleMenuB64=`data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNzQ2Njc2NzMxMTc3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijc4MTUiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPjxwYXRoIGQ9Ik03MzMuMzEyIDY3MS42OGw1OC4xMTIgNTIuMDk2TDEwMjQgNTE1LjQ1NmwtMjMyLjU3Ni0yMDguMzItNTguMTEyIDUyLjAzMiAxMzEuNTg0IDExNy45NTJoLTI4MC4zMnY2OS43NmgyODhsLTEzOS4yNjQgMTI0Ljh6TTUxMS40ODggODk2SDB2LTY5LjgyNGg1MTEuNDg4Vjg5NnogbTAtNjk4LjE3NkgwVjEyOGg1MTEuNDg4djY5LjgyNHogbTAgMzQ5LjA1Nkgwdi02OS43Nmg1MTEuNDg4djY5Ljc2eiIgZmlsbD0iIzAwMDAwMCIgcC1pZD0iNzgxNiI+PC9wYXRoPjwvc3ZnPg==`

const middleContainer=document.querySelector('#toolbarViewerMiddle')
const toggleMenuBtn=document.createElement('div')
const navbar=document.querySelector('nav.navbar')
const outerContainer=document.querySelector('#outerContainer')
toggleMenuBtn.innerHTML=toggleMenuSVG
toggleMenuBtn.classList.add('toggleMenuBtn')
toggleMenuBtn.id='toggleMenuBtn'
toggleMenuBtn.title='toggleMenuBtn'
middleContainer.appendChild(toggleMenuBtn)

console.log(middleContainer)

let originalHeight=outerContainer.style.height

toggleMenuBtn.onclick=function(){
  if(toggleMenuBtn.getAttribute('toggle')){
    toggleMenuBtn.classList.remove('disable')
    toggleMenuBtn.removeAttribute('toggle')
    navbar.style.display='flex'
    outerContainer.style.height=''
  }else{
    toggleMenuBtn.classList.add('disable')
    toggleMenuBtn.setAttribute('toggle','off')
    navbar.style.display='none'
    outerContainer.style.height='100%'
  }
}

let styleEl = document.createElement('style')
document.head.appendChild(styleEl)
// styleEl.sheet.insertRule(`#toggleMenuBtn::before {
//     content: "";
//     mask-image: ${toggleMenuSVG};
//   }`)

styleEl.sheet.insertRule(`#toggleMenuBtn {
    height: 2rem;
    width: 2rem;
    margin-left: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    rotate: 270deg;
  }`)

styleEl.sheet.insertRule(`#toggleMenuBtn.disable {
    rotate: 90deg;
  }`)

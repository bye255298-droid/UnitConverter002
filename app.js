let imp = true
let lang = "th"

const ft = document.getElementById("ft")
const inch = document.getElementById("inch")
const cm = document.getElementById("cm")
const out = document.getElementById("out")
const liquid = document.getElementById("liquid")

const text = {
  th:{title:"ตัวแปลงหน่วย",feet:"ฟุต",inch:"นิ้ว",cm:"เซนติเมตร",result:"ผลลัพธ์"},
  en:{title:"Unit Converter",feet:"Feet",inch:"Inches",cm:"Centimeters",result:"RESULT"}
}

document.getElementById("toggleBtn").onclick = () => {
  imp = !imp
  document.getElementById("imp").classList.toggle("hidden")
  document.getElementById("met").classList.toggle("hidden")
  out.innerText = "0.00"
}

document.querySelectorAll("input").forEach(i=>{
  i.oninput = convert
})

function convert(){
  if(imp){
    out.innerText=((+ft.value||0)*30.48+(+inch.value||0)*2.54).toFixed(2)+" cm"
  }else{
    const t=(+cm.value||0)/2.54
    out.innerText=Math.floor(t/12)+"' "+(t%12).toFixed(2)+'"'
  }
}

function type(el,text){
  el.innerText=""
  let i=0
  const timer=setInterval(()=>{
    el.innerText+=text[i++]
    if(i>=text.length) clearInterval(timer)
  },30)
}

document.getElementById("langSwitch").onclick = () => {
  lang = lang==="th" ? "en" : "th"
  liquid.style.transform = lang==="en"?"translateX(100%)":"translateX(0)"
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    type(el,text[lang][el.dataset.i18n])
  })
}

/* PWA */
if("serviceWorker" in navigator){
  navigator.serviceWorker.register("service-worker.js")
}

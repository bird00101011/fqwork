const swb = document.querySelector('#startWork')
const fq = document.querySelector('#fqwork')
const ms = 5
const ts = ms * 60

function startWork() {
  swb.style.display = 'none'
  fq.style.display = 'flex'
  let rs = ts

  let rm = String(Math.floor(rs / 60)).padStart(2, '0')
  let rt = String(rs % 60).padStart(2, '0')
  let rtm = `${rm}:${rt}`
  fq.innerHTML = rtm;

  let t = setInterval(() => {
    rs--;
    
    let rm = String(Math.floor(rs / 60)).padStart(2, '0')
    let rt = String(rs % 60).padStart(2, '0')
    let rtm = `${rm}:${rt}`
    fq.innerHTML = rtm;

    if (rs < 0) {
      clearInterval(t);
      swb.style.display = 'flex'
      fq.style.display = 'none'
      window.procs.fqwork_rest()
    }
  }, 1000)
}

swb.addEventListener('click', () => {
  startWork()
})

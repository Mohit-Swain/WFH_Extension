inputRange = document.querySelector('input[type="range"]')
volumeSpan = document.querySelector('#range-value')
volumeImg = document.querySelector('#volume-img')
iconImg = document.querySelector('#icon-img')

resetBtn = document.querySelector('#reset-btn')

console.log(inputRange)
console.log(volumeSpan)
console.log(volumeImg)
console.log(resetBtn)
// iffe
volumeImg.src = chrome.runtime.getURL('/icons/vup.png')
iconImg = chrome.runtime.getURL('/icons/color_icon.png')

// change value and icon on range drag
function updateVolumeDOM(volume){
  if(volume === undefined){
    volume = 100
  }
  const selectedVolume = volume
  inputRange.value = volume
  volumeSpan.innerText = selectedVolume
  if(selectedVolume <= 0){
    volumeImg.src = chrome.runtime.getURL('/icons/voff.png')
  }
  else if(selectedVolume <= 80){
    volumeImg.src = chrome.runtime.getURL('/icons/vdown.png')
  }
  else{
    volumeImg.src = chrome.runtime.getURL('/icons/vup.png')
  }
}
inputRange.addEventListener('input',function(event) {
  const selectedVolume = event.target.value
  updateVolumeDOM(selectedVolume)
  
})

// add reset Btn
resetBtn.addEventListener('click',() => updateVolumeDOM(100))



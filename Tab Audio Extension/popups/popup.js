inputRange = document.querySelector('input[type="range"]')
volumeSpan = document.querySelector('#range-value')
volumeImg = document.querySelector('#volume-img')
iconImg = document.querySelector('#icon-img')
tabName = document.querySelector('#tab_name');

resetBtn = document.querySelector('#reset-btn')

// console.log(inputRange)
// console.log(volumeSpan)
// console.log(volumeImg)
// console.log(resetBtn)
// console.log(tabName)

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}


async function getActiveTabVolume(){
  tab = await getCurrentTab();
  chrome.runtime.sendMessage( {message: "get-volume", tabId : tab.id}, function(response) {
    console.log(response);
  });

}

tabName.addEventListener('click',getActiveTabVolume);

// iffe
updateVolumeDOM(100)
iconImg = chrome.runtime.getURL('/icons/color_icon.png')
const currentTab = getCurrentTab()
currentTab
.then((res) =>{
  tabName.innerText = res.title
})
.catch(err => {
  tabName.innerText = 'Some error occured';
  console.error(err)
})

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
  else if(selectedVolume < 80){
    volumeImg.src = chrome.runtime.getURL('/icons/vdown.png')
  }
  else{
    volumeImg.src = chrome.runtime.getURL('/icons/vup.png')
  }
}

// update for range input change
inputRange.addEventListener('input',function(event) {
  const selectedVolume = event.target.value
  updateVolumeDOM(selectedVolume)
  
})

// add reset Btn
resetBtn.addEventListener('click',() => updateVolumeDOM(100))



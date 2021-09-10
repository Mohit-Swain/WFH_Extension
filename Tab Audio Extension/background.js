async function getVolumeofTab(tabId){
  const key = tabId + '-vol';
  return await chrome.storage.local.get([key]);
}

async function setVolumeofTab(tabId,vol = 100){
  const key = tabId + '-vol';
  let obj = {};
  obj[key] = vol;
  return chrome.storage.local.set(obj);
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request);
    if(request.message === 'get-volume'){
      getVolumeofTab(request.tabId).then(vol => {
        console.log(vol);
        sendResponse({vol : vol});
      });
    }
    else if(request.message === 'set-volume'){
      setVolumeofTab(request.tabId,request.vol).then(() => {
        sendResponse({done : true});
      })
    }
    return true;
  }
);

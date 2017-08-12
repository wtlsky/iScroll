/**
 * Created by 武天亮 on 2017/8/11.
 */
var speed = document.getElementById('speed');
chrome.storage.local.get('speed', function (data) {
    if (!data.speed) {
        chrome.storage.local.set({speed: speed.value});
    } else {
        speed.value = data.speed
    }
});
speed.addEventListener('change', function () {
    chrome.storage.local.set({speed: speed.value})
});
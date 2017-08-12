/**
 * Created by 武天亮 on 2017/8/10.
 */
//定义dom
var wrap = document.createElement('div'),
    btn_top = document.createElement('img'),
    btn_refresh = document.createElement('img'),
    btn_bottom = document.createElement('img'),
    btn_Auto = document.createElement('div'),
    auto = false,
    autoTimer = null,
    timer = null;

//添加属性
btn_Auto.innerHTML = '自动';
btn_top.setAttribute('class','ext-btn ext-btn-top');
btn_bottom.setAttribute('class','ext-btn ext-btn-bottom');
btn_refresh.setAttribute('class','ext-btn ext-btn-refresh');
btn_top.src = chrome.extension.getURL('img/up.png');
btn_bottom.src = chrome.extension.getURL('img/down.png');
btn_refresh.src = chrome.extension.getURL('img/refresh.png');
btn_Auto.setAttribute('class', 'ext-btn ext-btn-auto');
wrap.setAttribute('class', 'goTop-wrap');

//添加事件
btn_top.addEventListener('click', toTop);
btn_bottom.addEventListener('click', toBottom);
btn_refresh.addEventListener('click', function () {
    window.location.reload(true);
});
btn_Auto.addEventListener('click', autoScroll);

chrome.runtime.onMessage.addListener(function (message,sender,sendResponse) {
    if (message.barStatus){
        wrap.style.display = 'block';
    }else {
        wrap.style.display = 'none';
    }
});

//插入DOM
wrap.appendChild(btn_top);
wrap.appendChild(btn_refresh);
wrap.appendChild(btn_bottom);
wrap.appendChild(btn_Auto);
document.body.appendChild(wrap);


//功能定义
function toTop() {
    clearInterval(timer);
    closeAutoScroll();
    timer = setInterval(function () {
        var scroll = document.body.scrollTop,
            step = Math.ceil(scroll / 10);
        if (document.body.scrollTop <= 0) {
            clearInterval(timer)
        }
        document.body.scrollTop -= step;
    }, 10);
}

function toBottom() {
    clearInterval(timer);
    timer = setInterval(function () {
        var scroll = document.body.scrollTop,
            viewHeight = document.documentElement.clientHeight,
            total = document.body.scrollHeight - scroll - viewHeight,
            step = Math.ceil(total / 10);
        if (total <= 0) {
            clearInterval(timer)
        }
        document.body.scrollTop += step;
    }, 10)
}

function autoScroll() {
    auto = !auto;
    var speed = 0;
    chrome.storage.local.get("speed", function (data) {
        speed = data.speed ? data.speed : 30;
        if (auto) {
            btn_Auto.setAttribute('style', 'font-weight:bold;color:#d33332;');
            autoTimer = setInterval(function () {
                if (document.body.scrollTop + document.documentElement.clientHeight === document.body.scrollHeight) {
                    closeAutoScroll();
                }
                document.body.scrollTop += 1;
            }, speed);
        } else {
            closeAutoScroll();
        }
    });
}

function closeAutoScroll() {
    clearInterval(autoTimer);
    btn_Auto.removeAttribute('style');
    if(auto) auto = !auto;
}
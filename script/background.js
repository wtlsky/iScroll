/**
 * Created by 武天亮 on 2017/8/11.
 */

chrome.contextMenus.create({id: 'goTop', title: 'iScroll', contexts: ['all']});
chrome.contextMenus.create({parentId: 'goTop', title: '显示', contexts: ['all'], onclick: show});
chrome.contextMenus.create({parentId: 'goTop', title: '隐藏', contexts: ['all'], onclick: hide});

function show() {
    chrome.tabs.query({active: true}, function (tab) {
        chrome.tabs.sendMessage(tab[0].id, {barStatus: true});
    })
}

function hide() {
    chrome.tabs.query({active: true}, function (tab) {
        chrome.tabs.sendMessage(tab[0].id, {barStatus: false});
    })
}
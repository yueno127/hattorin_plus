document.addEventListener('DOMContentLoaded', (event) => {
    //設定の読み込み
    chrome.storage.sync.get(null, (datas) => {
        document.getElementById("username").value = datas.username?datas.username:""
        document.getElementById("password").value = datas.password?datas.password:""
        document.getElementById("shouldAutoLogin").checked = datas.shouldAutoLogin != undefined ? datas.shouldAutoLogin : true;
        document.getElementById("shouldPreventTimeout").checked = datas.shouldPreventTimeout != undefined ? datas.shouldPreventTimeout : true;
    });
      

    //設定の保存
    document.getElementById("save").addEventListener("click", ()=>{
        chrome.storage.sync.set(
            {username: document.getElementById("username").value,
             password: document.getElementById("password").value,
             shouldAutoLogin: document.getElementById("shouldAutoLogin").checked,
             shouldPreventTimeout: document.getElementById("shouldPreventTimeout").checked});
    });
});
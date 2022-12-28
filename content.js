//urlからサイトを判定
switch(location.host){
    case 'idp.oka-pu.ac.jp'://認証
        //・自動ログイン
        //認証サイトはログインに失敗すると、urlの末尾がs1,s2,s3...となる。初期値はs1かs2である。
        //url末尾がs1かs2の時のみ自動ログインすることで、ログインに失敗しているのにログイン操作を繰り返すことを防ぐ。
        if (location.search.endsWith("s1") || location.search.endsWith("s2")){
            //画面部品を取得
            var loginButton = document.getElementsByClassName('form-element form-button')[0]
            var usernameForm = document.getElementById('username')
            var passwordForm = document.getElementById('password')
            if (loginButton != null && usernameForm != null && passwordForm != null){
                //id・パスワードを入力・ログインボタンを押す
                chrome.storage.sync.get(null , (datas) => {
                    if (!datas.shouldAutoLogin)
                        return;
                    usernameForm.value = datas.username
                    passwordForm.value = datas.password
                    loginButton.click()
                });
            }
        }
        //「このサービスにアクセスするたびに、あなたに関する情報を送信することに同意しますか？」
        //のページが出たら、同意ボタンをクリック
        var rejectButton = document.getElementsByName("_eventId_AttributeReleaseRejected")[0]
        if (rejectButton != null){
            chrome.storage.sync.get(null , (datas) => {
                if (!datas.shouldAutoLogin)
                    return;
                document.getElementsByName("_eventId_proceed")[0].click()
            });
        }
        break;
    case 'cmps-web.oka-pu.ac.jp'://はっとりん
        //タイムアウト防止
        chrome.storage.sync.get(null , (datas) => {
            if (!datas.shouldPreventTimeout)
                return;
            setInterval("document.getElementById('portaltimer').click()", 60000);
        }); 
        break;
}
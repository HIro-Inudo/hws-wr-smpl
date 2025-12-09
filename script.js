// DOMが読み込まれたら処理を開始
window.addEventListener('DOMContentLoaded', (event) => {
    // LIFFの初期化
    initializeLiff();

    // ボタンのイベントリスナーを設定
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', () => {
        // 現状は静的サイトなので、アラートを表示するのみ
        // 本来はここでサーバーにデータを送信する
        alert('報告が完了しました。（静的ページのためデータは送信されません）');
    });

    const closeButton = document.getElementById('closeButton');
    closeButton.addEventListener('click', () => {
        // LIFFのウィンドウを閉じる
        if (liff.isInClient()) {
            liff.closeWindow();
        } else {
            alert('LINEアプリ内で実行してください。');
        }
    });
});

/**
 * LIFFを初期化する関数
 */
async function initializeLiff() {
    // ★★★ あなたのLIFF IDに書き換えてください ★★★
    //const myLiffId = "YOUR_LIFF_ID"; 
    const myLiffId = "2008630643-lk7x55A2"; 

    try {
        await liff.init({
            liffId: myLiffId,
            // trueにすると、ユーザーがLIFFアプリにアクセスした際に自動でログイン処理を実行します
            withLoginOnExternalBrowser: false, 
        });

        // LIFFが初期化されたかチェック
        if (!liff.isLoggedIn()) {
            // ログインしていなければ、ログインページにリダイレクト
            liff.login();
        } else {
            // ログイン済みなら、ユーザー情報を取得して表示
            const profile = await liff.getProfile();
            const userInfoElement = document.getElementById('userInfo');
            userInfoElement.innerText = `ようこそ、${profile.displayName} さん`;
        }
    } catch (err) {
        console.error("LIFF Initialization failed", err);
        alert("LIFFの初期化に失敗しました。");
    }
}

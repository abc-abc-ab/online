// Glitchで作成したサーバーのURLをwss://で指定
// "your-project-name" の部分はあなたのGlitchプロジェクト名に書き換えてください
const socket = new WebSocket('wss://online-l4y4.onrender.com');

const messagesDiv = document.getElementById('messages');
const input = document.getElementById('input');
const sendButton = document.getElementById('send');

// メッセージを表示する関数
function addMessage(message) {
    const p = document.createElement('p');
    p.textContent = message;
    messagesDiv.appendChild(p);
    // スクロールを一番下に移動
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// サーバーに接続したとき
socket.addEventListener('open', (event) => {
    console.log('サーバーに接続しました。');
    addMessage('--- サーバーに接続しました ---');
});

// サーバーからメッセージを受信したとき
socket.addEventListener('message', (event) => {
    console.log('メッセージ受信:', event.data);
    addMessage(`受信: ${event.data}`);
});

// サーバーとの接続が切れたとき
socket.addEventListener('close', (event) => {
    console.log('サーバーから切断されました。');
    addMessage('--- サーバーから切断されました ---');
});

// エラーが発生したとき
socket.addEventListener('error', (event) => {
    console.error('WebSocketエラー:', event);
    addMessage('--- エラーが発生しました ---');
});

// 送信ボタンがクリックされたとき
sendButton.addEventListener('click', () => {
    const message = input.value;
    if (message) {
        socket.send(message); // サーバーにメッセージを送信
        addMessage(`自分: ${message}`); // 自分の画面にも表示
        input.value = ''; // 入力欄をクリア
    }
});

// Enterキーでも送信できるようにする
input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});

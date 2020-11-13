'use strict';

// 自分と相手の名前
var playerName = "かえる君";
var computerName = "うさぎさん";

// かえる君の画像の情報を取得
var flog = document.getElementById('flog');
// うさぎ君の画像の情報を取得
var rabbit = document.getElementById('rabbit');

// かえる君のジャンケン画像リスト
var pics_flg = new Array("img/gu-flog.png", "img/choki-flog.png", "img/pa-flog.png", "img/kanfu-flog.png", "img/victory-flog.png", "img/lose-flog.png");
// うさぎ君のじゃんけん画像リスト
var pics_rbt = new Array("img/gu-rabbit.png", "img/choki-rabbit.png", "img/pa-rabbit.png", "img/kanfu-rabbit.png", "img/victory-rabbit.png", "img/lose-rabbit.png");

// ジャンケンボタン画像の情報を取得
var gu = document.getElementById('gu');
var choki = document.getElementById('choki');
var pa = document.getElementById('pa');

// スタートボタンの情報を取得
var start = document.getElementById('start-btn');

// 自分と相手のスコア
var allScore = [0, 0];

// 初期画面ではスコア表を非表示にする
var score = document.getElementById('score')
score.style.visibility = 'hidden';

// 初期画面ではジャンケンボタンを非表示にする
var jankenBtn = document.getElementById('janBtn');
jankenBtn.style.visibility = 'hidden';

// 紹介文＆結果発表部分の情報を取得
var player = document.getElementById('player');
var computer = document.getElementById('computer');
var resultMsg = document.getElementById('resultMsg');

// 初期HTML記述をセットしておく（ゲーム終了後、結果発表部分を紹介文に戻すため）
var defaultHTML1 = player.innerHTML;
var defaultHTML2 = computer.innerHTML;
var defaultHTML3 = resultMsg.innerHTML;
var defaultColor = resultMsg.style.color;

// HTML記述を初期状態に戻す処理を定義
function HTMLRestore() {
  player.innerHTML = defaultHTML1;
  computer.innerHTML = defaultHTML2;
  resultMsg.innerHTML = defaultHTML3;
  resultMsg.style.color = defaultColor;
}

// 回転アニメーションを止める処理を定義
function stopRotating() {
  $('#flog').removeClass('rotate');
  $('#rabbit').removeClass('rotate-r');  
}

// スコア表の表示処理を定義
function displayScore() {
  score.textContent = '得点   ' + allScore[0] + ' : ' + allScore[1];
}

// ジャンケンボタンを押させない処理を定義
function notClickBtn() {
  gu.removeAttribute("onclick");
  choki.removeAttribute("onclick");
  pa.removeAttribute("onclick");
}

// ジャンケンボタンを再び押せるようにする処理を定義
function ClickBtn() {
  gu.setAttribute('onclick', 'rsp(0);');
  choki.setAttribute('onclick', 'rsp(1);');
  pa.setAttribute('onclick', 'rsp(2);');
}

// 最終結果判定の処理を定義
function finalJudge() {  
  var judge = 3; //判定基準
  
  if (allScore[0] >= judge) {
    // あなたの勝利
    resultMsg.innerHTML = `結果： ${playerName}の勝利！`;
    resultMsg.style.color = 'red';
    flog.src = pics_flg[4]; //かえるの勝利画像
    rabbit.src = pics_rbt[5]; //うさぎの敗北画像
    // ジャンケンボタンを非活性化（ゲーム終了後も得点が増えてしまうため）
    notClickBtn();
    document.getElementById('start-btn').removeAttribute('disabled');

  } else if (allScore[1] >= judge){
    // うさぎの勝利
    resultMsg.innerHTML = `最終結果： ${playerName}の敗北…`;
    resultMsg.style.color = 'blue';
    flog.src = pics_flg[5];　//かえるの敗北画像
    rabbit.src = pics_rbt[4];　//うさぎの勝利画像
    // ジャンケンボタンを非活性化（ゲーム終了後も得点が増えてしまうため）
    notClickBtn();
    document.getElementById('start-btn').removeAttribute('disabled');
  }
}
  
// スタートボタンクリック時の処理
start.onclick = () => {
  // ジャンケンボタンを活性化
  ClickBtn();

  if (start.textContent === '勝負！') {
    // ジャンケンボタン表示
    jankenBtn.style.visibility = 'visible';
    // テキスト変更
    start.textContent = 'やめ ！';
    // // スコア表を表示
    score.style.visibility = 'visible';
    displayScore();
    // 回転するアニメーションを設定したclassを、かえるとうさぎの画像に追加
    flog.classList.add('rotate');
    rabbit.classList.add('rotate-r');

  } else { // 「やめ！」になっていた時
    // ジャンケンボタン非表示
    jankenBtn.style.visibility = 'hidden';
    // テキスト変更
    start.textContent = '勝負！';
    // 結果発表部分を自己紹介文に戻す
    HTMLRestore();
    // スコア表を非表示
    score.style.visibility = 'hidden';
    // スコア表を初期化
    allScore = [0, 0];
    // 最初のカンフー画像に戻す
    flog.src=pics_flg[3];
    rabbit.src=pics_rbt[3];
    // アニメーションを設定していたclassを、かえるとうさぎの画像から削除し、回転を止める
    stopRotating(); 
  }
}


/* ジャンケン
   0: グー
   1: チョキ
   2: パー
*/

// ジャンケンボタンを押した時の処理
function rsp(playerSelect) {
  let result; //結果保存
  let playerSelectHand; //自分が出した手
  let comSelectHand; //相手が出した手
  let resultString; // 結果の表示（「負け…」、「 勝ち！」、「 あいこ」）
  let random = Math.random(); //乱数計算用
  let comSelect = Math.floor(random * 3); //相手の出し手をランダムにする

  console.log(comSelect);
  console.log(playerSelect);

  // 途中でゲームを終了できないようにする
  if (document.getElementById('start-btn').disabled === false) {
    // disabled属性を設定
    document.getElementById('start-btn').setAttribute('disabled', true);
  }

  
  // 初回の回転アニメーションのclassを削除し、回転を止める
  stopRotating(); 

  /* 勝ち負けはプレイヤーが
  0: 負け
  1: 勝ち
  2: あいこ
  */
 
 if (playerSelect == comSelect) {
   // 同じならあいこ
   result = 2;
  } else {
    // 違うなら条件分け
    if (playerSelect == 0) {
      // プレイヤはグー
      if (comSelect == 1) {
        // コンピュータはチョキ
        result = 1; //プレイヤーの勝ち
      } else {
        // コンピュータはパー
        result = 0;
      }
    } else if (playerSelect == 1) {
      // プレイヤーはチョキ
      if (comSelect == 0) {
        // コンピュータはグー
        result = 0;
      } else {
        // コンピュータはパー
        result = 1;
      }
    } else {
      // プレイヤーはパー
      if (comSelect == 0) {
        // コンピュータはグー
        result = 1;
      } else {
        // コンピュータはチョキ
        result = 0;
      }
    }
  }
  console.log(result);
  
  // 自分の出し手
  if (playerSelect == 0) {
    playerSelectHand = 'ぐぅ';
    // グーの画像にチェンジ
    flog.src = pics_flg[0];
  } else if (playerSelect == 1) {
    playerSelectHand = 'ちょき';
    // チョキの画像にチェンジ
    flog.src = pics_flg[1];
  } else {
    playerSelectHand = 'ぱぁ';
    // パーの画像にチェンジ
    flog.src = pics_flg[2];
  }
  
  // 相手の出し手
  if (comSelect == 0) {
    comSelectHand = 'ぐぅ';
    // グーの画像にチェンジ
    rabbit.src = pics_rbt[0];
  } else if (comSelect == 1) {
    comSelectHand = 'ちょき';
    // チョキの画像にチェンジ
    rabbit.src = pics_rbt[1];
  } else {
    comSelectHand = 'ぱぁ';
    // パーの画像にチェンジ
    rabbit.src = pics_rbt[2];
  }

  $('#flog')
    .animate({ 'marginRight': '50px'}, 300)
    .animate({ 'marginRight': '0px'}), 300;
  $('#rabbit')
    .animate({ 'marginLeft': '50px'}, 300)
    .animate({ 'marginRight': '0px'}, 300);

  

  // 結果をresultStringに代入する
  if (result == 0) {
    resultString = '負け…';
    allScore[1]++;
  } else if (result == 1) {
    resultString = '勝ち！';
    allScore[0]++;
  } else {
    resultString = 'あいこ';
  }

  // ブラウザ上に、自分の出し手、相手の出し手、結果を出力する。
  player.innerHTML = playerName + ': ' + playerSelectHand;
  computer.innerHTML = computerName + ': ' + comSelectHand;
  resultMsg.innerHTML = '結果： ' + resultString;

  // 最終結果判定
  finalJudge();

  // 更新したスコア表を表示
  displayScore();

  
}
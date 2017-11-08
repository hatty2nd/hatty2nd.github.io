var Answers = new Array("world","dog","v","l","x","angel","cord","おしまい");
var UnlockCode = "love";
var TimeLimit;
var TimeStart;
var Tid;

function drawcanvas(e){
	var ctx = document.getElementById('output').getContext('2d');
	ctx.font = "24px selfif";
	ctx.clearRect(0,0,600,240);
  	ctx.fillText(String(e), 10, 50);
	ctx.restore();
	ctx.save();
}
function TimeInit(tt){
 TimeLimit = tt * 60 * 1000;
 alert("回答開始!");
 dd = new Date();
 TimeStart = dd.getTime();
 Tid = setInterval('TimeDisplay()',1000);
}

function TimeDisplay(){
    now = new Date();
    dt = now.getTime() - TimeStart;
		now.setTime(TimeLimit-dt + now.getTimezoneOffset() * 60 * 1000);
    dt1 = "0" + now.getHours();    // ※2
    dt1 = dt1.substring(dt1.length - 2, dt1.length);
    dt2 = "0" + now.getMinutes();
    dt2 = dt2.substring(dt2.length - 2, dt2.length);
    dt3 = "0" + now.getSeconds();
    dt3 = dt3.substring(dt3.length - 2, dt3.length);
    TL.TLIMIT.value = dt1 + ":" + dt2 + ":" + dt3;
    if(dt > TimeLimit){    // ※3
    	TL.TLIMIT.value = "00:00:00";
        clearTimeout(Tid);    // タイマー解除
        alert("終了！ [OK] をクリックして下さい");
        PageCheck();    // ページ全体の解答チェック呼び出し
    }
}

function PageCheck(){
    clearTimeout(Tid);    // タイマー解除
    dtokuten = 0;    // 得点用
    for(ff = 0; ff < document.forms.length; ++ff){    // このページ内のすべてのフォームを処理
        if(document.forms[ff].name != "ALLCHK" && document.forms[ff].name != "TL"){  // このフォーム以外を処理
            //AnswerCheck(document.forms[ff]);     // 解答チェック
            //dtokuten = dtokuten + parseInt(document.forms[ff].TOKUTEN.value);  // 得点計算
						if(document.forms[ff].KAITO){
							document.forms[ff].KAITO.disabled = true;
							if(document.forms[ff].CORRECT.value == "正解！"){
								dtokuten++;
							}
						}
        }
    }
	if(dtokuten==4){
		sample("全問正解! おめでとうございます!!")
	}else{
		sample("4問中"+dtokuten+"問正解でした");
	}
        // 使用不可に設定
  //  SeisekiWrite(dtokuten);            // 成績(得点)記録
}
function IsTrue(form_answer,qnumber){
	if(form_answer.KAITO.value == ""){
		alert("no value");
	}
	if(form_answer.KAITO.value == Answers[qnumber]){
	form_answer.CORRECT.style="color:#6cc05b";
		form_answer.CORRECT.value = "○";

	}else{
		form_answer.CORRECT.style="color:#ff0000";
		form_answer.CORRECT.value = "×";
	}

}
function isReload(){
    for(ff = 0; ff < document.forms.length; ++ff){    // このページ内のすべてのフォームを処理
        formp = document.forms[ff];    // ff番目のフォーム
        if(typeof(formp.SEIKAI) != "undefined" && formp.SEIKAI.value != ""){  // 正解表示あり
            if(formp.KAITO.length > 1){    // 解答入力欄複数あり
                for(n = 0; n < formp.KAITO.length; ++n)
                    formp.KAITO[n].disabled = true;    // 入力不可に設定
            }else{    // 解答入力欄1つ
                formp.KAITO.disabled = true;    // 入力不可に設定
            }
            if(typeof(formp.CHKB) != "undefined")    // チェックボタンあり
                formp.CHKB.disabled = true;    // ボタン使用不可
        }else if(formp.name == "ALLCHK" && formp.TOKUTEN.value != ""){  // ページ全体チェックのフォーム
            formp.CHKB.disabled = true;    // ボタン使用不可
            clearTimeout(Tid);    // タイマー解除
        }
    }
}

function IsUnlock(code){
	
	if(code.UNLOCK.value == UnlockCode){
		drawcanvas("AIが停止し,時間が正常に戻った");
		clearTimeout(Tid);
		window.setTimeout(endrole,3000);
	}else{
		drawcanvas("解除コードが違います");
	}
}
function endrole(){
	var ctx = document.getElementById('output').getContext('2d');
	ctx.font = "24px selfif";
	ctx.clearRect(0,0,600,240);
  	ctx.fillText("小屋敷「それじゃあまた\"明日\"ね。」", 10, 40);
  	ctx.fillText("渡辺「\"明日\"か。来ると良いね。」", 10, 80);
  	ctx.fillText("小屋敷「来るに決まってるよ渡辺くん。」", 10, 120);
  	ctx.fillText("渡辺「そうだね、僕たちが信じないとね小屋敷さん。」", 10, 160);
	ctx.restore();
	ctx.save();
	window.setTimeout(skip_link,5000);
	
}

function skip_link(){
	var ctx = document.getElementById('output').getContext('2d');
	ctx.font = "24px selfif";
	ctx.clearRect(0,0,600,240);
  	ctx.fillText("アナザーストーリーはこちら", 10, 40);
 
}
function debug(){
	drawcanvas("test");
}

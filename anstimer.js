var Answers = new Array("hoge","fuga","hogehoge","hogefuga","hoge");
var TimeLimit;
var TimeStart;
var Tid;

function sample(e){
	var ctx = document.getElementById('output').getContext('2d');
	ctx.font = "24px selfif";
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
	form_answer.style="background-color:#bbfe85";
		form_answer.CORRECT.value = "正解！";

	}else{
		form_answer.style="background-color:#cf7769";
		form_answer.CORRECT.value = "不正解！";
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
function debug(){
	sample("test");
}

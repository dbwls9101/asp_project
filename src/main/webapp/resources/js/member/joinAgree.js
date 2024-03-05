var IMP = window.IMP;
IMP.init("imp45030755");  /* imp~ : 가맹점 식별코드*/

function agree(f){
	if(f.agree1.checked == false){
		alert("회원가입약관의 내용에 동의하셔야 회원가입 하실 수 있습니다.");
		return false;
	}
	if(f.agree2.checked == false){
		alert("개인정보처리방침안내의 내용에 동의하셔야 회원가입 하실 수 있습니다.");
		return false;
	}	
	
	//본인인증 모듈 호출
	// IMP.certification(param, callback) 호출
	IMP.certification({ 
		pg:'inicis_unified.{CPID}',//본인인증 설정이 2개이상 되어 있는 경우 필수 
		merchant_uid: createOrderNum(), // 주문 번호
	}, function (rsp) { // callback
		if (rsp.success) {
			console.log(rsp);
			console.log(rsp.imp_uid);
			alert('인증이 완료되었습니다.');
			
			location.href = '/member/join?impuid=' + rsp.imp_uid;
		} else {
			alert("인증에 실패하였습니다. \n에러 내용: " +  rsp.error_msg);
		}
	});
}

//동의 모두선택 / 해제
const agreeChkAll = document.querySelector('input[name=agreeAll]');
    agreeChkAll.addEventListener('change', (e) => {
    let agreeChk = document.querySelectorAll('input[type=checkbox]');
    for(let i = 0; i < agreeChk.length; i++){
      agreeChk[i].checked = e.target.checked;
    }
});
    
//주문번호 생성 함수
function createOrderNum() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
 
    let orderNum = year + month + day;
    for (let i = 0; i < 5; i++) {
        orderNum += Math.floor(Math.random() * 8);
    }
    return parseInt(orderNum);
}

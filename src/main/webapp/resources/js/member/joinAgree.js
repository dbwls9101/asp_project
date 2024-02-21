//const agree = document.querySelector('.agree');
//if( agree.checked == true) {
//	document.querySelector("#login_button").addEventListener('click', ()=>{
//	location.href = '/member/join';
//});
//}else{
//	alert("회원가입약관의 내용에 동의하셔야 회원가입 하실 수 있습니다.")
//}

function agree(f){
	if(f.agree1.checked == false){
		alert("회원가입약관의 내용에 동의하셔야 회원가입 하실 수 있습니다.");
		return false;
	}
	if(f.agree2.checked == false){
		alert("개인정보처리방침안내의 내용에 동의하셔야 회원가입 하실 수 있습니다.");
		return false;
	}	
	f.action = '/member/join';
	f.submit();	
}

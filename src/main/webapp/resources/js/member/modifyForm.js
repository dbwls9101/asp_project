let regPw = /^[0-9a-zA-Z]{8,16}$/;
let regEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

function validate(f){
		
	if(!f.password.value){
		alert("비밀번호를 입력해주세요.");
		return;
	}
	if(f.password.value != f.passwordCk.value){
		alert("비밀번호를 확인해주세요.");
		return;
	}	
	if(!f.email.value){
		alert("이메일을 입력해주세요.");
		return;
	}	
	if(!f.phone.value){
		alert("휴대폰 번호를 입력해주세요.");
		return;
	}
	if( !regPw.exec(f.password.value)  ){
		alert("비밀번호 : 소문자 or 숫자 or 대문자로 8~16자까지 입력 가능");
		f.password.value = '';
		f.password.focus();
		return;
	}
	if( !regEmail.exec(f.email.value)  ){
		alert("이메일 : '@' 포함하여 입력");
		f.email.value = '';
		f.email.focus();
		return;
	}
		f.action = '/member/updateForm';
		f.submit();		
}


// 비밀번호 정규식 검사
let password = document.getElementById('newPassword');
password.addEventListener('keyup', (e) => {
	var ckpw1 = document.querySelector("#pw");
	if(password.value == ""){
		ckpw1.style.display = 'none';
	}else{
		if( !regPw.exec(password.value)  ){
			ckpw1.classList.remove("input_blue");
			ckpw1.innerHTML = "비밀번호 : 8~16자, 소문자 or 숫자 or 대문자";
			ckpw1.style.display = 'inline-block';
		}else{
			ckpw1.classList.add("input_blue");
			document.querySelector("#pw").innerHTML = "사용 가능한 비밀번호 입니다.";
		}
	}
});

// 비밀번호 중복 검사
document.getElementById('newPasswordCk').addEventListener('keyup', (e) => {
	var password = document.getElementById("newPassword");
	if(document.getElementById('newPasswordCk').value == ""){
		document.querySelector(".pw_input_1").style.display = 'none';
		document.querySelector(".pw_input_2").style.display = 'none';	
	}else{
		if (password.value.length >= 8){
			checkpw();
		}
	}
});

function checkpw() {
	
	var pw = document.getElementById("newPassword").value;
	var ckpw = document.getElementById("newPasswordCk").value;
	var ckpw1 = document.querySelector(".pw_input_1");
	var ckpw2 = document.querySelector(".pw_input_2");
	
	
	if(pw == ckpw){
		ckpw1.style.display = 'inline-block';
		ckpw2.style.display = 'none';	
	}else{
		ckpw2.style.display = 'inline-block';
		ckpw1.style.display = 'none';
	}
}
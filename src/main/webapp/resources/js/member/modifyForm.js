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
	alert("정보가 수정되었습니다!");
		f.action = '/member/updateForm';
		f.submit();		
}


// 비밀번호 정규식 검사
let password = document.getElementById('password');
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
document.getElementById('passwordCk').addEventListener('keyup', (e) => {
	var password = document.getElementById("password");
	if(document.getElementById('passwordCk').value == ""){
		document.querySelector(".pw_input_1").style.display = 'none';
		document.querySelector(".pw_input_2").style.display = 'none';	
	}else{
		if (password.value.length >= 8){
			checkpw();
		}
	}
});

function checkpw() {
	
	var pw = document.getElementById("password").value;
	var ckpw = document.getElementById("passwordCk").value;
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

//이메일 정규식 및 중복 검사
let email = document.getElementById('email')
email.addEventListener('keyup', (e) => {
	var emailck1 = document.querySelector("#emailText");
	if(email.value == ""){
		emailck1.style.display = 'none';
	}else{
		if( !regEmail.exec(email.value)  ){
			emailck1.classList.remove("input_red", "input_blue");
			emailck1.innerHTML = "'@' 포함하여 입력";
			emailck1.style.display = 'inline-block';
		}else{
			emailck2(email.value);
		}
	}
});

function emailck2(email) {
	let sendData = '?email=' + email;
	
	fetch('/member/memberEmailChk' + sendData)
	.then( response => response.text() )
    .then( data => {
    	console.log(data);
    	var emailck1 = document.querySelector("#emailText");
    	emailck1.classList.remove("input_red", "input_blue");
		if(data == 1){
			emailck1.innerHTML = "이메일이 이미 존재합니다.";
			emailck1.classList.add("input_red");
		}else{
			emailck1.innerHTML = "사용 가능한 이메일 입니다.";
			emailck1.classList.add("input_blue");
		}
		emailck1.style.display = 'inline-block';

   })
   .catch( err => console.log(err) );
	
}

function naver_update(naverid){
	if(naverid == null || naverid == ""){
		window.open('/member/registerAlert?type=naver_update', 'naver Update', 'width=500, height=600, top=200, left=500');
	}else{
		 if (confirm("SNS 계정 연결을 해제하시겠습니까?") == true){ 
				fetch('/naver_delete')
				.then( response => response.text() )
				.then( text => {
				alert("SNS 계정 연결이 해제 되었습니다.");
				window.location.reload();
				})
			.catch( err => console.log(err) );	
		}
	}
}

function kakao_update(kakaoid){
	if(kakaoid == null || kakaoid == ""){
		window.open('/member/registerAlert?type=kakao_update', 'kakao Update', 'width=500, height=600, top=200, left=500');
	}else{
		 if (confirm("SNS 계정 연결을 해제하시겠습니까?") == true){ 
				fetch('/kakao_delete')
				.then( response => response.text() )
				.then( text => {
				alert("SNS 계정 연결이 해제 되었습니다.");
				window.location.reload();
				})
			.catch( err => console.log(err) );	
		}
	}
	
}
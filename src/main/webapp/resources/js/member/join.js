let regId = /^[A-Za-z0-9]{4,20}$/
let regPw = /^[0-9a-zA-Z]{8,16}$/;
let regName = /^[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;
let regNick = /^[가-힣a-zA-Z]+$/;
let regEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
let regPhone = /^\d{3}-\d{4}-\d{4}$/;

function validate(f){
		
	if(!f.id.value){
		alert("아이디를 입력해주세요.");
		return;
	}
	if(!f.password.value){
		alert("비밀번호를 입력해주세요.");
		return;
	}
	if(f.password.value != f.passwordCk.value){
		alert("비밀번호를 확인해주세요.");
		return;
	}	
	if(!f.name.value){
		alert("이름을 입력해주세요.");
		return;
	}
	if(!f.nickname.value){
		alert("닉네임을 입력해주세요.");
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
	if( !regId.exec(f.id.value)  ){
		alert("아이디 : 영문자, 숫자, 최소 4글자 이상");
		f.id.value = '';
		f.id.focus();
		return;
	}
	if( !regPw.exec(f.password.value)  ){
		alert("비밀번호 : 8~16자, 소문자 or 숫자 or 대문자");
		f.password.value = '';
		f.password.focus();
		return;
	}
	if( !regName.exec(f.name.value)  ){
		alert("이름 : 한글 또는 영문자");
		f.name.value = '';
		f.name.focus();
		return;
	}
	if( !regEmail.exec(f.email.value)  ){
		alert("이메일 : '@' 포함하여 입력");
		f.email.value = '';
		f.email.focus();
		return;
	}
	if( !regNick.exec(f.nickname.value)  ){
		alert("닉네임 : 공백없이 한글, 영문, 숫자만 입력 가능");
		f.nickname.value = '';
		f.nickname.focus();
		return;
	}
	if( !regPhone.exec(f.phone.value)  ){
		alert("휴대폰 번호 : 하이픈(-) 포함 입력해주세요");
		f.phone.value = '';
		f.phone.focus();
		return;
	}
			
		f.action = '/member/join';
		f.submit();		
}

// 아이디 정규식 및 중복 검사
let id = document.getElementById('id')
id.addEventListener('keyup', (e) => {
	var ckid1 = document.querySelector("#warn");
	if(id.value == ""){
		ckid1.style.display = 'none';
	}else{
		if( !regId.exec(id.value)  ){
			ckid1.classList.remove("input_red", "input_blue");
			ckid1.innerHTML = "아이디 : 영문자, 숫자, 최소 4글자 이상";
			ckid1.style.display = 'inline-block';
		}else{
			checkid2(id.value);
		}
	}
});


function checkid2(id) {
	let sendData = '?id=' + id;
	
	fetch('/member/memberIdChk' + sendData)
	.then( response => response.text() )
    .then( data => {
    	console.log(data);
    	var ckid1 = document.querySelector("#warn");
    	ckid1.classList.remove("input_red", "input_blue");
		if(data == 1){
			ckid1.innerHTML = "아이디가 이미 존재합니다.";
			ckid1.classList.add("input_red");
		}else{
			ckid1.innerHTML = "사용 가능한 아이디입니다.";
			ckid1.classList.add("input_blue");
		}
		ckid1.style.display = 'inline-block';

   })
   .catch( err => console.log(err) );
	
}

//비밀번호 정규식 검사
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

//비밀번호 중복 검사
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

//닉네임 정규식 및 중복 검사
let nickname = document.getElementById('nickname')
nickname.addEventListener('keyup', (e) => {
	var cknick1 = document.querySelector("#nick");
	if(nickname.value == ""){
		cknick1.style.display = 'none';
	}else{
		if( !regNick.exec(nickname.value)  ){
			cknick1.classList.remove("input_red", "input_blue");
			cknick1.innerHTML = "닉네임 : 공백없이 한글, 영문, 숫자만 입력 가능";
			cknick1.style.display = 'inline-block';
		}else{
			cknick2(nickname.value);
		}
	}
});

function cknick2(nickname) {
	let sendData = '?nickname=' + nickname;
	
	fetch('/member/memberNickChk' + sendData)
	.then( response => response.text() )
    .then( data => {
    	console.log(data);
    	var cknick1 = document.querySelector("#nick");
    	cknick1.classList.remove("input_red", "input_blue");
		if(data == 1){
			cknick1.innerHTML = "닉네임이 이미 존재합니다.";
			cknick1.classList.add("input_red");
		}else{
			cknick1.innerHTML = "사용 가능한 닉네임 입니다.";
			cknick1.classList.add("input_blue");
		}
		cknick1.style.display = 'inline-block';

   })
   .catch( err => console.log(err) );
	
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

//휴대폰 번호 정규식 및 중복 검사
let phone = document.getElementById('phone')
phone.addEventListener('keyup', (e) => {
	var phoneck1 = document.querySelector("#phoneText");
	if(phone.value == ""){
		phoneck1.style.display = 'none';
	}else{
		if( !regPhone.exec(phone.value)  ){
			phoneck1.classList.remove("input_red", "input_blue");
			phoneck1.innerHTML = "하이픈(-) 포함하여 입력";
			phoneck1.style.display = 'inline-block';
		}
	}
});

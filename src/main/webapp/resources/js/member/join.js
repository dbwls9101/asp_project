function validate(f){
	
	let regPw = /^[0-9a-zA-Z]{8,16}$/;	
	
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
	if( !regPw.exec(f.password.value)  ){
		alert("비밀번호 : 8~16자, 소문자 or 숫자 or 대문자");
		f.password.value = '';
		f.password.focus();
		return;
	}			
			
		f.action = '/member/join';
		f.submit();		
}

// 아이디 중복 검사
document.getElementById('id').addEventListener('keyup', (e) => {
	if (id.value.length >= 2){
		checkid()
	}
});

function checkid() {
	
	var id = document.getElementById("id").value;
	var ckid1 = document.querySelector(".id_input_1");
	var ckid2 = document.querySelector(".id_input_2");
	
	let sendData = '?id=' + id;
	
	fetch('/member/memberIdChk' + sendData)
	.then( response => response.text() )
    .then( data => {
      console.log(data);
	if(data == 1){
		ckid2.style.display = 'inline-block';
		ckid1.style.display = 'none';
	}else{
		ckid1.style.display = 'inline-block';
		ckid2.style.display = 'none';	
	}

   })
   .catch( err => console.log(err) );
	
}

//비밀번호 중복 검사
document.getElementById('passwordCk').addEventListener('keyup', (e) => {
	if (password.value.length >= 4){
		checkpw()
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


// 닉네임 중복 검사
document.getElementById('nickname').addEventListener('keyup', (e) => {
	if (nickname.value.length >= 2){
		checknick()
	}
});

function checknick() {
	
	var nickname = document.getElementById("nickname").value;
	var cknick1 = document.querySelector(".nickname_input_1");
	var cknick2 = document.querySelector(".nickname_input_2");
	
	let sendData = '?nickname=' + nickname;
	
	fetch('/member/memberNickChk' + sendData)
	.then( response => response.text() )
    .then( data => {
      console.log(data);
	if(data == 1){
		cknick2.style.display = 'inline-block';
		cknick1.style.display = 'none';
	}else{
		cknick1.style.display = 'inline-block';
		cknick2.style.display = 'none';	
	}

   })
   .catch( err => console.log(err) );
	
}	

//이메일 중복 검사
document.getElementById('email').addEventListener('keyup', (e) => {
	if (email.value.length >= 2){
		checkemail()
	}
});

function checkemail() {
	
	var email = document.getElementById("email").value;
	var ckemail1 = document.querySelector(".email_input_1");
	var ckemail2 = document.querySelector(".email_input_2");
	
	let sendData = '?email=' + email;
	
	fetch('/member/memberEmailChk' + sendData)
	.then( response => response.text() )
    .then( data => {
      console.log(data);
	if(data == 1){
		ckemail2.style.display = 'inline-block';
		ckemail1.style.display = 'none';
	}else{
		ckemail1.style.display = 'inline-block';
		ckemail2.style.display = 'none';	
	}

   })
   .catch( err => console.log(err) );
	
}
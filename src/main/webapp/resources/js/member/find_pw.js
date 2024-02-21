function findSubmit(f){
	if(!f.id.value){
		alert("회원 가입시 등록한 아이디를 입력해주세요.");
		return false;
	}	
	if(!f.name.value){
		alert("회원 가입시 등록한 이름을 입력해주세요.");
		return false;
	}
	if(!f.email.value){
		alert("회원 가입시 등록한 이메일을 입력해주세요.");
		return false;
	}
}
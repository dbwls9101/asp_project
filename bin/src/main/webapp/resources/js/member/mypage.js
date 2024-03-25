function modify(f){
	f.action = '/member/mypageLogin';
	f.submit();	
}

function deletes(f){
	if (confirm("회원 탈퇴를 하면 서비스를 더 이상 이용하실 수 없습니다. \n회원 탈퇴를 진행하시겠습니까?") == true) {
		
	}
}
//form
let f = document.querySelector("#registerform");

//faq 등록
document.querySelector("#faqRegister").addEventListener('click', () => {
	if(f.faq_type.value == ''){
		alert('질문 유형을 선택하세요.');
		f.faq_type.focus();
		return;
	}
	
	if(f.title.value == ''){
		alert('제목을 입력하세요.');
		f.title.focus();
		return;
	}
	
	if(f.content.value == ''){
		alert('내용을 입력하세요.');
		f.content.focus();
		return;
	}
	
	f.action = '/admin/faq/register';
	f.submit();
})


//파티 관리 목록으로 돌아가기
document.querySelector("#FaqList").addEventListener('click', ()=>{
	location.href = '/admin/faq';
})
document.querySelector("#login_button").addEventListener('click', ()=>{
	//alert("로그인 버튼 작동")
	document.getElementById("login_form").action = '/member/login';
	document.getElementById("login_form").submit();
});

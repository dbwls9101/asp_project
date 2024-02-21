document.querySelector("#login_button").addEventListener('click', ()=>{
	//alert("로그인 버튼 작동")
	document.getElementById("login_form").action = '/member/login';
	document.getElementById("login_form").submit();
});

//function validate(f){
//	document.querySelector("#login_button").addEventListener('click', ()=>{
//		alert("로그인 버튼 작동")
//	});	
//	f.action = '/member/login';
//	f.submit();
//}


//document.querySelector("#login_button").addEventListener('click', ()=>{
//	let f = document.getElementById("login_form");
//	alert(f.id.value)
//	f.action = '/member/login';
//	f.submit();
//});

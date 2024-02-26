window.onload = function(){
	//공지사항 규칙
	getrule();
}


//공지사항 규칙
function getrule(){
	let rulesEle = document.querySelector("#rules");
	let ruleArr = rulesEle.getAttribute("rule").split(',');
	
	ruleArr.forEach(rule => {
		if(rule){
			rulesEle.innerHTML += '<span class="rule">' + rule + '</span>';
		}
	})
}

//파티 만들기
document.querySelector("#makeparty").addEventListener('click', ()=>{
	if(principal == 'anonymousUser'){
		alert('로그인 후 이용가능한 서비스입니다.');
		location.href = '/member/login';
		return;
	}
	location.href = '/partner/register';
})

//목록 버튼
const urlParams = new URL(location.href).searchParams;
//게시글 체크 폼
const f = document.forms[0];
//댓글 폼
const replyf = document.forms[1];

document.querySelector("#getpartylist").addEventListener('click', ()=>{
	let c1 = urlParams.get('c1');
	location.href = "/shop/list/" + c1;
})

//참여 버튼
document.querySelector("#participate").addEventListener('click', ()=>{
	if(!document.querySelector("#agree").checked){
		alert('안내 및 규칙을 읽고 체크박스에 체크해 주세요.');
		return;
	}
	
	f.action = '/payment/orderform';
	f.submit();
})


//댓글관련
const rs = replyService;

//댓글 등록 버튼
document.querySelector("#replyregister").addEventListener('click', ()=>{
	if(document.querySelector("#private").checked){
		replyf.private_chk.value = 'Y';
	}else{
		replyf.private_chk.value = 'N';
	}
	
	if(replyf.comment.value == ''){
		alert('댓글을 입력해주세요.');
		return;
	}
	
	rs.add(
		{
			p_idx: replyf.p_idx.value,
			writer: replyf.writer.value,
			comment_to: replyf.comment_to.value,
			comment: replyf.comment.value,
			private_chk: replyf.private_chk.value
		},
		function(result){
			console.log(result);
			replyf.comment.value = '';
		}
	);
})


window.onload = function(){
	//공지사항 규칙
	getrule();
	
	if(document.querySelector("#participate") == null){
		partyWriter();
	}else{
		notPartyWriter();
	}
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
});

//목록 버튼
const urlParams = new URL(location.href).searchParams;
//게시글 체크 폼
const f = document.querySelector("#participateForm");
//댓글 폼
const replyf = document.querySelector("#replyform");


//내가 생성한 파티가 아닐 경우
function notPartyWriter(){
	//참여 버튼
	document.querySelector("#participate").addEventListener('click', function() {
	    	if(principal == 'anonymousUser'){
	    		alert('로그인 후 이용가능한 서비스입니다.');
	    		return;
	    	}
	    	
	    	if(!document.querySelector("#agree").checked){
	    		alert('안내 및 규칙을 읽고 체크박스에 체크해 주세요.');
	    		return;
	    	}
	    	
	    	f.action = '/payment/orderform';
	    	f.submit();
	});
	
	//목록 버튼
	document.querySelector("#getpartylist").addEventListener('click', ()=>{
		let c1 = urlParams.get('c1');
		location.href = "/shop/list/" + c1;
	});
}

//내가 생성한 파티일 경우
function partyWriter(){
	//관리 버튼
	document.querySelector("#myPartyManage").addEventListener('click', ()=>{
		location.href = "/partner/manage";
	});
	
	//목록 버튼
	document.querySelector("#getpartylist").addEventListener('click', ()=>{
		let c1 = urlParams.get('c1');
		location.href = "/shop/list/" + c1;
	});
}


//댓글관련
const rs = replyService;

//댓글 목록 가져오기
showList(); 
function showList(){
	rs.getList(
		replyf.p_idx.value,
		function(result){
			let msg = '';
			result.forEach(reply => {
	             msg += '<div id="chat">';
	             msg += '<div id="chatcontentarea">';
	             msg += '<div id="replynick">' + reply.writer + '</div>';
	             msg += '<div id="replycontent">';
	             msg += '<span id="commentto">@' + reply.comment_to + '</span><br><span id="replycomment">' + reply.comment + '</span>';
	             
	             //삭제 버튼 - 로그인된 닉네임과 댓글 작성자 동일해야 삭제 버튼 활성화
	             if(principal != 'anonymousUser'){
	            	 if(principal.member.nickname == reply.writer){
			             msg += '<div id="replybtnarea" class="btn-group dropend" role="group">';
			             msg += '<button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">';
			             msg += '<img id="replymenubtn" src="/resources/images/replymenu.png"></button>';
			             msg += '<ul id="replybtns" class="dropdown-menu">';
			             msg += '<li><a class="dropdown-item" href="javascript:replyDelete(' + reply.c_idx + ');">삭제</a></li>';
			             msg += '</ul>';
			             msg += '</div>'; 
		             } 
	             }
	             
	             msg += '</div>';
	             msg += '<br><span id="replyregdate">' + reply.reg_date + '</span>';
	             msg += '</div>';
	             msg += '</div>';
			});
			
			document.querySelector("#chatarea").innerHTML = msg;
		}
	);
}

//댓글 등록 버튼
document.querySelector("#replyregister").addEventListener('click', ()=>{
	if(principal == 'anonymousUser'){
		alert('로그인 후 이용가능한 서비스입니다.');
		replyf.comment.value = '';
		return;
	}
	
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
			writer: principal.member.nickname,
			comment_to: replyf.comment_to.value,
			comment: replyf.comment.value,
			private_chk: replyf.private_chk.value
		},
		function(result){
			replyf.comment.value = '';
			showList();
		}
	);
})

//댓글 삭제
function replyDelete(c_idx){
	if(confirm('댓글을 삭제하시겠습니까?')){
		rs.remove(
			c_idx,
			function(result){
				showList();
			}
		);
	}
}
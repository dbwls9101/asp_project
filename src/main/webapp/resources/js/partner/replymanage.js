//list 가져오기
getPrincipal().then(() => {
   getList(principal.member.nickname);
})

//파티장에게 달린 댓글 목록
function getList(partnernick){
	msg = "";
	
	fetch('/partner/replylist', {
		method : 'post',
		body : partnernick,
		headers : {'Content-type' : 'application/json; charset=utf-8'}
	})
	.then(response => response.json())
	.then(json => {
		json.forEach(vo => {
			msg += '<tr>';
			msg += '<td>' + vo.writer + '</td>';
			msg += '<td>' + vo.reg_date + '</td>';
			msg += '<td class="ellipsis"><a href="/shop/get?c1=' + vo.codeone + '&c2=' + vo.codetwo + '&pn=' + vo.p_idx + '">[' + vo.c_secondary + '] ' + vo.title + '</a></td>';
			msg += '<td class="ellipsis">' + vo.comment + '</td>';
			msg += '<td><input type="button" id="replyanswer" value="답변" onclick="doReplyAnswer(' + vo.c_idx + ')"></td>';
			msg += '</tr>';
		})
		
		document.querySelector("tbody").innerHTML = msg;
	})
	.catch(err => console.log(err));
}


//답댓글 모달
function doReplyAnswer(c_idx){
	//모달창 open
	document.querySelector("textarea[name='comment'").value='';
	document.querySelector("#private").checked = false;
	document.getElementById("modal").style.display = 'flex';
	document.body.style.overflow = 'hidden';
	
	fetch('/partner/pages/' + c_idx)
	.then(response => response.json())
	.then(json => {
		document.querySelector(".writer").innerHTML = json.writer;
		document.querySelector("#title").innerHTML = '<a href="/shop/get?c1=' + json.codeone + '&c2=' + json.codetwo + '&pn=' + json.p_idx + '">[' + json.c_secondary + '] ' + json.title;
		document.querySelector("#comment").innerHTML = json.comment;
		
		document.querySelector("input[name='comment_to'").value = json.writer;
		document.querySelector("input[name='p_idx'").value = json.p_idx;
	})
	.catch(err => console.log(err));
}

//모달창 close
document.querySelector(".close-area").addEventListener('click', ()=>{
	document.getElementById("modal").style.display = 'none';
	document.body.style.overflow = '';
})

//모달창 바깥영역 클릭시 close
document.getElementById("modal").addEventListener("click", e => {
  const evTarget = e.target;
  if(evTarget.classList.contains("modal-overlay")) {
  	document.getElementById("modal").style.display = "none"
  	document.body.style.overflow = '';
  }
})

//답댓글 등록
const rs = replyService;
const answer = document.forms[0];

document.querySelector("#answerRegister").addEventListener('click', ()=>{
	if(principal == 'anonymousUser'){
		alert('로그인 후 이용가능한 서비스입니다.');
		answer.comment.value = '';
		return;
	}
	
	if(answer.comment.value == ''){
		alert('내용을 입력해주세요.');
		return;
	}
	
	if(document.querySelector("#private").checked){
		answer.private_chk.value = 'Y';
	}else{
		answer.private_chk.value = 'N';
	}
	
	rs.add(
		{
			p_idx: answer.p_idx.value,
			writer: principal.member.nickname,
			comment_to: answer.comment_to.value,
			comment: answer.comment.value,
			private_chk: answer.private_chk.value
		},
		function(result){
			location.href='/partner/replymanage';
		}
	);
})

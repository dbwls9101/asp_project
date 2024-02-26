window.onload = function(){
	//일 /금액 계산
	totalperiodprice();
	//공지사항 규칙
	getrule();
}


function totalperiodprice(){
	let perEle = document.querySelector("#period");
	let priEle = document.querySelector("#price");
	
	//오늘날짜
	let sArr = new Date().toISOString().slice(0, 10);
	let sArr2 = sArr.split('-');
	let sDate = new Date(sArr2[0], sArr2[1], sArr2[2]);
	
	//종료날짜
	let eArr = myTime(perEle.getAttribute("enddate")).split('-');
	let eDate = new Date(eArr[0], eArr[1], eArr[2]);
	
	let diffDate = Math.abs((sDate - eDate) / (1000*60*60*24));
	
	let totalPrice = (priEle.getAttribute("price") * diffDate).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
	
	perEle.innerHTML += ' (' + diffDate + '일 / 1일 ' + priEle.getAttribute("price").toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") 
						+ '원)&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;';
	priEle.innerHTML = '참여 비용 : ' + totalPrice + '원';
}

//unixTimeStamp 변환
function myTime(unixTimeStamp){
	let myDate = new Date(unixTimeStamp);
	let date = myDate.getFullYear() + "-"
	 	+ String(myDate.getMonth() + 1).padStart(2, "0") + "-" 
		+ String(myDate.getDate()).padStart(2, "0");
	
	return date;
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


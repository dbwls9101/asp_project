//파티 생성
document.querySelector("#makeparty").addEventListener('click', ()=>{
	location.href = '/partner/register';
})

//list 가져오기
getPrincipal().then(() => {
let pageData = getStorageData();
	
	if(pageData == null){
		getList(principal.member.m_idx, 1, 10);
	}else{
		getList(principal.member.m_idx, pageData.pageNum, pageData.amount);
	}
})
function getList(m_idx, pageNum, amount){
	let msg = "";
	let page = "";
	
	fetch('/partner/partyinfo', {
		method : 'post',
		body : JSON.stringify({
			m_idx : m_idx,
			pageNum : pageNum,
			amount : amount
		}),
		headers : {'Content-type' : 'application/json; charset=utf-8'}
	})
	.then(response => response.json())
	.then(json => {
		let list = json.list;
		
		list.forEach(vo => {
			//남은기간
			//시작날짜
			let sDate = new Date();
			//종료날짜
			let eArr = myTime(vo.end_date).split('-');
			let eDate = new Date(eArr);
			let diffDate = Math.abs(Math.round((sDate - eDate) / (1000*60*60*24)));
			
			//상태값
			let status = '';
			if (vo.pay_status == 'A') {
				status = '결제대기';
			}else if (vo.pay_status == 'B') {
				status = '결제완료';
			}else if (vo.pay_status == 'C') {
				status = '결제실패';
			}else {
				status = '결제취소';
			}
			
			msg += '<tr>';
			msg += '<td>' + myTime(vo.approved_at) + '</td>';
			msg += '<td>' + vo.title + '</td>';
			msg += '<td>' + vo.name + '</td>';
			msg += '<td>' + status + '</td>';
			if (diffDate < 0) {
				msg += '<td>마감</td>';
			}else {
				msg += '<td>' + diffDate + '일</td>';
			}
			msg += '<td>' + vo.service_amount + '원</td>';
			msg += '<td>' + vo.commission + '원</td>';
			msg += '<td>' + vo.pay_amount + '원</td>';
			msg += '</tr>';
		})
		
		//페이징
		if(json.prev){
			page += '<li class="previous">';
			page += '<a href="' + (json.startPage-1) + '">&lt;</a>';
			page += '</li>';
		}
		
		for(let i = json.startPage; i <= json.endPage; i++){
			page += '<li>';
			page += '<a href="' + i + '" class="' + (json.cri.pageNum == i ? 'active' : '') + '">' + i + '</a>';
			page += '</li>';
		}
		
		if(json.next){
			page += '<li class="previous">';
			page += '<a href="' + (json.endPage+1) + '">&gt;</a>';
			page += '</li>';
		}
		
		document.querySelector("tbody").innerHTML = msg;
		document.querySelector(".page-nation").innerHTML = page;
	})
	.then(()=>{
		pagingEvent();
	})
	.catch(err => console.log(err));
}

//페이지 버튼 클릭 이벤트
function pagingEvent(){
	document.querySelectorAll(".page-nation li a").forEach(aEle => {
		aEle.addEventListener('click', function(e){
			e.preventDefault(); //href 경로 이동 방지
			
			//태그 속성 불러오기
			let menu = 'partyinfo';
			let pageNum = this.getAttribute("href");
			let amount = 10;
			
			getList(principal.member.m_idx, pageNum, amount);
		});
	});
}

//unixTimeStamp 변환
function myTime(unixTimeStamp){
	let myDate = new Date(unixTimeStamp);
	let date = myDate.getFullYear() + "-"
	 	+ String(myDate.getMonth() + 1).padStart(2, "0") + "-" 
		+ String(myDate.getDate()).padStart(2, "0") + ' ' 
		+ String(myDate.getHours()).padStart(2, "0") + ':' 
		+ String(myDate.getMinutes()).padStart(2, "0") + ':' 
		+ String(myDate.getSeconds()).padStart(2, "0");
	
	return date;
}


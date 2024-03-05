//파티 생성
document.querySelector("#makeparty").addEventListener('click', ()=>{
	location.href = '/partner/register';
})

//list 가져오기
getPrincipal().then(() => {
	getList(principal.member.m_idx);
})
function getList(m_idx){
	msg = "";
	
	fetch('/partner/partyinfo', {
		method : 'post',
		body : m_idx,
		headers : {'Content-type' : 'application/json; charset=utf-8'}
	})
	.then(response => response.json())
	.then(json => {
		json.forEach(vo => {
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
		
		document.querySelector("tbody").innerHTML = msg;
	})
	.catch(err => console.log(err));
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


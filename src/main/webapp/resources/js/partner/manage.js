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
	
	fetch('/partner/list', {
		method : 'post',
		body : m_idx,
		headers : {'Content-type' : 'application/json; charset=utf-8'}
	})
	.then(response => response.json())
	.then(json => {
		json.forEach(vo => {
			msg += '<tr>';
			msg += '<td>' + vo.p_idx + '</td>';
			msg += '<td><a href="/shop/get?c1=' + vo.codeone + '&c2=' + vo.codetwo + '&pn=' + vo.p_idx + '">[' + vo.c_secondary + '] ' +  vo.title + '</a></td>';
			msg += '<td>' + vo.price + '원</td>';
			msg += '<td>' + vo.curr_party + ' / ' + vo.party_num + '</td>';
			msg += '<td>' + vo.datediff + '일</td>';
			msg += '<td>' + myTime(vo.end_date) + '</td>';
			msg += '<td>' + myTime(vo.reg_date) + '</td>';
			msg += '<td><input type="button" id="partymodify" value="수정" onclick="modifyBtnEvent(' + vo.p_idx + ')">';
			msg += '&nbsp;<input type="button" id="partydelete" value="삭제"onclick="deleteBtnEvent(' + vo.p_idx + ')"></td>';
			msg += '</tr>';
		})
		
		document.querySelector("tbody").innerHTML = msg;
	})
	.catch(err => console.log(err));
}

//수정 삭제 버튼 클릭 이벤트
function modifyBtnEvent(p_idx){
	location.href = '/partner/modify?pn=' + p_idx;
}

function deleteBtnEvent(p_idx){
	
}

//unixTimeStamp 변환
function myTime(unixTimeStamp){
	let myDate = new Date(unixTimeStamp);
	let date = myDate.getFullYear() + "-"
	 	+ String(myDate.getMonth() + 1).padStart(2, "0") + "-" 
		+ String(myDate.getDate()).padStart(2, "0");
	
	return date;
}

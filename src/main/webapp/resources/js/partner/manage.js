//파티 생성
document.querySelector("#makeparty").addEventListener('click', ()=>{
	location.href = '/partner/register';
})

//list 가져오기
getList(101); //파라미터 > 인증된 사용자 회원번호
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
			//오늘날짜
			let sArr = new Date().toISOString().slice(0, 10);
			let sArr2 = sArr.split('-');
			let sDate = new Date(sArr2[0], sArr2[1], sArr2[2]);
			//종료날짜
			let eArr = myTime(vo.end_date).split('-');
			let eDate = new Date(eArr[0], eArr[1], eArr[2]);

			let diffDate = Math.abs((sDate - eDate) / (1000*60*60*24));
			
			msg += '<tr>';
			msg += '<td>' + vo.p_idx + '</td>';
			msg += '<td><a href="#">[' + vo.c_secondary + '] ' +  vo.title + '</a></td>';
			msg += '<td>' + vo.price + '원</td>';
			msg += '<td>' + vo.curr_party + ' / ' + vo.party_num + '</td>';
			msg += '<td>' + diffDate + '일</td>';
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

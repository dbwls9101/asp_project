const CSS_FILE_PATH = ['/resources/css/partner/withdraw.css', '/resources/css/partner/modal.css'];
//2. link 태그 생성
cssBinding(CSS_FILE_PATH);
function cssBinding(cssFiles) {
	cssFiles.forEach(css => {		
		let linkEle = document.createElement('link');
		linkEle.rel = 'stylesheet';
		linkEle.type = 'text/css';
		linkEle.href = css;
//3. head 태그에 link 엘리먼트 추가
		document.head.appendChild(linkEle);
	});
}
//form 객체 가져오기
const f = document.forms[0]; 

// ----------------- 비동기 방식 리스트업 + 환불신청 ----------------------------

getList(principal.member.m_idx);
function getList(m_idx){
	//1.출금관리 listUp
	console.log("m_idx... : " + m_idx)
	let msg = '';
	
	fetch('/partner/withList/'+ m_idx)
	.then( response => response.json() )
	.then( json => {
		console.log(json)
		json.forEach(withdraw => {
			
			msg += '<tr>';
			msg += 		'<td>' + withdraw.w_idx +'</td>';
			msg +=		'<div>';			
			msg += 		'<td>'
			msg += 		'<c:choose>';
					if(withdraw.with_status == "A") {
						msg += 	'<strong class="word-color1">' + "신청" + '</strong>';
					} else if(withdraw.with_status == "B") {
						msg += 	'<strong class="word-color2">' + "승인" + '</strong>';
					} else {
						msg += 	'<strong class="word-color2">' + "반려" + '</strong>';
					}
			msg +=		'</c:choose>';		
			msg +=      '</td>';
			msg +=		'</div>';
			msg += 		'<td>' + withdraw.id +'</td>';
			msg += 		'<td>' + withdraw.with_method +'</td>';
			msg += 		'<td>' + withdraw.name +'</td>';
			msg += 		'<td>' + withdraw.commission +'</td>';
			msg += 		'<td>' + withdraw.with_amount +'</td>';
			msg += 		'<td>' + myTime(withdraw.reg_date) +'</td>';	
			msg +=		'<td>'
			msg +=		'<input type="button" class="btn11" value="출금취소" onclick="removeWithdraw('+ withdraw.w_idx +')" id="removeWithdrawBtn">'
			msg +=		'</td>'	
			msg += '</tr>';	
		})
			document.querySelector("tbody").innerHTML = msg;
	})
	.catch( err => console.log(err) );

} 	

//unixTimeStamp 변환
function myTime(unixTimeStamp) {
	
	let myDate = new Date(unixTimeStamp);
	let date = myDate.getFullYear() + "-"
	 	+ String(myDate.getMonth() + 1).padStart(2, "0") + "-" 
		+ String(myDate.getDate()).padStart(2, "0") + ' ' 
		+ String(myDate.getHours()).padStart(2, "0") + ':' 
		+ String(myDate.getMinutes()).padStart(2, "0") + ':' 
		+ String(myDate.getSeconds()).padStart(2, "0");
	
	return date;
}

// 출금 등록이 모달을 이용해서 진행하기 때문에 모달 관련 스트립트를 먼저 가지고 온다.

/*// 1-1. 출금 등록시 버튼을 누르면 등록하는 3개의 란에 작성을하면
// 1-2. 기록된 데이터는 테이블에 저장된다. (이때, 나머지 내용 들은 히든으로 넣어야 한다.(원래 회원의 경우 나머지 정보가 있기 때문이다.)
// 2-1. 리스트를 나오게 할때,
// 2-2. 등록된 결과를 불러온다. 위에 히든으로 넣었기 때문에 그 정보만 불러오면된다.!!*/

const modal = document.querySelector('#modal');
const midx = document.querySelector('input[name="m_idx]');
const inputName = document.querySelector('input[name="name"]');
const inputWithAmount = document.querySelector('input[name="with_amount"]');
const inputWithMethod = document.querySelector('input[name="with_method"]');
const addReplyBtn = document.querySelector('#addReplyBtn');			// 최종 댓글이 등록되게 누르는 버튼
const withDrawal = document.querySelector('#withDrawal');			// 댓글 등록 시작버튼
const closeModalBtn = document.querySelector('#closeModalBtn');		// 입급화면(모달 창)을 닫는 취소 버튼

// 모달 창 활성화
function openModal() {
	modal.style.display = "block";
}

// 모달 창 비활성화
function closeModal() {
	modal.style.display = "none";
}

// 댓글 달기 버튼의 활성화
withDrawal.addEventListener('click', () => {
	openModal();
	regReplyModalStyle();
})

function regReplyModalStyle() {
	// 수정 / 삭제 버튼 숨기기
	addReplyBtn.classList.remove('hide');
	
	inputWithAmount.value = '';
	inputWithMethod.value = '';
//	inputName.value = principal.username;			// 이전에 있던 글들을 초기화 하기 위함

}

// 모달창을 닫는다.
closeModalBtn.addEventListener('click', () => {
	closeModal();
});

// 2. 출금 신청
addReplyBtn.addEventListener('click', () => {
	
	if(inputName.value == '' || inputWithAmount.value == '' || inputWithMethod.value == '') {
		alert('모든 내용을 입력해 주세요.');
		return;
	}
	
	fetch('/partner/withNew', {
		method : 'post',
		headers : {'Content-type' : 'application/json; charset=utf-8'},
		body : JSON.stringify({
			m_idx : principal.member.m_idx,
			id : f.id.value,
			phone : f.phone.value,
			with_status : f.with_status.value,
			commission : f.commission.value,
			name : inputName.value,
			with_amount : inputWithAmount.value,
			with_method : inputWithMethod.value
		})
	})
	.then( response => response.text() )
	.then( data => {
		console.log(data);
		closeModal();
		getList(principal.member.m_idx);	

	});
}); 

// 3. 출금 취소
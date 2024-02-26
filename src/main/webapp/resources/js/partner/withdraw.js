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

getWithList(6);
function getWithList(m_idx) {
	msg = '';
	
	fetch('/partner/withList', {
		method : 'post',
		body : m_idx,
		header : {'Content-type' : 'application/json; charset=UTF-8'}
	})
	.then( response => response.json() )
	.then( json => {
		cnosole.log(json)
		json.forEach(vo => {
			
			let status = '';
			
			if(vo.with_status == 'A') {
				status = '신청';
			}else if(vo.with_status == 'B') {
				status = '승인';
			}else if(vo.with_status == 'C') {
				status = '반려';
			}
			
			msg += '<tr>';
			msg += '<td>' + vo.w_idx +'</td>';
			msg += '<td>' + vo.status +'</td>';
			msg += '<td>' + vo.id +'</td>';
			msg += '<td>' + vo.with_method +'</td>';
			msg += '<td>' + vo.name +'</td>';
			msg += '<td>' + vo.commission +'</td>';
			msg += '<td>' + vo.with_amount +'</td>';
			msg += '<td>' + myTime(vo.reg_date) +'</td>';			
			msg += '</tr>';	
		})
//		withDraw.innerHTML = msg;
		document.querySelector("tbody").innerHTML = msg;
	})
	.catch( err => console.log(err) );
}
// unixTimeStamp 변환
function myTime(unixTimeStamp) {
	let myDate = new Date(unixTimeStamp);
	let date = myDate.getFullYear() + "-"
	 	+ String(myDate.getMonth() + 1).padStart(2, "0") + "-" 
		+ String(myDate.getDate()).padStart(2, "0") + ' ' 
		+ String(myDate.getHours()) + ':' 
		+ String(myDate.getMinutes()) + ':' 
		+ String(myDate.getSeconds());
	
	return date;
}

// 출금 등록이 모달을 이용해서 진행하기 때문에 모달 관련 스트립트를 먼저 가지고 온다.

/*// 1-1. 출금 등록시 버튼을 누르면 등록하는 3개의 란에 작성을하면
// 1-2. 기록된 데이터는 테이블에 저장된다. (이때, 나머지 내용 들은 히든으로 넣어야 한다.(원래 회원의 경우 나머지 정보가 있기 때문이다.)
// 2-1. 리스트를 나오게 할때,
// 2-2. 등록된 결과를 불러온다. 위에 히든으로 넣었기 때문에 그 정보만 불러오면된다.!!*/

const modal = document.querySelector('#modal');
const inputName = document.querySelector('input[name="name"]');
const inputWithAmount = document.querySelector('input[name="with_amount"]');
const inputWithMethod = document.querySelector('input[name="with_method"]');
const addReplyBtn = document.querySelector('#addReplyBtn');			// 최종 댓글이 등록되게 누르는 버튼
const withDrawal = document.querySelector('#withDrawal');			// 댓글 등록 시장버튼
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
})

// 모달창을 닫는다.
closeModalBtn.addEventListener('click', () => {
	closeModal();
});

// 최종 댓글을 등록하는 버튼
/*addReplyBtn.addEventListener('click', () => {
	if(inputName.value == '' || inputWithAmount.value == '' || inputWithMethod.value == '') {
		alert('모든 내용을 입력해 주세요.');
		return;
	}
	
	rs.add(
		{
			m_idx = f.m_idx.value,
			name = inputName.value,
			with_amount = inputWithAmount.value,
			with_method = inputWithMethod.value
		},	
		function(result) {
			console.log("result : " + result);
			closeModal();
			showList();
		}
	)
	
	
})*/




















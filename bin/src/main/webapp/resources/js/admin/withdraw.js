// ----- css 파일 추가
// 1. 파일 경로 설정
const CSS_FILE_PATH = '/resources/css/admin/withdraw.css';
// 2. link 태그 생성
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.type = 'text/css';
linkEle.href = CSS_FILE_PATH;
// 3. head 태그에 link 엘리먼트 추가
document.head.appendChild(linkEle);

// form 객체를 가지고 오자
const f = document.forms[0];

//----------------- 비동기 방식 리스트업 + 출금 신청 및 최종 확인 ----------------------------

getList();
function getList(){
	//1.출금관리 listUp
	let msg = '';
	
	fetch('/admin/withdrawList/')
	.then( response => response.json() )
	.then( json => {
		console.log(json)
		json.forEach(withdrawList => {
			
			msg += '<tr>';
			msg +=		'<div>';			
			msg += 		'<td>'

			if(withdrawList.with_status == "A") {
				msg += 	'<strong class="word-color1">' + "신청" + '</strong>';
			} else if(withdrawList.with_status == "B") {
				msg += 	'<strong class="word-color2">' + "승인" + '</strong>';
			} else {
				msg += 	'<strong class="word-color2">' + "반려" + '</strong>';
			}

			msg +=      '</td>';
			msg +=		'</div>';
			msg += 		'<td>' + withdrawList.w_idx +'</td>';
			msg += 		'<td>' + myTime(withdrawList.reg_date) +'</td>';	
			msg += 		'<td>' + withdrawList.with_method +'</td>';
			msg += 		'<td>' + (withdrawList.with_amount - withdrawList.commission) + '</td>';
			msg += 		'<td>' + withdrawList.note +'</td>';
			msg += 		'<td>'
			msg +=		'<input type="button" name="approval" id="approval" onclick="approvalEvent('+ withdrawList.w_idx + ')" value="승인"/>'
			msg +=		'<input type="button" name="Companion" id="Companion" value="반려"/>'	
			msg +=		'</td>';
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

// 나중에 버튼을 누르면 승인 -> 승인완료 로 변경
// 버튼 클릭시 버튼 이름 변경
const btnElement = document.querySelector('approval');

function changeBtnName() {
	btnElement.value = "승인완료";
}

// --------------- 승인완료 버튼을 누르면 변경되는 내용 -------------------------
// 1. 내용을 확인 하고 해당 되는 계좌에 입금을 한다.
// 2. 입금하면서 승인 버튼을 누르면 
// 2-1. 승인 버튼은 -> 승인 완료 버튼으로 변경된다.
// 2-2. 동시에 with_staus가 "A"에서 -> "C" 승인 완료로 변경 된다.
// 3. 위 내용중에 2번 내용을 처리 하기 위해서 해야 할 일
// -- 1. 쿼리문 작성 -> 내용을 변경해야 하기 때문에 update 문을 이용 하자
// -- 2. adminController 에서 update 관련된 내용을 작성 -> withdraw.xml에 까지 작성
// -- 3. 그리고 여기 스크립트에서 처리 해줄까??


function approvalEvent(w_idx){
	if(confirm('승인하시겠습니까?')){
		fetch("/admin/modifyWithdraw", {
			method : 'post',
			headers : {'Content-type' : 'application/json; charset=utf-8'},
			body : w_idx
		})
		.then( response => response.text() )
		.then( data => {
			if(data == 'success'){
				getList();
			}
			else{
				alert('승인에 실패하였습니다.');
			}
//			changeBtnName();
		});
	}
}









var IMP = window.IMP;
IMP.init("imp45030755");   /* imp~ : 가맹점 식별코드*/
	
const f = document.forms[0];

//list 가져오기
getPrincipal().then(() => {
	let pageData = getStorageData();
	
	if(pageData == null){
		setStorageData('listpage', 1, 10);
		getList(principal.member.m_idx, 1, 10);
	}else{
		getList(principal.member.m_idx, pageData.pageNum, pageData.amount);
	}
})

function getList(m_idx, pageNum, amount){
	let msg = "";
	let page = "";
	
	fetch('/payment/orderinquiry', {
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
		
		if(list.length == 0){
			msg += '<tr>';
			msg += '<td colspan="8">내역이 없습니다.</td>';
			msg += '</tr>';
    	}
		
		list.forEach(vo => {
			let status = '';
			
			if (vo.pay_status == 'A') {
				status = '결제 대기';
			}else if (vo.pay_status == 'B') {
				status = '결제 완료';
			}else if (vo.pay_status == 'C') {
				status = '환불 신청';
			}else {
				status = '결제 취소';
			}
			
			msg += '<tr>';
			msg += '<td>' + vo.approved_at + '</td>';
			msg += '<td><a  href="javascript:detailBtn(' + vo.order_no + ');">' + vo.title + '<br><span class="sub-title">' + vo.sub_title + '</span></a></td>';
			msg += '<td>' + vo.pay_amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원</td>';
			msg += '<td>' + (vo.pay_amount - vo.point).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원</td>';
			msg += '<td>' + vo.point.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원</td>';
			msg += '<td><span class="refund-amount">' + vo.refund_amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '</span>원</td>';
			
			if (vo.pay_status == 'B') {
			    let todayTimestamp = new Date();
			    let nextDayTimestamp = calculateNextDay(vo.approved_at);
			    
			    if (todayTimestamp < nextDayTimestamp) {
			        // 결제 완료 후 24시간 이전
			        msg += '<td><button type="button" class="cancel-btn" onclick="cancelBtn(' + vo.order_no + ')">결제취소</button></td>';
			    } else {
			        // 결제 완료 후 24시간 이후
			        msg += '<td><button type="button" class="cancel-btn refund" onclick="refundBtn(' + vo.order_no + ')">환불신청</button></td>';
			    }
			}else{
				 msg += '<td>-</td>';
			}
			
			msg += '<td>' + status + '</td>';
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

//24시간 뒤의 시간 반환
function calculateNextDay(timestampString) {
    let timestamp = new Date(timestampString);
    timestamp.setTime(timestamp.getTime() + (24 * 60 * 60 * 1000));
    return timestamp;
}

//페이지 버튼 클릭 이벤트
function pagingEvent(){
	document.querySelectorAll(".page-nation li a").forEach(aEle => {
		aEle.addEventListener('click', function(e){
			e.preventDefault(); //href 경로 이동 방지
			
			//태그 속성 불러오기
			let menu = 'listpage';
			let pageNum = this.getAttribute("href");
			let amount = 10;
			
			setStorageData(menu, pageNum, amount);
			
			getList(principal.member.m_idx, pageNum, amount);
		});
	});
}

// 결제취소 버튼
const ps = payService;
function cancelBtn(order_no) {
	if (confirm('결제 취소하시겠습니까?')) {
		ps.cancel(order_no, function(result) {
			console.log(result);
			location.reload();
		})
	}else {
		alert('결제 취소를 실패하였습니다.');
		return;
	}
}

//환불 신청 버튼
function refundBtn(order_no){
	alert(order_no);
}

//상세내역 이동
function detailBtn(order_no) {
	location.href = '/payment/orderdetail?order_no=' + order_no;
}
	

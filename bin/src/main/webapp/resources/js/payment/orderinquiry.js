var IMP = window.IMP;
IMP.init("imp45030755");   /* imp~ : 가맹점 식별코드*/
	
const f = document.forms[0];

//list 가져오기
getPrincipal().then(() => {
	getList(principal.member.m_idx);
})
function getList(m_idx){
	msg = "";
	
	fetch('/payment/orderinquiry', {
		method : 'post',
		body : m_idx,
		headers : {'Content-type' : 'application/json; charset=utf-8'}
	})
	.then(response => response.json())
	.then(json => {
		json.forEach(vo => {
			
			let status = '';
			
			if (vo.pay_status == 'A') {
				status = '대기';
			}else if (vo.pay_status == 'B') {
				status = '완료';
			}else if (vo.pay_status == 'C') {
				status = '실패';
			}else {
				status = '취소';
			}
			
			
			msg += '<tr>';
			msg += '<td>' + vo.approved_at + '</td>';
			msg += '<td><a  href="javascript:detailBtn(' + vo.order_no + ');">' + vo.title + '<br><span class="sub-title">' + vo.sub_title + '</span></a></td>';
			msg += '<td>' + vo.pay_amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원</td>';
			msg += '<td>' + (vo.pay_amount - vo.point).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원</td>';
			msg += '<td>' + vo.point.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원</td>';
			msg += '<td><span class="refund-amount">' + vo.refund_amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '</span>원</td>';
			if (vo.pay_status == 'B') {
				msg += '<td>' + '<button type="button" class="cancel-btn" onclick="cancelBtn(' + vo.order_no + ')">결제취소</button>' + '</td>';
			} else {
				msg += '<td><span class="complete-btn">취소완료</span></td>';
			}
			msg += '<td>' + status + '</td>';
			msg += '</tr>';
		})
		
		document.querySelector("tbody").innerHTML = msg;
	})
	.catch(err => console.log(err));
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

//상세내역 이동
function detailBtn(order_no) {
	location.href = '/payment/orderdetail?order_no=' + order_no;
}
	

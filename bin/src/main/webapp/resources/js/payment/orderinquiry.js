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

	    let promises = list.map(vo => {
	        return getRefundAmount(vo.p_idx)
	            .then(refundAmount => {
	            	let status = '';
	            	let msg = '';
	            	let buttonHtml = '';
	    			
	    			if (vo.pay_status == 'A') {
	    				status = '결제대기';
	    			}else if (vo.pay_status == 'B') {
	    				status = '결제완료';
	    			}else if (vo.pay_status == 'C') {
	    				status = '환불신청';
	    			}else {
	    				status = '결제취소';
	    			}
	    			
	    			msg += '<tr>';
	    			msg += '<td>' + vo.approved_at + '</td>';
	    			msg += '<td><a  href="javascript:detailBtn(' + vo.order_no + ');">' + vo.title + '<br><span class="sub-title">' + vo.sub_title + '</span></a></td>';
	    			msg += '<td>' + vo.pay_amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원</td>';
	    			msg += '<td>' + (vo.pay_amount - vo.point).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원</td>';
	    			msg += '<td>' + vo.point.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '원</td>';
	    			msg += '<td><span class="refund-amount">' + vo.refund_amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + '</span>원</td>';

	                if (vo.pay_status == 'B') {
	                    let todayTimestamp = new Date(); //오늘 날짜
	                    let nextDayTimestamp = calculateNextDay(vo.approved_at); //결제일로 부터 24시간 뒤

	                    if (todayTimestamp < nextDayTimestamp) {
	                        // 결제 완료 후 24시간 이전
	                    	msg += '<td><button type="button" class="cancel-btn" onclick="cancelBtn(' + vo.order_no + ')">결제취소</button></td>';
	                    } else {
	                        // 결제 완료 후 24시간 이후
	                        if (refundAmount <= 0) {
	                        	msg += '<td>파티마감</td>';
	                        } else {
	                        	msg += '<td><button type="button" class="cancel-btn refund" onclick="refundBtn(\'' + vo.order_no + '\', \'' + vo.p_idx + '\', \'' + vo.pay_amount + '\')">환불신청</button></td>';
	                        }
	                    }
	                } else {
	                	msg += '<td>-</td>';
	                }
	                
	                msg += '<td>' + status + '</td>';
	                msg += '</tr>';

	                return msg;
	            })
	            .catch(err => console.log(err));
	    });

	    Promise.all(promises)
        .then(msg => {
            document.querySelector("tbody").innerHTML = msg.join('');
        });
		
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

//환불금액
function getRefundAmount(p_idx){
	return fetch('/shop/reamount',{
		method : 'post',
		body : JSON.stringify(p_idx),
		headers : {'Content-type' : 'application/json; charset=utf-8'}
	})
	.then(response => response.json())
	.then(json => {
		return json.datediff * json.price;
	})
	.catch(err => console.log(err));
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

//환불신청 폼 오픈
function refundBtn(order_no, p_idx, pay_amount){
	document.getElementById("modal").style.display = 'flex';
	document.body.style.overflow = 'hidden';
	
	//모달창 close
	document.querySelector(".close-area").addEventListener('click', ()=>{
		document.getElementById("modal").style.display = 'none';
		document.body.style.overflow = '';
	})

	//모달창 바깥영역 클릭시 close
	document.getElementById("modal").addEventListener("click", e => {
	    const evTarget = e.target;
	    if(evTarget.classList.contains("modal-overlay")) {
	    	document.getElementById("modal").style.display = "none"
	    	document.body.style.overflow = '';
	    }
	})
	
	document.querySelector("#order_no").innerHTML = order_no;
	document.querySelector("#amount").innerHTML = pay_amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + ' 원';
	
	document.querySelector("input[name='order_no'").value = order_no;
	document.querySelector("input[name='p_idx'").value = p_idx;
	document.querySelector("input[name='amount'").value = pay_amount;
	
	fetch('/shop/reamount',{
		method : 'post',
		body : JSON.stringify(p_idx),
		headers : {'Content-type' : 'application/json; charset=utf-8'}
	})
	.then(response => response.json())
	.then(json => {
		document.querySelector("#re_amount").innerHTML = (json.datediff*json.price).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + ' 원';
		document.querySelector("input[name='re_amount'").value = json.datediff*json.price;
	})
	.catch(err => console.log(err));
}

//환불신청
let rf = document.forms[1];
document.querySelector("#refundreq").addEventListener('click', ()=>{
	let reason = rf.reason.value;
	
	if(rf.reason.value == '기타'){
		if(rf.otherreason.value == ''){
			alert('기타 사유를 입력해주세요.');
			return;
		}else{
			reason = '기타: ' + rf.otherreason.value;
		}
	}
	
	let refundObj = {
			order_no : rf.order_no.value,
			m_idx : principal.member.m_idx,
			p_idx : rf.p_idx.value,
			id : principal.member.id,
			name : principal.member.name,
			amount : rf.amount.value,
			re_amount : rf.re_amount.value,
			reason : reason
	};
	
	fetch('/shop/refundregister',{
		method : 'post',
		body : JSON.stringify(refundObj),
		headers : {'Content-type' : 'application/json; charset=utf-8'}
	})
	.then(response => response.text())
	.then(data => {
		if(data == 'success'){
			alert('환불신청이 완료되었습니다.');
			location.href = '/payment/orderinquiry';
		}
	})
	.catch(err => console.log(err));
})

//상세내역 이동
function detailBtn(order_no) {
	location.href = '/payment/orderdetail?order_no=' + order_no;
}
	

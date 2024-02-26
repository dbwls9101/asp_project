var IMP = window.IMP;
IMP.init("imp45030755");   /* imp~ : 가맹점 식별코드*/
	
const f = document.forms[0];
const payBtn = document.querySelector('#pay-btn');

//주문하기 버튼 클릭 시 
const ps = payService;
payBtn.addEventListener('click', () =>{
	
	const orderNumber = createOrderNum();
	let pg = '';
	
	if (f.pay_method.value === 'card') {
		pg = 'html5_inicis.INIpayTest';
	}else if (f.pay_method.value === 'kakaopay') {
		pg = 'kakaopay.TC0ONETIME';
	}
	
	
	IMP.request_pay({
		pg: pg,
		pay_method: 'card',
		merchant_uid: orderNumber,
		name: f.title.value,
		amount: f.pay_amount.value,
		buyer_email: "",  /*필수 항목이라 "" 로 남겨둠*/
		buyer_name: f.name.value,
		buyer_tel : f.phone.value
	}, function(rsp) {
		console.log(rsp);
		
		 //결제 성공 시
		if (rsp.success) {
			var msg = '결제가 완료되었습니다.';
			console.log("결제성공 ");
			
			const amount = f.pay_amount.value;
			const imp_uid = rsp.imp_uid;
			const merchant_uid =  rsp.merchant_uid;
			const payDate = '&amount=' + amount + '&imp_uid=' + imp_uid + '&merchant_uid=' + merchant_uid;
			
			ps.pay(payDate, function() {
				alert(msg);
			})
			
			ps.order({
				imp_uid : rsp.imp_uid,
				p_idx: f.p_idx.value,
				order_no : rsp.merchant_uid,
				id : f.id.value,
				name : f.name.value,
				phone : f.phone.value,
				service_amount : f.service_amount.value,
				pay_amount : f.pay_amount.value,
				point : f.point.value,
				commission : f.commission.value,
				pay_method : f.pay_method.value,
				pay_status : 'B',
				title : f.title.value
			}, function(result) {
				console.log('result : ' + result);
				//결제 후 해당 게시글로 이동
				location.href = '/shop/get?c1=' + f.codeone.value + '&c2=' + f.codetwo.value + '&pn=' + f.p_idx.value;
			});
			
		} else {
			var msg = '결제에 실패하였습니다.';
			msg += '\n에러내용 : ' + rsp.error_msg;
			alert(msg);
		}
	});
});

//주문번호 생성 함수
function createOrderNum() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
 
    let orderNum = year + month + day;
    for (let i = 0; i < 5; i++) {
        orderNum += Math.floor(Math.random() * 8);
    }
    return parseInt(orderNum);
}
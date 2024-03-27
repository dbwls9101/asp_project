const payService = (function() {
	function order(payInfo, callback) {
		fetch('/payment/order', {
    		method : 'post',
    		body : JSON.stringify(payInfo),
    		headers : {'Content-type' : 'application/json; charset=utf-8'}
   		})
	    .then(response => response.text())
	    .then( data => {
	    	//알림
			getPartnerId(payInfo.p_idx)
			.then(to_id =>{
				sendNotification(to_id, '님이 ' + payInfo.title + ' 파티에 참여했습니다.');
			})
			
	    	callback(data);
	    })
	    .catch(err => console.log(err));
	}
	
	function zeroOrder(payInfo, callback) {
		fetch('/payment/zeroOrder', {
    		method : 'post',
    		body : JSON.stringify(payInfo),
    		headers : {'Content-type' : 'application/json; charset=utf-8'}
   		})
	    .then(response => response.text())
	    .then( data => {
	    	//알림
			getPartnerId(payInfo.p_idx)
			.then(to_id =>{
				sendNotification(to_id, '님이 ' + payInfo.title + ' 파티에 참여했습니다.');
			})
			
	    	callback(data);
	    })
	    .catch(err => console.log(err));
	}
	
	function pay(payDate, callback) {
		fetch('/payment/pay?' + payDate)
   		.then(response => response.text())
	    .then( data => {
	    	callback(data);
	    })
	    .catch(err => console.log(err));
	}
	
	function cancel(order_no, p_idx, title, callback) {
		fetch('/payment/cancel', {
    		method : 'post',
    		body : order_no
   		})
	    .then(response => response.text())
	    .then( data => {
	    	//알림
			getPartnerId(p_idx)
			.then(to_id =>{
				sendNotification(to_id, '님이 ' + title + ' 파티에서 나가셨습니다.');
			})
			
	    	callback(data);
	    })
	    .catch(err => console.log(err));
	}
	
	function zeroCancel(order_no, p_idx, title, callback) {
		fetch('/payment/zeroCancel', {
    		method : 'post',
    		body : order_no
   		})
	    .then(response => response.text())
	    .then( data => {
	    	//알림
			getPartnerId(p_idx)
			.then(to_id =>{
				sendNotification(to_id, '님이 ' + title + ' 파티에서 나가셨습니다.');
			})
			
	    	callback(data);
	    })
	    .catch(err => console.log(err));
	}
	
	return {
		order:order,
		zeroOrder:zeroOrder,
		pay:pay,
		cancel:cancel,
		zeroCancel:zeroCancel
	}
})();


//파티장 아이디 
function getPartnerId(p_idx){
	return new Promise((resolve, reject) => {
        let usersArr = [];
        fetch('/shop/partnerid', {
                method: 'post',
                body: p_idx,
                headers: {
                    'Content-type': 'application/json; charset=utf-8'
                }
            })
            .then(response => response.text())
            .then(data => {
                resolve(data); 
            })
            .catch(err => reject(err)); 
    });
}

//알림
function sendNotification(to_id, content) {
    fetch('/alarm/savenotify', {
            method: 'post',
            body: JSON.stringify({
                to_id: to_id,
                from_id: principal.member.nickname,
                content: content,
                url: '/partner/partyinfo'
            }),
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            }
        })
        .then(response => response.text())
        .then(data => {
            if (data == 'success') {
                socket.send(to_id + "," + principal.member.nickname + "," + content + "," + '/partner/partyinfo');
            }
        })
        .catch(err => console.log(err));
}
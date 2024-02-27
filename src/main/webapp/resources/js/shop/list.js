window.onload = function(){
	//게시글 클릭이벤트
	getDetailInfo();
}

//파티 만들기
document.querySelector("#makeparty").addEventListener('click', ()=>{
	if(principal == 'anonymousUser'){
		alert('로그인 후 이용가능한 서비스입니다.');
		location.href = '/member/login';
		return;
	}
	location.href = '/partner/register';
})


//게시글 상세
let partyinfo = document.querySelectorAll("#partyinfo");
function getDetailInfo(){
	partyinfo.forEach(party => {
		party.addEventListener('click', () => {
			if(principal == 'anonymousUser'){
				alert('로그인 후 이용가능한 서비스입니다.');
				return;
			}
			
			let codeone = party.getAttribute('codeone');
			let codetwo = party.getAttribute('codetwo');
			let p_idx = party.getAttribute('p_idx');
			let datediff = party.getAttribute('datediff');
			
			if(datediff < 0){
				alert('이미 마감된 파티입니다.');
			}else{
				location.href = '/shop/get?c1=' + codeone + '&c2=' + codetwo + '&pn=' + p_idx;
			}
		})
	})
}
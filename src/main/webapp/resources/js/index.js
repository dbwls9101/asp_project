
function myTime(unixTimeStamp){
	let myDate = new Date(unixTimeStamp);
	let date = myDate.getFullYear() + "-"
	 	+ String(myDate.getMonth() + 1).padStart(2, "0") + "-" 
		+ String(myDate.getDate()).padStart(2, "0");
	
	return date;
}

window.onload = function(){
	//게시글 클릭이벤트
	getDetailInfo();
}

//게시글 상세
function getDetailInfo(){
let partyinfo = document.querySelectorAll("#partyinfo");
	partyinfo.forEach(party => {
		party.addEventListener('click', () => {
			
			let codeone = party.getAttribute('codeone');
			let codetwo = party.getAttribute('codetwo');
			let p_idx = party.getAttribute('p_idx');
			let datediff = party.getAttribute('datediff');
			
			if(datediff <= 0){
				alert('이미 마감된 파티입니다.');
			}else{
				location.href = '/shop/get?c1=' + codeone + '&c2=' + codetwo + '&pn=' + p_idx;
			}
		})
	})
}

//슬라이드

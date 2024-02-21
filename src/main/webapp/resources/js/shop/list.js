window.onload = function(){
	//일 /금액 계산
	totalperiodprice();
	//게시글 클릭이벤트
	getDetailInfo();
}

function totalperiodprice(){
	let perEle = document.querySelectorAll("#period");
	let priEle = document.querySelectorAll("#price");
	
	//오늘날짜
	let sArr = new Date().toISOString().slice(0, 10);
	let sArr2 = sArr.split('-');
	let sDate = new Date(sArr2[0], sArr2[1], sArr2[2]);
	
	for(let i = 0; i<perEle.length; i++){
		//종료날짜
		let eArr = myTime(perEle[i].getAttribute("enddate")).split('-');
		let eDate = new Date(eArr[0], eArr[1], eArr[2]);
		
		let diffDate = Math.abs((sDate - eDate) / (1000*60*60*24));
		
		let totalPrice = (priEle[i].getAttribute("price") * diffDate).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
		
		perEle[i].innerHTML = ' (' + diffDate + '일)';
		priEle[i].innerHTML = totalPrice + '원';
	}
}

//unixTimeStamp 변환
function myTime(unixTimeStamp){
	let myDate = new Date(unixTimeStamp);
	let date = myDate.getFullYear() + "-"
	 	+ String(myDate.getMonth() + 1).padStart(2, "0") + "-" 
		+ String(myDate.getDate()).padStart(2, "0");
	
	return date;
}

//파티 만들기
document.querySelector("#makeparty").addEventListener('click', ()=>{
	location.href = '/partner/register';
})


//게시글 상세
let partyinfo = document.querySelectorAll("#partyinfo");
function getDetailInfo(){
	partyinfo.forEach(party => {
		party.addEventListener('click', () => {
			let codeone = party.getAttribute('codeone');
			let codetwo = party.getAttribute('codetwo');
			let p_idx = party.getAttribute('p_idx');
			
			location.href = '/shop/get?c1=' + codeone + '&c2=' + codetwo + '&pn=' + p_idx;
		})
	})
}
//파티 생성
document.querySelector("#makeparty").addEventListener('click', ()=>{
	location.href = '/partner/register';
})

//list 가져오기
getPrincipal().then(() => {
	let pageData = getStorageData();
	
	if(pageData == null){
		getList(principal.member.m_idx, 1, 10);
	}else{
		getList(principal.member.m_idx, pageData.pageNum, pageData.amount);
	}
})

function getList(m_idx, pageNum, amount){
	let msg = "";
	let page = "";
	
	fetch('/partner/list', {
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
		
		list.forEach(vo => {
			msg += '<tr>';
			msg += '<td>' + vo.p_idx + '</td>';
			msg += '<td><a href="/shop/get?c1=' + vo.codeone + '&c2=' + vo.codetwo + '&pn=' + vo.p_idx + '">[' + vo.c_secondary + '] ' +  vo.title + '</a></td>';
			msg += '<td>' + vo.price + '원</td>';
			msg += '<td>' + vo.curr_party + ' / ' + vo.party_num + '</td>';
			msg += '<td>' + vo.datediff + '일</td>';
			msg += '<td>' + myTime(vo.end_date) + '</td>';
			msg += '<td>' + myTime(vo.reg_date) + '</td>';
			msg += '<td><input type="button" id="partymodify" value="수정" onclick="modifyBtnEvent(' + vo.p_idx + ')">';
			msg += '&nbsp;<input type="button" id="partydelete" value="삭제"onclick="deleteBtnEvent(' + vo.p_idx + ')"></td>';
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

//페이지 버튼 클릭 이벤트
function pagingEvent(){
	document.querySelectorAll(".page-nation li a").forEach(aEle => {
		aEle.addEventListener('click', function(e){
			e.preventDefault(); //href 경로 이동 방지
			
			//태그 속성 불러오기
			let menu = 'manage';
			let pageNum = this.getAttribute("href");
			let amount = 10;
			
			setStorageData(menu, pageNum, amount);
			
			getList(principal.member.m_idx, pageNum, amount);
		});
	});
}

//수정 삭제 버튼 클릭 이벤트
function modifyBtnEvent(p_idx){
	location.href = '/partner/modify?pn=' + p_idx;
}

function deleteBtnEvent(p_idx){
	
}

//unixTimeStamp 변환
function myTime(unixTimeStamp){
	let myDate = new Date(unixTimeStamp);
	let date = myDate.getFullYear() + "-"
	 	+ String(myDate.getMonth() + 1).padStart(2, "0") + "-" 
		+ String(myDate.getDate()).padStart(2, "0");
	
	return date;
}

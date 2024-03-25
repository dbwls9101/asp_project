//객체 생성 후 반환하는 함수
//function makeObject(id, pageNum, amount){
//	let obj = {
//		id : id,
//		pageNum : pageNum,
//		amount : amount,
//	};
//	
//	return obj;
//}

// list 가져오기
getPrincipal().then(() => {
	
	let pageData = getStorageData();
	
	if(pageData == null){
		setStorageData('mypoint', 1, 10);
		getMyPointList(principal.member.id, 1, 10);
	}else{		
		getMyPointList(principal.member.id, pageData.pageNum, pageData.amount);
	}
});

// list
function getMyPointList(id, pageNum, amount){
	let msg = "";
	let page = "";	
	
	fetch('/member/myPoint', {
		method : 'post',
		body : JSON.stringify({
			id : id,
			pageNum : pageNum,
			amount : amount
		}),
		headers : {'Content-type' : 'application/json; charset=utf-8'}
	})
	.then(response => response.json())
	.then(json => {
		let list = json.list;
		
		if(list != null && list.length >0){
			
			list.forEach(vo => {
				msg += '<tr>';
				msg += '<td>' + vo.content + '</td>';
				msg += '<td>' + vo.update_point + '</td>';
				msg += '<td>' + vo.before_point + '</td>';
				msg += '<td>' + vo.update_point + '</td>';
				msg += '<td>' + myTime(vo.reg_date) + '</td>';
				msg += '</tr>';
			})
			document.querySelector("#registerOpen").style.display = 'inline-block';
		}else{
			document.querySelector("#registerOpen").style.display = 'none';
				msg += '<tr>';
				msg += '<td colspan="8">' + '내역이 없습니다.' + '</td>';
				msg += '</tr>';	
				
			}
		
		// 페이징
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
		
		
		document.querySelector("#mypoint-list tbody").innerHTML = msg;
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
			let menu = 'listpage';
			let pageNum = this.getAttribute("href");
			let amount = 10;
			
			setStorageData(menu, pageNum, amount);
			
			getList(principal.member.m_idx, pageNum, amount);
		});
	});
}

//포인트 불러오기
getPrincipal().then(() => {
	if(document.getElementById("memberPoint")){
		let point = principal.member.point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		document.getElementById("memberPoint").innerHTML = point + 'P';
	}
});


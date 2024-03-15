// ----- css 파일 추가
// 1. 파일 경로 설정
const CSS_FILE_PATH = '/resources/css/Inquiry/Inquirymodify.css';
// 2. link 태그 생성
let linkEle = document.createElement('link');
linkEle.rel = 'stylesheet';
linkEle.type = 'text/css';
linkEle.href = CSS_FILE_PATH;
// 3. head 태그에 link 엘리먼트 추가
document.head.appendChild(linkEle);

// form 객체를 가지고 오자
const f = document.forms[0];

// 각 버튼 클릭 이벤트
document.querySelectorAll('.panel-body-btns button').forEach( btn => {
	btn.addEventListener('click', () => {
		
		let type = btn.id;
		
		if(type === 'modifyBtn') {
			modify()
		} else if(type === 'removeBtn') {
			remove()
		} else if(type === 'indexBtn') {
			let pageData = getStorageData();
			let sendData = "pageNum=" + pageData.pageNum + "&amount=" + pageData.amount;
			location.href = '/inquiry_board/Inquirylist?' + sendData;
		}
	});
});

// 게시글 수정
function modify() {
	if(!f.title.value) {
		alert("제목을 입력해 주세요.")
		return;
	}
	if(!f.content.value) {
		alert("내용을 입력해주세요.")
		return;
	}
	
	f.action = '/inquiry_board/Inquirymodify';
	f.submit();
}

// 게시글 삭제
function remove() {
	if(confirm("정말 삭제 하시겠습니까?")) {
		
		let i_idxEle = f.i_idx;
		f.innerHTML = '';
		f.appendChild(i_idxEle);
		
		f.action = '/inquiry_board/Inquiryremove';
		f.submit();
	}
}

//  -------------- 업로드 관련 내용 --------------

showCommList();
function showCommList() {
	let msg = '';
	let idx = f.i_idx.value;
	
	fetch('/inquiry_board/getAttachList/' + idx )
		.then( response => response.json() )
		.then( json => {
			console.log(json);
			
			json.forEach( file => {
				let fileCallPath = encodeURIComponent(file.uploadPath + "/" + file.uuid + "_" + file.fileName);

				msg += '<li path="'+file.uploadPath+'" uuid="'+ file.uuid +'" fileName="' + file.fileName+'">';
				msg += '<a href="/download?fileName='+ fileCallPath  +'">' + file.fileName  + '</a>';
				msg += '</li>';
				
			});
			if(msg == '') {
				msg += '<li colspan="2"> 등록된 파일이 없습니다. </li>';
			}			
			document.querySelector(".uploadResult ul").innerHTML = msg;
		})
		.catch( err => console.log("err : " + err) );
}







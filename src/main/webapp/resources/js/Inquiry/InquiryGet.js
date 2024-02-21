// 1. 2가지 이상 CSS 적용시 
const CSS_FILE_PATH = ['/resources/css/Inquiry/Inquiryget.css', '/resources/css/Inquiry/Inquirymodal.css'];
//2. link 태그 생성
cssBinding(CSS_FILE_PATH);
function cssBinding(cssFiles) {
	cssFiles.forEach(css => {		
		let linkEle = document.createElement('link');
		linkEle.rel = 'stylesheet';
		linkEle.type = 'text/css';
		linkEle.href = css;
//3. head 태그에 link 엘리먼트 추가
		document.head.appendChild(linkEle);
	});
}

const f = document.forms[0]; 

document.querySelectorAll('.panel-body-btns button').forEach( btn => {
	btn.addEventListener('click', () => {
	
		let type = btn.id;
		
		if(type === 'modifyBtn') {
			modify();
		} else if(type === 'indexBtn') {
			location.href = '/inquiry_board/Inquirylist';
		}
	});
});

// 수정되는 jsp로 이동
function modify() {
	let i_idx = f.i_idx.value;
	location.href = '/inquiry_board/Inquirymodify?i_idx=' + i_idx;
}

//---------------------------------- 업로드 다운로드 view 기능 ------------------
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
				
			})
			if(msg == '') {
				msg += '<li colspan="2"> 등록된 파일이 없습니다. </li>';
			}			
			document.querySelector(".uploadResult ul").innerHTML = msg;
		})
		.catch( err => console.log("err : " + err) );
}



//---------------------------------- 댓글 관련 부분 ---------------------------
const rs = replyService;		// reply.js 에서 연결!

showList();
function showList() {						// 나중에 여기가 더 보기가 될것같다.... 일단...
	
	let i_idx = f.i_idx.value;
	let replyUL = document.querySelector('.chat');
	
	rs.getList( f.i_idx.value, jsonArr => {
		
		let msg = '';	
		
		jsonArr.forEach(reply => {
			
			msg += '<li data-c_idx="'+ reply.c_idx +'" onclick="modifyModalPage(this)">';
			msg += 		'<div>';
			msg +=			'<div class="chat-header"';
			msg +=				'<c:choose>';
				if(reply.status == "A"){
					msg +=	'<strong class="word-color1">' + "진행 : 대기" + '</strong>';
				}else if(reply.status == "B"){
					msg +=	'<strong class="word-color2">' + "진행 : 완료" + '</strong>';
				}else {
					msg +=	'<strong class="word-color3">' + "진행 : 확인중" + '</strong>';
				}
			msg +=				'</c:choose>';	
			msg +=				'<input type="button" value="삭제" onclick="removeComm('+ reply.c_idx +')" class="btn-b" id="removeReplyBtn">'
			msg +=				'<input type="button" value="수정" onclick="modifyComm('+ reply.c_idx +')" class="btn-b" id="modifyReplyBtn">'
			msg +=			'</div>'
			msg += 			'<div class="chat-header">';	
			msg +=				'<strong class="primary-font">' + reply.writer + '</strong>';
			msg +=				'<small class="pull-right">' + myTime(reply.reg_date) + '</small>';
			msg += 			'</div>';
			msg +=			'<textarea rows="3" cols="100" name="content" id="modifyReadonly" readonly >' + reply.content + '</textarea>'
			msg += 		'</div>';
			msg += '</li>';
			
			console.log(reply);
		});		// end forEach
		
		replyUL.innerHTML = msg;
		
	});	// end getList
}

function myTime(unixTimeStamp) {
	let myDate = new Date(unixTimeStamp);
	
	let y = myDate.getFullYear();
	let m = String(myDate.getMonth() + 1).padStart(2, '0');
	let d = String(myDate.getDate()).padStart(2, '0');
	
	let date = y + "-" + m + "-" + d;
	
	return date;
}

//------------------------ 모달 -------------------------------------
const modal = document.querySelector('#modal');
const inputStatus = document.querySelector('.status-st');
const inputReply = document.querySelector('.text11');
const inputReplyer = document.querySelector('input[name="writer"]');
const inputReplydate = document.querySelector('input[name="reg_date"]');
const addReplyBtn = document.querySelector('#addReplyBtn');				
const resetBtn = document.querySelector('#resetBtn');
const replyBtn = document.querySelector('#replyBtn');	                // 댓글 등록
const modifyReplyBtn = document.querySelector('#modifyReplyBtn');		// 댓글 수정
const removeReplyBtn = document.querySelector('#removeReplyBtn');		// 댓글 삭제

addReplyBtn.addEventListener('click', () => {
	console.log('등록');
									// 추후 처리 필요
	if(inputReply.value == '' || inputReplyer.value == '' || inputStatus.value == '' ) {		
		alert("모든 내용을 입력하세요.")
		return;
	}
	rs.add(
		{
			i_idx : f.i_idx.value,
			content : inputReply.value,
			writer : inputReplyer.value,
			status : inputStatus.value
		},
		function(result) {
			//console.log("result : " + result);
			showList();
		}
	);
});

let c_idx;

/*modifyReplyBtn.addEventListener('click', () => {

	if(inputReply.value == '') {
		alert("내용을 작성해 주세요.");
		return;
	}
	
	rs.update(
		{
			c_idx : c_idx,
			content : inputReply.value
		}, function(result) {
			console.log("result : " + result );
			showList();
		}
	);	
});*/



function modifyComm(c_idx) {
	
	if(modifyComm === "수정"){
		textarea.remove('readonly');
	}
	

	
	
	rs.update(
			{
				c_idx : c_idx,
				content : inputReply.value
			}, function(result) {
				console.log("result : " + result );
				showList();
			}
		);	
	
	if(inputReply.value == '') {
		alert("내용을 작성해 주세요.");
		return;
	}
}


/*
removeReplyBtn.addEventListener('click', () => {

	if(!writer) {
		alert("로그인 후 삭제가 가능합니다.");
		closeModal();
		return;
	}
	
	let originalReplyer = inputReplyer.value();
	console.log("Original Replyer : " + originalReplyer);
	
	if(writer != originalReplyer) {
		alert("자신이 작성한 댓글만 삭제가 가능합니다.");
		closeModal();
		return;
	}
	alert("내용을 삭제 하시겠습니까?");
	
	rs.remove(c_idx, originalReplyer,
		function(result) {
			console.log("result : " + result);
			closeModal();
			showList();
		}
	
	);
}); */

/*removeReplyBtn.addEventListener('click', () => {
	
	alert("내용을 삭제 하시겠습니까?");
	
	rs.remove(c_idx,
		function(result) {
			console.log("result : " + result);
			showList();
		}
	);
});*/

function removeComm(c_idx) {
	
	if( !confirm("내용을 삭제 하시겠습니까?") ){
		return false;
	}
	
	rs.remove(c_idx,
			function(result) {
				console.log("result : " + result);
				showList();
			}
	);
}













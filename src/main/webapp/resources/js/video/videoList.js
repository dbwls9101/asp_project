//영상 저장하기
function videoSave(f) {
	if (!f.channel.value) {
		alert('채널을 선택해주세요.');
		return;
	}
	
	if (!f.channelId.value) {
		alert('채널 ID를 입력하세요.');
		return;
	}
	
	var value = f.channelId.value + '/' + f.channel.value;
	
	fetch('/admin/videoSave/' + value)
		.then(response => response.json())
		.then(json => {
			alert(json + '건이 등록되었습니다.');
			location.reload();
		})
		.catch(err => console.log(err));
}

//영상 삭제하기
function videoDelete(f) {
	if (!f.channel2.value) {
		alert('채널을 선택해주세요.');
		return;
	}
	
	fetch('/admin/videoDelete/' + f.channel2.value)
		.then(response => response.json())
		.then(json => {
			alert(json + '건이 삭제되었습니다.');
			location.reload();
		})
		.catch(err => console.log(err));
}

//영상 불러오기
videoList();
function videoList() {
	let msg = '';
	
    fetch('/admin/videoListload')
        .then(response => response.json())
        .then(data => {
            data.forEach(video => {
				msg += '<div class="video-box"><a href="#" class="thumb" data-toggle="modal" data-target="#moaModal' + video.idx + '">';
				msg += '<img src="https://img.youtube.com/vi/' + video.videoid + '/mqdefault.jpg">';
				msg += '</a></div>';
				
				msg += '<div class="modal fade" id="moaModal' + video.idx + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
				msg += '<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">';
				msg += '<div class="modal-content">';
				msg += '<div class="modal-header"><button class="btn video-close" type="button" data-dismiss="modal"><i class="fas fa-fw fa-xmark"></i></button></div>';
				msg += '<div class="modal-body">';
				msg += '<iframe src="https://www.youtube.com/embed/' + video.videoid + '" frameborder="0" allowfullscreen></iframe>';
				msg += '</div>';
				msg += '</div></div></div></div>';
            })
            
            document.querySelector("#video-container").innerHTML += msg;
        })
        .catch(error => console.error('Error:', error));
}


var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
// 헤더 스크롤 시 fixed 클래스 추가
window.addEventListener('scroll', function() {
	var header = document.querySelector('.header-menu');
	var scrollPosition = window.pageYOffset;

	// 스크롤 위치가 130px 이상이면 헤더에 fixed 클래스 추가, 그렇지 않으면 제거
	if (scrollPosition > 130) {
	  header.classList.add('fixed');
	} else {
	  header.classList.remove('fixed');
	}
});

// 헤더 메뉴 클릭 시 .menu ul li a 태그에 hover 클래스 추가
var li = document.querySelectorAll('.menu ul li a');
var pathname = window.location.pathname;
var search = window.location.search;
if (pathname.includes('/shop/list/10') || search.includes('?c1=10')) {
	li[0].className += ' hover';
} else if(pathname.includes('/shop/list/20') || search.includes('?c1=20')) {
	li[1].className += ' hover';
} else if(pathname.includes('/shop/list/30') || search.includes('?c1=30')) {
	li[2].className += ' hover';
} else if(pathname.includes('/shop/list/40') || search.includes('?c1=40')) {
	li[3].className += ' hover';
}

// 헤더에서 적용되는 부분 ( 제이슨 형태로 저장 ) // 처음 2page에서 목록에 갔다가 다시 돌아올때 2page로 떠야 하는 것 ****
function setStorageData(pageNum, amount){		// setStorageData 값을 객체로 만들고 값을
	const pageData = {
		pageNum : pageNum,
		amount : amount
	};
	
	localStorage.setItem('page_data', JSON.stringify(pageData));		// 실제 localStorage 저장 (내장함수), key/value
}
function getStorageData(){
	return JSON.parse( localStorage.getItem('page_data') );				// 위에 JSON에서 받은 것을 파싱을 한후에 돌려 준다.
	
}
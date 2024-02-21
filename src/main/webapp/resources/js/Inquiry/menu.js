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
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>추천영상</title>
<link href="/resources/css/video/video.css" rel="stylesheet" type="text/css">
</head>
<body>
	<jsp:include page="../layout/admin_header.jsp"/>
	<div class="container-fluid">
		<div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">추천영상</h1>
        </div>
        
		<div id="video-container" class="video-container">
		</div>
			
		<div class="form-box">
			<form>
				<div style="margin-bottom: 10px;">
					<button type="button" class="btn btn-secondary tip" data-bs-toggle="tooltip" data-bs-placement="top" data-html="true"
					data-original-title="등록하는 방법  &#10;유튜브 채널 접속 -> 프로필 '채널 자세히 알아보기' 클릭 -> &#10;채널 공유 -> 채널 ID 복사 후 입력박스에 입력 -> 등록">
						<i class="fas fa-fw fa-question"></i> 
					</button>
					<select id="channel" name="channel" class="form-select">
						<option value="" selected>채널 선택</option>
						<option value="넷플릭스">넷플릭스</option>
						<option value="웨이브">웨이브</option>
						<option value="유튜브">유튜브</option>
						<option value="디즈니">디즈니</option>
						<option value="왓챠">왓챠</option>
						<option value="라프텔">라프텔</option>
						<option value="AppleOne">AppleOne</option>
						<option value="쿠팡플레이">쿠팡플레이</option>
						<option value="프라임비디오">프라임비디오</option>
					</select>
					
					<input type="text" name="channelId" id="channelId" class="form-control">
					<input type="button" onclick="videoSave(this.form)" value="등록">
				</div>
				
				<div>
					<button type="button" class="btn btn-secondary tip" data-bs-toggle="tooltip" data-bs-placement="top" data-html="true"
					data-original-title="삭제하는 방법  &#10;채널 선택 -> 삭제  &#10;※ 해당 채널에 등록된 영상들이 전체 삭제됩니다.">
						<i class="fas fa-fw fa-question"></i> 
					</button>
					<select id="channel2" name="channel2" class="form-select">
						<option value="" selected>채널 선택</option>
						<option value="넷플릭스">넷플릭스</option>
						<option value="웨이브">웨이브</option>
						<option value="유튜브">유튜브</option>
						<option value="디즈니">디즈니</option>
						<option value="왓챠">왓챠</option>
						<option value="라프텔">라프텔</option>
						<option value="AppleOne">AppleOne</option>
						<option value="쿠팡플레이">쿠팡플레이</option>
						<option value="프라임비디오">프라임비디오</option>
					</select>
				
					<input type="button" onclick="videoDelete(this.form)" value="삭제">
				</div>
			</form>
		</div>
	</div>
	
	<jsp:include page="../layout/admin_footer.jsp"/>
</body>
<script type="text/javascript" src="/resources/js/video/videoList.js"></script>
</html>
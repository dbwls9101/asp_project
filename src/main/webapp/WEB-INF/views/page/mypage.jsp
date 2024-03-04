<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>마이페이지</title>
<link rel="stylesheet" href="/resources/css/page/mypage.css"> 
</head>
<body>
<jsp:include page="../layout/header.jsp"/>
<form class="form-horizontal register-form" role="form" id="fregisterform" name="fregisterform" autocomplete="off" action="#" method="post" onsubmit="return false">
	<div class="mw-800 form-signup">
		<div class="h3">알림정보</div>
		<div class="form-round signup">
			<ul class="form-list">
				<li>
					<span class="subject">ㆍ 아이디</span>
					<input type="text" name="id" id="id">
				</li>
				<li>
					<span class="subject">ㆍ 휴대폰 번호</span>
					<input type="text" name="phone" value="" id="phone">
				</li>
				<li>
					<span class="subject">ㆍ 이메일</span>
					<input type="text" class="email_input" name="email" id="email">
				</li>
				<li>
					<span class="subject">ㆍ 가입일</span>
					<input type="text" class="joindate_input" name="joindate" id="joindate">
				</li>
			</ul>
		</div>
		<div class="button-align center">
			<button type="submit" id="btn_submit" class="button button-point" accesskey="s" onclick="modify(this.form)">정보수정</button>
			<a href="/" class="button">탈퇴</a>
		</div>
	</div>
</form>
<jsp:include page="../layout/footer.jsp"/>
</body>
<script type="text/javascript" src="/resources/js/page/mypage.js"></script>
</html>

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="/resources/css/member/find_pw.css">
</head>
<body>
<jsp:include page="../layout/header.jsp"/>
<form class="form-horizontal register-form" role="form" id="fregisterform" name="fregisterform" autocomplete="off" action="#" method="post" onsubmit="return false">
	<div class="mw-800 form-signup mg-top-minus">
		<div class="h4"><span class="text-purple">비밀번호</span> 찾기</div>
		<h4>회원가입 시 등록하신 아이디, 이름 및 이메일 주소를 입력해 주세요.</h4> 
		<h4>비밀번호 변경을 안내해드립니다.</h4>
		<div class="form-round signup">
			<ul class="form-list">
				<li>
					<span class="subject">ㆍ 아이디</span>
					<input type="text" id="id" name="id" value="" placeholder="아이디" size="10">
				</li>			
				<li>
					<span class="subject">ㆍ 이메일</span>
					<input type="text" class="email_input" name="email" id="email" placeholder="이메일">
					<span class="lightgrey inline-break" id="emailText" style="display: none;">이메일 사용이 가능합니다.</span>
				</li>
			</ul>
			
		</div>
		<div class="button-align center">
			<button type="button" id="cancel" class="button" onclick="location.href='/member/login'" style="cursor:pointer;">취소</button>
			<button type="submit" id="btn_submit" class="button button-purple" accesskey="s" onclick="findSubmit(this.form)">확인</button>
		</div>
	</div>
</form>
<jsp:include page="../layout/footer.jsp"/>	
</body>
<script type="text/javascript" src="/resources/js/member/find_pw.js"></script>
</html>
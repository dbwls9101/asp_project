<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<h1>패스워드 찾기</h1>
<h4>회원가입 시 등록하신 아이디,이름 및 이메일 주소를 입력해 주세요.</h4>
<h4>비밀번호 변경 안내해드립니다.</h4>
	<form id="findForm" action="${contextPath }/member/findIdCheck" method="post">
	    <div>
	    	<input type="text" name="id" id="id" placeholder="아이디">
	    </div>	
	    <div>
	    	<input type="text" name="name" id="name" placeholder="이름">
	    </div>
	    <div>
	    	<input type="email" name="email" id="email" placeholder="이메일">
	    </div>
	    <button type="button" id="cancel" onclick="location.href='/'">취소</button>
	    <button type="button" id="submit" onclick="findSubmit(this.form); return false;">확인</button>
	</form>
</body>
<script type="text/javascript" src="/resources/js/member/find_pw.js"></script>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<sec:authorize access="isAuthenticated()">
   <sec:authentication property="principal" var="principal"/>
</sec:authorize>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>내정보 수정</title>
<link rel="stylesheet" href="/resources/css/member/modifyForm.css"> 
</head>
<body>
<jsp:include page="../layout/header.jsp"/>
<form class="form-horizontal modify-form" role="form" id="modifyform" name="modifyform" autocomplete="off" action="#" method="post" onsubmit="return false">
	<div class="mw-800 form-signup">
		<div class="h3">아이디/비밀번호</div>
		<div class="form-round signup">
			<ul class="form-list">
			<li>
				<span class="subject">ㆍ 아이디</span>
				<input type="text" class="id" name="id" id="id" placeholder="아이디" value = "${principal.member.id }" maxlength="20" readonly>
			</li>
			<li>
				<span class="subject">ㆍ 비밀번호</span>
				<input type="password" class="form-control input-sm pw_input" name="password" id="password" placeholder="비밀번호">
				<span class="lightgrey inline-break pw_input_3" id="pw" style="display: none;">비밀번호는 8~16자, 대소문자 or 숫자로 입력해주세요</span>
				
			</li>
			<li>
				<span class="subject">ㆍ 비밀번호 확인</span>
				<input type="password" class="form-control input-sm pwck_input" name="passwordCk" id="passwordCk" placeholder="비밀번호 확인">
				<span class="lightgrey inline-break pw_input_1" style="display: none;">비밀번호가 일치합니다.</span>
				<span class="lightgrey inline-break pw_input_2" style="display: none;">비밀번호가 일치하지 않습니다.</span>
			</li>
			</ul>
		</div>
		<div class="h3"><span class="title-point">내 정보</span> 수정</div>
		<div class="form-round signup">
			<ul class="form-list">
				<li>
					<span class="subject">ㆍ 이름</span>
					<input type="text" class="name" id="name" name="name" value = "${principal.member.name }" placeholder="이름" size="10" readonly>
					<button type="button" id="win_hp_cert" class="button round button-purple phone">휴대폰 본인확인</button>	
				</li>
				<li>
					<span class="subject">ㆍ 닉네임</span>
					<input type="text" class="nickname_input" name="nickname" id="nickname" value = "${principal.member.nickname }" placeholder="닉네임" readonly>				
				</li>
				<li>
					<span class="subject">ㆍ 이메일</span>
					<input type="text" class="email_input" name="email" id="email" value = "${principal.member.email }" placeholder="이메일" >
					<span class="lightgrey inline-break" id="emailText" style="display: none;">이메일 사용이 가능합니다.</span>				
				</li>
				<li>
					<span class="subject">ㆍ 휴대폰 번호</span>
					<input type="text" class="phone_input" name="phone" id="phone" value = "${principal.member.phone }" placeholder="휴대폰 번호" maxlength="20">
				</li>
				
			</ul>
		</div>
		<div class="button-align center">
			<button type="submit" id="btn_submit" class="button button-point" accesskey="s" onclick="validate(this.form)">정보 수정</button>
			<a href="/" class="button">취소</a>
		</div>
	</div>
</form>
<jsp:include page="../layout/footer.jsp"/>
</body>
<script type="text/javascript" src="/resources/js/member/modifyForm.js"></script>
</html>

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="/resources/css/member/find_id.css">
</head>
<body>
<jsp:include page="../layout/header.jsp"/>
<c:choose>
		<c:when test="${result != null }">
<form class="findForm" id="findForm" name="findForm" action="#" method="post" onsubmit="return false">
	<div class="mw-800 form-signup mg-top-minus">
		<div class="h4"><span class="text-purple">아이디</span> 찾기</div>
		<h4>가입하신 아이디 정보를 안내해드립니다.</h4>
		<div class="form-round signup">
			<ul class="form-list">
			<c:if test ="${result == 0 }">
				<div class = "login_warn">일치하는 회원 정보가 없습니다. 다시 확인해주세요.</div>
			</c:if>
			<c:if test ="${result == 1 }">
				<div class = "login_warn">아이디 : ${resultId}</div>
			</c:if>

			</ul>
			
		</div>
		<div class="button-align center">
			<button type="button" id="cancel" class="button" onclick="location.href='/'" style="cursor:pointer;">취소</button>
			<button type="button" id="btn_submit" class="button button-purple" accesskey="s" onclick="location.href='/member/login'">확인</button>
		</div>
	</div>
</form>
		</c:when>
		<c:otherwise>
<form class="findForm" id="findForm" name="findForm" action="#" method="post" onsubmit="return false">
	<div class="mw-800 form-signup mg-top-minus">
		<div class="h4"><span class="text-purple">아이디</span> 찾기</div>
		<h4>회원가입 시 등록하신 이름 및 이메일 주소를 입력해 주세요.</h4> 
		<h4>가입하신 아이디 정보를 안내해드립니다.</h4>
		<div class="form-round signup">
			<ul class="form-list">
				<li>
					<span class="subject">ㆍ 이름</span>
					<input type="text" id="name" name="name" value="" placeholder="이름" size="10">
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
</c:otherwise>
</c:choose>
<jsp:include page="../layout/footer.jsp"/>
</body>
<script type="text/javascript" src="/resources/js/member/find_id.js"></script>
</html>
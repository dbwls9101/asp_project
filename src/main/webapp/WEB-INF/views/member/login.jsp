<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="/resources/css/member/login.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" ></script>
</head>
<body>
<jsp:include page="../layout/header.jsp"/>
<div class="wrapper">
	
<div class="form-signin w-100 m-auto">
  <form id="login_form" method="post" >
  	<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}">
    <img class="mb-4" src="/resources/images/prj_logo.png" alt="" width="250px">
<!--     <h1 class="h3 mb-3 fw-normal">Please sign in</h1> -->

    <div class="form-floating">
      <input type="text" class="form-control" name="id" id="id" placeholder="아이디를 입력하세요">
      <label for="id">아이디를 입력하세요</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" name="password" id="password" placeholder="패스워드를 입력하세요">
      <label for="password">패스워드를 입력하세요</label>
    </div>
     <c:if test = "${error == 0 }">
		<div class = "login_warn">사용자 ID 또는 비밀번호를 잘못 입력하셨습니다.</div>
	</c:if>
    <div class="form-check text-start my-3">
		<input class="form-check-input" type="checkbox" id="remember-me" name="remember-me">
		<label class="form-check-label" for="save_id">자동 로그인</label>
		<span class="float-end">
			<a href="/member/joinAgree" class="find-info-text" >회원가입</a> &nbsp;|&nbsp;
			<a href="/member/find_id" class="find-info-text">아이디 찾기</a> &nbsp;|&nbsp;
			<a href="/member/find_pw" class="find-info-text">패스워드 찾기</a>
		</span>
    </div>
    <button class="btn btn-primary w-100 py-3 fs-3" id="login_button" type="submit">로그인</button>
	<div class="form-text fs-6">
		회원이 아닌가요? 첫가입 시 500포인트! <span class="text-purple">추천인 등록 시 추가 500포인트!</span>
	</div>	
	<div class="form-sns-join">
		<a href="javascrip:;" onclick="nwindow('https://buts.co.kr/plugin/social/popup.php?provider=naver&amp;url=https://buts.co.kr/bbs/login.php')" style="margin-top:20px; width:100%;" class="naver sns-naver" title="네이버">
			<img src="/resources/images/naver_logo.png" alt="">네이버 계정으로 로그인 하기
		</a>
		<a href="javascrip:;" onclick="nwindow('https://buts.co.kr/plugin/social/popup.php?provider=kakao&amp;url=https://buts.co.kr/bbs/login.php')" style="margin-left:0px; margin-top:5px; width:100%;" class="kakao sns-kakao" title="카카오">
			<img src="/resources/images/kakao_logo.png" alt="">카카오 계정으로 로그인 하기			
		</a>
	</div>
	
  </form>
</div>
<jsp:include page="../layout/footer.jsp"/>
</div>
</body>
<script type="text/javascript" src="/resources/js/member/login.js"></script>
</html>
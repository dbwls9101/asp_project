<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri = "http://www.springframework.org/security/tags" prefix = "sec" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="/resources/js/member/memberprincipal.js"></script>
<link rel="stylesheet" href="/resources/css/main.css">
</head>
<body>
	<div class="wrap">
    <div class="header">
    	<div class="top">
		    <div class="width-menu">
			    <div class="top-menu">
				    <a href="/inquiry_board/Inquiryregister">1:1 문의</a>
				    <a href="#">이벤트</a>
				    <a href="#">공지사항</a>
			    </div>
		    </div>
	    </div>
	    <div class="header-menu">
	   		<div class="width-menu">
	   			<div class="logo">
	   				<a href="/">
	   					<img alt="메인로고" src="/resources/images/prj_logo.png">
	   				</a>
	   			</div>
	   			<div class="menu">
	   				<ul>
	   					<li><a href="/shop/list/10" class="menu-a">영상</a></li>
	   					<li><a href="/shop/list/20" class="menu-a">도서/음악</a></li>
	   					<li><a href="/shop/list/30" class="menu-a">게임</a></li>
	   					<li><a href="/shop/list/40" class="menu-a">기타</a></li>
	   				</ul>
	   			</div>
	   			<div class="login">
	   				<sec:authentication property="principal" var="principal"/>
					<sec:authorize access="isAuthenticated()">
						<a href="/member/logout" class="header-btn">로그아웃</a>
					</sec:authorize>
					<sec:authorize access="isAnonymous()">
						<a href="/member/login" class="header-btn">로그인</a>
					</sec:authorize>
	   			</div>
	   		</div>
	    </div>
    </div>
    <div class="main">
    	<div class="width-container">

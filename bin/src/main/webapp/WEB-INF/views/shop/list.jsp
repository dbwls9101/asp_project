<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="/resources/css/shop/list.css">
</head>
<body>
	<jsp:include page="../layout/header.jsp"/>
	
	<div id="menu-title">
		<span id="category" c1="${codeone }" c2="${codetwo }">${category }</span>
		<input type="button" id="makeparty" value="파티 만들기"> 
	</div>
	<div id="partyinfo-container">
		
	</div>
	
	<button id="load-more-btn">더 보기</button>
	
	<jsp:include page="../layout/footer.jsp"/>
</body>
<script type="text/javascript" src="/resources/js/shop/list.js"></script>
</html>
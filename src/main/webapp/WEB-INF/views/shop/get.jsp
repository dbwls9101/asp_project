<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="/resources/css/shop/get.css">
</head>
<body>
	<jsp:include page="../layout/header.jsp"/>
	
	<div id="menu-title">
		<span id="category">${vo.c_primary }</span>
		<input type="button" id="makeparty" value="파티 만들기"> 
	</div>
	
	<hr>
	
	<div id="title-container">
		<c:set var="servicecode" value="${vo.codeone }${vo.codetwo}" />
		<c:choose>
			<c:when test="${servicecode eq 10100 || servicecode eq 2080 || servicecode eq 3050 || vo.codeone eq 40}">
				<img src="/resources/images/sun.png" id="etclogo">
			</c:when>
			<c:otherwise>
				<img src="/resources/images/servicelogo/${servicecode}.jpg" id="servicelogo">
			</c:otherwise>
		</c:choose>
		<div id="title-area">
			<span id="servicename">${vo.c_secondary }</span>
			<span id="pidx">파티번호 : ${vo.p_idx }</span>
			<span id="title">${vo.title }</span>
		</div>
	</div>
	
	<hr>
	
	<div id="partyinfo">
		<span id="nick">${vo.nickname }</span>
		<div>
			<span id="end-date">종료일 : ${vo.end_date }</span>
			<span id="period" enddate="${vo.end_date }"></span>
			<span id="price" price="${vo.price }"></span>
		</div>
	</div>
	
	<hr>
	
	<div id="partystatus">
		<c:if test="${vo.curr_party > 0 }">
			<c:forEach var="i" begin="0" end="${vo.curr_party - 1}">
				<div class="participation"></div>
			</c:forEach>
			<c:forEach var="i" begin="0" end="${vo.party_num - vo.curr_party - 1}">
				<div class="non-participation"></div>
			</c:forEach>
		</c:if>
		<c:if test="${vo.curr_party == 0 }">
			<c:forEach var="i" begin="0" end="${vo.party_num -1}">
				<div class="non-participation"></div>
			</c:forEach>
		</c:if>
	</div>
	
	<div id="announcement">
		<div id="rules" rule="${vo.rule }"></div>
		<div id="comment"><pre>${vo.comment }</pre></div>
	</div>
	<form method="post">
		<div id="checkform">
			<input type="checkbox" id="agree">
			<label class="form-check-label" for="agree"> 파티 규칙에 대한 내용 확인 및 파티 알림 수신에 동의합니다.</label>
		</div>
		<div id="btnarea">
			<input type="hidden" name="pn" value="${vo.p_idx }">
			
			<input type="button" value="목록" id="getpartylist">
			<input type="button" value="참여" id="participate">
		</div>
	</form>
	
	<hr>
	
	<!-- 댓글 영역 -->
	<div id="reply-title">댓글</div>
	<div id="commentArea">
		<form id="commentform">
		<div id="comment-select">
			<select id="comment-to" name="comment_to" class="form-select" aria-label="Default select example">
			  <option value="0" selected>파티장에게</option>
			</select>
		</div>
		<div id="replycontainer">
		
		</div>
		</form>
	</div>
	
	
	<jsp:include page="../layout/footer.jsp"/>
</body>
<script type="text/javascript" src="/resources/js/shop/get.js"></script>
</html>

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri = "http://www.springframework.org/security/tags" prefix = "sec" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="/resources/css/shop/get.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
</head>
<body>
	<jsp:include page="../layout/header.jsp"/>
	<sec:authentication property="principal" var="principal"/>
	
	<div id="menu-title">
		<span id="category">${vo.c_primary }</span>
		<input type="button" id="makeparty" value="파티 만들기"> 
	</div>
	
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
	
	<div id="partyinfo">
		<span id="nick">${vo.nickname }</span>
		<div>
			<span id="end-date">종료일 : ${vo.end_date } (${vo.datediff }일 / 1일 ${vo.price }원)</span>
			<span id="price">&nbsp; | &nbsp;&nbsp;참여비용 : <fmt:formatNumber value="${vo.totalprice }" pattern="#,###" />원</span>
		</div>
	</div>
	
	<div id="partystatus">
		<c:if test="${vo.curr_party > 0 }">
			<c:forEach var="i" begin="0" end="${vo.curr_party - 1}">
				<img src="/resources/images/get_sun.png" class="participation">
			</c:forEach>
			<c:forEach var="i" begin="0" end="${vo.party_num - vo.curr_party - 1}">
				<img src="/resources/images/get_sun.png" class="non-participation">
			</c:forEach>
		</c:if>
		<c:if test="${vo.curr_party == 0 }">
			<c:forEach var="i" begin="0" end="${vo.party_num -1}">
				<img src="/resources/images/get_sun.png" class="non-participation">
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
			
			<input type="button" value="참여" id="participate">
			<input type="button" value="목록" id="getpartylist">
		</div>
	</form>
	
	<hr>
	
	<!-- 댓글 영역 -->
	<div id="reply-title">댓글</div>
	<div id="replyArea">
		<form id="replyform" method="post">
		<div id="reply-select">
			<select id="comment-to" name="comment_to" class="form-select">
			  <option value="${vo.nickname }" selected>@파티장</option>
			</select>
			
			<div id="checkprivate">
				<input class="form-check-input" type="checkbox" name="private_chk" value="Y" id="private">
				<label class="form-check-label" for="private"> 비밀글</label>
			</div>
		</div>
		<div id="replycontainer">
			<textarea class="form-control" name="comment"></textarea>
		</div>
		<div id="replybtn">
			<input type="hidden" name="p_idx" value="${vo.p_idx }">
			<input type="hidden" name="writer" value="${principal.member.nickname }">
			<input type="button" value="등록" id="replyregister">
		</div>
		</form>
	</div>
	
	<div id="chatarea">
		<div id="chat">
			<span id="replynick">닉네임!</span>
			<span id="replyregdate">24/02/23 15:44</span>
			<div id="replycontent">
				@뫄뫄  안녕하세요
			</div>
		</div>
	</div>
	
	
	<jsp:include page="../layout/footer.jsp"/>
</body>
<script type="text/javascript" src="/resources/js/shop/partyreply.js"></script>
<script type="text/javascript" src="/resources/js/shop/get.js"></script>
</html>

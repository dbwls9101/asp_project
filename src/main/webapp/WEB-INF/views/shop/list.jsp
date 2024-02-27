<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
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
		<span id="category">${category }</span>
		<input type="button" id="makeparty" value="파티 만들기"> 
	</div>
	<div id="partyinfo-container">
		<c:forEach var="vo" items="${list }">
			<div id="partyinfo" codeone=${vo.codeone } codetwo=${vo.codetwo } p_idx=${vo.p_idx } datediff=${vo.datediff }>
				<div id="service">
					${vo.c_secondary }
				</div>
				<div id="title">${vo.title }</div>
				<div id="curr-party">
					<c:if test="${vo.curr_party > 0 }">
						<c:forEach var="i" begin="0" end="${vo.curr_party - 1}">
							<img src="/resources/images/sun.png" class="participation">
						</c:forEach>
						<c:forEach var="i" begin="0" end="${vo.party_num - vo.curr_party - 1}">
							<img src="/resources/images/sun.png" class="non-participation">
						</c:forEach>
					</c:if>
					<c:if test="${vo.curr_party == 0 }">
						<c:forEach var="i" begin="0" end="${vo.party_num -1}">
							<img src="/resources/images/sun.png" class="non-participation">
						</c:forEach>
					</c:if>
				</div>
				<c:choose>
					<c:when test="${vo.datediff > 0 }">
						<div id="enddate">~ ${vo.end_date } <span id="period">(${vo.datediff }일)</span></div>
						<div id="price"><fmt:formatNumber value="${vo.totalprice }" pattern="#,###" />원</div>
					</c:when>
					<c:otherwise>
						<div id="enddate">~ ${vo.end_date } <span id="period"></span></div>
						<div id="price">마감</div>
					</c:otherwise>
				</c:choose>
			</div>
		</c:forEach>
	</div>
	<jsp:include page="../layout/footer.jsp"/>
</body>
<script type="text/javascript" src="/resources/js/shop/list.js"></script>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<%@ taglib uri = "http://www.springframework.org/security/tags" prefix = "sec" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>관리자 출금 관리</title>
</head>
<body>

	<jsp:include page="../layout/admin_header.jsp"/>
	
	<sec:authentication property="principal" var="principal"/>
	
	<div id="content-container">
		<div id="service-container">
			<h3 id="withdraw-tab-title">관리자 출금 관리</h3>
			
			<div id="withdraw-search">
				<form method="post" id="withdrawform">
					<select class="form-select" aria-label="Default select example">
					  <option selected>출금상태</option>
					  <option value="1">신청</option>
					  <option value="2">승인</option>
					  <option value="3">반려</option>					
					</select>
					
					<select class="form-select" aria-label="Default select example">
					  <option value="1" selected>회원번호</option>
					  <option value="2">아이디</option>
					</select>
					
					<input class="form-control" type="text" placeholder="검색어를 입력하세요." aria-label="default input example">				
					<input type="button" id="search" value="검색">
					<input type="hidden" name="id" value="${principal.member.id}">
					<input type="hidden" name="with_status" value="${vo.with_status }">
					<input type="hidden" name="m_idx" value="${vo.m_idx }">
				</form>		
			</div>
			
			<div id="withdrawlist">		
				<table>
					<thead>
						<tr>
							<th>출금상태</th>
							<th>접수번호(NO.)</th>
							<th>신청일</th>
							<th>출금방법</th>
							<th>실지급액(출금액)</th>
							<th>비고(계좌번호)</th>
							<th>승인여부</th>					
						</tr>
					</thead>
					<tbody class="aa">
						
					</tbody>
				</table>
			</div>
			
		</div>
	</div>
	
	
	
	
	<jsp:include page="../layout/admin_footer.jsp"/>
</body>
<script type="text/javascript" src="/resources/js/admin/withdraw.js"></script>
</html>
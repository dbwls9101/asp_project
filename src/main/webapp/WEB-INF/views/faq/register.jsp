<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri = "http://www.springframework.org/security/tags" prefix = "sec" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="/resources/css/partner/register.css">
</head>
<body>
	<jsp:include page="../layout/admin_header.jsp"/>

	<sec:authentication property="principal" var="principal"/>
	
	<div id="content-container">
		<div id="service-container">
		
			<span id="party-tab-title">FAQ</span>
			
			<hr>
			
			<div id="form-container">
				<form id="registerform" method="post">
					<table id="registertable">
						<tr>
							<th>서비스</th>
							<td>
								<select id="primary-category" name="faq_type" class="form-select" aria-label="Default select example">
								  <option value="" selected>질문유형 선택</option>
								  <option value="A">이용안내</option>
								  <option value="B">파티문의</option>
								  <option value="C">회원가입 및 정보</option>
								  <option value="D">입출금 및 환불</option>
								</select>
							</td>
						</tr>
						<tr>
							<th>제목</th>
							<td><input class="form-control" type="text" name="title" placeholder="제목을 입력해주세요." aria-label="default input example"></td>
						</tr>
						<tr>
							<th>내용</th>
							<td>
							  <textarea class="form-control" name="content"></textarea>
							</td>
						</tr>
						<tr>
							<td id="registerBtn" colspan="2">
								<input type="hidden" name="writer" value="${principal.member.name }">	
								<input type="button" id="faqList" value="목록">
								<input type="button" id="faqRegister" value="등록">
							</td>
						</tr>
					</table>
				</form>
			</div>
		</div>
	</div>
</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
<script type="text/javascript" src="/resources/js/faq/register.js"></script>
</html>
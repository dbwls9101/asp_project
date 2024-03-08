<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri = "http://www.springframework.org/security/tags" prefix = "sec" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>1:1 문의 등록</title>
</head>
<body>
	<jsp:include page="../layout/header.jsp"/>
	
	<sec:authentication property="principal" var="principal"/>
	
	<div class="page-header">
		<h1>1:1 문의하기</h1>
	</div>
	
	<div class="page-header1">
		<div class="page-header1_1">
			<h2>문의 내용</h2>
		</div>
		<div class="page-header1_2">
			<h6 style="vertical-align: middle; margin: 15px;">
			* 문의가 많은 경우 일시적으로 답변이 지연될 수 있습니다.(답변 가능시간 : 평일 오전 9시 ~ 오후 6시)
			</h6>
		</div>
	</div>
	
	<div>
		<hr class="line">
	</div>
	
	<br>
	
	<div class="panel-body">
		<form method="post">
			<table>
				<tbody>
					<tr>
						<th>제  목</th>
						<td><input type="text" name="title" placeholder="제목을 입력하세요."> </td>
					</tr>
					<tr>
						<th>문의유형</th>
						<td class="select1">
							<select name="inquiry_type">
								<option value="A">이용문의</option>
								<option value="B">파티문의</option>
								<option value="C">회원문의</option>
								<option value="D">입출금문의</option>
								<option value="E">기타</option>
							</select> 
						</td>
					</tr>
					<tr>
						<th>이  름</th>
						<td><input type="text" name="writer" value=${principal.member.id } readonly> </td>
					</tr>
					<tr>
						<th>연락처</th>
						<td><input type="text" name="phone"placeholder="연락받을 연락처를 입력해주세요."> </td>
					</tr>
					<tr>
						<th>내 용</th>
						<td>
							<textarea rows="10" cols="75" name="content" placeholder="내용을 입력하세요."></textarea>
							<input type="hidden" name="status" value="A"> 
						</td>
					</tr>
					<tr>
						<th>비밀번호</th>
						<td><input type="password" name="password" placeholder="게시판 비밀번호를 입력해주세요."> </td>
					</tr>
				</tbody>
			</table>
		</form>
	</div>
	
	<!-- 파일 업로드 -->
	<div class="file-container">
		<div class="file-header">
			<div class="file=title">
				<a>파일 첨부</a>
			</div>
		</div>
		<div class="file-body">
			<div class="uploadDiv">
				<input type="file" name="uploadFile" multiple="multiple">
			</div>
			<div class="uploadResult">
				<ul></ul>
			</div>
		</div>
	</div>
	
	<br>
	
	<div >
		<div class="infomation">
			<h4>상담을 위한 개인 정보 수집/이용 동의</h4>
			<br>
			<h5>1. 수집 항목 : 이름, 이메일 주소, 휴대폰 번호</h5>
			<h5>2. 수집, 이용 목적 : 상품 및 안내를 위한 정보 제공</h5>
			<h5>3. 보유, 이용기간 및 파기 : 답변 3개월 후 지체 없이 파기</h5>
		</div>
	</div>
	
	<br>
	
	<div class="panel-body-btns">
		<button type="button" class="btn btn-sec" id="registerBtn">작성완료</button>
	</div>
	

	<jsp:include page="../layout/footer.jsp"/>
	<script type="text/javascript" src="/resources/js/Inquiry/Inquiryupload.js"></script>
	<script type="text/javascript" src="/resources/js/Inquiry/InquiryRegister.js"></script>
</body>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri = "http://www.springframework.org/security/tags" prefix = "sec" %>       
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<jsp:include page="../layout/header.jsp"/>
	
	<div class="page-header">
		<h1>1:1문의글 수정&삭제</h1>
	</div>
	
	<br>
	
	<div class="panel-body">
		<form method="post">
			<table>
				<tbody>
					<tr>
						<th>글 번호</th>
						<td><input type="text" name="i_idx" value="${vo.i_idx }" readonly></td>
					</tr>
					<tr>
						<th>문의유형</th>
						<td>
						<c:if test="${vo.inquiry_type eq 'A'}">
						<a>이용문의</a>
						</c:if>
						<c:if test="${vo.inquiry_type eq 'B'}">
						<a>파티문의</a>
						</c:if>
						<c:if test="${vo.inquiry_type eq 'C'}">
						<a>회원문의</a>
						</c:if>
						<c:if test="${vo.inquiry_type eq 'D'}">
						<a>입출금문의</a>
						</c:if>
						<c:if test="${vo.inquiry_type eq 'E'}">
						<a>기타</a>
						</c:if>
						</td>
					</tr>
					<tr>
						<th>제목</th>
						<td><input type="text" name="title" value="${vo.title }"></td>
					</tr>
					<tr>
						<th>작성자</th>
						<td><input type="text" name="writer" value="${vo.writer }" readonly></td>
					</tr>
					<tr>
						<th>내용</th>
						<td>
							<textarea rows="10" cols="75" name="content">${vo.content }</textarea>
						</td>
					</tr>
				</tbody>
			</table>
		</form>
		
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
	</div>
	
	<br>
	
	<div class="panel-body-btns">
		<button type="button" class="btn btn-sec" id="modifyBtn">수정</button>
		<button type="button" class="btn btn-thi" id="removeBtn">삭제</button>
		<button type="button" class="btn btn-fir" id="indexBtn">목록으로 이동</button>
	</div>
	

	<jsp:include page="../layout/footer.jsp"/>
	<script type="text/javascript" src="/resources/js/Inquiry/Inquiryupload.js"></script>
	<script type="text/javascript" src="/resources/js/Inquiry/InquiryModify.js"></script>		
</body>
</html>
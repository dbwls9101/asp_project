<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri = "http://www.springframework.org/security/tags" prefix = "sec" %>        
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>1:1 문의하기</title>
</head>
<body>
	<jsp:include page="../layout/header.jsp"/>

	<sec:authentication property="principal" var="principal"/>
	
	<div class="page-header">
		<h1>1:1 문의하기</h1>
	</div>
	
	<br>
	
	<div class="panel-body">
		<form>
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
						<td><input type="text" name="title" value="${vo.title }" readonly></td>
					</tr>
					<tr>
						<th>작성자</th>
						<td><input type="text" name="writer" value="${vo.writer}" readonly></td>
					</tr>
					<tr>
						<th>내용</th>
						<td>
							<textarea rows="10" cols="75" name="content" readonly>${vo.content }</textarea>
						</td>
					</tr>
				</tbody>
			</table>
		</form>

		<!-- 파일 업로드 부분 -->
		
		<div class="file-container">
			<div class="file-header">
				<div class="file=title">
					<a>첨부파일</a>
				</div>
			</div>
			<div class="file-body">
				<div class="uploadResult">
					<ul></ul>
				</div>
			</div>
		</div>
		
		<br>
		<!-- 버튼 부분 (처리 관련 내용은 차 후에)-->
		
		<div class="panel-body-btns">
		<sec:authorize access="isAuthenticated()">	<!-- 로그인이 되었냐? -->
			<c:if test="${principal.member.id eq vo.writer}">
				<button type="button" class="btn btn-sec" id="modifyBtn">수정</button>
			</c:if>
		</sec:authorize>		
			<button type="button" class="btn btn-fir" id="indexBtn">목록으로 이동</button>	
		</div>
	</div>

	<div class="panel-footer">
		<from method="post">
			<table>
				<div class="panel-footer-header">
					<div class="panel-footer-title">
						<a href="mainPage">댓글</a>
					</div>
				</div>
				<div>
				<tbody>
					<tr>
						<th class="th-st1">댓글 작성자</th>

						<td>${principal.member.id}<input type="hidden" name="id" value="${principal.member.id}"></td>
						<th>처리상태</th>
						<td class="select1">
								<select name="status" class="status-st">
									<option value="A">대기</option>
									<option value="B">완료</option>
									<option value="C">확인중</option>
								</select> 
						</td>
					</tr>
					<tr>
						<th>댓글 내용</th>
						<td colspan="3"><textarea rows="3" cols="80" name="content" class="text11"></textarea> </td>
					</tr>
					<tr>
						<td colspan="6" id="btn">
							<input type="button" value="댓글 등록" class="btn-a" id="addReplyBtn">
							<input type="hidden" name="i_idx" value="${vo.i_idx }">
							<input type="hidden" name="reg_date" value="${vo.reg_date }">
						</td>
					</tr>
				</tbody>
				</div>
			</table>
		
			<!-- 화면에 나타나는 영역 -->
			<div class="panel-footer-body">
				<ul class="chat">
					<li data-c_idx="10">
						<div>
							<div class="chat-header">
								<strong class="priamry-font">작성자</strong>
								<small class="pull-right">2000-01-01</small>
							</div>
							<p>내용</p>
						</div>
					</li>
				</ul>
			</div>
		</from>
	</div>

	<jsp:include page="../layout/footer.jsp"/>
	<script type="text/javascript" src="/resources/js/Inquiry/Inquiryreply.js"></script>		<!-- 댓글 관련 통신만 수행 할 것이다.(API 호출 하는 것) -->
	<script type="text/javascript" src="/resources/js/Inquiry/InquiryGet.js"></script>	<!-- 동적인 일을 처리 할때는 이것 만 -->	
</body>
</html>
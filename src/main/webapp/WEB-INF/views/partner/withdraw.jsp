<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="/resources/css/partner/withdraw.css">
</head>
<body>
	<jsp:include page="../layout/admin_header.jsp"/>
	
	<div id="content-container">
		<div id="service-container">
			<h3 id="withdraw-tab-title">출금관리</h3>
			
			<div id="withdraw-search">
				<form>
					<select class="form-select" aria-label="Default select example">
					  <option selected>출금상태</option>
					  <option value="1">신청</option>
					  <option value="2">승인</option>
					  <option value="3">반려</option>					
					</select>
					
					<select class="form-select" aria-label="Default select example">
					  <option value="1" selected>회원번호</option>
					  <option value="2">아이디</option>
					  <option value="3">신청일</option>			<!-- 이부분은 고민...  -->		
					</select>
					
					<input class="form-control" type="text" placeholder="검색어를 입력하세요." aria-label="default input example">
					
					<input type="button" id="search" value="검색">				
				</form>
			</div>
			
			<div id="withdrawlist">		
				<table>
					<thead>
						<tr>
							<th>NO.</th>
							<th>출금상태</th>
							<th>아이디</th>
							<th>신청금액</th>
							<th>신청금액</th>
						</tr>
					</thead>
				</table>
			</div>
			
		</div>
	</div>
</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
<script type="text/javascript" src="/resources/js/partner/withdraw.js"></script>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>파티/판매 목록</title>
<link rel="stylesheet" href="/resources/css/partner/manage.css">
</head>
<body>
	<jsp:include page="../layout/partner_header.jsp"/>
	
	<div id="content-container">
		<div id="service-container">
	
			<h3 id="party-tab-title">파티/판매 목록</h3>
		
			<div id="party-search">
				<form>
					<select class="form-select" aria-label="Default select example">
					  <option selected>카테고리</option>
					  <option value="1">One</option>
					  <option value="2">Two</option>
					  <option value="3">Three</option>
					</select>
					
					<select class="form-select" aria-label="Default select example">
					  <option value="1" selected>파티번호</option>
					  <option value="2">파티제목</option>
					  <option value="3">계정ID</option>
					</select>
					
					<input class="form-control" type="text" placeholder="검색어를 입력하세요." aria-label="default input example">
					
					<input type="button" id="search" value="검색">
					<input type="button" id="makeparty" value="파티생성">
				</form>
			</div>
			
			<span id="sorttap">
				<a href="#">최신순</a>
				<a href="#">남은기간순</a>
			</span>
			
			<div id="partylist">
				<table>
					<thead>
						<tr>
							<th>파티번호</th>
							<th>제목</th>
							<th>일 금액</th>
							<th>참여인원</th>
							<th>남은기간</th>
							<th>종료일</th>
							<th>파티생성일</th>
							<th>관리</th>
						</tr>
					</thead>
					<tbody>
						
					</tbody>
				</table>
			</div>
		</div>
	</div>
	
</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
<script type="text/javascript" src="/resources/js/partner/manage.js"></script>
</html>
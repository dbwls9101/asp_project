<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>partyinfo</title>
<link rel="stylesheet" href="/resources/css/partner/manage.css">
</head>
<body>
	<jsp:include page="../layout/partner_header.jsp"/>
	
	<div id="content-container">
		<div id="service-container">
		
			<h3 id="party-tab-title">참여정보</h3>
		
			<div id="party-search">
				<form>
					<select class="form-select" aria-label="Default select example">
					  <option selected>카테고리</option>
					  <option value="1">One</option>
					  <option value="2">Two</option>
					  <option value="3">Three</option>
					</select>
					
					<select class="form-select" aria-label="Default select example">
					  <option value="1" selected>서비스명</option>
					  <option value="2">구매자</option>
					  <option value="3">ID</option>
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
							<th>판매일</th>
							<th>서비스명</th>
							<th>구매자</th>
							<th>상태</th>
							<th>남은기간</th>
							<th>서비스금액</th>
							<th>수수료</th>
							<th>총 판매금액</th>
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
<script type="text/javascript" src="/resources/js/partner/partyinfo.js"></script>
</html>
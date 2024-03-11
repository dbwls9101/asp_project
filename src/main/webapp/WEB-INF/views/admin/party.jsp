<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
<link rel="stylesheet" href="/resources/css/admin/party.css">
</head>
<body>
	<jsp:include page="../layout/admin_header.jsp"/>
	
	
	<div class="container-fluid">
		<div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">파티 관리</h1>
        </div>
        
        <div class="radio">
			<div class="form-check form-check-inline">
			  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="all" checked>
			  <label class="form-check-label" for="inlineRadio1">전체</label>
			</div>
			<div class="form-check form-check-inline">
			  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="recruiting">
			  <label class="form-check-label" for="inlineRadio2">모집중</label>
			</div>
			<div class="form-check form-check-inline">
			  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="close">
			  <label class="form-check-label" for="inlineRadio3">마감</label>
			</div>
		</div>
		
		<div>
			<select id="detailSearch" class="form-select" aria-label="Default select example">
			  <option value="p_idx" selected>파티번호</option>
			  <option value="id">파티장 아이디</option>
			  <option value="name">파티장 닉네임</option>
			</select>
			
			<input class="form-control" type="text" id="searchword" aria-label="default input example">
			
			<input type="button" id="search" value="검색">
		</div>
		
		<div id="partylist">
			<table>
				<thead>
					<tr>
						<th>파티번호</th>
						<th>제목</th>
						<th>결제비용(총액)</th>
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
	
	
	<jsp:include page="../layout/admin_footer.jsp"/>
</body>
</html>
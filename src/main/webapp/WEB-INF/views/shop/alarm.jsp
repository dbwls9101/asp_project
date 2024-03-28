<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>알림</title>
<link rel="stylesheet" href="/resources/css/shop/alarm.css">
</head>
<body>
	<jsp:include page="../layout/header.jsp"/>
	
	<div class="title-div">
		<div class="title">알림</div>
	</div>
	
	<div class="list-payment inquiry-list">
		<table>
			<tr>
				<th>일시</th>
				<th>내용</th>
			</tr>
		</table>
	</div>
		
	<!-- page -->
	<div class="page-wrap">
		<ul class="page-nation">
		
		</ul>
	</div>

	<jsp:include page="../layout/footer.jsp"/>
</body>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>결제/환불 내역</title>
<link rel="stylesheet" href="/resources/css/payment/orderform.css">
<script type="text/javascript"	src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"></script>
</head>
<body>
	<jsp:include page="../layout/header.jsp"/>
	
	<form method="post">
		<div class="title-div">
			<div class="title">결제/환불 내역</div>
		</div>
		
		<div class="list-payment inquiry-list">
			<table>
				<thead>
					<tr>
						<th>진행날짜</th>
						<th>서비스명</th>
						<th>결제금액</th>
						<th>입금액</th>
						<th>포인트</th>
						<th>환불금액</th>
						<th>상태변경</th>
						<th>현재상태</th>
					</tr>
				</thead>
				<tbody>
				
				</tbody>
			</table>
		</div>
		
		<!-- page -->
		<div class="page-wrap">
			<ul class="page-nation">
			
			</ul>
		</div>
		
	</form>
	
	<jsp:include page="../layout/footer.jsp"/>
	<script type="text/javascript" src="/resources/js/payment/payservice.js"></script>
	<script type="text/javascript" src="/resources/js/payment/orderinquiry.js"></script>
</body>
</html>
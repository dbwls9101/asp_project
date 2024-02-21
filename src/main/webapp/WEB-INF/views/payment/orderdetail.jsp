<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>주문페이지</title>
<link rel="stylesheet" href="/resources/css/payment/orderform.css">
<script type="text/javascript"	src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"></script>
</head>
<body>
	<jsp:include page="../layout/header.jsp"/>
	
	<form method="post">
		<div class="title-div">
			<div class="title">진행/결제</div>
		</div>
		
		<!-- 진행 정보 -->
		<div class="sub-title">진행 정보</div>
		
		<div class="list-payment">
			<table>
				<thead>
					<tr>
						<th>서비스명</th>
						<th>참여일</th>
						<th>판매가</th>
						<th>수수료</th>
						<th>합계</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<!-- 예시 -->
						<td>넷플릭스 프리미엄</td>
						<td>89일</td>
						<td>13,350원</td>
						<td>1,335원</td>
						<td><strong>14,685원</strong></td>
					</tr>
				</tbody>
			</table>
		</div>
		
		<!-- 결제 정보 -->
		<div class="form-half left">
			<div class="sub-title">결제자 정보</div>
			
			<div class="form-list">
				<ul>
					<li>
						<div class="subject">ㆍ 아이디</div>
						<div class="right">saasde</div>
						<input type="hidden" name="id" value="saasde">
					</li>
					<li>
						<div class="subject">ㆍ 이름</div>
						<div class="right fill">
							<input type="text" name="name" value="신동민" maxlength="20" style="text-align: right;">
						</div>
						<input type="hidden" name="phone" value="010-1234-1234">
						<input type="hidden" name="m_idx" value="1">
						<input type="hidden" name="title" value="넷플릭스 프리미엄">
					</li>
				</ul>
			</div>
		</div>
		
		<div class="form-half">
			<div class="sub-title">결제 정보</div>
			
			<div class="form-list">
				<ul>
					<li>
						<div class="subject">ㆍ 서비스 금액</div>
						<div class="right">13,350원</div>
						<input type="hidden" name="service_amount" value="100">
					</li>
					<li>
						<div class="subject">ㆍ 수수료(10%)</div>
						<div class="right">1,335원</div>
						<input type="hidden" name="commission" value="10">
					</li>
					<li>
						<div class="subject">ㆍ 합계</div>
						<div class="right">14,685원</div>
						<input type="hidden" name="pay_amount" value="110">
					</li>
					<li>
						<div class="subject">ㆍ 사용 포인트</div>
						<div class="right fill">
							보유 포인트 <span class="text-point">500P</span>
							<input type="text" name="point" value="0" class="point" style="text-align: right;">
							<input type="button" value="전액사용" onclick="" class="point-btn">
						</div>
					</li>
					<li>
						<div class="subject">ㆍ 결제방법</div>
						<div class="right">
							<input type="radio" name="pay_method" value="card" id="card" checked="checked">
							<label for="card">신용카드</label>
							<input type="radio" name="pay_method" value="kakaopay" id="kakaopay">
							<label for="kakaopay">카카오페이</label>
						</div>
					</li>
					<li class="total">
						<div class="subject" style="color: #43a051;">총 결제금액</div>
						<div class="right">
							<span class="total-price">14,685</span>
							<span>원</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
		
		<!-- 유의사항 -->
		<div class="caution">
			<strong>유의사항</strong>
			
			<ul>
				<li>사용자간의 컨텐츠 비용을 나눔을 할 수 있도록 지원해 드리고 있으며, 참여하신 서비스의 주체가 아닙니다.</li>
				<li>개별 공급자가 등록한 나눔 내용 및 거래에 대한 책임은 공급자가 부담하며, 이에 따라서 공급자가 진행하는 서비스에 대해서 어떠한 책임과 의무를 지지 않습니다.</li>
				<li>파티장 연락두절 및 이용불가능한 상태 방치 등에 의한 환불인 경우 벗츠에서 남은 기간에 대한 환불을 보장하며, 포인트로 환불 진행됩니다. (단 참여 후 3일이 경과되지 않았을 경우 지불했던 수단으로 100% 환불)</li>
			</ul>
			<p>※ 서비스 참여 중에 판매자의 실수를 비롯 하여 네트워크, 서비스 제공업체, 다른 파티원 등의 문제로 의도치 않는 문제가 발생 할 수 있습니다. 문제 발생 시 상호간 매너있는 대화 부탁드리며, 부적절한 언어 선택 시 이용제한 등의 조치가 진행 될 수 있습니다.</p>
		</div>
		
		<!-- 주문버튼 -->
		<div class="pay-btn">
			<input type="button" value="주문하기" id="pay-btn" class="pay-btn-submit">
			<input type="button" value="취소" onclick="history.back(-1);" class="pay-btn-back">
		</div>
	</form>
	
	<jsp:include page="../layout/footer.jsp"/>
	<script type="text/javascript" src="/resources/js/payment/payservice.js"></script>
	<script type="text/javascript" src="/resources/js/payment/orderform.js"></script>
</body>
</html>
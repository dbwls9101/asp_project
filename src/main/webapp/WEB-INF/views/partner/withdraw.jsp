<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<%@ taglib uri = "http://www.springframework.org/security/tags" prefix = "sec" %>    
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>출금 관리</title>
</head>
<body>
	<jsp:include page="../layout/partner_header.jsp"/>
	
	<sec:authentication property="principal" var="principal"/>
	
	<div id="content-container">
		<div id="service-container">
			<h3 id="withdraw-tab-title">출금관리</h3>
			
			<div id="withdraw-search">
				<form method="post" id="withdrawform">
					<div id="containerA">
						<div id="withdrawCheckA">		
							<table>
								<thead>
								<!-- 
									1. 판매총액 = payment -> service_amount(수수료를 제외한 비용)  - (1)완료
									2. 지급금액 = payment -> 출금 신청 전에는 전에 데이터, 출금 신청 후에는 데이터 수정된다. (4)
									   - 출금 신청이 완료되고 최종 지금이 완료되는 시점에 변경되어야 한다.
									3. 지금 요청 금액 = 출금 대상자 출금 신청을 하면 2번 지금금액과 유사한 형태이다. (2) 
									   - 출금 신청에서 지급 요청금액을 작성하게 되면 이 곳에 데이터가 기입되야 한다.  
									4. 출금 가능 금액 = payment -> service_amount  (3)
									   - 지금 요청 금액으로 신청이 완료되면 출금 가능 금액은 그만큼 감소해야 한다. 
									5. 미발생 판매금 = 일일 단위로 값이 쌓여 나간다. 
								 -->
									<tr>
										<th>구분</th>
										<th>금액(원)</th>
										<th>비고</th>
									</tr>
									
									<tr>
										<th>1. 판매총액</th>  
											<c:choose>
												<c:when test="${sumamount == null}">
													<td>0원</td>
												</c:when>
												<c:otherwise>
													<td id="sumamount" name="sumamount"><fmt:formatNumber value="${sumamount }" type="number" />원</td>
												</c:otherwise>
											</c:choose>
											<td>총 판매합산 금액</td>
									</tr>
									
									<tr>
										<th>2. 지급금액</th> 
											<c:choose>
												<c:when test="${currentamount == null}">
													<td>0원</td>
												</c:when>
												<c:otherwise>
													<td id="currentamount" name="currentamount"><fmt:formatNumber value="${currentamount }" type="number" />원</td>
												</c:otherwise>
											</c:choose>
											<td>신청금액 기준</td>
									</tr>
									
									<tr>
										<th>3. 지급 요청 금액</th>
											<c:choose>
												<c:when test="${withamount == null}">
													<td>0원</td>												
												</c:when>
												<c:otherwise>
													<td id="withamount" name="withamount"><fmt:formatNumber value="${withamount }" type="number" />원</td>
												</c:otherwise>
											</c:choose>
											<input type="hidden" name="with_amount3" value="${withamount }">
											<td></td>
									</tr>
									
									<tr>
										<th>4. 미발생 판매금</th>
											<c:choose>
												<c:when test="${unsaleslist == null}">
													<td>0원</td>												
												</c:when>
												<c:otherwise>
													<td id="unsaleslist" name="unsaleslist"><fmt:formatNumber value="${unsaleslist }" type="number" />원</td>
												</c:otherwise>
											</c:choose>
											<td>진행 중 파티의 남은 기간에 해당하는 비용</td>
									</tr>
									
									<tr style="border: 1px solid #43a051;">
										<th>5. 출금 가능 금액</th>
											<c:choose>
												<c:when test="${unsaleslist == 0}">
													<td>0원</td>
												</c:when>
												<c:when test="${unsaleslist - withamout == 0 }">
													<td>0원</td>
												</c:when>
												<c:otherwise>
<<<<<<< HEAD
													<td><fmt:formatNumber value="${unsaleslist - withamount}" type="number" />원</td>
=======
													<td>${(currentamount + withamount) - unsaleslist}원</td>
>>>>>>> 2173df4d361a5163ac0c63df55cbe7a95c1385b7
												</c:otherwise>
											</c:choose>
											<td></td>
									</tr>
								</thead>
							</table>
						</div>
						<div id="withdrawCheckB">
							<table>
								<thead>
										<tr>
											<th colspan="2">정산/입금안내</th>
										</tr>
											
										<tr>
											<th width="230">입금계좌</th>
											<td id="center2"><input type="text" name="bank_number" value="${principal.member.bank_number }" readonly="readonly" style="background-color: #ececec;"></td>
										</tr>
										
										<tr>
											<c:choose>
												<c:when test="${unsaleslist - withamount == null }">
													<td colspan="2" style="background-color: #43a051">
													<p3 id="center1">최대 <b>0원</b> 까지 신청할 수 있습니다.</p3>
													</td>	
												</c:when>
												<c:otherwise>
													<td colspan="2" style="background-color: #43a051">
													<p3 id="center1">최대 <b><fmt:formatNumber value="${(currentamount + withamount) - unsaleslist}" type="number" />원</b> 까지 신청할 수 있습니다.</p3>
													</td>	
												</c:otherwise>
											</c:choose>									
										</tr>
										
										<tr>
											<th>통장입금</th>
											<td id="center2"><input type="text" name="with_amount" placeholder="금액을 입력하세요." ><input type="button" id="withDrawal" value="출금신청"></td>
										</tr>
										
										<tr>
											<th colspan="2" id="center2" style="padding: 21px 20px !important;">
											<p2>* 하루에 한번만 신청 할 수 있고 최대 5,000,000원(오백만원)만 출금 가능합니다.</p2><br>
											<p3>* 모든 은행 출금 수수료는 1,000원으로 동일하게 부과됩니다.</p3><br>
											<p3>* 출금 신청 시 영업일 기준 최대 3일이 소요 될 수 있습니다.(토요일, 일요일, 공유일 제외)</p3>
											</th>
										</tr>
										
										<tr>
											<td colspan="2">
												<input type="hidden" name="m_idx" value="${principal.member.m_idx }">
												<input type="hidden" name="name" value="${principal.member.name }">
										        <input type="hidden" name="id" value="${principal.member.id}">
										        <input type="hidden" name="phone" value="${principal.member.phone}">
										        <input type="hidden" name="with_amount2" value="${principal.member.with_amount}">
										        <input type="hidden" name="with_status" value="A">
										        <input type="hidden" name="with_method" value="통장입금">
										        <input type="hidden" name="note" value="${principal.member.bank_number }">	
									        </td>										
										</tr>
								</thead>
							</table>			
						</div>	
					</div>	
				</form>
			</div>
			
			<div id="withdrawlist">		
				<table>
					<thead>
						<tr>
							<th>출금상태</th>
							<th>출금방법</th>
							<th>예금주</th>
							<th>신청금액(수수료)</th>
							<th>실지급액</th>	
							<th>신청일</th>
						</tr>
					</thead>
					<tbody class="aa">
						
					</tbody>
				</table>
			</div>
		</div>
	</div>
	
	<jsp:include page="../layout/partner_footer.jsp"/>

</body>
<script type="text/javascript" src="/resources/js/partner/withdraw.js"></script>
</html>
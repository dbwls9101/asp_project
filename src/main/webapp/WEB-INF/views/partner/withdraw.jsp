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
	<jsp:include page="../layout/partner_header.jsp"/>
	
	<div id="content-container">
		<div id="service-container">
			<h3 id="withdraw-tab-title">출금관리</h3>
			
			<div id="withdraw-search">
				<form method="post" id="withdrawform">
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
					<input type="hidden" name="m_idx" value="${vo.m_idx }">
					<input type="hidden" name="w_idx" value="${vo.w_idx }">

					<input type="button" id="withDrawal" value="출금신청">
					<!------------ 하단부는 비동기 방식  (우선 숨긴다.)------------>
						<div id="modal">
					      <div class="modal-contents">
					         <div class="modal-titles">
					            <a>출금 정보 등록</a>
					         </div>
					         <hr>
					         <div class="modal-body">
					            <ul class="chats">
					               <li>
					                  <div>
					                     <div>
					                        <span class="modal-font">예금주</span>
					                     </div>
					                     <p><input type="text" name="name" placeholder="받으실 예금주 명을 입력해주세요."></p>
					                  </div>
					               </li>
					               <br>
					               <li>
					                  <div>
					                     <div>
					                        <span class="modal-font">출금금액</span>
					                     </div>
					                     <p><input type="text" name="with_amount" placeholder="신청 금액을 입력해주세요."></p>
					                  </div>
					               </li>
					               <br>
					               <li>
					                  <div>
					                     <div>
					                        <span class="modal-font">출금방법</span>
					                     </div>
					                     <p><input type="text" name="with_method" placeholder="출금방법은 통장입금입니다."></p>
					                  </div>
					               </li>
					               <br>
					            </ul>
					               <p>*하루에 한번 만 신청 할 수 있습니다.</p>
					               <p>*모든 은행 출금 수수료는 1,000원으로 동일하게 부과됩니다.</p>
					               <p>*하루 최대 5,000,000원(오백만원)만 출금 가능합니다.</p>
					               <p>*출금 신청 시 영업일 기준 최대 3일이 소요 될 수 있습니다.</p>
					               <p>(토요일, 일요일, 공휴일 제외)</p>
					         </div>
					         <div class="modal-footer">
					         	 <sec:authentication property="principal" var="principal"/>
						         <input type="hidden" name="m_idx" value="${principal.member.m_idx }">
						         <input type="hidden" name="id" value="${principal.member.id}">
						         <input type="hidden" name="phone" value="${principal.member.phone}">
						         <input type="hidden" name="with_status" value="A">					
						         <input type="hidden" name="commission" value="-1000">				<!-- 내일 수정  -->	
					             <button type="button" class="btn btn-sec" id="addReplyBtn">출금신청</button>
					             <button type="button" class="btn btn-fir" id="closeModalBtn">취소</button>
					         </div>
					      </div>
					   </div>	
				<!------------ 비동기 방식 (우선 숨긴다.)------------>
				</form>
			</div>
			
			<div id="withdrawlist">		
				<table>
					<thead>
						<tr>
							<th>NO.</th>
							<th>출금상태</th>
							<th>아이디</th>
							<th>출금방법</th>
							<th>예금주</th>
							<th>수수료</th>
							<th>출금금액</th>   <!-- 수수료 천원을 제외한 금액 -->
							<th>신청일</th>
							<th>출금취소</th>						
						</tr>
					</thead>
					<tbody class="aa">
						
					</tbody>
				</table>
			</div>
		</div>
	</div>
	

</body>
<script type="text/javascript" src="/resources/js/partner/withdraw.js"></script>
</html>
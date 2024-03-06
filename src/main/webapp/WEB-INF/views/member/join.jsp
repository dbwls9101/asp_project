<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원가입</title>
<link rel="stylesheet" href="/resources/css/member/join.css"> 
<!-- iamport.payment.js -->
<script type="text/javascript" src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"></script>
</head>
<body>
<jsp:include page="../layout/header.jsp"/>
<form class="form-horizontal register-form" role="form" id="fregisterform" name="fregisterform" autocomplete="off" action="#" method="post" onsubmit="return false">
	<div class="mw-800 form-signup">
		<div class="h3">아이디/비밀번호</div>
		<div class="form-round signup">
			<ul class="form-list">
			<li>
				<span class="subject">ㆍ 아이디</span>
				<input type="text" name="id" id="id" placeholder="아이디" maxlength="20">
				<span class="lightgrey inline-break id_input_1" id="warn" style="display: none;">아이디 : 영문자, 숫자, 최소 4글자 이상</span>
			</li>
			<li>
				<span class="subject">ㆍ 비밀번호</span>
				<input type="password" class="form-control input-sm pw_input" name="password" id="password" placeholder="비밀번호">
				<span class="lightgrey inline-break pw_input_3" id="pw" style="display: none;">비밀번호는 8~16자, 대소문자 or 숫자로 입력해주세요</span>
				
			</li>
			<li>
				<span class="subject">ㆍ 비밀번호 확인</span>
				<input type="password" class="form-control input-sm pwck_input" name="passwordCk" id="passwordCk" placeholder="비밀번호 확인">
				<span class="lightgrey inline-break pw_input_1" style="display: none;">비밀번호가 일치합니다.</span>
				<span class="lightgrey inline-break pw_input_2" style="display: none;">비밀번호가 일치하지 않습니다.</span>
			</li>
			</ul>
		</div>
		<div class="h3"><span class="title-point">정보</span> 입력</div>
		<div class="form-round signup">
			<ul class="form-list">
				<li>
					<span class="subject">ㆍ 이름</span>
					<input type="text" id="name" name="name" value="" placeholder="이름" size="10" readonly="readonly">
					<button type="button" id="certification" class="button round button-purple phone">휴대폰 본인확인</button>	
				</li>
				<li>
					<span class="subject">ㆍ 닉네임</span>
					<input type="text" class="nickname_input" name="nickname" id="nickname" placeholder="닉네임">
					<span class="lightgrey inline-break" id="nick" style="display: none;">닉네임 : 공백없이 한글, 영문, 숫자만 입력 가능</span>
				</li>
				<li>
					<span class="subject">ㆍ 이메일</span>
					<input type="text" class="email_input" name="email" id="email" placeholder="이메일">
					<span class="lightgrey inline-break" id="emailText" style="display: none;">이메일 사용이 가능합니다.</span>
				</li>
				<li>
					<span class="subject">ㆍ 휴대폰 번호</span>
					<input type="text" name="phone" id="phone" value="" placeholder="휴대폰 번호" maxlength="20"  readonly="readonly">
				</li>
			</ul>
		</div>
		<div class="button-align center">
			<input type="hidden" name="birth" id="birth" value="">
			<button type="submit" id="btn_submit" class="button button-point" accesskey="s" onclick="validate(this.form)">회원 가입</button>
			<a href="/member/login" class="button">취소</a>
		</div>
	</div>
</form>
<jsp:include page="../layout/footer.jsp"/>
</body>
<script type="text/javascript" src="/resources/js/member/join.js"></script>
</html>

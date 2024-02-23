<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="/resources/css/member/join.css"> 
</head>
<body>
<jsp:include page="../layout/header.jsp"/>
<form class="form-horizontal register-form" role="form" id="fregisterform" name="fregisterform" autocomplete="off" action="#" method="post" onsubmit="return false">
	<div class="mw-800 form-signup mg-top-minus">
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
		<div class="h3"><span class="text-purple">내 정보</span> 입력</div>
		<div class="form-round signup">
			<ul class="form-list">
				<li>
					<span class="subject">ㆍ 이름</span>
					<input type="text" id="name" name="name" value="" placeholder="이름" size="10">
					<button type="button" id="win_hp_cert" class="button round button-purple phone">휴대폰 본인확인</button>
					<!-- <a href="" class="button round button-purple phone">휴대폰 본인인증</a> -->
					<div class="lightgrey break"><span class="text-purple">[휴대폰 본인확인 완료]</span> 휴대폰 번호는 인증한 휴대폰 번호와 동일하게 자동 입력 됩니다.</div>
						<noscript>본인확인을 위해서는 자바스크립트 사용이 가능해야합니다.</noscript>
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
					<input type="text" name="phone" value="" id="phone" placeholder="휴대폰 번호" maxlength="20">
					<span class="lightgrey inline-break" id="phoneText" style="display: none;">하이픈(-) 포함하여 입력해주세요.</span>
				</li>
			</ul>
		</div>
		<div class="button-align center">
			<a href="/" class="button">취소</a>
			<button type="submit" id="btn_submit" class="button button-purple" accesskey="s" onclick="validate(this.form)">회원 가입</button>
		</div>
	</div>
</form>
<jsp:include page="../layout/footer.jsp"/>
</body>
<script type="text/javascript" src="/resources/js/member/join.js"></script>
</html>


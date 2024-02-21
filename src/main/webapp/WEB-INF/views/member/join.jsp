<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="/resources/css/member/join.css"> 
<style type="text/css">
 
  </style>
</head>
<body>
<jsp:include page="../layout/header.jsp"/>
<!-- <div class="wrapper"> 
	<form action="#" method="post" onsubmit="return false">
	<div class="wrap">
			<div class="subjecet">
				<span>회원가입</span>
			</div>
			<div class="id_wrap">
				<div class="id_name">아이디</div>
				<div class="id_input_box">
					<input class="id_input" name="id" id="id" placeholder="아이디">
				</div>
				<div>
				<span class="id_input_1">사용 가능한 아이디입니다.</span>
				<span class="id_input_2">아이디가 이미 존재합니다.</span>
				</div>
			</div>
			<div class="pw_wrap">
				<div class="pw_name">비밀번호</div>
				<div class="pw_input_box">
					<input class="pw_input" name="password" id="password" placeholder="비밀번호">
				</div>
			</div>
			<div class="pwck_wrap">
				<div class="pwck_name">비밀번호 확인</div>
				<div class="pwck_input_box">
					<input class="pwck_input" name="passwordCk" id="passwordCk" placeholder="비밀번호 확인">
				</div>
				<div>
				<span class="pw_input_1">비밀번호가 일치합니다.</span>
				<span class="pw_input_2">비밀번호가 일치하지 않습니다.</span>
				</div>
			</div>
			<div class="user_wrap">
				<div class="user_name">이름</div>
				<div class="user_input_box">
					<input class="user_input" name="name" placeholder="이름">
				</div>
			</div>
			<div class="nickname_wrap">
				<div class="nickname_name">닉네임</div>
				<div class="nickname_input_box">
					<input class="nickname_input" name="nickname" id="nickname" placeholder="닉네임">
				</div>
				<div>
				<span class="nickname_input_1">닉네임 사용이 가능합니다.</span>
				<span class="nickname_input_2">사용중인 닉네임 입니다.</span>
				</div>				
			</div>		
						<div class="email_wrap">
				<div class="email_name">이메일</div> 
				<div class="email_input_box">
					<input class="email_input" name="email" id="email" placeholder="이메일">
				</div>
				<div>
				<span class="email_input_1">이메일 사용이 가능합니다.</span>
				<span class="email_input_2">사용중인 이메일 입니다.</span>
				</div>					
			</div>	
			<div class="phone_wrap">
				<div class="phone_name">휴대폰 번호</div> 
				<div class="phone_input_box">
					<input class="phone_input" name="phone" placeholder="휴대폰">
				</div>
				
				<div class="phone_check_wrap">
					<div class="phone_check_button">
						<span>인증번호 전송</span>
					</div>
					<div class="clearfix"></div>
				</div>
			</div>			
			<div class="join_button_wrap">
				<input type="button" class="join_button" value="가입하기" onclick="validate(this.form)">
			</div>
		</div>
	</form>
</div> -->
<form class="form-horizontal register-form" role="form" id="fregisterform" name="fregisterform" autocomplete="off" action="#" method="post" onsubmit="return false">
	<div class="mw-800 form-signup mg-top-minus">
		<div class="h3">아이디/비밀번호</div>
		<div class="form-round signup">
			<ul class="form-list">
			<li>
				<span class="subject">ㆍ 아이디</span>
<!-- 				<input  name="mb_id" value="" id="reg_mb_id" required="" placeholder="아이디" minlength="3" maxlength="20"> -->
				<input type="text" name="id" id="id" placeholder="아이디" maxlength="20">
				<span class="lightgrey inline-break id_input_1" style="display: none;">사용 가능한 아이디입니다.</span>
				<span class="lightgrey inline-break id_input_2" style="display: none;">아이디가 이미 존재합니다.</span>
				<span class="lightgrey inline-break">영문자, 숫자, _ 입력 가능, 최소 3글자 입력해주세요</span>
			</li>
			<li>
				<span class="subject">ㆍ 비밀번호</span>
				<input type="password" class="form-control input-sm pw_input" name="password" id="password" placeholder="비밀번호">
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
				<input type="text" id="name" name="name" value="" required="" placeholder="이름" size="10">
				<button type="button" id="win_hp_cert" class="button round button-purple phone">휴대폰 본인확인</button>
				<!-- <a href="" class="button round button-purple phone">휴대폰 본인인증</a> -->
													<div class="lightgrey break"><span class="text-purple">[휴대폰 본인확인 완료]</span> 휴대폰 번호는 인증한 휴대폰 번호와 동일하게 자동 입력 됩니다.</div>
					<noscript>본인확인을 위해서는 자바스크립트 사용이 가능해야합니다.</noscript>
							</li>
						<li>
				<span class="subject">ㆍ 닉네임</span>
				<input type="text" class="nickname_input" name="nickname" id="nickname" placeholder="닉네임">
				<span class="lightgrey inline-break nickname_input_1" style="display: none;">닉네임 사용이 가능합니다.</span>
				<span class="lightgrey inline-break nickname_input_2" style="display: none;">사용중인 닉네임 입니다.</span>
				<span class="lightgrey inline-break">공백없이 한글, 영문, 숫자만 입력 가능 (닉네임은 월 30일에 1회 변경 가능합니다)</span>
			</li>
						<li>
				<span class="subject">ㆍ 이메일</span>
				<input type="text" class="email_input" name="email" id="email" placeholder="이메일">
				<span class="lightgrey inline-break email_input_1" style="display: none;">이메일 사용이 가능합니다.</span>
				<span class="lightgrey inline-break email_input_2" style="display: none;">사용중인 이메일 입니다.</span>
				<!-- <span class="lightgrey at">@</span>
				<select name="" id="">
				<option value="">hanmail.net</option>
				<option value="">naver.com</option>
				<option value="">gmail.com</option>
				</select> -->
			</li>
									<li>
				<span class="subject">ㆍ 휴대폰 번호</span>
				<input type="text" name="phone" value="" id="phone" required="" placeholder="휴대폰 번호" maxlength="20">
									<input type="hidden" name="old_mb_hp" value="">
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


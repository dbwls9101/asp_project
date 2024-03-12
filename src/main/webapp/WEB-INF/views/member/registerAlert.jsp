<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

</body>
<script type="text/javascript">
<c:choose>
	<c:when test="${setText == null}">
		<c:if test = "${kakaoPopCheck == null and type != null}">
			location.href = "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=1eafea66efb2c408d53924fa52fd0839&redirect_uri=http://localhost:8081/${type}";
		</c:if>
		<c:if test = "${kakaoPopCheck == 1 }"> //계정 미존재, 회원가입 페이지로 이동
			opener.location = "/member/join?kakao=1";
			self.close();
		</c:if>
		<c:if test = "${kakaoPopCheck == 2 }">	//계정 존재, 로그인되어 메인페이지로 이동
			opener.location = "/";
			self.close();
		</c:if>
	</c:when>
	<c:otherwise> 
		alert("${setText}");
		<c:if test = "${kakaoPopCheck == 3 }">
			self.close();
			opener.location='/member/login';	
		</c:if>
		<c:if test = "${kakaoPopCheck == 4 }">
			location.href='/member/login';		
		</c:if>		
	</c:otherwise>
</c:choose>
</script>
</html>
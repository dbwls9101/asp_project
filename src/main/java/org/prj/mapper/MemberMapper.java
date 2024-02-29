package org.prj.mapper;

import org.apache.ibatis.annotations.Param;
import org.prj.domain.MemberVO;

public interface MemberMapper {

	//회원가입
	public void memberJoin(MemberVO member);
	
	//아이디 중복 검사
	public int idCheck(String id);
	
	//닉네임 중복 검사
	public int nicknameCheck(String nickname);
	
	//이메일 중복 검사
	public int emailCheck(String email);
	
	//로그인
	public MemberVO memberRead(MemberVO member);
	
	//아이디 찾기
	public String findId(@Param("name") String name, @Param("email") String email);
	
	//비밀번호 찾기
	public MemberVO findPw(@Param("email") String email, @Param("id") String id);
	
	//비밀번호 변경
	public int updatePw(MemberVO member);
	
}

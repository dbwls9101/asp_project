package org.prj.mapper;

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
	
//	//로그인
//	public MemberVO memberLogin(MemberVO member);
	
	//로그인
	public MemberVO memberRead(MemberVO member);
	
	//아이디 찾기
	public String findId(String id);
	
}

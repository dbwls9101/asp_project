package org.prj.service;

import org.prj.domain.MemberVO;

public interface MemberService {
	
	//회원가입
	public void memberJoin(MemberVO member) throws Exception;
	
	//아이디 중복 검사
	public int idCheck(String id) throws Exception;
	
	//닉네임 중복 검사
	public int nicknameCheck(String nickname) throws Exception;
	
	//이메일 중복 검사
	public int emailCheck(String email) throws Exception;
	
	//아이디 찾기
	public String findId(String name, String email) throws Exception;
	
}

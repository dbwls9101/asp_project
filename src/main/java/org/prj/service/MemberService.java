package org.prj.service;

import java.io.IOException;
import java.util.HashMap;

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
	
	//비밀번호 찾기
	public MemberVO findPw(String email, String id) throws Exception;
	
	//비밀번호 변경
	public int updatePw(MemberVO member) throws Exception;
	
	// 인증된 사용자 정보(name, phoen) 구하기
	public HashMap<String, String> getAuthInfo(String impuid) throws IOException;

	//내 정보 수정
	public int updateMypage(MemberVO member) throws Exception;
}

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
	
	// 인증된 사용자 정보(name, phone) 구하기
	public HashMap<String, String> getAuthInfo(String impuid) throws IOException;

	//내 정보 수정
	public int updateMypage(MemberVO member) throws Exception;
	
	//파트너 신청
	public int partnerApp(MemberVO member);
	
	//파트너 정보수정
	public int partnerModify(MemberVO member);
	
	//파트너 정보조회
	public MemberVO getPartnerinfo(int m_idx);
	
	//결재 후 member -> with_amount 금액이 증가
	public void updateWithamount(MemberVO vo);

    //카카오 회원가입
	public int kakaoIdck(String kakaoid);
	
	//카카오 로그인
	public MemberVO kakaoRead(String kakaoid);
	
	//회원가입 중복확인
	public int joinCheck(String name, String phone);
	
	//회원번호 찾기
	public int findMidx(String id);

}

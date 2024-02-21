package org.prj.service;

import org.prj.mapper.MemberMapper;
import org.prj.domain.MemberVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements MemberService{

	@Autowired
	MemberMapper membermapper;
	
	//회원가입
	@Override
	public void memberJoin(MemberVO member) throws Exception {
		
		membermapper.memberJoin(member);
	}
	
	//아이디 중복 검사
	@Override
	public int idCheck(String id) throws Exception {

		return membermapper.idCheck(id);
	}
	
	// 닉네임 중복 검사
	@Override
	public int nicknameCheck(String nickname) throws Exception {

		return membermapper.nicknameCheck(nickname);
	}
	
	// 이메일 중복 검사
	@Override
	public int emailCheck(String email) throws Exception {

		return membermapper.emailCheck(email);
	}
	
//	//로그인
//	@Override
//	public MemberVO memberLogin(MemberVO member) throws Exception {
//
//		return membermapper.memberLogin(member);
//	}
	
	//아이디 찾기
	@Override
	public String findId(String id) throws Exception {

		return membermapper.findId(id);
	}
	
}

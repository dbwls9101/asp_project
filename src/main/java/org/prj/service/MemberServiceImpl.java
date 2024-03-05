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
	
	//아이디 찾기
	@Override
		public String findId(String name, String email) throws Exception {

			return membermapper.findId(name, email);
		}
	
	//비밀번호 찾기
	@Override
		public MemberVO findPw(String email, String id) throws Exception {
			
			return membermapper.findPw(email, id);
		}
	
	//비밀번호 변경
	@Override
	public int updatePw(MemberVO member) throws Exception {
		
		return membermapper.updatePw(member);
	}
	
	//내정보 수정
	@Override
	public int updateMypage(MemberVO member) throws Exception {
		
		return membermapper.updateMypage(member);
	}
	
}

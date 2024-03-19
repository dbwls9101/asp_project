package org.prj.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.prj.domain.Criteria;
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
	
	//내 정보 수정
	public int updateMypage(MemberVO member);
	
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
	public int joinCheck(@Param("name") String name, @Param("phone") String phone);
	
	//회원번호 찾기
	public int findMidx(String id);

	//네이버 회원가입
	public int naverIdck(String naverid);
	
	//네이버 로그인
	public MemberVO naverRead(String naverid);
	
	//카카오 SNS 계정 연결
	public int kakao_update(MemberVO memeber);
	
	//네이버 SNS 계정 연결
	public int naver_update(MemberVO memeber);	
	
	//총 회원수
	public int getTotalUser();
	
	//회원관리 - 검색 - 회원 수
	public int getMemberTotal(Criteria cri);
	
	//회원 관리 - 검색 - 회원 리스트
	public List<MemberVO> getAdminMemberList(Criteria cri);
	
	//회원 관리 - 회원 수정
	public MemberVO getMember(int m_idx);
	
	//네이버 연동 해지
	public int doNaveridDelete(int m_idx);
	
	//카카오 연동 해지
	public int doKakaoidDelete(int m_idx);
	
	//회원 수정
	public void doMemberModify(MemberVO vo);
}

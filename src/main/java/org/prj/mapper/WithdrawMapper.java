package org.prj.mapper;

import java.util.List;

import org.prj.domain.Criteria;
import org.prj.domain.MemberVO;
import org.prj.domain.WithdrawVO;

public interface WithdrawMapper {
	
	// 출금 신청 리스트
	public List<WithdrawVO> getList(int m_idx);
	
	// 출금 신청
	public int insert(WithdrawVO vo);
	
	// p_idx를 가지고와서 판매총액을 만드는 과정	
	public int getp_idx(String username);
	
	// 지금 요청 금액
	public int withamount(String username);
	
	// 지급 금액
	public Integer currentamount(String username);
	
	// 미발생 판매금
	public int unsales(String username);
	
	// 미발생 판매금 불러오는 것 
	public int unsaleslist(String username);	
	
	// 관리자 화면 출금 관리 리스트 업
//	public List<WithdrawVO> withdrawList();
	
	// * 관리자 화면에서 출금관리 페이지 처리를 위해 리스트 나오는 갯수
	public int getWithdrawTotal(Criteria cri);
	
	// * 관리자 화면에서 출금관리 페이지 처리를 위해 리스트 불러오기 
	public List<WithdrawVO> withdrawList(Criteria cri);
	
	// 관리자 화면에서 승인 버튼 누를 경우 with_status C로 변경
	public int modifyWithdraw(int w_idx);

	// 관리자 화면에서 승인 버튼 누를 경우 with_status C로 변경
	public int modifyWithdraw2(int w_idx);

	//새 출금 신청 수
	public int getNewWithdraw();
	
	//내 정보 수정
	public void updateMyinfo(MemberVO vo);
}

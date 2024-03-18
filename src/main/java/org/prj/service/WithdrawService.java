package org.prj.service;

import java.util.List;

import org.prj.domain.PaymentVO;
import org.prj.domain.WithdrawVO;

public interface WithdrawService {

	// 출금 신청 리스트
	public List<WithdrawVO> getWithList(int m_idx);
	
	// 출금 신청
	public int register(WithdrawVO vo);
	
	// 조회 기능 차후 진행 예정
	/* public WithdrawVO get(int w_idx); */
	
	// 판매총액을 만드는 과정
	public int getp_idx(String username);
	
	// 지급 요청 금액
	public int withamount(String username);
	
	// 관리자 화면에서 출금 관리 화면 리스트 업
	public List<WithdrawVO> withdrawList();
	
	// 지급 금액
	public int currentamount(String username);
	
	// 관리자 화면에서 승인 버튼 누를 경우 with_status C로 변경
	public boolean modifyWithdraw(int w_idx);
	
	//새 출금 신청 수
	public int getNewWithdraw();
}

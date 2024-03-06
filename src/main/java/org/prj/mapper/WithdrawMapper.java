package org.prj.mapper;

import java.util.List;

import org.prj.domain.PaymentVO;
import org.prj.domain.WithdrawVO;

public interface WithdrawMapper {
	
	// 출금 신청 리스트
	public List<WithdrawVO> getList(int m_idx);
	
	// 출금 신청
	public int insert(WithdrawVO vo);
	
	// 조회 기능 차후 진행 예정
	/* public WithdrawVO read(int w_idx); */
	
	// p_idx를 가지고와서 판매총액을 만드는 과정	
	public int getp_idx(String username);
	
	// 지금 요청 금액
	public int withamount(String username);
}

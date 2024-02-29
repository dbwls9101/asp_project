package org.prj.service;

import java.util.List;

import org.prj.domain.WithdrawVO;

public interface WithdrawService {

	// 출금 신청 리스트
	public List<WithdrawVO> getWithList(int m_idx);
	
	// 출금 신청
	public int register(WithdrawVO vo);
	
	// 조회 기능 차후 진행 예정
	/* public WithdrawVO get(int w_idx); */
	
}

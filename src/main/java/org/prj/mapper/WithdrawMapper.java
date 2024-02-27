package org.prj.mapper;

import java.util.List;

import org.prj.domain.WithdrawVO;

public interface WithdrawMapper {
	
	// 출금 신청 리스트
	public List<WithdrawVO> getList(int m_idx);
	
	// 출금 신청
	public int insert(WithdrawVO vo);
	
}

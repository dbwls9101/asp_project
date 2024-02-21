package org.prj.mapper;

import java.util.List;

import org.prj.domain.PaymentVO;

public interface PaymentMapper {
	// 결제내역 등록
	public int order(PaymentVO vo);
	
	// 결제정보
	public List<PaymentVO> orderList(int m_idx);
	
	// 결제조회
	public PaymentVO orderGet(String order_no);
	
	// 결제취소 상태변경
	public int cancelStatus(String order_no);
}
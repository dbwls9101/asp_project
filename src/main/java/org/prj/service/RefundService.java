package org.prj.service;

import org.prj.domain.RefundVO;

public interface RefundService {
	//환불 신청
	public int doRefundRegister(RefundVO vo);
	
	//환불 신청 건수
	public int getNewRefund();
}

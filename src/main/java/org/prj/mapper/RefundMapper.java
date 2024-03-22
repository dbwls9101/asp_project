package org.prj.mapper;

import org.prj.domain.MemberVO;
import org.prj.domain.RefundVO;

public interface RefundMapper {
	public int doRefundRegister(RefundVO vo);
	public int getNewRefund();
	public void updateMyinfo(MemberVO vo);
}

package org.prj.service;

import org.prj.domain.RefundVO;
import org.prj.mapper.PaymentMapper;
import org.prj.mapper.RefundMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class RefundServiceImpl implements RefundService{
	@Autowired
	private RefundMapper rMapper;
	
	@Autowired
	private PaymentMapper payMapper;

	@Transactional
	@Override
	public int doRefundRegister(RefundVO vo) {
		//결제 테이블 상태 변경
		payMapper.doPayStatus(vo.getOrder_no());
		
		return rMapper.doRefundRegister(vo);
	}

	@Override
	public int getNewRefund() {
		return rMapper.getNewRefund();
	}
	
	
}

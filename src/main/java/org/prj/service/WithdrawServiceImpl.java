package org.prj.service;

import java.util.List;

import org.prj.domain.PaymentVO;
import org.prj.domain.WithdrawVO;
import org.prj.mapper.WithdrawMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class WithdrawServiceImpl implements WithdrawService {
	
	@Autowired
	private WithdrawMapper mapper;

	// 출금 신청 리스트
	@Override
	public List<WithdrawVO> getWithList(int m_idx) {
		log.info("getWithList..." + m_idx);	
		return mapper.getList(m_idx);
	}
	
	// 출금신청
	@Override
	public int register(WithdrawVO vo) {
		log.info("register..." + vo);
		
		return mapper.insert(vo);
	}

	// p_idx를 가지고와서 판매총액을 만드는 과정	
	@Override
	public int getp_idx(String username) {
		log.info("getp_idx..." + username);
		return mapper.getp_idx(username);
	}

	// 지급 요청 금액
	@Override
	public int withamount(String username) {
		log.info("withamount..." + username);
		return mapper.withamount(username);
	}

	// 지금 금액
	@Override
	public Integer currentamount(String username) {
		log.info("currentamount...");
		return mapper.currentamount(username);
	}
	
	// 미발생 금액 리스트
	@Override
	public int unsaleslist(String username) {
		log.info("unsaleslist...");
		return mapper.unsaleslist(username);
	}
	
	
	// 미발생 판매금 업데이트
	@Override
	public int unsales(String username) {
		log.info("unsales...");
		return mapper.unsales(username);
	}

	// 관리자 화면!! 출금 관리 리스트업
	@Override
	public List<WithdrawVO> withdrawList() {
		log.info("withdrawList...");
		return mapper.withdrawList();
	}


	// 관리자 화면에서 승인 버튼 누를 경우 with_status C로 변경
	@Override
	public boolean modifyWithdraw(int w_idx) {
		log.info("modifyWithdraw..." + w_idx);
		
		int result = mapper.modifyWithdraw(w_idx);
		
		return result == 1 ? true : false;
	}

	@Override
	public int getNewWithdraw() {
		return mapper.getNewWithdraw();
	}
	
}

package org.prj.service;

import java.util.List;

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
	
	// 조회 기능 차후 진행 예정
/*	@Override
	public WithdrawVO get(int w_idx) {
		log.info("get...." + w_idx);
		return mapper.read(w_idx);
	} */

}

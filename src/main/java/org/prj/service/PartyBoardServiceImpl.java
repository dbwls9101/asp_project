package org.prj.service;

import java.util.List;

import org.prj.domain.MemberVO;
import org.prj.domain.PartyBoardVO;
import org.prj.mapper.PartyBoardMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class PartyBoardServiceImpl implements PartyBoardService{
	
	@Autowired
	private PartyBoardMapper pMapper;
	
	@Override
	public void registerParty(PartyBoardVO vo) {
		pMapper.registerParty(vo);
	}

	@Override
	public List<PartyBoardVO> getPartyList(int m_idx) {
		return pMapper.getPartyList(m_idx);
	}

	@Override
	public PartyBoardVO getParty(int p_idx) {
		return pMapper.getParty(p_idx);
	}

	@Override
	public void updateParty(PartyBoardVO vo) {
		pMapper.updateParty(vo);
	}

	@Override
	public List<PartyBoardVO> getListbycategory(int codeone) {
		return pMapper.getListbycategory(codeone);
	}
	
	@Override
	public List<PartyBoardVO> getCategoryList(PartyBoardVO vo) {
		return pMapper.getCategoryList(vo);
	}

	@Override
	public PartyBoardVO getDetailParty(int p_idx) {
		return pMapper.getDetailParty(p_idx);
	}

	@Override
	public void updateCurrNum(int p_idx) {
		pMapper.updateCurrNum(p_idx);
	}

	@Override
	public void cancleUpdateCurrNum(int p_idx) {
		pMapper.cancleUpdateCurrNum(p_idx);
	}

	@Override
	public List<MemberVO> getPaymentMemberList(int p_idx) {
		return pMapper.getPaymentMemberList(p_idx);
	}
	
}

package org.prj.service;

import java.util.List;

import org.prj.domain.Criteria;
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
	public List<PartyBoardVO> getPartyList(Criteria cri) {
		return pMapper.getPartyList(cri);
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
	public List<PartyBoardVO> getListbycategory(Criteria cri) {
		return pMapper.getListbycategory(cri);
	}
	
	@Override
	public List<PartyBoardVO> getListbycategory2(Criteria cri) {
		return pMapper.getListbycategory2(cri);
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

	@Override
	public List<PartyBoardVO> getParticipating(String id) {
		return pMapper.getParticipating(id);
	}

	@Override
	public int partyStatusUpdate() {
		return pMapper.partyStatusUpdate();
	}

	@Override
	public int getMyPartyTotal(int m_idx) {
		return pMapper.getMyPartyTotal(m_idx);
	}
	
	
}

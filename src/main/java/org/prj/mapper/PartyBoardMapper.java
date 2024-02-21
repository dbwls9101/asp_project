package org.prj.mapper;

import java.util.List;

import org.prj.domain.PartyBoardVO;

public interface PartyBoardMapper {
	public void registerParty(PartyBoardVO vo);
	public List<PartyBoardVO> getPartyList(int m_idx);
	public PartyBoardVO getParty(int p_idx);
	public void updateParty(PartyBoardVO vo);
	public List<PartyBoardVO> getListbycategory(int codeone);
	public PartyBoardVO getDetailParty(int p_idx);
	public void updateCurrNum(int p_idx);
	public void cancleUpdateCurrNum(int p_idx);
}
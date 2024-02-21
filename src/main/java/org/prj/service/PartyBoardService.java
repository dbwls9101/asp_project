package org.prj.service;

import java.util.List;

import org.prj.domain.PartyBoardVO;

public interface PartyBoardService {
	//파티 등록
	public void registerParty(PartyBoardVO vo);
	//파티 리스트
	public List<PartyBoardVO> getPartyList(int m_idx);
	//파티 수정 페이지
	public PartyBoardVO getParty(int p_idx);
	//파티 수정
	public void updateParty(PartyBoardVO vo);
	//카테고리 별 파티 리스트
	public List<PartyBoardVO> getListbycategory(int codeone);
	//게시글 상세
	public PartyBoardVO getDetailParty(int p_idx);
	//참여인원 업데이트
	public void updateCurrNum(int p_idx);
	//결제취소 참여인원 업데이트
	public void cancleUpdateCurrNum(int p_idx);
}

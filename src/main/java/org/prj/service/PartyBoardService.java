package org.prj.service;

import java.util.List;

import org.prj.domain.Criteria;
import org.prj.domain.MemberVO;
import org.prj.domain.PartyBoardVO;

public interface PartyBoardService {
	//파티 등록
	public void registerParty(PartyBoardVO vo);
	// 파티관리 - 검색 결과 count
	public int getManageSearchTotal(Criteria cri);
	// 파티관리 - 검색 결과에 대한 리스트
	public List<PartyBoardVO> getManageSearchList(Criteria cri);
	//파티 수정 페이지
	public PartyBoardVO getParty(int p_idx);
	//파티 수정
	public void updateParty(PartyBoardVO vo);
	//1차 카테고리 별 파티 리스트
	public List<PartyBoardVO> getListbycategory(Criteria cri);
	//2차 카테고리 별 파티 리스트
	public List<PartyBoardVO> getListbycategory2(Criteria cri);
	//게시글 상세
	public PartyBoardVO getDetailParty(int p_idx);
	//참여인원 업데이트
	public void updateCurrNum(int p_idx);
	//결제취소 참여인원 업데이트
	public void cancleUpdateCurrNum(int p_idx);
	//파티 결제한 파티원 닉네임 리스트
	public List<MemberVO> getPaymentMemberList(int p_idx);
	//내가 참여중인 파티
	public List<PartyBoardVO> getParticipating(String id);
	//마감된 파티 status 변경
	public int partyStatusUpdate();
	//내가 생성한 파티 개수
	public int getMyPartyTotal(int m_idx);
	// 결제 정보의 p_idx로 파티장 아이디 조회
	public String idSearch(int p_idx);
}

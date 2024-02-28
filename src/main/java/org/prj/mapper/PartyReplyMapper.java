package org.prj.mapper;

import java.util.List;

import org.prj.domain.PartyCommentVO;

public interface PartyReplyMapper {
	public int insert(PartyCommentVO vo);
	public List<PartyCommentVO> getList(int p_idx);
	public int delete(int c_idx);
}

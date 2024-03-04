package org.prj.mapper;

import java.util.List;

import org.prj.domain.PartyCommentVO;

public interface PartyReplyMapper {
	public int insert(PartyCommentVO vo);
	public List<PartyCommentVO> getList(int p_idx);
	public int delete(int c_idx);
	public List<PartyCommentVO> getReplyList(String comment_to);
	public PartyCommentVO getReply(int c_idx);
}

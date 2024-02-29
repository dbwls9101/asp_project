package org.prj.service;

import java.util.List;

import org.prj.domain.PartyCommentVO;

public interface PartyReplyService {
	public int register(PartyCommentVO vo);
	public List<PartyCommentVO> getList(int p_idx);
	public int remove(int c_idx);
}

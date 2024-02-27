package org.prj.service;

import java.util.List;

import org.prj.domain.PartyCommentVO;
import org.prj.mapper.PartyReplyMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PartyReplyServiceImpl implements PartyReplyService{
	
	@Autowired
	private PartyReplyMapper prmapper;
	
	@Override
	public int register(PartyCommentVO vo) {
		return prmapper.insert(vo);
	}

	@Override
	public List<PartyCommentVO> getList(int p_idx) {
		return prmapper.getList(p_idx);
	}
	
}

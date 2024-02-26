package org.prj.service;

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
	
}

package org.prj.service;


import java.util.List;

import org.prj.domain.FaqVO;
import org.prj.mapper.FaqMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class FaqServiceImpl implements FaqService {
	
	@Autowired
	private FaqMapper mapper;
	
	@Override
	public void register(FaqVO vo) {
		log.info("register..." + vo);
		mapper.insert(vo);	
	}
	
	@Override
	public List<FaqVO> userList(String faq_type) {
		return mapper.userList(faq_type);
	}
}

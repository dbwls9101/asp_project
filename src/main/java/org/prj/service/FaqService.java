package org.prj.service;

import java.util.List;

import org.prj.domain.FaqVO;

public interface FaqService {
	// faq 등록
	public void register(FaqVO vo);
	// faq 목록
	public List<FaqVO> userList(String faq_type);
}

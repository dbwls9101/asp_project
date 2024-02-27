package org.prj.mapper;

import java.util.List;

import org.prj.domain.FaqVO;

public interface FaqMapper {
	// faq 등록
	public void insert(FaqVO vo);
	// faq 목록
	public List<FaqVO> userList(String faq_type);
}

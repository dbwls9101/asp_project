package org.prj.service;

import java.util.List;

import org.prj.domain.CategoryVO;

public interface CategoryService {
	public List<CategoryVO> getSecondCategory(int codeone);
	
	// 2차메뉴 카테고리 표시
	public List<CategoryVO> showCategory();
	
	//전체 카테고리 리스트
	public List<CategoryVO> getAllCategory();
}

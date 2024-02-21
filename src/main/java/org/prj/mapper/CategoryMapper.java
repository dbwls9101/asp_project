package org.prj.mapper;

import java.util.List;

import org.prj.domain.CategoryVO;

public interface CategoryMapper {
	public List<CategoryVO> getSecondCategory(int codeone);
}

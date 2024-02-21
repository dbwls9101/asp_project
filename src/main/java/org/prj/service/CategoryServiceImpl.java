package org.prj.service;

import java.util.List;

import org.prj.domain.CategoryVO;
import org.prj.mapper.CategoryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class CategoryServiceImpl implements CategoryService {
	
	@Autowired
	private CategoryMapper cMapper;
	
	@Override
	public List<CategoryVO> getSecondCategory(int codeone) {
		return cMapper.getSecondCategory(codeone);
	}
}

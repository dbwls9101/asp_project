package org.prj.service;

import org.prj.domain.AlarmVO;
import org.prj.mapper.AlarmMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class AlarmServiceImpl implements AlarmService {
	@Autowired
	private AlarmMapper aMapper;

	@Override
	public int doSaveNotify(AlarmVO vo) {
		return aMapper.doSaveNotify(vo);
	}
	
}

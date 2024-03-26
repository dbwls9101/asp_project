package org.prj.controller;

import org.prj.domain.AlarmVO;
import org.prj.service.AlarmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/alarm/*")
public class AlarmController {
	@Autowired
	private AlarmService aService;
	
	@ResponseBody
	@PostMapping(value="/savenotify", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public String saveNotify(@RequestBody AlarmVO vo) {
		int result = aService.doSaveNotify(vo);
		return result > 0 ? "success" : "fail";
	}
}

package org.prj.controller;

import org.prj.domain.PartyCommentVO;
import org.prj.service.PartyReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.log4j.Log4j;

@Log4j
@RestController
@RequestMapping("/partyreply/*")
public class PartyReplyController {
	@Autowired
	private PartyReplyService prservice;
	
	@PostMapping(value="/new", consumes = "application/json", produces = MediaType.TEXT_PLAIN_VALUE)
	public String create(@RequestBody PartyCommentVO vo) {
										//JSON을 자바 객체로 바꿔주는 어노테이션
		log.info("PartyCommentVO : " + vo);
		
		int insertCount = prservice.register(vo);
		
		log.info("reply insertCount : " + insertCount);
		
		return insertCount == 1 ? "insert success" : "insert fail";
	}
}

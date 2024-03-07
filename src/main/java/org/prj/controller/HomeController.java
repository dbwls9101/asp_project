package org.prj.controller;

import java.util.Locale;

import org.prj.service.PartyBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
public class HomeController {
	
	@Autowired 
	private PartyBoardService pService;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		//처음 실행 시 마감된 파티 status 변경
		int updatePartyNum = pService.partyStatusUpdate();
		log.info("updatePartyStatus..." + updatePartyNum);
		
		return "index";
	}
}

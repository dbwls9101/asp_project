package org.prj.controller;

import org.prj.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/page/*")
public class PageController {
	
	@Autowired
	private CategoryService cService;
	
	// 개인정보 처리방침 페이지
	@GetMapping("/privacy")
	public String movePrivacy() {
		log.info("movePrivacy...");
		return "/page/privacy";
	}
	
	// 서비스 이용약관 페이지
	@GetMapping("/provision")
	public String moveProvision() {
		log.info("moveProvision...");
		return "/page/provision";
	}
	
}

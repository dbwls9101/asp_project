package org.prj.controller;

import org.prj.controller.AdminController;
import org.prj.domain.FaqVO;
import org.prj.service.FaqService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/admin/*")
public class AdminController {
	
	@Autowired
	private FaqService fService;
	
	//FAQ 등록
	@GetMapping("/faq/register")
	public String moveFaqregister() {
		log.info("movefaqregister...");
		return "/faq/register";
	}
	
	@PostMapping("/faq/register")
	public String register(FaqVO vo, RedirectAttributes rttr) {
		log.info("register..." + vo);
		fService.register(vo);
		return "redirect:/";
	}
	
}

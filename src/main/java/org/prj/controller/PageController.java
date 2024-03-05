package org.prj.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.prj.domain.CategoryVO;
import org.prj.domain.MemberVO;
import org.prj.service.CategoryService;
import org.prj.service.FaqServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/page/*")
public class PageController {
	
	@Autowired
	private CategoryService cService;
	
	@Autowired
	private FaqServiceImpl fService;
	
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
	
	// faq 페이지
	@GetMapping("/faq")
	public void Faqlist(@RequestParam("i_type") String faq_type, Model model) {
		log.info("Faqlist...");
		model.addAttribute("list", fService.userList(faq_type));
	}
	
	// 2차 메뉴 표시
	@ResponseBody
	@GetMapping(value = "/submenu", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<CategoryVO> showCategory() {
		log.info("getSecondCategory...");
		return cService.showCategory();
	}

}

package org.prj.controller;

import org.prj.domain.PartyBoardVO;
import org.prj.service.PartyBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/shop/*")
public class ShopController {
	@Autowired 
	private PartyBoardService pService;
	
	//카테고리별 리스트
	@GetMapping("/list/{c1}")
	public String getList(Model model, @PathVariable("c1") int codeone) {
		log.info("getList..." + codeone);

		model.addAttribute("list", pService.getListbycategory(codeone));
		
		if(codeone == 10) {
			model.addAttribute("category", "영상");
		}else if(codeone == 20) {
			model.addAttribute("category", "도서/음악");
		}else if(codeone == 30) {
			model.addAttribute("category", "게임");
		}else {
			model.addAttribute("category", "기타");
		}
		return "/shop/list";
	}
	
	//게시글 상세정보
	@GetMapping("/get")
	public void get(Model model, @RequestParam("pn") int p_idx) {
		log.info("get..." + p_idx);
		model.addAttribute("vo", pService.getDetailParty(p_idx));
	}
}

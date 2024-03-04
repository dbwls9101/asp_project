package org.prj.controller;

import java.util.List;

import org.prj.domain.MemberVO;
import org.prj.domain.PartyBoardVO;
import org.prj.service.PartyBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

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
		
		//결제한 파티원 정보
		model.addAttribute("paymembers", getPayMemberList(p_idx));
	}
	
	//2차 카테고리별 리스트
	@GetMapping("/list/{c1}/{c2}")
	public String getCategoryList(Model model, @PathVariable("c1") int codeone, @PathVariable("c2") int codetwo) {
		PartyBoardVO vo = new PartyBoardVO();
		vo.setCodeone(codeone);
		vo.setCodetwo(codetwo);
		
		log.info("getCategoryList..." + codeone + codetwo);
		model.addAttribute("list", pService.getCategoryList(vo));
		
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
	
	//파티 결제한 파티원 닉네임 리스트
	@ResponseBody
	@PostMapping(value = "/paymemberlist", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<MemberVO> getPayMemberList(@RequestBody int p_idx) {
		log.info("getPayMemberList..." + p_idx);
		
		return pService.getPaymentMemberList(p_idx);
	}
}


package org.prj.controller;

import java.util.List;

import org.prj.controller.PartnerController;
import org.prj.domain.CategoryVO;
import org.prj.domain.PartyBoardVO;
import org.prj.domain.PaymentVO;
import org.prj.service.CategoryService;
import org.prj.service.PartyBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/partner/*")
public class PartnerController {
	
	@Autowired
	private CategoryService cService;
	
	@Autowired 
	private PartyBoardService pService;
	
	//파티관리
	@GetMapping("/manage")
	public void moveManage() {
		log.info("moveManage...");
	}
	
	//내 파티 리스트
	@ResponseBody
	@PostMapping(value = "/list", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<PartyBoardVO> getList(@RequestBody int m_idx){
		log.info("getList..." + m_idx);
		
		return pService.getPartyList(m_idx);
	}
	
	//파티생성 페이지
	@GetMapping("/register")
	public void moveRegister() {
		log.info("moveRegister...");
	}
	
	//파티생성 페이지의 카테고리
	@ResponseBody
	@PostMapping(value = "/category", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<CategoryVO> getCategory(@RequestBody int codeone) {
		log.info("getSecondCategory..." + codeone);
		
		return cService.getSecondCategory(codeone);
	}
	
	//파티생성
	@PostMapping("/register")
	public String makeParty(PartyBoardVO vo) {
		log.info("makeParty..." + vo);
		
		pService.registerParty(vo);
		
		return "redirect:/partner/manage";
	}
	
	//파티수정 페이지
	@GetMapping("/modify")
	public void moveModify(@RequestParam("pn") int p_idx, Model model){
		log.info("moveModify..." + p_idx);
		model.addAttribute("vo", pService.getParty(p_idx));
	}
	
	//파티 수정
	@PostMapping("/modify")
	public String modifyParty(PartyBoardVO vo) {
		log.info("modifyParty..." + vo);
		pService.updateParty(vo);
		return "redirect:/partner/manage";
	}
	
	//참여정보
	@GetMapping("/partyinfo")
	public String movePartyinfo() {
		log.info("movePartyinfo...");
		return "/partner/partyinfo";
	}
	
	/*
	 * @ResponseBody
	 * 
	 * @PostMapping(value = "/partyinfo", produces =
	 * MediaType.APPLICATION_JSON_UTF8_VALUE) public ResponseEntity<List<PaymentVO>>
	 * getList(@RequestBody int m_idx) { log.info("getlist... " + m_idx); return new
	 * ResponseEntity<List<PaymentVO>>(pService.getList(m_idx), HttpStatus.OK); }
	 */
}

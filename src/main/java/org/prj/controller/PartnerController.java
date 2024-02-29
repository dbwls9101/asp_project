package org.prj.controller;

import java.util.List;

import org.prj.controller.PartnerController;
import org.prj.domain.CategoryVO;
import org.prj.domain.PartyBoardVO;
import org.prj.domain.PaymentVO;
import org.prj.domain.WithdrawVO;
import org.prj.service.CategoryService;
import org.prj.service.PartyBoardService;
import org.prj.service.WithdrawService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/partner/*")
public class PartnerController {
	
	@Autowired
	private CategoryService cService;
	
	@Autowired 
	private PartyBoardService pService;
	
	// 출금 관리
	@Autowired
	private WithdrawService wService;
	
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
	
	// ------------- 민병우 담당 부분 -----------------------
	
	//출금관리
	@GetMapping("/withdraw")
	public void movewithdraw() {
		log.info("movewithdraw...");
	}
	
	//출금관리 리스트
	@ResponseBody
	@GetMapping(value="/withList/{m_idx}", 
			produces = {
			MediaType.APPLICATION_JSON_UTF8_VALUE,
			MediaType.APPLICATION_XML_VALUE		
			})
	public ResponseEntity<List<WithdrawVO>> withList(
			@PathVariable("m_idx") int m_idx
			) {
			log.info("m_idx...." + m_idx);
		
		return new ResponseEntity<List<WithdrawVO>>(wService.getWithList(m_idx), HttpStatus.OK);
	}
	
	//출금관리 - 출금신청
	@ResponseBody
	@PostMapping(value = "/withNew",
			consumes = "application/json", 
			produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<String> makeWithdraw(@RequestBody WithdrawVO vo) {
		log.info("makeWithdraw..." + vo);
		
		int insertCount = wService.register(vo);
		
		log.info("insertCount : " + insertCount);
		
		return insertCount == 1 ?
				new ResponseEntity<String>("success", HttpStatus.OK) :
					new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);		
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

package org.prj.controller;

import java.util.List;

import org.prj.controller.AdminController;
import org.prj.domain.FaqVO;
import org.prj.domain.WithdrawVO;
import org.prj.service.FaqService;
import org.prj.service.WithdrawService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/admin/*")
public class AdminController {
	
	@Autowired
	private FaqService fService;
	
	// 출금 관리
	@Autowired
	private WithdrawService wService;
	
	//관리자홈
	@GetMapping("/home")
	public String moveHome() {
		log.info("moveHome...");
		return "/admin/home";
	}
	
	//테스트 - 삭제예정
	@GetMapping("/test")
	public String moveTest() {
		log.info("moveTest...");
		return "/admin/test";
	}

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
	
	// 환불 관리
	@GetMapping("/refund")
	public String moveRefund() {
		log.info("moveRefund...");
		return "/admin/refund";
	}
	
	// 출금 관리
	@GetMapping("/withdraw")
	public String moveWithdraw() {
		log.info("Withdraw...");
		return "/admin/withdraw";
	}
	
	//출금관리 리스트
	@ResponseBody
	@GetMapping(value="/withdrawList", produces = {MediaType.APPLICATION_JSON_UTF8_VALUE, MediaType.APPLICATION_XML_VALUE})
	public ResponseEntity<List<WithdrawVO>> withdrawList() {
		log.info("withdrawList...");
		return new ResponseEntity<List<WithdrawVO>> (wService.withdrawList(), HttpStatus.OK);
	} 
	
	//출금관리 승인, DB with_status A -> C로 변경
	@ResponseBody
	@PostMapping(value = "/modifyWithdraw", produces = MediaType.TEXT_PLAIN_VALUE)
	public String modifyWithdraw(@RequestBody int w_idx) {
	    log.info("modifyWithdraw... :" + w_idx);

	    if (wService.modifyWithdraw(w_idx)) {
	        return "success";
	    }else {
	    	return "fail";
	    }
	}
	
}

package org.prj.controller;

import java.io.IOException;
import java.util.List;

import org.prj.domain.PaymentVO;
import org.prj.service.PartyBoardService;
import org.prj.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
@RequestMapping("/payment/*")
public class PaymentController {
	
	@Autowired 
	private PartyBoardService pService;
	
	@Autowired
	private PaymentService payService;
	
	@PostMapping("/orderform")
	public void get(Model model, @RequestParam("pn") int p_idx) {
		log.info("get..." + p_idx);
		model.addAttribute("vo", pService.getDetailParty(p_idx));
	}
	
	@PostMapping(value = "/order", 
			consumes = "application/json", 
			produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<String> order(@RequestBody PaymentVO vo) throws IOException {
		log.info("PaymentVO : " + vo);
		
		String imp_uid = vo.getImp_uid();
		String token = payService.getToken();
		System.out.println("토큰 : " + token);
		vo.setToken(token);

		//결제 정보 저장
		int insertCount = payService.order(vo);
		log.info("insertCount : " + insertCount);
		
		//결제 성공 후 party_board 테이블 참여인원 +1
		if(insertCount > 0)
			pService.updateCurrNum(vo.getP_idx());
		
		int amount = payService.paymentInfo(imp_uid, token);
		System.out.println("amount : " + amount);
		
		return insertCount == 1 ? new ResponseEntity<String>("success", HttpStatus.OK) : 
			new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	//실결제
	@GetMapping("/pay")
	@ResponseBody
	public void pay(int amount, String imp_uid, String merchant_uid) {

		System.out.println("결제 성공");
		System.out.println("결제 금액 : " + amount);
		System.out.println("imp_uid : " + imp_uid);
		System.out.println("merchant_uid : " + merchant_uid);
	}
	
	// 결제 내역
	@GetMapping("/orderinquiry")
	public String moveOrderinquiry() {
		log.info("moveOrderinquiry...");
		return "/payment/orderinquiry";
	}
	
	@ResponseBody
	@PostMapping(value = "/orderinquiry", 
			produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<List<PaymentVO>> getList(@RequestBody int m_idx) {
		log.info("getlist... " + m_idx);
		return new ResponseEntity<List<PaymentVO>>(payService.orderList(m_idx), HttpStatus.OK); 
	}
	
	// 결제 상세 내역
	@GetMapping("/orderdetail")
	public String moveOrderdetail() {
		log.info("orderdetail...");
		return "/payment/orderdetail";
	}
	
	
	// 사용자 결제 취소
	@PostMapping("/cancel")
	@ResponseBody
	public ResponseEntity<String> orderCancel(@RequestBody String order_no) throws IOException {
		log.info("orderCancel : " + order_no);
		
		PaymentVO vo = payService.orderGet(order_no);
		log.info("orderGet : " + vo);
		
		String imp_uid = vo.getImp_uid();
		String token = vo.getToken();
		int amount = payService.paymentInfo(imp_uid, token);
		String reason = "사용자 취소";
		
		log.info("imp_uid : " + imp_uid + " token : " + token + " amount : " + amount + " reason : " + reason);
		payService.paymentCancel(token, imp_uid, amount, reason);
		int result = payService.cancelStatus(order_no);
		
		//결제 취소 후 party_board 테이블 참여인원 -1
		if(result > 0)
			pService.cancleUpdateCurrNum(vo.getP_idx());
		
		return result == 1 ? new ResponseEntity<String>("success", HttpStatus.OK) : 
			new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
}

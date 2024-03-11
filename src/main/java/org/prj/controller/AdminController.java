package org.prj.controller;

import java.io.IOException;
import java.util.List;

import org.prj.controller.AdminController;
import org.prj.domain.FaqVO;
import org.prj.domain.VideoVO;
import org.prj.service.FaqService;
import org.prj.service.VideoService;
import org.prj.domain.WithdrawVO;
import org.prj.service.WithdrawService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	
	@Autowired
	private VideoService vService;
 
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
	
	//추천영상
	@GetMapping("/videoList")
	public String moveVideoList() {
		log.info("moveVideoList...");
		return "/admin/videoList";
	}
	
	//추천영상 불러오기
	@ResponseBody
	@GetMapping(value = "/videoListload", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<VideoVO> videoListload() {
		log.info("videoListload...");
		List<VideoVO> list = vService.getAllVideos();
		return list;
	}
	
	//추천영상 등록
	@ResponseBody
	@GetMapping(value = "/videoSave/{channelId}/{channel}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public int videoSave(@PathVariable("channelId") String channelId, @PathVariable("channel") String channel) throws IOException {
		log.info("videoSave...");
		log.info("channelId..." + channelId);
		log.info("channel..." + channel);
		VideoVO vo = new VideoVO();
		vo.setChannel(channel);
		vo.setChannelid(channelId);
		log.info("vo..." + vo);
		return vService.videoSave(vo);
	}
	
	//추천영상 삭제
	@ResponseBody
	@GetMapping(value = "/videoDelete/{channel}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public int videoDelete(@PathVariable("channel") String channel) throws IOException {
		log.info("videoDelete...");
		log.info("channel..." + channel);
		return vService.videoDelete(channel);
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
	
	//파티 관리
	@GetMapping("party")
	public void moveParty() {
		log.info("party...");
	}
}

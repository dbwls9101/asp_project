package org.prj.controller;

import java.io.IOException;
import java.util.List;

import org.prj.controller.AdminController;
import org.prj.domain.FaqVO;
import org.prj.domain.VideoVO;
import org.prj.service.FaqService;
import org.prj.service.VideoService;
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
}

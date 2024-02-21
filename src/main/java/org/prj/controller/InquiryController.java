package org.prj.controller;

import java.util.List;

import org.prj.domain.Criteria;
import org.prj.domain.FileInfoVO;
import org.prj.domain.InquiryVO;
import org.prj.domain.PageDTO;
import org.prj.service.InquiryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
@RequestMapping("/inquiry_board/*")
public class InquiryController {
	
	@Autowired
	private InquiryService service;
	
	@GetMapping("/Inquirylist")
	public String list(Model model, Criteria cri) {		// 1:1문의 게시판 페이지 처리
		log.info("list...");
		
		if(cri.getPageNum() == 0 && cri.getAmount() == 0) {
			cri.setPageNum(1);	// 한개 페이지
			cri.setAmount(10);	// 한 페이지에 10개가 나오게
		}
		
		model.addAttribute("list", service.getList(cri));	// model.addAllAttributes 파일은 담아서 보내는 것
		
		// 1. 게시글 전체 개수를 가지고 온다.
		int total = service.getTotal();
		log.info("total..." + total);
		// 2. pageDTO 객체 list 화면으로 전달
		model.addAttribute("pageMaker", new PageDTO(cri, total));
		
		return "/inquiry_board/Inquirylist";
	}
	
	@GetMapping("/Inquiryregister") 
	public String moveRegister() {
		return "/inquiry_board/Inquiryregister";
	}

	@PostMapping("/Inquiryregister")
	public String register(InquiryVO vo, RedirectAttributes rttr) {
		log.info("register..." + vo);
		service.register(vo);
		
		if (vo.getAttachList() != null) {
			vo.getAttachList().forEach(attach -> log.info(attach));
		}
		rttr.addFlashAttribute("result", "success");
		return "redirect:/inquiry_board/Inquirylist";
	}
	
	@GetMapping("/Inquiryget")
	public String get(Model model, @RequestParam("i_idx") int i_idx) {
		log.info("get..." + i_idx);
		model.addAttribute("vo", service.get(i_idx));
		return "/inquiry_board/Inquiryget";
	}
	
	// 내용 수정
	@GetMapping("/Inquirymodify")
	public String moveModify(Model model, @RequestParam("i_idx") int i_idx) {
		log.info("get..." + i_idx);
		model.addAttribute("vo", service.get(i_idx));
		return "/inquiry_board/Inquirymodify";
	}
	
	@PostMapping("/Inquirymodify")
	public String modify(InquiryVO vo, RedirectAttributes rttr) {
		log.info("modify..." + vo);
		
		if(service.modify(vo)) {
			rttr.addFlashAttribute("result", "success");
		}
		
		return "redirect:/inquiry_board/Inquirylist";
	}
	
	@PostMapping("/Inquiryremove")
	public String remove(@RequestParam("i_idx") int i_idx, RedirectAttributes rttr) {
		log.info("remove...." + i_idx);
		
//		List<FileInfoVO> attachList = service.getAttachList(i_idx);
		
		if(service.remove(i_idx)) {
			rttr.addFlashAttribute("result", "success");
		}
		
		return "redirect:/inquiry_board/Inquirylist";
		
//		return "redirect:/inquiry_board/list";
	}
	
	@ResponseBody
	@GetMapping(value = "/getAttachList/{idx}",
			produces = {
			MediaType.APPLICATION_JSON_UTF8_VALUE	
			})
	public ResponseEntity<List<FileInfoVO>> getAttachList(
		@PathVariable("idx") int idx
		){
		log.info("getAttachList..." + idx);
		
		return new ResponseEntity<List<FileInfoVO>>(service.getAttachList(idx), HttpStatus.OK);
	}
	
	
	
	
	
	
	
	
	
	
}
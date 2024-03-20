package org.prj.controller;

import java.io.IOException;
import java.util.List;

import org.prj.controller.AdminController;
import org.prj.domain.CategoryVO;
import org.prj.domain.Criteria;
import org.prj.domain.FaqVO;
import org.prj.domain.PageDTO;
import org.prj.domain.PartyBoardVO;
import org.prj.domain.PaymentVO;
import org.prj.domain.VideoVO;
import org.prj.service.CategoryService;
import org.prj.service.FaqService;
import org.prj.service.InquiryService;
import org.prj.service.MemberService;
import org.prj.service.PartyBoardService;
import org.prj.service.PaymentService;
import org.prj.service.VideoService;
import org.prj.domain.WithdrawVO;
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
	
	@Autowired
	private CategoryService cService;
	
	@Autowired 
	private PartyBoardService pService;
 
	// 출금 관리
	@Autowired
	private WithdrawService wService;
	
	@Autowired
	private PaymentService payService;
	
	@Autowired
	private MemberService mService;
	
	@Autowired
	private InquiryService iService;
	
	//관리자홈
	@GetMapping("/home")
	public String moveHome() {
		log.info("moveHome...");
		return "/admin/home";
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
		return "redirect:/admin/faq/faqlist";
	}
	
	//FAQ 리스트
	@GetMapping("/faq/faqlist")
	public String moveFaqList() {
		log.info("moveFaqlist...");
		return "/faq/faqlist";
	}
	
	@ResponseBody
	@PostMapping(value="/faq/faqlist", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public PageDTO getFaqList(@RequestBody Criteria cri) {
		int total = fService.getAdminFaqTotal(cri);
		List<FaqVO> list = fService.getAdminFaqList(cri);
		
		PageDTO pageMakger = new PageDTO(cri, total, list);
		return pageMakger;
	}
	
	//FAQ 수정
	@GetMapping("/faq/modify")
	public String moveFaqModify(@RequestParam("fn") int f_idx, Model model){
		log.info("moveFaqModify..." + f_idx);
		model.addAttribute("vo", fService.getFaq(f_idx));
		return "/faq/modify";
	}
	
	@PostMapping("/faq/modify")
	public String doAdminModifyFaq(FaqVO vo) {
		log.info("doAdminModifyFaq..." + vo);
		fService.doAdminUpdateFaq(vo);
		return "redirect:/admin/faq/faqlist";
	}
	
	//FAQ 삭제
	@GetMapping("/faq/remove")
	public String doAdminRemoveFaq(@RequestParam("fn") int f_idx) {
		log.info("doAdminRemoveFaq..." + f_idx);
		fService.doAdminRemoveFaq(f_idx);
		return "redirect:/admin/faq/faqlist";
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
	public List<VideoVO> videoListload( @RequestParam("page") int page) {
		log.info("videoListload...");
		Criteria cri = new Criteria();
		List<VideoVO> list = null;
		
		cri.setPageNum(page);
		list = vService.getAllVideos(cri);
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
	@GetMapping("/party")
	public void moveParty() {
		log.info("party...");
	}
	
	//카테고리 리스트 - admin select box
	@ResponseBody
	@GetMapping(value="/allcategory", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<CategoryVO> getAllCategory(){
		return cService.getAllCategory();
	}
	
	//파티관리 리스트
	@ResponseBody
	@PostMapping(value="/party", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public PageDTO getPartyList(@RequestBody Criteria cri) {
		String codeone = cri.getCategory().substring(0,2);
		String codetwo = cri.getCategory().substring(2);

		if(cri.getCategory().length() > 2) {
			if(!cri.getCategory().equals("all")) {
				cri.setCodeone(Integer.valueOf(codeone));
				cri.setCodetwo(Integer.valueOf(codetwo));
			}
		}else if(cri.getCategory().length() == 2) {
			cri.setCodeone(Integer.valueOf(codeone));
		}
		
		int total = pService.getAdminPartyTotal(cri);
		List<PartyBoardVO> list = pService.getAdminPartyList(cri);
		
		PageDTO pageMakger = new PageDTO(cri, total, list);
		return pageMakger;
	}
	
	//파티 수정
	//파티수정 페이지
	@GetMapping("/partymodify")
	public void movePartyModify(@RequestParam("pn") int p_idx, Model model){
		log.info("movePartyModify..." + p_idx);
		model.addAttribute("vo", pService.getParty(p_idx));
	}
	
	//파티수정 페이지의 2차 카테고리
	@ResponseBody
	@PostMapping(value = "/category", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<CategoryVO> getCategory(@RequestBody int codeone) {
		return cService.getSecondCategory(codeone);
	}
	
	//파티 수정
	@PostMapping("/partymodify")
	public String doAdminModifyParty(PartyBoardVO vo) {
		log.info("doAdminModifyParty..." + vo);
		pService.doAdminUpdateParty(vo);
		return "redirect:/admin/party";
	}
	
	//파티 마감
	@ResponseBody
	@GetMapping(value="/partyclose", produces = MediaType.TEXT_PLAIN_VALUE)
	public String doPartyclose(@RequestParam("pn") int p_idx){
		log.info("doPartyclose..." + p_idx);
		if(pService.doPartyclose(p_idx) > 0) {
			return "success";
		}else {
			return "fail";
		}
	}
	
	//파티 재오픈
	@ResponseBody
	@GetMapping(value="/partyopen", produces = MediaType.TEXT_PLAIN_VALUE)
	public String doPartyOpen(@RequestParam("pn") int p_idx){
		log.info("doPartyOpen..." + p_idx);
		if(pService.doPartyOpen(p_idx) > 0) {
			return "success";
		}else {
			return "fail";
		}
	}
	
	//카테고리 관리
	@GetMapping("/category")
	public void moveCategory() {
		log.info("moveCategory...");
	}
	
	//카테고리 관리 - 리스트 
	@ResponseBody
	@PostMapping(value="/allsecondcategory", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<CategoryVO> getAdminCategory(@RequestBody int codeone){
		return cService.getAllSecondCategory(codeone);
	}
	
	//카테고리 중복 확인
	@ResponseBody
	@PostMapping(value="/checkcategory", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public int checkCategory(@RequestBody CategoryVO vo) {
		return cService.checkCategory(vo);
	}
	
	//카테고리 추가
	@ResponseBody
	@PostMapping(value="/addcategory", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public int addCategory(@RequestBody CategoryVO vo) {
		return cService.addCategory(vo);
	}
	
	//카테고리 활성화, 비활성화
	@ResponseBody
	@PostMapping(value="/categorystatus", produces = MediaType.TEXT_PLAIN_VALUE)
	public String changeCategoryStatus(@RequestBody CategoryVO vo) {
		return cService.changeCategoryStatus(vo) > 0 ? "success" : "fail";
	}
	
	//회원관리
	@GetMapping("/member")
	public void moveMember() {
		log.info("moveMember...");
	}
	
	//파티 생성 비율
	@ResponseBody
	@GetMapping(value="/partyratio", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<PartyBoardVO> getPartyRatio(){
		return pService.getPartyRatio();
	}
	
	//월별 이용자 결제 총액
	@ResponseBody
	@GetMapping(value="/totalpayment", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<PaymentVO> getTotalPayment(){
		return payService.getTotalPayment();
	}
	
	//총 회원 수
	@ResponseBody
	@GetMapping(value="/totaluser", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public int getTotalUser(){
		return mService.getTotalUser();
	}
	
	//연간 결제 총액
	@ResponseBody
	@GetMapping(value="/totalearning", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public int getTotalEarning(){
		return payService.getTotalEarning();
	}
	
	//새 환불신청 수
//	@ResponseBody
//	@GetMapping(value="/newrefund", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
//	public int getNewRefund(){
//		return .getNewRefund();
//	}
	
	//새 출금신청 수
	@ResponseBody
	@GetMapping(value="/newwithdraw", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public int getNewWithdraw(){
		return wService.getNewWithdraw();
	}
	
	//새 문의글 수
	@ResponseBody
	@GetMapping(value="/newinquiry", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public int getNewInquiry(){
		return iService.getNewInquiry();
	}
	
	//결제관리
	@GetMapping("/paymentdetail")
	public void movePaymentDetail() {
		log.info("movePaymentDetail...");
	}
	
	//결제관리 리스트
	@ResponseBody
	@PostMapping(value="/paymentdetail", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public PageDTO getPaymentList(@RequestBody Criteria cri) {
		log.info("getPaymentList..." + cri);
		
		int total = payService.getAdminPaymentTotal(cri);
		List<PaymentVO> list = payService.getAdminPaymentList(cri);
		
		PageDTO pageMakger = new PageDTO(cri, total, list);
		return pageMakger;
	}
}

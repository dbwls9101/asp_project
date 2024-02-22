package org.prj.controller;


import org.prj.domain.MemberVO;
import org.prj.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.extern.log4j.Log4j;

@Controller
@Log4j
@RequestMapping (value = "/member/*")
public class MemberController {	
	
	@Autowired
	private MemberService memberservice;
	@Autowired
	private PasswordEncoder pwencoder;
	//개인정보 동의 페이지 이동
	@RequestMapping(value = "joinAgree", method = RequestMethod.GET)
	public void joinAgreeGET() {
		
		log.info("개인정보 동의 페이지 진입");
		
	}
	//회원가입 페이지 이동
	@RequestMapping(value = "join", method = RequestMethod.GET)
	public void join1GET() {
		
		log.info("회원가입 페이지 진입");
		
	}		
	
// 회원가입
	@RequestMapping( value = "/join", method = RequestMethod.POST)
	public String joinPOST(MemberVO member) throws Exception{
		log.info("join 진입");
		member.setPassword(pwencoder.encode( member.getPassword() ));
		//회원가입 서비스 실행
		memberservice.memberJoin(member);
		
		log.info("join Service 성공");
		
		return "redirect:/";
	}
	//아이디 찾기 페이지 이동
	@RequestMapping(value = "find_id", method = RequestMethod.GET)
	public void find_idGET() {
		
		log.info("아이디 찾기 페이지 진입");
		
	}
	//패스워드 찾기 페이지 이동
	@RequestMapping(value = "find_pw", method = RequestMethod.GET)
	public void find_pwGET() {
		
		log.info("패스워드 찾기 페이지 진입");
		
	}	
	// 로그인 페이지 이동
/*
 * @RequestMapping(value = "login", method = RequestMethod.GET) public void
 * loginGET(HttpServletRequest request) { HttpSession session =
 * request.getSession(); session.removeAttribute("member");
 * log.info("로그인 페이지 진입"); }
 */
	
	
	// 아이디 중복 검사
	@RequestMapping(value = "/memberIdChk", method = RequestMethod.GET)
	@ResponseBody
	public String memberIdChkGET(@RequestParam("id") String id) throws Exception{
		
		log.info("memberIdChk() 진입");
		
		int result = memberservice.idCheck(id);
		
		log.info("결과값= " + result);
		
		if(result != 0) {
			return "1";	// 중복 아이디가 존재
			
		} else {
			
			return "0"; // 중복 아이디 X
		}
	}	// memberIdChkPOST() 종료
	
	// 닉네임 중복 검사
	@RequestMapping(value = "/memberNickChk", method = RequestMethod.GET)
	@ResponseBody
	public String memberNickChkGET(@RequestParam("nickname") String nickname) throws Exception{
		
		log.info("memberNickChk() 진입");
		
		int result = memberservice.nicknameCheck(nickname);
		
		log.info("결과값= " + result);
		
		if(result != 0) {
			return "1";	// 중복 닉네임 존재
			
		} else {
			
			return "0"; // 중복 닉네임 X
		}
	}	// memberNickChkGET() 종료

	// 이메일 중복 검사
	@RequestMapping(value = "/memberEmailChk", method = RequestMethod.GET)
	@ResponseBody
	public String memberEmailChkGET(@RequestParam("email") String email) throws Exception{
		
		log.info("memberEmailChk() 진입");
		
		int result = memberservice.emailCheck(email);
		
		log.info("결과값= " + result);
		
		if(result != 0) {
			return "1";	// 중복 이메일 존재
			
		} else {
			
			return "0"; // 중복 이메일 X
		}
	}	// memberEmailChkGET() 종료
	
	
    //로그인 

//	  @RequestMapping(value="login", method=RequestMethod.POST) 
//	  public String loginPOST(HttpServletRequest request, MemberVO member, RedirectAttributes rttr) throws Exception{
//	  
//	  System.out.println("login 메서드 진입"); System.out.println("전달된 데이터 : " + member);
//	  
//	  HttpSession session = request.getSession();
//	  MemberVO lvo  =  memberservice.memberLogin(member);
//	  
//	  if(lvo == null) { //불일치 하는 아이디, 비밀번호(로그인 실패)
//		  int result = 0; 
//		  rttr.addFlashAttribute("result", result); 
//		  return "redirect:/member/login"; 
//	  }
//	  
//	  session.setAttribute("member", lvo); //일치하는 아이디, 비밀번호(로그인 성공)
//	  
//	  return "redirect:/"; 
//	  }
 
	// security 로그인 로그아웃
	@GetMapping("/accessError")
	public String accessDenied(Authentication auth, Model model) {
		log.info("Access Denied : " + auth);
		model.addAttribute("msg", "Access Denied");
		return "/accessError";
	}
	
	@GetMapping("/login")
	public String loginInput(String error, String logout, Model model) {
		log.info("error : " + error);
		log.info("logout : " + logout);
		
		if(error != null) {
			model.addAttribute("error", "0");
		}
		
		if(logout != null) {
			model.addAttribute("logout", "Logout!!!");
		}		
				
		return "/member/login";
	}
	
	@GetMapping("/logout")
	public String logoutGet() {
		log.info("logout");
		return "/member/logout";
	}
	
	@ResponseBody
	@GetMapping("/api/currentUser")
	public Authentication getCurrentUser() {
		return SecurityContextHolder.getContext().getAuthentication();
	}

//	// 아이디 찾기
//	@RequestMapping(value="find_id", method=RequestMethod.GET)
//	public String find_id(@RequestParam("id") String id) throws Exception{
//
//		log.info("find_id() 진입");
//		
//		MemberVO lvo  =  memberservice.memberfindId(member);
//		
//		int result = memberservice.findId(Integer.parseInt(id));
//		
//		if(result == null) { 
//			model.addAttribute("check", 1);
//		} else { 
//			model.addAttribute("check", 0);
//			model.addAttribute("id", user.getId());
//		}
//		
//		return "member/findId";
//	}	
	    
	
}
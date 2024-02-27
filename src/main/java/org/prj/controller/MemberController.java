package org.prj.controller;


import java.io.File;
import java.util.Random;

import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.prj.domain.MemberVO;
import org.prj.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.MailSender;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
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
import org.springframework.web.servlet.ModelAndView;

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
		
		//log.info("개인정보 동의 페이지 진입");
		
	}
	//회원가입 페이지 이동
	@RequestMapping(value = "join", method = RequestMethod.GET)
	public void join1GET() {
		
		//log.info("회원가입 페이지 진입");
		
	}		
	
// 회원가입
	@RequestMapping( value = "/join", method = RequestMethod.POST)
	public String joinPOST(MemberVO member) throws Exception{
		//log.info("join 진입");
		member.setPassword(pwencoder.encode( member.getPassword() ));
		//회원가입 서비스 실행
		memberservice.memberJoin(member);
		
		//log.info("join Service 성공");
		
		return "redirect:/";
	}
	//아이디 찾기 페이지 이동
	@RequestMapping(value = "find_id", method = RequestMethod.GET)
	public void find_idGET() {
		
		//log.info("아이디 찾기 페이지 진입");
		
	}
	//패스워드 찾기 페이지 이동
	@RequestMapping(value = "find_pw", method = RequestMethod.GET)
	public void find_pwGET() {
		
		//log.info("패스워드 찾기 페이지 진입");
		
	}	
		
	// 아이디 중복 검사
	@RequestMapping(value = "/memberIdChk", method = RequestMethod.GET)
	@ResponseBody
	public String memberIdChkGET(@RequestParam("id") String id) throws Exception{
		
		//log.info("memberIdChk() 진입");
		
		int result = memberservice.idCheck(id);
		
		//log.info("결과값= " + result);
		
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
		
		//log.info("memberNickChk() 진입");
		
		int result = memberservice.nicknameCheck(nickname);
		
		//log.info("결과값= " + result);
		
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
		
		//log.info("memberEmailChk() 진입");
		
		int result = memberservice.emailCheck(email);
		
		//log.info("결과값= " + result);
		
		if(result != 0) {
			return "1";	// 중복 이메일 존재
			
		} else {
			
			return "0"; // 중복 이메일 X
		}
	}	// memberEmailChkGET() 종료
	
 
	// security 로그인 로그아웃
	@GetMapping("/accessError")
	public String accessDenied(Authentication auth, Model model) {
		//log.info("Access Denied : " + auth);
		model.addAttribute("msg", "Access Denied");
		return "/accessError";
	}
	
	@GetMapping("/login")
	public String loginInput(String error, String logout, Model model) {
		//log.info("error : " + error);
		//log.info("logout : " + logout);
		
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
		//log.info("logout");
		return "/member/logout";
	}
	
	@ResponseBody
	@GetMapping("/api/currentUser")
	public Authentication getCurrentUser() {
		return SecurityContextHolder.getContext().getAuthentication();
	}

	// 아이디 찾기
	@RequestMapping(value="find_id2", method=RequestMethod.POST)
	public String find_id(@RequestParam("name") String name, @RequestParam("email") String email, Model model) throws Exception{

		//log.info("find_id() 진입");
		
		String result = memberservice.findId(name, email);
		
		if(result != null && !"".equals(result)) {
			model.addAttribute("result", "1");
			model.addAttribute("resultId", result.replaceAll("(?<=.{3}).", "*"));
		}else {
			model.addAttribute("result", "0");
		}
				
		return "/member/find_id";
	}	
	  
	// 비밀번호 찾기 (이메일 인증번호 발송)
	@Autowired
    private JavaMailSender mailSender;
	@RequestMapping(value = "/find_pw", method = RequestMethod.POST)
	public String find_pw(@RequestParam("email") String email, @RequestParam("id") String id, Model model) throws Exception{

		MemberVO vo = memberservice.findPw(email, id);
			
		if(vo != null) {
			Random r = new Random();
			int num = r.nextInt(999999); // 랜덤난수설정
		
//			session.setAttribute("email", vo.getEmail());

			String setfrom = "wjddms4969@naver.com"; // naver 
			String tomail = "wjddms4969@naver.com"; //받는사람
			String title = "[모여라] 비밀번호변경 인증 이메일 입니다"; 
			String content = System.getProperty("line.separator") + "<img src=\"http://localhost:8080/resources/images/prj_logo.png\" width=\"100px\">" + "안녕하세요 회원님" + System.getProperty("line.separator")
					+ "모여라 비밀번호찾기(변경) 인증번호는 " + num + " 입니다." + System.getProperty("line.separator"); // 

			try {
				MimeMessage message = mailSender.createMimeMessage();
				MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "utf-8");

				messageHelper.setFrom(setfrom); 
				messageHelper.setTo(tomail); 
				messageHelper.setSubject(title);
				messageHelper.setText(content, true); 
				
				mailSender.send(message);
				
			} catch (Exception e) {
				System.out.println(e.getMessage());
			}
			model.addAttribute("num", num);
			return "/member/find_auth";
		}else {
			return "/member/find_pw";
		}
	
	}

	
	
	
	
	
	
}
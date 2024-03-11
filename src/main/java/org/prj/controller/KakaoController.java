package org.prj.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;
import org.prj.domain.MemberVO;
import org.prj.security.CustomUserDetailService;
import org.prj.service.KakaoService;
import org.prj.service.MemberService;

@Controller
@Log4j
@AllArgsConstructor
public class KakaoController {
    private KakaoService kakaoService;
    private MemberService memberService;
    
    @Autowired
    private CustomUserDetailService customUserDetailService;

    @RequestMapping(value = "/kakao_callback", method = RequestMethod.GET)
    public String redirectkakao(Model model, @RequestParam String code, HttpSession session) throws IOException {
        System.out.println("code:: " + code);

        // 접속토큰 get
        String kakaoToken = kakaoService.getReturnAccessToken(code);

        // 접속자 정보 get
        Map<String, Object> result = kakaoService.getUserInfo(kakaoToken);
        log.info("result:: " + result);
        String kakaoid = (String) result.get("id");
        
        // 일치하는 snsId 없을 시 회원가입
        if (memberService.kakaoIdck(kakaoid) == 0) {
        	MemberVO memVo = new MemberVO();
        	memVo.setKakaoid(kakaoid);
        	memVo.setToken(kakaoToken);
        	session.setAttribute("joinMemVo", memVo);
            log.warn("카카오로 회원가입");
            model.addAttribute("kakao","1");
            return "redirect:/member/join";
        }else {
        	model.addAttribute("setText", "이미 존재하는 SNS 계정입니다.");
        	return "/member/registerAlert";
        }

    }
    
    @RequestMapping(value = "/kakao_login", method = RequestMethod.GET)
    public String doKakaoLogin(Model model, @RequestParam String code, HttpSession session) throws IOException {
        System.out.println("code:: " + code);
        
        // 접속토큰 get
        String kakaoToken = kakaoService.getReturnAccessToken(code);

        // 접속자 정보 get
        Map<String, Object> result = kakaoService.getUserInfo(kakaoToken);
        log.info("result:: " + result);
        // map isempty
        if(result.isEmpty()) {
        	return "redirect:/";
        }
        String kakaoid = (String) result.get("id");
        
        MemberVO membervo = memberService.kakaoRead(kakaoid);
		System.out.println(membervo);
		
		if (membervo == null){ 
			model.addAttribute("setText", "SNS계정이 존재하지 않습니다. 다시 확인해주세요.");
			return "/member/registerAlert";
		}else{
			UserDetails userDetails = customUserDetailService.loadUserByUsername(membervo.getId()); 
			Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null,userDetails.getAuthorities());
			
			// SecurityContextHolder에 Authentication 객체를 저장
			SecurityContextHolder.getContext().setAuthentication(authentication);
			
			session.setAttribute("loginType", "kakao");
			session.setAttribute("kakaoid", kakaoid);
			
			return "redirect:/"; 
		}
    }
    
    // 로그아웃
    @RequestMapping(value = "/kakao_logout", method = RequestMethod.GET)
    public String doKakaoLogout(Model model, HttpSession session) throws IOException {
        log.info("로그아웃");
        
        return "index";
    }

}
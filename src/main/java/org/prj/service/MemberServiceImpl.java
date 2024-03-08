package org.prj.service;

import org.prj.mapper.MemberMapper;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import org.prj.domain.MemberVO;
import org.prj.domain.PaymentVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@Service
public class MemberServiceImpl implements MemberService{

	@Autowired
	MemberMapper membermapper;
	
	//회원가입
	@Override
	public void memberJoin(MemberVO member) throws Exception {
		
		membermapper.memberJoin(member);
	}
	
	//아이디 중복 검사
	@Override
	public int idCheck(String id) throws Exception {

		return membermapper.idCheck(id);
	}
	
	// 닉네임 중복 검사
	@Override
	public int nicknameCheck(String nickname) throws Exception {

		return membermapper.nicknameCheck(nickname);
	}
	
	// 이메일 중복 검사
	@Override
	public int emailCheck(String email) throws Exception {

		return membermapper.emailCheck(email);
	}
	
	//아이디 찾기
	@Override
		public String findId(String name, String email) throws Exception {

			return membermapper.findId(name, email);
		}
	
	//비밀번호 찾기
	@Override
	public MemberVO findPw(String email, String id) throws Exception {
		
		return membermapper.findPw(email, id);
	}
	
	//비밀번호 변경
	@Override
	public int updatePw(MemberVO member) throws Exception {
		
		return membermapper.updatePw(member);
	}
	
	//인증된 사용자 정보 구하기
	@Override
	public HashMap<String, String> getAuthInfo(String impuid) throws IOException {
		
		HashMap<String, String> map = new HashMap<>();
		System.out.println("imp_uid: " + impuid);
		
		URL url = new URL("https://api.iamport.kr/users/getToken");
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();//url Http 연결 생성
		
		//POST 요청
		conn.setRequestMethod("POST");
		conn.setDoOutput(true);
		
		conn.setRequestProperty("Content-Type", "application/json");
		conn.setRequestProperty("Accept", "application/json");
		
		//파라미터 세팅
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
		
		JsonObject requestData = new JsonObject();
		requestData.addProperty("imp_key", "7434567018535738");
		requestData.addProperty("imp_secret", "s7BglO3YEbQ9pIWbMQhWMIr3jXFbpaCe9wYi2xthBropAbqKw8Iw0JDoacXv0dvGQAfxeOO9hDVfLT1w");
		
		bw.write(requestData.toString());
		bw.flush();
		bw.close();
		
		int responseCode = conn.getResponseCode();
		
		System.out.println("응답코드: " + responseCode);
		
		if(responseCode == 200) { //성공
			BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			
			Gson gson = new Gson();
			
			//토큰 값 불러오기
			String response = gson.fromJson(br.readLine(), Map.class).get("response").toString();
			String token = gson.fromJson(response, Map.class).get("access_token").toString();
			
			//인증된 사용자의 정보 가져오기
			String getPaymentUrl = "http://api.iamport.kr/certifications/" + impuid;
			HttpURLConnection getConn = (HttpURLConnection) new URL(getPaymentUrl).openConnection();
			getConn.setRequestMethod("GET");
			getConn.setRequestProperty("Content-Type", "application/json");
			getConn.setRequestProperty("Authorization", "Bearer " + token);
			
			int getResponseCode = getConn.getResponseCode();
			System.out.println("GET 응답코드 : " + getResponseCode);
			
			if(getResponseCode == 200) {
				BufferedReader getBr = new BufferedReader(new InputStreamReader(getConn.getInputStream()));
				StringBuilder getResponseSb = new StringBuilder();
				String getLine;
				while((getLine = getBr.readLine()) != null) {
					getResponseSb.append(getLine).append("\n");
				}
				getBr.close();
				
				String getResponse = getResponseSb.toString();
				Gson gson1 = new Gson();
				JsonObject jsonObj = gson1.fromJson(getResponse, JsonObject.class); //인증한 사용자 정보가 담긴 json 객체
				
				//이름
				String name = jsonObj.getAsJsonObject("response").get("name").getAsString();
				map.put("name", name);
				
				//전화번호
				String phone = jsonObj.getAsJsonObject("response").get("phone").getAsString();
				map.put("phone", phone);
				
				//생일
				String birth = jsonObj.getAsJsonObject("response").get("birthday").getAsString();
				map.put("birth", birth);
			}
			br.close();
		}
		
		return map;
	}

	//내정보 수정
	@Override
	public int updateMypage(MemberVO member) throws Exception {		
		return membermapper.updateMypage(member);
	}
	
	//파트너 신청
	@Override
	public int partnerApp(MemberVO member) {
		return membermapper.partnerApp(member);
	}
	
	//파트너 정보수정
	@Override
	public int partnerModify(MemberVO member) {
		return membermapper.partnerModify(member);
	}
	
	//파트너 정보조회
	@Override
	public MemberVO getPartnerinfo(int m_idx) {
		return membermapper.getPartnerinfo(m_idx);
	}

	//결재 후 member -> with_amount 금액이 증가
	@Override
	public void updateWithamount(MemberVO vo) {
		membermapper.updateWithamount(vo);
	}
	
	//카카오 회원가입
	@Override
	public int kakaoIdck(String kakaoid) {
		return membermapper.kakaoIdck(kakaoid);
	}
	
	//카카오 로그인
	@Override
	public MemberVO kakaoRead(String kakaoid) {
		return membermapper.kakaoRead(kakaoid);
	}

}

package org.prj.service;

import java.io.IOException;
import java.util.List;

import org.prj.domain.PaymentVO;

public interface PaymentService {
	// 주문
	public int order(PaymentVO vo);
	
	// 결제정보
	public List<PaymentVO> orderList(int m_idx);
	
	// 토큰 구하기
	public String getToken() throws IOException;
	
	// 토큰으로 결제정보
	public int paymentInfo(String imp_uid, String access_token) throws IOException;
	
	// 결제취소
	public void paymentCancel(String access_token, String imp_uid, int amount, String reason) throws IOException;
	
	// 결제조회
	public PaymentVO orderGet(String order_no);
	
	// 내역 결제취소 상태변경
	public int cancelStatus(String order_no);
	
}

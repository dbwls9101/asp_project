package org.prj.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PaymentVO {
	private int p_idx, m_idx, service_amount, pay_amount, point, commission, refund_amount;
	private String order_no, id, name, phone, pay_method, pay_status, note, title, imp_uid, token, approved_at;
}
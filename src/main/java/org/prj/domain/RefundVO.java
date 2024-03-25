package org.prj.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class RefundVO {
	private int order_no, m_idx, p_idx, r_idx, amount, re_amount;
	private String id, name, re_status, reason, rejection;
	private Date reg_date, refund_date;
}

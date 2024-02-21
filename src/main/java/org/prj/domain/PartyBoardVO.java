package org.prj.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PartyBoardVO {
	private int p_idx, m_idx, party_num, price, curr_party, codeone, codetwo;
	private String c_primary, c_secondary, title, name, nickname, id, share_id, share_pw, phone, rule, comment, status;
	private Date start_date, end_date;
	private String reg_date, update_date;
}

package org.prj.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Criteria {
	private int pageNum;
	private int amount;
	
	//카테고리
	private int codeone;
	private int codetwo;
}
package org.prj.service;

import java.util.List;

import org.prj.domain.Criteria;
import org.prj.domain.FileInfoVO;
import org.prj.domain.InquiryVO;
import org.prj.mapper.InquiryAttachMapper;
import org.prj.mapper.InquiryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class InquiryServiceImpl implements InquiryService {

	@Autowired
	private InquiryMapper mapper;
	
	@Autowired
	private InquiryAttachMapper AttachMapper;
	
	// 1. 1:1문의 게시판 전체 리스트
	@Override
	public List<InquiryVO> getList(Criteria cri) {    
		log.info("getList..." + cri);     
		return mapper.getList(cri);       
	}

	// 2. 페이지를 가지고 온다. 
	@Override
	public int getTotal() {
		log.info("getTotal...");
		return mapper.getTotal();
	}
	
	// 3. 게시글 등록
	@Transactional
	@Override
	public void register(InquiryVO vo) {
		log.info("register..." + vo);
		
		// 1. 테이블 게시글 등록
		mapper.insert(vo);
		
		// 2. 1번에 등록된 게시글의 번호 가져오기
		int i_idx = mapper.getIdx();
				
		// 3. 파일 업로드
		if(vo.getAttachList() != null || vo.getAttachList().size() > 0) {
			for(FileInfoVO attachVO : vo.getAttachList()) {
				attachVO.setIdx(i_idx);
				AttachMapper.insert(attachVO);
			}
		} 
	}
	
	// 4. 게시글 가지고 오기!!
	@Override
	public InquiryVO get(int i_idx) {
		log.info("get...." + i_idx);
		return mapper.read(i_idx);
	}
	
	// 5. 게시글 수정
	@Override
	public boolean modify(InquiryVO vo) {
		log.info("modify..." + vo);
		
		int result = mapper.update(vo);
		
		return result == 1 ? true : false;
	}
	
	// 6. 게시글 삭제
	@Override
	public boolean remove(int i_idx) {
//		replymapper.Alldelte(i_idx);	// 게시글 삭제하면 댓글 부분도 삭제 추후 조치	
		
		int result = mapper.delete(i_idx);
		
		return result == 1 ? true : false;
	}

	// 7. 첨부 파일 목록을 가지고 온다.
	@Override
	public List<FileInfoVO> getAttachList(int idx) {
		log.info("AttachList : " + idx);
		return AttachMapper.findByIdx(idx);
	}
	
	

	
	
	
	
	
}

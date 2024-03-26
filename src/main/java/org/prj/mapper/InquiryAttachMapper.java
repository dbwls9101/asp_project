package org.prj.mapper;

import java.util.List;

import org.prj.domain.FileInfoVO;

public interface InquiryAttachMapper {
	public void insert(FileInfoVO vo);
	public void delete(String uuid);
	public List<FileInfoVO> findByIdx(int i_idx);
	public void deleteAll(long i_idx);
}

package org.prj.mapper;

import java.util.List;

import org.prj.domain.VideoVO;

public interface VideoMapper {
	//영상 저장하기
	public void add(VideoVO video);
	
	//저장된 개수
	public int listCount(String channelId);
	
	//영상  삭제
	public int remove(String channel);
		
	//영상 불러오기
	public List<VideoVO> getAllVideos();
}

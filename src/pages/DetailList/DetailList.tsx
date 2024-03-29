import {
  Container,
  Option,
  LightCare,
  NavService,
  OriginalImage,
  ListContainer
} from '../List/style';
import React, { useState, useCallback, useEffect } from 'react';
import brightVersion from '../../assets/images/bright_version.svg';
import darkVersion from '../../assets/images/night_version.svg';
import { DetailBox, SimilarItem } from '../../components/ItemBox';
import styled from '@emotion/styled';
import alarm from '../../assets/images/alarm_table.svg';
import { imgModalAtom, lightAtom } from '../../states/jotaiStates';
import { useAtom } from 'jotai';
import { ImageModal } from './ImageModal';
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { resultDetail, resultList } from '../../apis/comparison';
import { detailAtom } from '../../states/jotaiStates';

export const DetailList = () => {
  const navigate = useNavigate();
  const [ bright, setBright ] = useAtom(lightAtom);
  const [ currentImg, setCurrentImg ] = useAtom(imgModalAtom);
  const [ index, setIndex ] = useState<number | undefined>();
  const [detail, setDetail] = useAtom(detailAtom);

  const toggleBright = () => {
    setBright(!bright);
  };

  //param값으로 index 정하기
  const params = useParams();
  useEffect(() => {
    setIndex(Number(params.id));
  }, [params.id]);

  // 데이터 중 currentIndex 불러오기
    const { data: listDetail, isLoading } = useQuery({
      queryKey: ["listDetail", index],
      queryFn: resultDetail,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: index !== undefined,
    });

    useEffect(() => {
      setDetail(listDetail);
    }, [listDetail]);

   //원본 이미지보기 모달
   const onClickToggleModal = useCallback(() => {
    setCurrentImg(!currentImg);
  }, [currentImg]);
  
  return(
    <Container>
      {
        currentImg && (
          <ImageModal onClickToggleModal={onClickToggleModal} imageURL={listDetail?.input_image}/>
        )
      }
      <Option>
        <NavService onClick={() => navigate(`/trademark`)}>상표 판단 바로가기</NavService>
      </Option>
      <ListContainer>
        <AdditionalContainer>
          <OriginalImage onClick={onClickToggleModal} >원본 이미지 보기</OriginalImage>
          {/* <DetailBox data={listDetail}/>
          <SimilarItem data={listDetail} /> */}
          <DetailBox />
          <SimilarItem />
        </AdditionalContainer>
        <AlarmContainer>
          <AlarmText>침해도는 다음과 같이 구분됩니다.</AlarmText>
          <AlarmImg src={alarm} />
        </AlarmContainer>
      </ListContainer>
    </Container>
  );
};  

const AdditionalContainer = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AlarmContainer = styled.div`
  height: auto;
  width: auto;
`;

const AlarmText = styled.div`
  color: #959595;
  text-decoration: underline;
  font-size: 15px;
`;

const AlarmImg = styled.img`
  margin-top: 9px;
`;
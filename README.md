# 여정 / 팀명 : 워라벨(Work Life Balance)
![image](https://github.com/2024-SW-LangIntelligence/trip_repo/assets/51393469/a2e9927a-8795-4534-8650-293a8483611a)



# 1. 프로젝트 개요
#### 주제 : 구글 지도 API와 코사인 유사도 기반 추천 알고리즘을 이용한 여행 정보 안내 플랫폼
1. 현재 여행 관련 애플리케이션 및 웹사이트는 여행 일정 계획, 교통편 및 숙소 예약 등의 기능을 제공하고 있으나, 여행자가 필히 인지해야 하는 안전 정보 제공에는 한계점이 있음
2. 외교부 해외안전여행 플랫폼을 기반으로, 보다 체계적이고 가독성 높은 여행 안전 정보를 제공
3. '해외안전여행'라는 플랫폼의 문제점을 해결하여 여행 계획수립부터 현지 상황 파악 대사관 연락처 제공 등 여행 전 과정에 필요한 정보를 체계적으로 제공함으로써, 여행자의 안전한 여행을 지원

# 2. 주요기능
  ### 개발 목표
  ▪ 해외 안전 여행 정보의 체계적 제공
  ‘안전한 여행’이라는 대주제를 포함한, 여행 전 과정에 필요한 정보를 종합적으로 제공
  ### 개발 내용
##### ▪ Front-end 
- 국가별 미슐랭의 별 개수와 위치 안내
- 월별 평균 기온 안내
- 영사관 콜센터 번호 및 위치 안내
- 특정 위험 구역에 대한 정보 안내
- 자주 발병하는 감염병 안내
- 예산 정보 안내
- 여행 경보
- 미슐랭 위치 안내
- 환율 정보 안내
- 여행지 추천

##### ▪ Back-end
- node-js를 이용한 서버 구축
- oracleDB를 이용한 자료관리

##### ▪ AI
- python 
– scikit-learn 라이브러리의 코사인 유사도를 통한 추천 알고리즘 구현


# 3. 개발환경
  ![image](https://github.com/2024-SW-LangIntelligence/trip_repo/assets/51393469/8f072c57-f004-47ec-bc0e-4e4c63874e13)

# 4. 유스케이스
  ![image](https://github.com/2024-SW-LangIntelligence/trip_repo/assets/51393469/5ff0e135-68d1-4e38-abcb-227ac4d104ec)


# 5. 서비스아키텍처
  ![Uploading image.png…]()


# 6. ER 다이어그램
  ![ER 다이어그램](https://github.com/2024-SW-LangIntelligence/trip_repo/assets/51393469/86a0ce0e-9064-4dee-86bd-4272d51013db)

# 7. 웹페이지
  ![image](https://github.com/2024-SW-LangIntelligence/trip_repo/assets/51393469/639c7f79-7f0f-4bfe-99b5-68d87cba828e)
  ### 국가 정보
  ![image](https://github.com/2024-SW-LangIntelligence/trip_repo/assets/51393469/1f3d9607-2037-489e-9b28-60fa3c74bc68)
  ### 여행 경보
  ![image](https://github.com/2024-SW-LangIntelligence/trip_repo/assets/51393469/57454eff-c373-41eb-a9d4-c92ace5d200f)
  ### 예산
  ![image](https://github.com/2024-SW-LangIntelligence/trip_repo/assets/51393469/7c26eb87-573c-495b-b9d3-28b1a6ebe13c)
  ### 미쉐린
  ![image](https://github.com/2024-SW-LangIntelligence/trip_repo/assets/51393469/918dab21-99f1-466d-9037-9f94f50c68cd)
  ### 추천
  ![image](https://github.com/2024-SW-LangIntelligence/trip_repo/assets/51393469/ae6c7408-a1b3-4645-8d2c-3c685f1e9ac7)
  ![image](https://github.com/2024-SW-LangIntelligence/trip_repo/assets/51393469/2da1587c-1e84-4b72-b676-1b1c481d7046)

# 8. 팀원 단위 업무분담

  ![image](https://github.com/2024-SW-LangIntelligence/trip_repo/assets/51393469/c37c8a2e-d068-497a-9d33-56c031daf79c)

# 9. 시연영상



# 10. 참고문헌
데이터 수집 방법 : 크롤링, 공공 data, Open API, UNWTO, UNODC <br>
환율 정보 기능 -> 한국수출입은행 Open API 사용 <br>
국가 정보 -> 외교부 API 사용 <br>
감염병 및 주의 사항 -> 해외 감염병 now 크롤링 <br>
한국 관광 데이터 랩 : https://datalab.visitkorea.or.kr/datalab/portal/ts/getWldTursmStatsForm.do <br>
한국 수출입 은행 환율 API: https://www.data.go.kr/data/3068846/openapi.do <br>
날씨 API : https://openweathermap.org/api <br>
외교부 API : https://www.data.go.kr/data/15000830/openapi.do <br>
감염병 : http://xnnow-po7lf48dlsm0ya109f.kr/nqs/oidnow/main/index.do <br>
예산데이터 : https://hikersbay.com/?lang=ko || https://www.budgetyourtrip.com <br>
데이터 출처 : https://dataunodc.un.org/content/country-list <br>
UN 데이터  : https://www.unwto.org/tourism-statistics/tourism-statistics-database <br>
40대는 국내여행, 20대는 해외여행 갔다. (2024.04.24/매일경제) <br>
2024년, 작년보다 해외여행 더 간다 (2024.02.01/트래블데일리) <br>
국내여행비의 8배 가까운데 해외여행 가는 이유는? (2023.12.27/컨슈머인사이트) <br>
5월 해외여행 송출객 전년 동기 대비 54% 증가(2024.06.04/뉴스와이어) <br>
2023-24 국내·해외 여행소비자 행태의 변화와 전망 (2024.01.29/컨슈머인사이트) <br>
‘월간 국내·해외 여행동향 보고(2023.12.27/이달의 토픽) <br>
“3박에 무려” 제주 여행비용 얼마나 올랐길래…“차라리 해외여행 가고 만다”(2023.11.16/매일경제)<br>
해외여행지 만족도, 일본 ‘쑥’ 미국 ‘뚝’…이유는?(2023.10.23/컨슈머인사이트) <br>


  

  





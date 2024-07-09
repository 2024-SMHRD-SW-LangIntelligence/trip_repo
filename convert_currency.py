import requests
import pandas as pd
from sqlalchemy import create_engine
from datetime import datetime, timedelta
import urllib3
urllib3.disable_warnings()

def is_weekday(date):
    # 날짜가 평일인지 확인 (월요일=0, 일요일=6)
    return date.weekday() < 5

def fetch_existing_data_from_db():
    # Oracle 접속 정보
    oracle_user = 'campus_24SW_LI_p2_4'
    oracle_password = 'smhrd4'
    oracle_host = 'project-db-cgi.smhrd.com'  # 호스트 주소
    oracle_port = '1524'  # 포트 번호
    oracle_service_name = 'xe'  # 서비스 이름 또는 SID

    # SQLAlchemy 엔진 생성
    oracle_connection_string = f'oracle+cx_oracle://{oracle_user}:{oracle_password}@{oracle_host}:{oracle_port}/{oracle_service_name}'
    engine = create_engine(oracle_connection_string)

    # 기존 데이터베이스에서 데이터를 조회
    table_name = 't_currency'  # 데이터베이스 테이블 이름
    query = f"SELECT * FROM {table_name}"
    df = pd.read_sql(query, con=engine)

    return df

def fetch_exchange_data(date):
    if not is_weekday(date):
        print(f"{date} is not a weekday. Fetching existing data from database.")
        return fetch_existing_data_from_db()

    # 데이터 가져오기
    url = f"https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=3KBgM71Eun3za3GDai5a2kltMFmy2LYC&searchdate={date.strftime('%Y%m%d')}&data=AP01"
    response = requests.get(url, verify=False)
    json_data = response.json()

    # JSON 데이터를 데이터프레임으로 변환
    df = pd.DataFrame(json_data)

    # 데이터 정제
    df.drop("result", axis=1, inplace=True)
    df['cur_nm'] = df['cur_nm'].str.replace(' 디르함', '')
    df['cur_nm'] = df['cur_nm'].str.replace(' 달러', '')
    df['cur_nm'] = df['cur_nm'].str.replace(' 디나르', '')
    df['cur_nm'] = df['cur_nm'].str.replace(' 프랑', '')
    df['cur_nm'] = df['cur_nm'].str.replace('위안화', '중국')
    df['cur_nm'] = df['cur_nm'].str.replace('덴마아크 크로네', '덴마크')
    df['cur_nm'] = df['cur_nm'].str.replace(' 파운드', '')
    df['cur_nm'] = df['cur_nm'].str.replace(' 루피아', '')
    df['cur_nm'] = df['cur_nm'].str.replace(' 옌', '')
    df['cur_nm'] = df['cur_nm'].str.replace(' 원', '')
    df['cur_nm'] = df['cur_nm'].str.replace('말레이지아 링기트', '말레이시아')
    df['cur_nm'] = df['cur_nm'].str.replace(' 리알', '')
    df['cur_nm'] = df['cur_nm'].str.replace(' 링기트', '')
    df['cur_nm'] = df['cur_nm'].str.replace(' 크로나', '')
    df['cur_nm'] = df['cur_nm'].str.replace(' 바트', '')
    df['cur_nm'] = df['cur_nm'].str.replace(' 리알', '')
    df['cur_nm'] = df['cur_nm'].str.replace(' 크로네', '')
    df['cur_nm'] = df['cur_nm'].str.replace('사우디 리얄', '사우디아라비아')
    df.drop(['ttb', 'deal_bas_r', 'bkpr', 'yy_efee_r', 'ten_dd_efee_r', 'kftc_bkpr', 'kftc_deal_bas_r'], axis=1, inplace=True)
    df.rename(columns={'cur_unit': 'c_cur_unit', 'tts': 'c_exchange_rate', 'cur_nm': 'c_country'}, inplace=True)
    df.drop(df[df['c_country'].isin(['브루나이', '쿠웨이트', '사우디아라비아'])].index, inplace=True)

    # ISO 코드 매핑
    iso_mapping = {
        '아랍에미리트' : 'AE', '호주': 'AU', '바레인': 'BH', '캐나다': 'CA', '스위스': 'CH', '중국': 'CN', '덴마크': 'DK', '유럽연합': 'EU',
        '영국': 'GB', '홍콩': 'HK', '인도네시아': 'ID', '일본': 'JP', '한국': 'KR', '말레이시아': 'MY', '노르웨이': 'NO',
        '뉴질랜드': 'NZ', '스웨덴': 'SE', '싱가포르': 'SG', '태국': 'TH', '미국': 'US'
    }
    df['c_iso'] = df['c_country'].map(iso_mapping)

    # Oracle 접속 정보
    oracle_user = 'campus_24SW_LI_p2_4'
    oracle_password = 'smhrd4'
    oracle_host = 'project-db-cgi.smhrd.com'  # 호스트 주소
    oracle_port = '1524'  # 포트 번호
    oracle_service_name = 'xe'  # 서비스 이름 또는 SID

    # SQLAlchemy 엔진 생성
    oracle_connection_string = f'oracle+cx_oracle://{oracle_user}:{oracle_password}@{oracle_host}:{oracle_port}/{oracle_service_name}'
    engine = create_engine(oracle_connection_string)

    # 데이터프레임을 Oracle 데이터베이스에 저장
    table_name = 't_currency'  # 데이터베이스 테이블 이름
    df.to_sql(table_name, con=engine, if_exists='replace', index=False)

    print(f"데이터가 '{table_name}' 테이블에 성공적으로 삽입되었습니다.")
    
# 함수 호출 예시
fetch_exchange_data(datetime.now())

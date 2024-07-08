import requests
import json
import pandas as pd
from sqlalchemy import create_engine, FLOAT, TIMESTAMP, VARCHAR
import cx_Oracle

# OpenWeatherMap API 키
apiKey = "2921027c2db45fdf2c952427a8e0e199"

def get_weather_data(units='metric', lang='kr'):
    # 검색할 도시 리스트
    cities = [
        "Guatemala City", "St. George's", "Athens", "Abuja", "Amsterdam", "Kathmandu",
        "Oslo", "Wellington", "Managua", "Seoul", "Copenhagen", "Berlin", "Vientiane",
        "Riga", "Moscow", "Beirut", "Maseru", "Bucharest", "Luxembourg", "Kigali",
        "Vilnius", "Antananarivo", "Lilongwe", "Kuala Lumpur", "Bamako", "Mexico City",
        "Rabat", "Maputo", "Podgorica", "Malé", "Valletta", "Ulaanbaatar",
        "Washington, D.C.", "Naypyidaw", "Manama", "Nassau", "Dhaka", "Caracas",
        "Hanoi", "Brussels", "Minsk", "Belmopan", "Gaborone", "Sucre",
        "Ouagadougou", "Thimphu", "Sofia", "Brasília", "Dakar", "Belgrade",
        "Sri Jayawardenepura Kotte", "Stockholm", "Bern", "Madrid", "Bratislava",
        "Ljubljana", "Singapore", "Abu Dhabi", "Yerevan", "Buenos Aires", "Reykjavik",
        "Port-au-Prince", "Dublin", "Baku", "Kabul", "Tirana", "Tallinn",
        "Quito", "Addis Ababa", "London", "Muscat", "Vienna", "Tegucigalpa",
        "Amman", "Kampala", "Montevideo", "Kyiv", "Baghdad", "Tehran",
        "Jerusalem", "Cairo", "Rome", "New Delhi", "Jakarta", "Tokyo",
        "Kingston", "Lusaka", "Tbilisi", "Beijing", "Harare", "Prague",
        "Santiago", "Praia", "Astana", "Doha", "Phnom Penh", "Ottawa",
        "Nairobi", "San José", "Bogotá", "Havana", "Zagreb", "Dodoma",
        "Bangkok", "Ankara", "Panama City", "Asunción", "Islamabad", "Lima",
        "Lisbon", "Warsaw", "Paris", "Suva", "Helsinki", "Manila",
        "Budapest", "Canberra", "Hong Kong"
    ]
    
    # API로부터 데이터 가져오기
    city_list = {}
    for city in cities:
        api = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}&lang={lang}&units={units}"
        result = requests.get(api)
        result.encoding = 'utf-8'  # 인코딩 설정
        result = json.loads(result.text)
        city_list[city] = result
    
    # DataFrame 생성
    df = pd.DataFrame.from_dict(city_list, orient='index')
    
    # 'country' 값 추가
    countries = []
    for i in df['sys']:
        countries.append(i['country'])
    df['c_iso'] = countries
    
    # 필요한 열 추가 및 데이터 변환
    df['_absolute_time'] = pd.to_datetime(df['dt'], unit='s')
    df['c_longitude'] = df['coord'].apply(lambda x: x['lon'])
    df['c_latitude'] = df['coord'].apply(lambda x: x['lat'])
    df['c_weather'] = df['weather'].apply(lambda x: x[0]['description'])
    df['c_temp'] = df['main'].apply(lambda x: x['temp'])
    df['c_feels_like'] = df['main'].apply(lambda x: x['feels_like'])
    df['c_temp_min'] = df['main'].apply(lambda x: x['temp_min'])
    df['c_temp_max'] = df['main'].apply(lambda x: x['temp_max'])
    df['c_pressure'] = df['main'].apply(lambda x: x['pressure'])
    df['c_humidity'] = df['main'].apply(lambda x: x['humidity'])
    df['c_wind_speed'] = df['wind'].apply(lambda x: x['speed'])
    df['c_capital_name'] = df['name']
    
    
    # 불필요한 열 삭제
    df.drop(['coord', 'weather', 'main', 'visibility', 'wind', 'clouds', 'timezone', 'id', 'base', 'rain', 'dt', 'sys', 'cod', 'name', 'snow'], axis=1, inplace=True)
    
    df = df.reset_index()
    df.drop('c_capital_name', axis=1, inplace=True)

    df.rename(columns={"index": "c_capital_name",
                   "_absolute_time": "C_ABSOLUTE",
                   "c_longitude": "C_LONG",
                   "c_latitude": "C_LAT",
                   "c_weather": "C_WEATHER",
                   "c_temp": "C_TEMP",
                   "c_feels_like": "C_FEELS",
                   "c_temp_min": "C_MIN",
                   "c_temp_max": "C_MAX",
                   "c_pressure": "C_PRESSURE",
                   "c_humidity": "C_HUMIDITY",
                   "c_wind_speed": "C_WIND",
                   "c_iso": "C_ISO"
                  }, inplace=True)

    # Nassau의 ISO 코드를 'BS'로 변경
    df.loc[df['c_capital_name'] == 'Nassau', 'C_ISO'] = 'BS'
    df.loc[df['c_capital_name'] == 'Dublin', 'C_ISO'] = 'IE'
    df.loc[df['c_capital_name'] == 'Rome', 'C_ISO'] = 'IT'
    # 'San José' 행 삭제
    df = df.drop(df[df['c_capital_name'] == 'San José'].index)
    
    return df

def insert_weather_data_to_db():
    # Oracle 접속 정보 설정
    oracle_user = 'campus_24SW_LI_p2_4'
    oracle_password = 'smhrd4'
    oracle_host = 'project-db-cgi.smhrd.com'  # 호스트 주소
    oracle_port = '1524'  # 포트 번호
    oracle_service_name = 'xe'  # 서비스 이름 또는 SID
    
    # SQLAlchemy 엔진 생성
    oracle_connection_string = f'oracle+cx_oracle://{oracle_user}:{oracle_password}@{oracle_host}:{oracle_port}/{oracle_service_name}'
    engine = create_engine(oracle_connection_string)
    
    try:
        # 데이터베이스에 삽입 (replace 모드로)
        df = get_weather_data()
        df.to_sql('t_climate', con=engine, if_exists='replace', index=False, dtype={
            'C_ISO': VARCHAR(20),
            'C_CAPITAL_NAME': VARCHAR(200),
            'C_ABSOLUTE': TIMESTAMP(),
            'C_LONG': FLOAT,
            'C_LAT': FLOAT,
            'C_WEATHER': VARCHAR(200),
            'C_TEMP': FLOAT,
            'C_FEELS': FLOAT,
            'C_MIN': FLOAT,
            'C_MAX': FLOAT,
            'C_PRESSURE': FLOAT,
            'C_HUMIDITY': FLOAT,
            'C_WIND': FLOAT,
        })
        print("데이터가 't_climate' 테이블에 성공적으로 추가되었습니다.")
    except Exception as e:
        print(f"데이터 삽입 중 오류 발생: {str(e)}")
    finally:
        engine.dispose()  # 엔진 리소스 정리

insert_weather_data_to_db()

// 기후 데이터를 가져와서 사이드바에 표시하는 함수
async function fetchClimateData() {
    try {
        const response = await fetch('/climates');
        const climateData = await response.json();
        displayClimateData(climateData);
    } catch (error) {
        console.error('기후 데이터를 가져오는 중 오류 발생:', error);
    }
}

// 특정 국가의 기후 데이터를 가져와서 처리하는 함수
async function fetchClimateDataByCountry(isoCode) {
    try {
        const response = await fetch('http://localhost:3000/climates');
        if (!response.ok) {
            throw new Error('네트워크 상태가 좋지 않습니다.');
        }
        const climateData = await response.json();

        // ISO 코드로 필터링 (대소문자 구분 없음)
        const filteredClimateData = climateData.filter(climate => climate[1].toLowerCase() === isoCode.toLowerCase());
        displayClimateData(filteredClimateData);
    } catch (error) {
        console.error('기후 데이터를 가져오는 중 오류 발생:', error);
    }
}

// 기후 데이터를 사이드바에 표시하는 함수
function displayClimateData(climateData) {
    const sidebarclimate = document.getElementById('sidebarclimate');
    sidebarclimate.innerHTML = ''; // 기존 내용을 초기화

    if (climateData.length === 0) {
        sidebarclimate.innerHTML = '<p>해당 국가의 기후데이터를 찾을 수 없습니다.</p>';
        return;
    }
    climateData.forEach(climate => {
        // Extracting data for each climate entry
        console.log('Climate Entry:', climate); // 데이터 항목 로그 추가
        const climateCity = climate[0]; // 도시
        const climateISO = climate[1]; // ISO 코드

        const climateWeather = climate[5]; // 날씨
        const climateTemp = climate[6]; // 온도
        const climateFeels = climate[7]; // 체감 온도
        const climateMinTemp = climate[8]; // 최저 온도
        const climateMaxTemp = climate[9]; // 최고 온도
        const climatePressure = climate[10]; // 기압
        const climateHumidity = climate[11]; // 습도
        const climateWind = climate[12]; // 바람

        // Creating HTML for each climate entry
        const climateItem = document.createElement('div');
        climateItem.className = 'climate-item';
        climateItem.innerHTML = `
            <h4>수도-기후</h4>
            <p>날씨: ${climateWeather}</p>
            <p>온도: ${climateTemp}</p>
            <p>체감 온도: ${climateFeels}</p>
            <p>최저 온도: ${climateMinTemp}</p>
            <p>최고 온도: ${climateMaxTemp}</p>
            <p>습도: ${climateHumidity}</p>
            <p>바람: ${climateWind}</p>
        `;
    
        // Appending the created HTML to sidebarContent
        sidebarclimate.appendChild(climateItem);
    });
}



// 페이지 로드 후 기후 데이터를 가져옴
fetchClimateData();

// 감염병 데이터를 가져와서 사이드바에 표시하는 함수
async function fetchInfectionData() {
    try {
        const response = await fetch('/infection');
        const infectionData = await response.json();
        displayInfectionData(infectionData);
    } catch (error) {
        console.error('감염병 데이터를 가져오는 중 오류 발생:', error);
    }
}

// 특정 국가의 감염병 데이터를 가져와서 처리하는 함수
async function fetchInfectionDataByCountry(isoCode) {
    try {
        const response = await fetch('http://localhost:3000/infection');
        if (!response.ok) {
            throw new Error('네트워크 상태가 좋지 않습니다.');
        }
        const infectionData = await response.json();

        // ISO 코드로 필터링 (대소문자 구분 없음)
        const filteredInfectionData = infectionData.filter(infection => infection[0].toLowerCase() === isoCode.toLowerCase());
        displayInfectionData(filteredInfectionData);
    } catch (error) {
        console.error('감염병 데이터를 가져오는 중 오류 발생:', error);
    }
}

// 감염병 데이터를 사이드바에 표시하는 함수
function displayInfectionData(infectionData) {
    const sidebarinfection = document.getElementById('sidebarinfection');
    sidebarinfection.innerHTML = ''; // 기존 내용을 초기화

    if (infectionData.length === 0) {
        sidebarinfection.innerHTML = '<p>해당 국가의 감염병 데이터를 찾을 수 없습니다.</p>';
        return;
    }

    infectionData.forEach(infection => {
        // Extracting data for each country

        const infectionDetails = infection[2]; // 감염병 상세 정보
    
        // Creating HTML for each country
        const infectionItem = document.createElement('div');
        infectionItem.className = 'infection-item';
        infectionItem.innerHTML = `
            <h4>감염병</h4>
            <p>감염증 : ${infectionDetails}</p>
        `;
    
        // Appending the created HTML to sidebarContent
        sidebarinfection.appendChild(infectionItem);
    });
}

// // GeoJson 데이터 클릭 이벤트 리스너 추가
// map.data.addListener('click', function(event) {
//     const countryISO = event.feature.getProperty('ISO'); // 여기에 ISO 코드를 사용해야 함
//     showSidebarAndZoom(countryISO);
//     document.getElementById('countryInfo').innerText = countryISO;
//     fetchInfectionDataByCountry(countryISO);
// });

// // 검색 버튼 클릭 이벤트 리스너 추가
// document.getElementById('searchButton').addEventListener('click', () => {
//     const isoCode = document.getElementById('searchInput').value;
//     showSidebarAndZoom(isoCode);
//     document.getElementById('countryInfo').innerText = isoCode;
//     fetchInfectionDataByCountry(isoCode);
// });

// 페이지 로드 후 감염병 데이터를 가져옴
fetchInfectionData();

// 위험지역 데이터를 가져와서 사이드바에 표시하는 함수
async function fetchRiskData() {
    try {
        const response = await fetch('/risk');
        const riskData = await response.json();
        displayRiskData(riskData);
    } catch (error) {
        console.error('위험지역 데이터를 가져오는 중 오류 발생:', error);
    }
}

// 특정 국가의 위험지역 데이터를 가져와서 처리하는 함수
async function fetchRiskDataByCountry(isoCode) {
    try {
        const response = await fetch('http://localhost:3000/risk');
        if (!response.ok) {
            throw new Error('네트워크 상태가 좋지 않습니다.');
        }
        const riskData = await response.json();

        // ISO 코드로 필터링 (대소문자 구분 없음)
        const filteredRiskData = riskData.filter(risk => risk[0].toLowerCase() === isoCode.toLowerCase());
        displayRiskData(filteredRiskData);
    } catch (error) {
        console.error('위험지역 데이터를 가져오는 중 오류 발생:', error);
    }
}

// 위험지역 데이터를 사이드바에 표시하는 함수
function displayRiskData(riskData) {
    const sidebarrisk = document.getElementById('sidebarrisk');
    sidebarrisk.innerHTML = ''; // 기존 내용을 초기화

    if (riskData.length === 0) {
        sidebarrisk.innerHTML = '<p>해당 국가의 위험 지역을 찾을 수 없습니다.</p>';
        return;
    }

    riskData.forEach(risk => {
        // Extracting data for each country
        const riskDetails = risk[2]; // 감염병 상세 정보

        // Skip null values
        if (riskDetails === null) return;
    
        // Creating HTML for each country
        const riskItem = document.createElement('div');
        riskItem.className = 'risk-item';
        riskItem.innerHTML = `
            <h4 class="risk-header">위험지역</h4>
            <p class="risk-details">${riskDetails}</p>
        `;

        // Appending the created HTML to sidebarContent
        sidebarrisk.appendChild(riskItem);

        // 각 h4 요소에 대해 글자 색상을 개별적으로 지정
        const riskHeader = riskItem.querySelector('.risk-header');
        riskHeader.style.color = '#eb0b0b'; // 첫 번째 h4 요소의 글자 색상 빨간색으로 설정

        const riskDetailsElement = riskItem.querySelector('.risk-details');
        riskDetailsElement.style.color = '#eb0b0b'; // 두 번째 h4 요소의 글자 색상 파란색으로 설정
    });
}

fetchRiskData();

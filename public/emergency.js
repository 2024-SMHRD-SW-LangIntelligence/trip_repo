// 긴급 상황 데이터를 가져와서 사이드바에 표시하는 함수
async function fetchEmergencyData() {
    try {
        const response = await fetch('/emergency');
        const emergencyData = await response.json();
        displayEmergencyData(emergencyData);
    } catch (error) {
        console.error('긴급 상황 데이터를 가져오는 중 오류 발생:', error);
    }
}

// 특정 국가의 긴급 상황 데이터를 가져와서 처리하는 함수
async function fetchEmergencyDataByCountry(isoCode) {
    try {
        const response = await fetch('http://localhost:3000/emergency');
        if (!response.ok) {
            throw new Error('네트워크 상태가 좋지 않습니다.');
        }
        const emergencyData = await response.json();

        // ISO 코드로 필터링 (대소문자 구분 없음)
        const filteredEmergencyData = emergencyData.filter(emergency => emergency[0].toLowerCase() === isoCode.toLowerCase());
        displayEmergencyData(filteredEmergencyData);
    } catch (error) {
        console.error('긴급 상황 데이터를 가져오는 중 오류 발생:', error);
    }
}

// 긴급 상황 데이터를 사이드바에 표시하는 함수
function displayEmergencyData(emergencyData) {
    const sidebaremergency = document.getElementById('sidebaremergency');
    sidebaremergency.innerHTML = ''; // 기존 내용을 초기화

    if (emergencyData.length === 0) {
        sidebaremergency.innerHTML = '<p>해당 국가의 긴급 상황 데이터를 찾을 수 없습니다.</p>';
        return;
    }

    emergencyData.forEach(emergency => {
        // Extracting data for each emergency

        const emergencyType = emergency[1]; // 긴급 상황 타입
        const emergencyName = emergency[2]; // 긴급 상황 이름
        const emergencyLat = emergency[3]; // 위도
        const emergencyLon = emergency[4]; // 경도
        const emergencyPhone = emergency[5]; // 전화번호

        // Creating HTML for each emergency
        const emergencyItem = document.createElement('div');
        emergencyItem.className = 'emergency-item';
        emergencyItem.innerHTML = `

            <h4> ${emergencyType}</h4>
            <p>${emergencyName}</p>

            <p>전화번호: ${emergencyPhone}</p>
        `;

        // Appending the created HTML to sidebarContent
        sidebaremergency.appendChild(emergencyItem);
    });
}



// 페이지 로드 후 긴급 상황 데이터를 가져옴
fetchEmergencyData();

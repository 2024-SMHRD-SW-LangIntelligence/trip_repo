// 비자 데이터를 가져와서 사이드바에 표시하는 함수
async function fetchVisaData() {
    try {
        const response = await fetch('/visa'); // 비자 데이터 엔드포인트
        const visaData = await response.json();
        displayVisaData(visaData);
    } catch (error) {
        console.error('비자 데이터를 가져오는 중 오류 발생:', error);
    }
}

// 특정 국가 비자 데이터를 가져와서 처리하는 함수
async function fetchVisaDataByCountry(isoCode) {
    try {
        const response = await fetch('http://localhost:3000/visa'); // 비자 데이터 엔드포인트
        if (!response.ok) {
            throw new Error('네트워크 상태가 좋지 않습니다.');
        }
        const visaData = await response.json();

        // ISO 코드로 필터링 (대소문자 구분 없음)
        const filteredVisaData = visaData.filter(visa => visa[0].toLowerCase() === isoCode.toLowerCase());
        displayVisaData(filteredVisaData);
    } catch (error) {
        console.error('비자 데이터를 가져오는 중 오류 발생:', error);
    }
}

// 비자 데이터를 사이드바에 표시하는 함수
function displayVisaData(visaData) {
    const sidebarvisa = document.getElementById('sidebarvisa');
    sidebarvisa.innerHTML = ''; // 기존 내용을 초기화

    if (visaData.length === 0) {
        sidebarvisa.innerHTML = '<p>해당 국가의 비자 데이터를 찾을 수 없습니다.</p>';
        return;
    }

    visaData.forEach(visa => {
        // Extracting data for each visa
     
        const visaDuration = visa[1] || '정보 없음'; // 체류 기간
        const visaType = visa[2] || '정보 없음'; // 비자 유형

        // Creating HTML for each visa
        const visaItem = document.createElement('div');
        visaItem.className = 'visa-item';
        visaItem.innerHTML = `
            <h4>비자</h4>
            <p>체류 기간: ${visaDuration}</p>
            <p>비자 유형: ${visaType}</p>
        `;

        // Appending the created HTML to sidebarContent
        sidebarvisa.appendChild(visaItem);
    });
}
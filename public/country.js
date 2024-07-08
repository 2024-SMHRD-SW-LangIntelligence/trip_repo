// 국가 데이터를 가져와서 사이드바에 표시하는 함수
async function fetchCountryData() {
    try {
        const response = await fetch('/countries');
        const countryData = await response.json();
        displayCountryData(countryData);
    } catch (error) {
        console.error('국가 데이터를 가져오는 중 오류 발생:', error);
    }
}

// 특정 국가 데이터를 가져와서 처리하는 함수
async function fetchCountryDataByCountry(isoCode) {
    try {
        const response = await fetch('http://localhost:3000/countries');
        if (!response.ok) {
            throw new Error('네트워크 상태가 좋지 않습니다.');
        }
        const countryData = await response.json();

        // ISO 코드로 필터링 (대소문자 구분 없음)
        const filteredCountryData = countryData.filter(country => country[0].toLowerCase() === isoCode.toLowerCase());
        displayCountryData(filteredCountryData);
    } catch (error) {
        console.error('국가 데이터를 가져오는 중 오류 발생:', error);
    }
}

// 국가 데이터를 사이드바에 표시하는 함수
function displayCountryData(countryData) {
    const sidebarcountry = document.getElementById('sidebarcountry');
    sidebarcountry.innerHTML = ''; // 기존 내용을 초기화

    if (countryData.length === 0) {
        sidebarcountry.innerHTML = '<p>해당 국가의 데이터를 찾을 수 없습니다.</p>';
        return;
    }

    countryData.forEach(country => {
        // Extracting data for each country
  
        const countryCapital = country[1]; // 수도
        const countryLanguage = country[2]; // 언어
        const countryReligion = country[3]; // 종교
    
        // Creating HTML for each country
        const countryItem = document.createElement('div');
        countryItem.className = 'country-item';
        countryItem.innerHTML = `
   
            <p>수도 : ${countryCapital}</p>
            <p>언어 : ${countryLanguage}</p>
            <p>종교 : ${countryReligion}</p>
        `;
    
        // Appending the created HTML to sidebarContent
        sidebarcountry.appendChild(countryItem);
    });
}



// 페이지 로드 후 국가 데이터를 가져옴
fetchCountryData();




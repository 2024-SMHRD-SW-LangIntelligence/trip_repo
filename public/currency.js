// Fetch currency data by country name
function fetchCurrencyDataByCountry(countryName) {
  fetch('/currencies')
    .then(response => {
      if (!response.ok) {
        throw new Error('네트워크 상태가 좋지 않습니다.');
      }
      return response.json();
    })
    .then(data => {
      console.log('서버로부터 받은 데이터:', data);
      const countryData = data.filter(item => {
        console.log('비교:', item[2].trim().toLowerCase(), countryName.trim().toLowerCase());
        return item[2].trim().toLowerCase() === countryName.trim().toLowerCase();
      }); // 선택된 국가의 데이터
      displayCurrencies(countryData);
    })
    .catch(error => {
      console.error('데이터를 가져오는 중에 오류가 발생했습니다:', error);
    });
}

// 사이드바에 통화 데이터를 표시하는 함수
function displayCurrencies(data) {
  const sidebarContent = document.getElementById('sidebarContent');
  sidebarContent.innerHTML = ''; // 기존 내용을 초기화

  if (data.length === 0) {
    sidebarContent.innerHTML = '<p>해당 국가의 통화 정보를 찾을 수 없습니다.</p>';
    return;
  }

  data.forEach(item => {
    const currencyCode = item[0]; // 통화 코드
    const currencyValue = item[1]; // 통화 값
    const countryName = item[2]; // 국가 이름
    const countryCode = item[3]; // 국가 코드

    // 유효성 검사
    if (!currencyCode || !currencyValue || !countryName || !countryCode) {
      console.warn(`Invalid data for country ${countryName}: [${currencyCode}, ${currencyValue}, ${countryCode}]`);
      return;
    }

    // 데이터 표시
    const currencyItem = document.createElement('div');
    currencyItem.className = 'currency-item';
    currencyItem.innerHTML = `
      <h3>${countryName}</h3>
      <p>Currency Code: ${currencyCode}</p>
      <p>Value: ${currencyValue}</p>
      <p>Country Code: ${countryCode}</p>
    `;
    sidebarContent.appendChild(currencyItem);
  });
}

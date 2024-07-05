// 유로존 국가 리스트
const euroZoneCountries = [
  '오스트리아', '벨기에', '핀란드', '프랑스',
  '독일', '아일랜드', '이탈리아', '룩셈부르크',
  '네덜란드', '포르투갈', '스페인',
  '그리스', '슬로베니아',
  '키프로스', '몰타',
  '슬로바키아', '에스토니아',
  '라트비아', '리투아니아', '크로아티아'
];

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

      // 유로존 국가 리스트에 포함된 경우
      if (euroZoneCountries.includes(countryName.trim())) {
        const euroData = data.filter(item => item[2].trim().toLowerCase() === '유로');
        displayCurrencies(euroData);
      } else { // 그 외 국가인 경우
        const countryData = data.filter(item => item[2].trim().toLowerCase() === countryName.trim().toLowerCase());
        displayCurrencies(countryData);
      }
    })
    .catch(error => {
      console.error('데이터를 가져오는 중에 오류가 발생했습니다:', error);
    });
}

// 국가의 통화 데이터를 표시하는 함수
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

    // 데이터 표시
    const currencyItem = document.createElement('div');
    currencyItem.className = 'currency-item';
    currencyItem.innerHTML = `
      <h3>${countryName}</h3>
      <p>Currency Code: ${currencyCode}</p>
      <p>Value: ${currencyValue}</p>
    `;
    sidebarContent.appendChild(currencyItem);
  });
}


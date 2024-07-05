// 전역 변수
let geoJsonStylesApplied = false; // 초기에는 스타일이 적용되지 않은 상태

// DOMContentLoaded 이벤트를 사용해 페이지가 완전히 로드된 후 초기화 작업을 수행
document.addEventListener('DOMContentLoaded', () => {
  const travelAlertsButton = document.querySelector('.image-button');
  travelAlertsButton.addEventListener('click', () => {
    showTravelAlerts();
  });

  // GeoJSON 데이터 로드
  map.data.loadGeoJson('World_Countries__Generalized.geojson', null, () => {
    // 초기 스타일 설정
    resetGeoJsonStyles();
  });
});

// 여행 경고를 보여주는 함수
function showTravelAlerts() {
  const travelAlerts = document.getElementById('travelAlerts');

  // 패널 열림 및 닫힘 토글
  travelAlerts.classList.toggle('show');

  // 패널이 열렸을 때
  if (travelAlerts.classList.contains('show')) {
    if (!geoJsonStylesApplied) {
      fetchRiskData(); // 데이터 가져오기 및 스타일 적용
      geoJsonStylesApplied = true; // 스타일 적용 상태로 변경
    }
  } else {
    resetGeoJsonStyles(); // 패널이 닫혔을 때 스타일 초기화
    geoJsonStylesApplied = false; // 스타일 초기화 상태로 변경
  }
}


function fetchRiskData() {
  fetch('/risk')
    .then(response => {
      if (!response.ok) {
        throw new Error('네트워크 상태가 좋지 않습니다.');
      }
      return response.json();
    })
    .then(data => {
      console.log('서버로부터 받은 데이터:', data);
      if (Array.isArray(data)) {
        // 데이터가 배열인 경우에만 처리
        displayRiskData(data);
        applyGeoJsonStyles(data);
        geoJsonStylesApplied = true; // 스타일 적용 상태로 변경
      } else {
        throw new Error('서버에서 받은 데이터 형식이 올바르지 않습니다.');
      }
    })
    .catch(error => {
      console.error('데이터를 가져오는 중에 오류가 발생했습니다:', error);
    });
}


// 여행 경보 데이터를 표시하는 함수
function displayRiskData(data) {
  const travelAlerts = document.getElementById('travelAlerts');
  
  // 기존 alert-item 삭제
  travelAlerts.innerHTML = '';

  data.forEach(item => {
    const country = item[0];
    const riskLevel = item[1];
    const details = item[2];

    const alertItem = document.createElement('div');
    alertItem.className = 'alert-item';
    alertItem.innerHTML = `<strong>${country} (위험 수준: ${riskLevel})</strong> - ${details || '추가 정보 없음'}`;
    travelAlerts.appendChild(alertItem);
  });
}

// GeoJSON 스타일 적용 함수
function applyGeoJsonStyles(data) {
  const riskLevels = {};

  // 데이터를 객체 형태로 변환
  data.forEach(item => {
    const country = item[0];
    const riskLevel = item[1];
    riskLevels[country] = riskLevel;
  });

  map.data.setStyle(feature => {
    const country = feature.getProperty('ISO'); // ISO 속성 사용 (GeoJSON에서 나라 코드로 사용되는 속성 이름)
    const riskLevel = riskLevels[country];
    let fillColor;

    switch (riskLevel) {
      case 0:
        fillColor = 'green';
        break;
      case 1:
        fillColor = 'yellow';
        break;
      case 2:
        fillColor = 'orange';
        break;
      case 3:
        fillColor = 'red';
        break;
      case 4:
        fillColor = 'black';
        break;
      default:
        fillColor = 'gray';
    }

    return {
      fillColor: fillColor,
      strokeWeight: 0.5,
      fillOpacity: 0.6
    };
  });
}

// GeoJSON 초기 스타일로 리셋하는 함수
function resetGeoJsonStyles() {
  map.data.setStyle({
    fillColor: 'gray',
    strokeWeight: 0.5,
    fillOpacity: 0
  });
}

// 여행경보 관련 변수와 함수
{
  let geoJsonStylesApplied_alert = false; // 초기에는 스타일이 적용되지 않은 상태

  // 여행경보 패널 토글 함수
  function showTravelAlerts() {
    const travelAlerts = document.getElementById('travelAlerts');

    // 패널 열림 및 닫힘 토글
    travelAlerts.classList.toggle('show');

    // 패널이 열렸을 때
    if (travelAlerts.classList.contains('show')) {
      if (!geoJsonStylesApplied_alert) {
        fetchRiskDataAndApplyStyle(); // 데이터 가져오기 및 스타일 적용
        geoJsonStylesApplied_alert = true; // 스타일 적용 상태로 변경
      }
    } else {
      resetGeoJsonStyles(); // 패널이 닫혔을 때 스타일 초기화
      geoJsonStylesApplied_alert = false; // 스타일 초기화 상태로 변경
    }
  }

  // 여행경보 데이터를 서버에서 가져오고 스타일을 적용하는 함수
  function fetchRiskDataAndApplyStyle() {
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

          applyGeoJsonStyles(data); // GeoJSON 스타일 적용 함수 호출
          geoJsonStylesApplied_alert = true; // 스타일 적용 상태로 변경
        } else {
          throw new Error('서버에서 받은 데이터 형식이 올바르지 않습니다.');
        }
      })
      .catch(error => {
        console.error('데이터를 가져오는 중에 오류가 발생했습니다:', error);
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
          fillOpacity = 0.5
          break;
        case 1:
          fillColor = 'dodgerblue';
          fillOpacity = 0.8
          break;
        case 2:
          fillColor = 'yellow';
          fillOpacity = 0.5
          break;
        case 3:
          fillColor = 'red';
          fillOpacity = 0.6
          break;
        case 4:
          fillColor = "black"
          fillOpacity = 0.5
          break;
        default :
          fillColor = "white"
          fillOpacity = 1
      }

      return {
        fillColor: fillColor,
        strokeWeight: 0.5,
        fillOpacity: fillOpacity
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

  // DOMContentLoaded 이벤트 핸들러
  document.addEventListener('DOMContentLoaded', () => {
    const travelAlertsButton = document.querySelector('.travel-alerts-button');
    travelAlertsButton.addEventListener('click', showTravelAlerts);
  });
}

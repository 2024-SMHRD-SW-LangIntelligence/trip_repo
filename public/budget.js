// 예산 관련 변수와 함수
{
  let geoJsonStylesApplied_budget = false; // 초기에는 스타일이 적용되지 않은 상태
  let costLevels = {};

  // 예산 패널 토글 함수
  function showBudgetSidebar() {
    const budgetSidebar = document.getElementById('budgetSidebar');
    budgetSidebar.style.display = budgetSidebar.style.display === 'block' ? 'none' : 'block';

    // 패널 열림 및 닫힘 토글
    budgetSidebar.classList.toggle('show');

    // 패널이 열렸을 때
    if (budgetSidebar.classList.contains('show')) {
      if (!geoJsonStylesApplied_budget) {
        fetchBudgetDataAndApplyStyle(); // 데이터 가져오기 및 스타일 적용
        geoJsonStylesApplied_budget = true; // 스타일 적용 상태로 변경
      }
    } else {
      resetGeoJsonStyles(); // 패널이 닫혔을 때 스타일 초기화
      geoJsonStylesApplied_budget = false; // 스타일 초기화 상태로 변경
    }
  }

  // 예산 데이터를 서버에서 가져오고 스타일을 적용하는 함수
  function fetchBudgetDataAndApplyStyle() {
    fetch('/budget')
      .then(response => {
        if (!response.ok) {
          throw new Error('네트워크 상태가 좋지 않습니다.');
        }
        return response.json();
      })
      .then(data => {
        console.log('서버로부터 받은 예산 데이터:', data);
        if (Array.isArray(data)) {
          applyGeoJsonStyles_budget(data); // GeoJSON 스타일 적용 함수 호출
          geoJsonStylesApplied_budget = true; // 스타일 적용 상태로 변경
        } else {
          throw new Error('서버에서 받은 데이터 형식이 올바르지 않거나 데이터가 비어 있습니다.');
        }
      })
      .catch(error => {
        console.error('데이터를 가져오는 중에 오류가 발생했습니다:', error);
      });
  }

  // GeoJSON 스타일 적용 함수
  function applyGeoJsonStyles_budget(data) {

    // 데이터를 객체 형태로 변환
    data.forEach(item => {
      const country = item[0]; // 예산 데이터의 나라 이름 필드
      const costLevel = item[2]; // 예산 데이터의 비용 수준 필드
      costLevels[country] = costLevel;
    });

    // addfeature 이벤트 리스너 추가
    map.data.setStyle(feature => {
      const country = feature.getProperty('ISO'); // ISO 속성 사용 (GeoJSON에서 나라 코드로 사용되는 속성 이름)
      const costLevel = costLevels[country];

      // 색상 설정
      let fillColor;

      switch (costLevel) {
        case 'Low':
          fillColor = 'palegreen';
          break;
        case 'Medium':
          fillColor = 'chartreuse';
          break;
        case 'High':
          fillColor = 'mediumseagreen';
          break;
        case 'Very High':
          fillColor = 'green';
          break;
        default:
          fillColor = 'white';
          fillOpacity = 0
      }

      return {
        fillColor: fillColor,
        strokeWeight: 0.5,
        fillOpacity: 0.7
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


// 예산 레전드 클릭 시 해당 가격대의 여행만 필터링하는 함수
function filterTravelByBudget(costLevel) {
  map.data.forEach(feature => {
    const country = feature.getProperty('ISO'); // GeoJSON의 국가 코드 속성 이름
    const featureCostLevel = costLevels[country]; // 국가 코드를 기반으로 예산 데이터에서 비용 수준 가져오기

    if (featureCostLevel === costLevel) {
      feature.setVisible(true); // 해당 가격대에 해당하는 여행을 보이도록 설정
    } else {
      feature.setVisible(false); // 해당 가격대가 아닌 여행은 숨기도록 설정
    }
  });
}

  // DOMContentLoaded 이벤트 핸들러
  document.addEventListener('DOMContentLoaded', () => {
    const budgetButton = document.querySelector('.budget-button');
    budgetButton.addEventListener('click', showBudgetSidebar);
  });
}
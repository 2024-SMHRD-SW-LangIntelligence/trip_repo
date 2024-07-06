
// 전역 변수
let geoJsonStylesApplied_budget = false; // 초기에는 스타일이 적용되지 않은 상태
let budgetData = []; // 예산 데이터를 저장할 배열

// DOMContentLoaded 이벤트를 사용해 페이지가 완전히 로드된 후 초기화 작업을 수행
document.addEventListener('DOMContentLoaded', () => {
  const budgetButton = document.querySelector('.image-button');
  budgetButton.addEventListener('click', () => {
    showBudgetSidebar();
  });

  // GeoJSON 데이터 로드
  map.data.loadGeoJson('World_Countries__Generalized.geojson', null, () => {
    // 초기 스타일 설정
    resetGeoJsonStyles();
  });
});

function showBudgetSidebar() {
  console.log('showBudgetSidebar 함수 호출됨');

  const budgetSidebar = document.getElementById('budgetSidebar');

  // 패널 열림 및 닫힘 토글
  budgetSidebar.classList.toggle('show');

  // 패널이 열렸을 때
  if (budgetSidebar.classList.contains('show')) {
    console.log('패널이 열렸습니다');
    if (!geoJsonStylesApplied_budget) {
      fetchBudgetData(); // 데이터 가져오기 및 스타일 적용
      geoJsonStylesApplied_budget = true; // 스타일 적용 상태로 변경
    }
  } else {
    console.log('패널이 닫혔습니다');
    resetGeoJsonStyles(); // 패널이 닫혔을 때 스타일 초기화
    geoJsonStylesApplied_budget = false; // 스타일 초기화 상태로 변경
  }
}

// 예산 데이터를 서버에서 가져오는 함수
function fetchBudgetData() {
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
        displayBudgetData(data); // 예산 데이터를 표시하는 함수 호출
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

// 예산 데이터를 표시하는 함수
function displayBudgetData(data) {
  const budgetSidebar = document.getElementById('budgetSidebar');
  budgetSidebar.innerHTML = '';

  data.forEach(item => {
    const country = item[0]; // 예산 데이터의 나라 이름 필드
    const cost = item[1]; // 예산 데이터의 비용 필드
    const costLevel = item[2]; // 예산 데이터의 비용 수준 필드

    const budgetItem = document.createElement('div');
    budgetItem.className = 'budget-item';
    budgetItem.innerHTML = `<strong>${country} (비용: ${cost})</strong> - ${costLevel || '추가 정보 없음'}`;
    budgetSidebar.appendChild(budgetItem);
  });
}

// GeoJSON 스타일 적용 함수
function applyGeoJsonStyles_budget(data) {
  const costLevels = {};

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
        fillColor = 'green';
        break;
      case 'Medium':
        fillColor = 'yellow';
        break;
      case 'High':
        fillColor = 'orange';
        break;
      case 'Very High':
        fillColor = 'red';
        break;
      default:
        fillColor = 'white';
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

// budget.js

// // 모듈 내에서 필요한 변수와 함수를 지역 스코프에서 관리
// {
//   let geoJsonStylesApplied_budget = false;
//   let budgetData = [];

//   // DOMContentLoaded 이벤트 핸들러
//   document.addEventListener('DOMContentLoaded', () => {
//     const budgetButton = document.querySelector('.image-button');
//     budgetButton.addEventListener('click', () => {
//       showBudgetSidebar();
//     });

//     // GeoJSON 데이터 로드
//     map.data.loadGeoJson('World_Countries__Generalized.geojson', null, () => {
//       // 초기 스타일 설정
//       resetGeoJsonStyles();
//     });
//   });

//   // 패널을 열고 닫는 함수
//   function showBudgetSidebar() {
//     console.log('showBudgetSidebar 함수 호출됨');
//     const budgetSidebar = document.getElementById('budgetSidebar');

//     // 패널 열림 및 닫힘 토글
//     budgetSidebar.classList.toggle('show');

//     // 패널이 열렸을 때
//     if (budgetSidebar.classList.contains('show')) {
//       console.log('패널이 열렸습니다');
//       if (!geoJsonStylesApplied_budget) {
//         fetchBudgetData(); // 데이터 가져오기 및 스타일 적용
//         geoJsonStylesApplied_budget = true; // 스타일 적용 상태로 변경
//       }
//     } else {
//       console.log('패널이 닫혔습니다');
//       resetGeoJsonStyles(); // 패널이 닫혔을 때 스타일 초기화
//       geoJsonStylesApplied_budget = false; // 스타일 초기화 상태로 변경
//     }
//   }

//   // 예산 데이터를 서버에서 가져오는 함수
//   function fetchBudgetData() {
//     fetch('/budget')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('네트워크 상태가 좋지 않습니다.');
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log('서버로부터 받은 예산 데이터:', data);
//         if (Array.isArray(data)) {
//           displayBudgetData(data); // 예산 데이터를 표시하는 함수 호출
//           applyGeoJsonStyles_budget(data); // GeoJSON 스타일 적용 함수 호출
//           geoJsonStylesApplied_budget = true; // 스타일 적용 상태로 변경
//         } else {
//           throw new Error('서버에서 받은 데이터 형식이 올바르지 않거나 데이터가 비어 있습니다.');
//         }
//       })
//       .catch(error => {
//         console.error('데이터를 가져오는 중에 오류가 발생했습니다:', error);
//       });
//   }

//   // 예산 데이터를 표시하는 함수
//   function displayBudgetData(data) {
//     const budgetSidebar = document.getElementById('budgetSidebar');
//     budgetSidebar.innerHTML = '';

//     data.forEach(item => {
//       const country = item[0]; // 예산 데이터의 나라 이름 필드
//       const cost = item[1]; // 예산 데이터의 비용 필드
//       const costLevel = item[2]; // 예산 데이터의 비용 수준 필드

//       const budgetItem = document.createElement('div');
//       budgetItem.className = 'budget-item';
//       budgetItem.innerHTML = `<strong>${country} (비용: ${cost})</strong> - ${costLevel || '추가 정보 없음'}`;
//       budgetSidebar.appendChild(budgetItem);
//     });
//   }

//   // GeoJSON 스타일 적용 함수
//   function applyGeoJsonStyles_budget(data) {
//     const costLevels = {};

//     // 데이터를 객체 형태로 변환
//     data.forEach(item => {
//       const country = item[0]; // 예산 데이터의 나라 이름 필드
//       const costLevel = item[2]; // 예산 데이터의 비용 수준 필드
//       costLevels[country] = costLevel;
//     });

//     // addfeature 이벤트 리스너 추가
//     map.data.setStyle(feature => {
//       const country = feature.getProperty('ISO'); // ISO 속성 사용 (GeoJSON에서 나라 코드로 사용되는 속성 이름)
//       const costLevel = costLevels[country];

//       // 색상 설정
//       let fillColor;

//       switch (costLevel) {
//         case 'Low':
//           fillColor = 'green';
//           break;
//         case 'Medium':
//           fillColor = 'yellow';
//           break;
//         case 'High':
//           fillColor = 'orange';
//           break;
//         case 'Very High':
//           fillColor = 'red';
//           break;
//         default:
//           fillColor = 'white';
//       }

//       return {
//         fillColor: fillColor,
//         strokeWeight: 0.5,
//         fillOpacity: 0.6
//       };
//     });
//   }

//   // GeoJSON 초기 스타일로 리셋하는 함수
//   function resetGeoJsonStyles() {
//     map.data.setStyle({
//       fillColor: 'gray',
//       strokeWeight: 0.5,
//       fillOpacity: 0
//     });
//   }
// }

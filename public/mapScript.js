let map;
let geocoder;
let markers = []; // 가공한 데이터를 담을 배열

// 지도 초기화 함수
function initMap() {
  const mapOptions = {
    center: { lat: 35.5, lng: 135.0 }, // 초기 지도의 중심 좌표 설정
    zoom: 3, // 초기 줌 레벨 설정
  };

  // 지도를 생성하고 geocoder 객체를 초기화
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  geocoder = new google.maps.Geocoder();

  // GeoJson 데이터를 로드하고 스타일 설정
  map.data.loadGeoJson('World_Countries__Generalized.geojson', null, function() {
    map.data.setStyle({
      fillColor: 'gray',
      strokeWeight: 0.5,
      fillOpacity: 0
    });
  });

  // GeoJson 데이터 클릭 이벤트 리스너 추가
  map.data.addListener('click', function(event) {
    const countryName = event.feature.getProperty('나라');
    showSidebarAndZoom(countryName);
    document.getElementById('countryInfo').innerText = countryName;
  });

  // 검색 버튼 클릭 이벤트 리스너 추가
  document.getElementById('searchButton').addEventListener('click', () => {
    const address = document.getElementById('searchInput').value;
    showSidebarAndZoom(address);
  });

  // 검색 입력 필드의 Enter 키 이벤트 리스너 추가
  document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById('searchButton').click();
    }
  });
}

// 사이드바 토글 함수
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const mapElement = document.getElementById('map');
  const searchElement = document.getElementById('search');

  // 사이드바와 토글 버튼의 가시성을 토글
  sidebar.classList.toggle('visible');
  sidebarToggle.classList.toggle('visible');

  // 사이드바가 보이는 경우
  if (sidebar.classList.contains('visible')) {
    mapElement.style.left = '350px';
    searchElement.style.left = '360px';
    sidebarToggle.textContent = '닫기'; // 토글 버튼 텍스트 변경
  } else {
    // 사이드바가 보이지 않는 경우
    mapElement.style.left = '0';
    searchElement.style.left = '10px';
    sidebarToggle.textContent = '메뉴'; // 토글 버튼 텍스트 변경
  }
}

// 페이지 로드 후 사이드바를 초기에 닫도록 설정
document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.remove('visible');

  // 초기에 사이드바가 닫혀 있는 상태에서 '메뉴'로 토글 버튼 텍스트 설정
  const sidebarToggle = document.getElementById('sidebarToggle');
  sidebarToggle.textContent = '메뉴';
});


// 사이드바를 보여주고 위치로 줌인하는 함수
function showSidebarAndZoom(location) {
  geocoder.geocode({ 'address': location }, function(results, status) {
    if (status === 'OK') {
      map.setCenter(results[0].geometry.location);
      map.setZoom(5);
    } else {
      alert('지오코딩에 실패했습니다. 이유: ' + status);
    }
  });

  if (!document.getElementById('sidebar').classList.contains('visible')) {
    toggleSidebar();
  }
}

// Google Maps API 초기화 및 지도 생성
function initializeMap() {
  initMap();
}

// Google Maps API 스크립트 로드
function loadGoogleMapsScript() {
  const script = document.createElement('script');
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDAceqhgqco1E6Dw29YqfEY_hjDB4SXEwQ&callback=initializeMap'; // YOUR_API_KEY를 본인의 API 키로 대체
  script.defer = true;
  script.async = true;
  document.head.appendChild(script);
}

// 스크립트 로드 시작
loadGoogleMapsScript();

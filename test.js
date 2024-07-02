let map;
let geocoder;
let michelinMarkers = [];
let markers = [];

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
  map.data.loadGeoJson('World_Countries__Generalized_ (1).geojson', null, function() {
    map.data.setStyle({
      fillColor: 'gray',
      strokeWeight: 0,
      fillOpacity: 0
    });
  });

  // GeoJson 데이터 클릭 이벤트 리스너 추가
  map.data.addListener('click', function(event) {
    const countryName = event.feature.getProperty('name');
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

  // 사이드바 토글 버튼 클릭 이벤트 리스너 추가
  document.getElementById('sidebarToggle').addEventListener('click', () => {
    toggleSidebar();
  });

  // 미슐랭 마커 정보 초기화
  markers = [
    {
      name: 'Spondi',
      address: 'Athanasiou Diakou 18, Athina 117 43, Greece',
      starCount: '1',
      position: { lat: 37.9407, lng: 23.696 },
      icon: getMarkerIcon('1')
    },
    {
      name: 'Delta',
      address: '1030 Delta Blvd, Atlanta, GA 30354, USA',
      starCount: '2',
      position: { lat: 33.6411, lng: -84.4269 },
      icon: getMarkerIcon('2')
    },
    {
      name: '1 Star Restaurant',
      address: '1 Star Address',
      starCount: '1',
      position: { lat: 0, lng: 0 },
      icon: getMarkerIcon('1')
    },
  ];

  // 미슐랭 사이드바 클릭 이벤트 리스너 추가
  document.getElementById('michelinSidebarToggle').addEventListener('click', () => {
    toggleMichelinSidebar();
  });
}

// 사이드바 토글 함수
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const mapElement = document.getElementById('map');
  const searchElement = document.getElementById('search');

  sidebar.classList.toggle('visible');
  sidebarToggle.classList.toggle('visible');
  
  if (sidebar.classList.contains('visible')) {
    mapElement.style.left = '350px';
    searchElement.style.left = '360px';
    sidebarToggle.textContent = 'Close';
  } else {
    mapElement.style.left = '0';
    searchElement.style.left = '10px';
    sidebarToggle.textContent = 'Menu';
  }
}

// 사이드바를 보여주고 위치로 줌인하는 함수
function showSidebarAndZoom(location) {
  geocoder.geocode({ 'address': location }, function(results, status) {
    if (status === 'OK') {
      map.setCenter(results[0].geometry.location);
      map.setZoom(5);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });

  if (!document.getElementById('sidebar').classList.contains('visible')) {
    toggleSidebar();
  }
}

// 미슐랭 마커를 보여주는 함수
function showMichelinMarkers() {
  clearMarkers();
  michelinMarkers = [];

  markers.forEach(function(markerInfo) {
    const marker = new google.maps.Marker({
      position: markerInfo.position,
      map: map,
      title: markerInfo.name,
      icon: markerInfo.icon
    });

    const infowindow = new google.maps.InfoWindow({
      content: `<div><h2>${markerInfo.name}</h2><p>Address: ${markerInfo.address}</p><p>Rating: ${markerInfo.starCount} star</p></div>`
    });

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });

    michelinMarkers.push(marker);
  });

  const legend = document.getElementById('legend');
  legend.style.display = 'block';
}

// 마커를 초기화하는 함수
function clearMarkers() {
  michelinMarkers.forEach(function(marker) {
    marker.setMap(null);
  });
  michelinMarkers = [];
}

// 별점에 따라 마커를 필터링하는 함수
function filterMarkersByStar(starCount) {
  clearMarkers();

  const filteredMarkers = markers.filter(function(markerInfo) {
    return parseInt(markerInfo.starCount) === starCount;
  });

  filteredMarkers.forEach(function(markerInfo) {
    const marker = new google.maps.Marker({
      position: markerInfo.position,
      map: map,
      title: markerInfo.name,
      icon: markerInfo.icon
    });

    const infowindow = new google.maps.InfoWindow({
      content: `<div><h2>${markerInfo.name}</h2><p>Address: ${markerInfo.address}</p><p>Rating: ${markerInfo.starCount} star</p></div>`
    });

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });

    michelinMarkers.push(marker);
  });
}

// 여행 경고를 보여주는 함수
function showTravelAlerts() {
  const travelAlerts = document.getElementById('travelAlerts');
  travelAlerts.style.display = travelAlerts.style.display === 'block' ? 'none' : 'block';
}

// 예산 사이드바를 보여주는 함수
function showBudgetSidebar() {
  const budgetSidebar = document.getElementById('budgetSidebar');
  budgetSidebar.style.display = budgetSidebar.style.display === 'block' ? 'none' : 'block';
}

// 미슐랭 사이드바를 토글하는 함수
function toggleMichelinSidebar() {
  const michelinSidebar = document.getElementById('michelinSidebar');
  michelinSidebar.style.display = michelinSidebar.style.display === 'block' ? 'none' : 'block';
}

// 별점에 따라 마커 아이콘을 반환하는 함수
function getMarkerIcon(starCount) {
  let iconUrl = '';
  switch (starCount) {
    case '1':
      iconUrl = 'image/michelin_green.png';
      break;
    case '2':
      iconUrl = 'image/michelin_yellow.png';
      break;
    case '3':
      iconUrl = 'image/michelin_red.png';
      break;
    default:
      iconUrl = 'image/michelin_green.png';
      break;
  }
  return {
    url: iconUrl,
    scaledSize: new google.maps.Size(32, 32),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(16, 16)
  };
}

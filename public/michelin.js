let michelinMarkers = []; // 모든 마커들을 담을 배열
let allData = []; // 서버에서 받은 모든 데이터를 저장하는 배열

// 기존에 추가된 마커들을 제거하는 함수
function clearMarkers() {
  michelinMarkers.forEach(marker => marker.setMap(null));
  michelinMarkers = [];
}

// 데이터베이스에서 데이터를 가져와서 마커를 표시하는 함수
function fetchMichelinData() {
  const legend = document.getElementById('legend');
  legend.style.display = legend.style.display === 'block' ? 'none' : 'block';

  // 미슐랭 마커가 지도에 표시되어 있다면 제거하고 숨김
  if (legend.style.display === 'none') {
    clearMarkers();
    return; // 마커를 제거하고 함수 종료
  }

  fetch('/restaurants')
    .then(response => {
      if (!response.ok) {
        throw new Error('네트워크 상태가 좋지 않습니다.');
      }
      return response.json();
    })
    .then(data => {
      console.log('서버로부터 받은 데이터:', data);
      allData = data; // 받은 데이터를 저장

      // 데이터 가공 및 마커 표시
      data.forEach(item => {
        const lat = parseFloat(item[4]);
        const lng = parseFloat(item[5]);
        const name = item[2];
        const address = item[1];
        const starCount = parseInt(item[3]);

        if (isNaN(lat) || isNaN(lng)) {
          console.warn(`Invalid coordinates for restaurant ${name}: [${lat}, ${lng}]`);
          return;
        }

        // 마커 생성
        const marker = new google.maps.Marker({
          position: { lat: lat, lng: lng },
          map: map,
          title: name,
          icon: getMarkerIcon(starCount) // 별점에 따라 아이콘 설정
        });

        const infowindow = new google.maps.InfoWindow({
          content: `<div><h2>${name}</h2><p>주소: ${address}</p><p>별점: ${starCount} 개</p></div>`
        });

        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });

        michelinMarkers.push(marker);
        console.log(`Added marker for ${name} at [${lat}, ${lng}]`);
      });

      console.log('총', michelinMarkers.length, '개의 마커가 추가되었습니다.');
    })
    .catch(error => {
      console.error('데이터 요청 중 오류 발생:', error);
    });
}

// 별점에 따라 마커 아이콘을 반환하는 함수
function getMarkerIcon(starCount) {
  let iconUrl = '';
  switch (starCount) {
    case 1:
      iconUrl = 'image/michelin_green.png';
      break;
    case 2:
      iconUrl = 'image/michelin_yellow.png';
      break;
    case 3:
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

// 별점에 따라 마커를 필터링하는 함수
function filterMarkersByStar(starCount) {
  clearMarkers();

  const filteredData = allData.filter(item => parseInt(item[3]) === starCount);

  filteredData.forEach(item => {
    const lat = parseFloat(item[4]);
    const lng = parseFloat(item[5]);
    const name = item[2];
    const address = item[1];
    const starCount = parseInt(item[3]);

    if (isNaN(lat) || isNaN(lng)) {
      console.warn(`Invalid coordinates for restaurant ${name}: [${lat}, ${lng}]`);
      return;
    }

    // 마커 생성
    const marker = new google.maps.Marker({
      position: { lat: lat, lng: lng },
      map: map,
      title: name,
      icon: getMarkerIcon(starCount) // 별점에 따라 아이콘 설정
    });

    const infowindow = new google.maps.InfoWindow({
      content: `<div><h2>${name}</h2><p>주소: ${address}</p><p>${starCount} 성</p></div>`
    });

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });

    michelinMarkers.push(marker);
    console.log(`Added filtered marker for ${name} at [${lat}, ${lng}]`);
  });

  console.log('총', michelinMarkers.length, '개의 필터링된 마커가 추가되었습니다.');
}

// 버튼 클릭 이벤트 리스너 추가
document.getElementById('star1Button').addEventListener('click', () => filterMarkersByStar(1));
document.getElementById('star2Button').addEventListener('click', () => filterMarkersByStar(2));
document.getElementById('star3Button').addEventListener('click', () => filterMarkersByStar(3));

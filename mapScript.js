let map;
let geocoder;
let michelinMarkers = [];
let markers = [];

function initMap() {
  const mapOptions = {
    center: { lat: 35.5, lng: 135.0 },
    zoom: 3,
  };

  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  geocoder = new google.maps.Geocoder();

  map.data.loadGeoJson('World_Countries__Generalized_ (1).geojson', null, function() {
    map.data.setStyle({
      fillColor: 'gray',
      strokeWeight: 0,
      fillOpacity: 0
    });
  });

  map.data.addListener('click', function(event) {
    const countryName = event.feature.getProperty('name');
    showSidebarAndZoom(countryName);
    document.getElementById('countryInfo').innerText = countryName;
  });

  document.getElementById('searchButton').addEventListener('click', () => {
    const address = document.getElementById('searchInput').value;
    showSidebarAndZoom(address);
  });

  document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById('searchButton').click();
    }
  });

  document.getElementById('sidebarToggle').addEventListener('click', () => {
    toggleSidebar();
  });

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
}

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

function clearMarkers() {
  michelinMarkers.forEach(function(marker) {
    marker.setMap(null);
  });
  michelinMarkers = [];
}

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

function showTravelAlerts() {
  const travelAlerts = document.getElementById('travelAlerts');
  travelAlerts.style.display = travelAlerts.style.display === 'block' ? 'none' : 'block';
}

function showBudgetSidebar() {
  const budgetSidebar = document.getElementById('budgetSidebar');
  budgetSidebar.style.display = budgetSidebar.style.display === 'block' ? 'none' : 'block';
}

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

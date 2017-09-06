var map;
// Create a new blank array for all the listing markers.
var markers = [];
var locations = [{
    title: '北京芳草地',
    location: {
        lat: 39.919524,
        lng: 116.448621
    }
},
    {
        title: '北京日坛公园',
        location: {
            lat: 39.915881,
            lng: 116.443732
        }
    },
    {
        title: '北京故宫',
        location: {
            lat: 39.916345,
            lng: 116.397155
        }
    },
    {
        title: '北京国贸',
        location: {
            lat: 39.909511,
            lng: 116.458172
        }
    },
    {
        title: '天安门广场',
        location: {
            lat: 39.90549,
            lng: 116.397632
        }
    },
    {
        title: '中国国家博物馆',
        location: {
            lat: 39.905095,
            lng: 116.401583
        }
    }
];
var largeInfoWindow , defaultIcon , highlightedIcon ;


function initMap() {
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 39.90549,
            lng: 116.397632
        },
        zoom: 13
    });
    // These are the real estate listings that will be shown to the user.
    // Normally we'd have these in a database instead.

    largeInfoWindow = new google.maps.InfoWindow();
    // Style the markers a bit. This will be our listing marker icon.
     defaultIcon = makeMarkerIcon('0091ff');
    // Create a "highlighted location" marker color for when the user
    // mouses over the marker.
     highlightedIcon = makeMarkerIcon('FFFF24');

    var bounds = new google.maps.LatLngBounds();
    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {
        // Get the position from the location array.
        var position = locations[i].location;
        var title = locations[i].title;
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            icon: defaultIcon,
            // id: i
        });
        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open an infowindow at each marker.
        marker.addListener('click', function () {
            populateInfoWindow(this, largeInfoWindow);
            markerBounce(this);
        });
        // Two event listeners - one for mouseover, one for mouseout,
        // to change the colors back and forth.
        marker.addListener('mouseover', function () {
            this.setIcon(highlightedIcon);
        });
        marker.addListener('mouseout', function () {
            this.setIcon(defaultIcon);
        });
        bounds.extend(markers[i].position);
    }
    // Extend the boundaries of the map for each marker
    map.fitBounds(bounds);
}
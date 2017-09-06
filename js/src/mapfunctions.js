
/**
* @description This function populates the infoWindow when the marker is clicked.
* @constructor
* @param {object} marker - google.maps.Marker
* @param {object} infowindow - google.maps.InfoWindow
*/
function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div>' + marker.title + '</div>');
      infowindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick',function(){
        infowindow.setMarker = null;
      });
    }

}

function markerBounce(marker) {
    //toggleBounce
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

function makeMarkerIcon(markerColor) {
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21,34));
  return markerImage;
}

/**
 * @description 清除地图上的标志
 * @constructor
 * @param {object[]} markers - google.maps.Marker的列表
 * @param {object} map - google.maps.Map
 * @param {object[]} filter - marker filter 结果
 */
function filterMapMarkers(markers,map,filter) {

    for (var i = 0; i < markers.length; i++) {
        var flag = false;
        for (var j = 0; j < filter.length; j ++){
            if (filter[j].id == i) {
                flag = true;
                break;
            }
        }
        if (flag) {
            markers[i].setMap(map);
        }else{
            markers[i].setMap(null);
        }
    }
}

/**
 * @description 清除地图上的标志
 * @constructor
 * @param {object} infoWindow - google.maps.InfoWindow
 * @param {string} query - query keyword
 */
function getPlaceImage(infoWindow,query,marker) {
    /**纽约时报  */
    // var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    // url += '?' + $.param({
    //     'api-key': "47938f0c85da4f70bac2243984b5a381",
    //     'q': query,
    //     'sort': "newest"
    // });
    // $.ajax({
    //     url: url,
    //     method: 'GET',
    // }).done(function(result) {
    //     console.log(result);
    //     if (result.status === "OK" && $.type(result.response.docs[0].multimedia[0].url) === "string") {
    //         var url = "https://static01.nyt.com/"+result.response.docs[0].multimedia[0].url;
    //         infoWindow.setContent('<img src='+url+'>' );
    //         infoWindow.open(map, marker);
    //     }
    //
    // }).fail(function(err) {
    //     // throw err;
    //     infoWindow.setContent("<div>"+网络开小差了-___-+"</div>>" );
    //     infoWindow.open(map, marker);
    // });
    /**bing image search key有效期30天，过期后需要重新申请 */
    var params = {
        // Request parameters
        "q": query,
        "count": "5",
        "offset": "0",
        "mkt": "zh-cn",
        "safeSearch": "Moderate",
    };

    var placeName = '<div>'+marker.title+"</div>";
    var errorMessage = function () {
        infoWindow.setContent(placeName + '<div>获取图像失败</div>');
        infoWindow.open(map, marker);
    };

    $.ajax({
        url: "https://api.cognitive.microsoft.com/bing/v5.0/images/search?" + $.param(params),
        beforeSend: function(xhrObj){
            // Request headers key有效期30天，过期后需要重新申请
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","9e9eac512fdb41e0bb268e74fdad6fd0");
        },
        type: "GET"
        // datatype: "json"
    }).done(function(data) {
            // console.log(data)

        if ($.type(data.value) === "array" && data.value.length > 0 ) {
            var random = Math.floor(Math.random() * data.value.length-1);
            if ($.type(data.value[random]) !== 'undefined' && $.type(data.value[random].thumbnailUrl) !== 'undefined' ) {
                infoWindow.setContent(placeName+ '<img height="120em" width="200em" src='+data.value[random].thumbnailUrl+'>' );
                infoWindow.open(map, marker);
            }else {
                errorMessage();
            }
        }else{
            errorMessage();
        }
    }).fail(function() {
            //do something
        errorMessage();
    });

}
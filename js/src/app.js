
function Place(info) {
    var self = this;
    self.name = info.title;
    // self.clicked = ko.observable(false);
    self.location = info.location;
    self.id = info.id;
}

var localViewModel = function () {
    var self = this;

    self.keyword = ko.observable("");
    self.localsList = ko.observableArray();
    self.clicked = ko.observable(-1);
    //左侧菜单
    self.openLeftNav = ko.observable(false);

    self.toggleLeftNav = function() {
        self.openLeftNav(!self.openLeftNav())
    }

    self.closeLefNav = function() {
        self.openLeftNav(false);
    }

    //实时搜索
    self.search = function () {
        var keyword = self.keyword();
        console.log(keyword);
        self.makeLocalList(locations,keyword);
        filterMapMarkers(markers,map,self.localsList());

    };
    //标志跳动
    self.jumpMarker = function (place) {
        // console.log(place.clicked());
        // place.clicked(!place.clicked());
        var marker = markers[place.id];
        console.log("marker"+marker);
        populateInfoWindow(marker,largeInfoWindow);
        markerBounce(marker,markers);
        //点选菜单底色变蓝
        if (self.clicked() === place.id){
            self.clicked(-1);
        }else{
            self.clicked(place.id);
        }
        if (self.clicked() >= 0) {
            getPlaceImage(largeInfoWindow,marker.title,marker);
        }

    };
    //生成左侧列表
    self.makeLocalList = function (locations,keyword) {
        keyword = (typeof keyword !== 'undefined') ?  keyword : "";
        self.localsList([]);
        var value ;
        for (var k in locations) {
            if (locations.hasOwnProperty(k)) {
                locations[k].id = k;
                value = locations[k];
                if (keyword === '') {
                    self.localsList.push(new Place(value));
                } else if (value.title.indexOf(keyword) >= 0) {
                    self.localsList.push(new Place(value));
                }
            }
        }
    };
    //初始化列表
    self.makeLocalList(locations);

};

ko.applyBindings(new localViewModel());
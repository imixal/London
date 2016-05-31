var str = [];
var temp;
var mapDiv = document.getElementById('map');
var map = new google.maps.Map(mapDiv, {
    center: { lat: 51.5085300, lng: -0.1257400 },
    zoom: 10,
});
function add_bikestation() {

    if (str != []) {
        $("#BikePoint").empty();
        str.forEach(function (point) {
            $("#BikePoint").append('<div class="row point"><ul><li class="point-li"><p>' + point.commonName + '</p></li><li class="point-li"><button commonName="' + point.commonName + '"  lat="' + point.lat + '" lon="' + point.lon + '" class="btn btn-success">Show on the map</button></li></ul></div>')
            $(".btn").click(function () {
                var myLatlng = new google.maps.LatLng($(this).attr("lat"), $(this).attr("lon"));
                var mapOptions = {
                    zoom: 15,
                    center: myLatlng
                }
                var map = new google.maps.Map(document.getElementById("map"), mapOptions);

                var marker = new google.maps.Marker({
                    position: myLatlng,
                    title: $(this).attr("commonName")
                });
                marker.setMap(map);
            });
        });
    }
    else {
        alert("Nothing found");
    }
};
function submit_form () {
    if ($("#search").val() != "") {
        $.get("https://api.tfl.gov.uk/BikePoint/Search?query=" + $("#search").val() + "&app_id=9732f448&app_key=1f73849015902fd185214be005f00ec9", function (data) {
            if (data != []) {
                str = data;
                add_bikestation();
            }
            else{
                alert("Nothing found");
            }
        });
    }
    else {
        alert("Nothing found");
    }
   
};


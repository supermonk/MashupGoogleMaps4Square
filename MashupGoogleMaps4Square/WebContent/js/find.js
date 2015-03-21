/**
 * 
 */
var geocoder;
var map;
var markersArray = [];
function initialize() {

	var address = (document.getElementById('my-address'));
	var autocomplete = new google.maps.places.Autocomplete(address);
	autocomplete.setTypes([ 'geocode' ]);
	google.maps.event
	.addListener(
			autocomplete,
			'place_changed',
			function() {
				var place = autocomplete.getPlace();
				if (!place.geometry) {
					return;
				}

				var address = '';
				if (place.address_components) {
					address = [
					           (place.address_components[0]
					           && place.address_components[0].short_name || ''),
					           (place.address_components[1]
					           && place.address_components[1].short_name || ''),
					           (place.address_components[2]
					           && place.address_components[2].short_name || '') ]
					.join(' ');
				}
			});

	geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(37.09024, -95.712891);
	var mapOptions = {
			zoom : 4,
			center : latlng
	};
	map = new google.maps.Map(document.getElementById('map-canvas'),
			mapOptions);

}

function codeAddress() {
	geocoder = new google.maps.Geocoder();
	var address = document.getElementById("my-address").value;

	geocoder.geocode({
		'address' : address
	}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			call4Square(results[0].geometry.location.lat().toFixed(2),
					results[0].geometry.location.lng().toFixed(2));
		} else {
			alert("Geocode was not successful for the following reason: "
					+ status);
		}
	});

}


function call4Square(lat, lng) {
	var quer = document.getElementById("query").value;
	//var url = "https://api.foursquare.com/v2/venues/search";
	var url = "http://localhost:8096/Search";
	$
	.ajax(
			url,
			{
//				data : {
//					'client_id' : 'G24W5Z4BUBR1FIZHZEGHGSKGCEVR53DTYQN0IJCOYAXZBLCT',
//					'client_secret' : 'N5XQJQCYW4JGLBYVOOXLLQXWQBCCFGVN3TSGMJ21GIBB0RLM',
//					'v' : 20130815,
//					'll' : lat + ',' + lng,
//					'query' : quer
//				},
				crossDomain: true,
				data : {
					'lat' : lat,
					'lng': lng,
					'query' : quer
				},
				dataType : 'json',
				success : function(data) {
					console.log(data);
					var venues = data.response.venues;
					var bounds = new google.maps.LatLngBounds();
					var mapOptions = {
							mapTypeId : 'roadmap'
					};
					var map = new google.maps.Map(document
							.getElementById('map-canvas'),
							mapOptions);

					var image = '/MapsSample/images/pin.png';

					for (var i = 0; i < venues.length; i++) {
						var venue = venues[i];
						var position = new google.maps.LatLng(
								venue.location.lat,
								venue.location.lng);
						bounds.extend(position);
						var beachMarker = new google.maps.Marker({
							position : position,
							map : map,
							icon : image,
							title : venues[i].name,

						});
						map.fitBounds(bounds);
					}
				}
			});
}

google.maps.event.addDomListener(window, 'load', initialize);
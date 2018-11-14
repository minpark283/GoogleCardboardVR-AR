<!-- should be similar to index.html in RPI map program -->
<template>
	<div class="container" id="body">
		<div class="form-group">
			<br/>
			<div>
				<label><b>Origin</b></label>
				<select class="buildings form-control" id="start" name="start">
				</select>
			</div>
			<div>
				<label><b>Destination</b></label>
				<select class="buildings form-control" id="end" name="end">
				</select>
			</div>
			<br/>
			<div>
				<button v-on:click="vrView" class="btn btn-default" id="submitVR" value="submit"> VR View </button>
				<button v-on:click="mapView" class="btn btn-default" id="submitGoogle" value="submit2"> Google View </button>
			</div>
			<div id="map"></div>
		</div>
	</div>
</template>

<style>
	#map {
		height: 500px;
    	width: 500px;
    	margin: 0 auto;
	}
</style>

<script>
	var axios = require('axios');
	// var directions = require("../webvr/RPIVRMap/directions.js");
	import directions from "../webvr/RPIVRMap/directions.js";
	import bus from '../bus.js';

	export default {
		name: 'VR-Map',
		data: function() {
			return {
				directionsService: "",
				directionsDisplay: "",
				buildings: [],
				outdoorLocs: []
			}
		},
		created() {
			// var script = document.createElement('script');
			// script.setAttribute('src', "https://maps.googleapis.com/maps/api/js?key=AIzaSyAjiVKlrIvzWE8Tim4Zq7Sqfka4KLX1Bfg");
			// document.head.appendChild(script);	

			this.loadData(); // why is buildings not set when I try to print it?
		},
		mounted() {
			// when I load google maps here, I will need to check that google mpas
			// has loaded first
			this.directionsService = new google.maps.DirectionsService();
			this.directionsDisplay = new google.maps.DirectionsRenderer();
			var map = new google.maps.Map(document.getElementById('map'), {
				zoom: 15,
				center: {lat: 42.7285, lng: -73.677}
			});
			this.directionsDisplay.setMap(map);

			window.addEventListener('resize', this.handleResize);
		},
		methods: {
			calculateAndDisplayRoute : function(directionsService, directionsDisplay, locations, findPath) {
				//Setting up inital variables for coordinates
				var originEl = document.getElementById('start');
				var originLat = originEl.options[originEl.selectedIndex].getAttribute('lat');
				var originLng = originEl.options[originEl.selectedIndex].getAttribute('lng');
				var destEl = document.getElementById('end');
				var destLat = destEl.options[destEl.selectedIndex].getAttribute('lat');
				var destLng = destEl.options[destEl.selectedIndex].getAttribute('lng');
				var originLoc = new google.maps.LatLng(originLat, originLng);
				var destLoc = new google.maps.LatLng(destLat, destLng);
				console.log(originLoc.lat() + " " + originLoc.lng());
				console.log(destLoc.lat() + " " + destLoc.lng());
				directionsService.route({
					// I think this would be more accurate if I used coordinates
					origin: new google.maps.LatLng(originLat, originLng),
					destination: new google.maps.LatLng(destLat, destLng),
					travelMode: 'WALKING'
				}, function(response, status) {
					if (status == 'OK') {
						// response if the directions result
						for (var i = 0; i < response.routes[0].overview_path.length; ++i) {
							console.log("latitude: " + response.routes[0].overview_path[i].lat() + "  longitude: " + response.routes[0].overview_path[i].lng());
						}
						// use following line for Google View
						if (locations) { // vr
								findPath(locations, response.routes[0].overview_path);
						} else { // map
							directionsDisplay.setDirections(response);
						}
					} else {
						window.alert('Directions request failed due to ' + status);
					}
				});
			},
			vrView : function(event) {
				console.log(this.outdoorLocs);
				this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay, this.outdoorLocs, this.findPath);
			},
			mapView : function(event) {
				this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay, undefined, undefined);
			},
			handleResize : function() {
				console.log("need to change map size!");
				// change px in #map css
			},
			loadData : function() {
				var url1 = 'http://localhost:3000/query/buildings';
				axios.get(url1).then((response) => {
					this.buildings = response.data;

					this.$nextTick(() => {
						console.log("loadData: " + this.buildings.length);
						console.log(this.buildings);

						directions.appendBuildingNames(this.buildings);
					})

				}).catch((error) => {
					console.log(error);
				});

				var url2 = 'http://localhost:3000/query/outdoor-locs';
				axios.get(url2).then((response) => {
					this.outdoorLocs = response.data;

					this.$nextTick(() => {
						console.log(this.outdoorLocs);
					})

				}).catch((error) => {
					console.log(error);
				});
			},
			findPath : function(locations, path) {
				// think about making an efficient data structure?
				console.log("path length: " + path.length);
				console.log("locations length: " + locations.length);
				var images = [];
				for (var i = 0; i < path.length; ++i) {
					// find the closest location
					for (var j = 0; j < locations.length; ++j) {
						// I think coordinates of Darrin might be slightly off, showing up at weird spots in paths or not at all
						if (Math.abs(path[i].lat() - locations[j].point.lat) < 0.0002 && Math.abs(path[i].lng() - locations[j].point.long) < 0.0002) {
							if (!images.includes(locations[j])) {
								images.push(locations[j]);
							}
						}
					}
				}

				axios.post('http://localhost:3000/imageData', images).then(response => {
					console.log('success');
				})
				bus.$emit('images', images);

				// this.$router.push('/vr-path');
				this.$router.push('/src/webvr/RPIVRMap/showPath.html');
				location.reload();
			}
		}
	};
</script>
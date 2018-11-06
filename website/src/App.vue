<template>
	<div class="container-fluid">
		<!-- header, which should be at the top of every page -->
		<nav class="navbar navbar-dark navbar-expand-md sticky-top red">
			<div class="navbar-header">
				<h2><router-link to="/" class="navbar-brand">VR/AR RPI</router-link></h2>
			</div>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu" aria-controls="menu" aria-expanded="false" aria-label="toggle menu">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="menu">
				<ul class="navbar-nav">
					<li class="nav-item">
						<router-link class="nav-link" to="/about">About</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/contact">Contact</router-link>
					</li>
					<li>
						<!-- WebVR programs menu -->
						<div class="dropdown show nav-item nav-link">
							<button class="btn btn-default dropdown-toggle red" type="button" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Projects <span class="caret"></span></button>
							<div class="dropdown-menu" aria-labelledby="dropdownMenu">
								<router-link class="dropdown-item" to="/vr-map">RPI VR Map</router-link>
								<a class="dropdown-item" href="/src/webvr/RPIVRFreeTrip/index.html">RPI VR Free Trip</a>
								<a class="dropdown-item" href="/src/webvr/RPIIndex/index.html">RPI Index </a>
								<a class="dropdown-item" href="/src/webvr/RPIVRVideo/rpivideo.html"> VR Video</a>
							</div>				
						</div>
					</li>
				</ul>
			</div>

		</nav>

		<!-- actual content -->
		<div class="container-fluid content col-12">
			<router-view></router-view>
		</div>

		<!-- this needs to be fixed to the bottom -->
		<footer class="footer red fixed-bottom">
			<div class="container text-center">RCOS 2018</div>
		</footer>
	</div>
</template>

<style>
	a {
		color: white;
	}
	.red {
		background-color: #d7001a;
		color: white;
	}
	.navbar {
		position: absolute;
		left: 0;
		width: 100%;
	}
	.navbar-brand {
		color: white;
		font-size: 35px;
	}
	.nav-link {
		background-color: #d7001a; 
		color: white;
		font-size: 20px;
	}
	.dropdown-menu {
		background-color: #d7001a;
		color: white;
		border: none;
	}
	.dropdown-item {
		color: white;
	}
	.content {
		padding-top: 70px;
		padding-bottom: 25px;
		padding-right: 0;
		padding-left: 0;
		margin-right: auto;
		margin-left: auto;
		left: 0;
		bottom: 0;
		top: 0;
		height: 100%;
		width: 100%;
		position: absolute;
	}
	.footer {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 25px;
	}
</style>

<script>
	export default {
		name: 'App',
		data() {
			return {
				message: 'hello from App.vue',
			}
		}
	}
</script>

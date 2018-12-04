import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Home from './components/Home.vue';
import About from './components/About.vue';
import Contact from './components/Contact.vue';

import VRMap from './components/RPIVRMap.vue';

import VRMenu from './components/VRMenu.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/about',
		name: 'About',
		component: About
	},
	{
		path: '/contact',
		name: 'Contact',
		component: Contact
	},
	{
		path: '/vr-map',
		name: 'VR-Map',
		component: VRMap
	},

	{
		path: '/vrmenu',
		name: 'VRMenu',
		component: VRMenu
	},

	// {
	// 	path: '/vr-path',
	// 	name: 'VR-Path',
	// 	component: VRPath
	// },

	// {		this might come in handy for making progams modular? (putting query in url)
	// 	path: '/vr-path/:path',
	// 	name: 'VR-Path-Data',
	// 	component: VRPath,
	// 	props: true
	// }
	// {
	// 	path: '/vr-free-trip',
	// 	name: 'VR-Free-Trip',
	// 	component: VRFReeTrip
	// }
];

const router = new VueRouter({
	mode: 'history',
	routes: routes
});

var app = new Vue({
	router: router,
	components: { App },
	template: '<App/>'
}).$mount("#app")

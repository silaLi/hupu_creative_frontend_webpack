import './entry/app';
import { routes } from './lib/page-router';
import $ from "zepto";

$(() => {
	// routes.go("GAME_ENTRY");
	routes.go("LOAD");
	// routes.go("GAME");
})

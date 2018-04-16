import './app';
import { routes } from '../lib/page-router';
import $ from "zepto";

$(() => {
	routes.go("LOAD");
})

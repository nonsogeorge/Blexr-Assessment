<?php 
/*
*
*	***** Odds Calculator *****
*
*	This file initializes all OC Core components
*	
*/
// If this file is called directly, abort. //
if ( ! defined( 'WPINC' ) ) {die;} // end if
// Define Our Constants
define('OC_CORE_INC',dirname( __FILE__ ).'/assets/inc/');
define('OC_CORE_IMG',plugins_url( 'assets/img/', __FILE__ ));
define('OC_CORE_CSS',plugins_url( 'assets/css/', __FILE__ ));
define('OC_CORE_JS',plugins_url( 'assets/js/', __FILE__ ));
/*
*
*  Register CSS
*
*/
function oc_register_core_css(){
wp_enqueue_style('oc-core', OC_CORE_CSS . 'oc-core.css',null,time(),'all');
};
add_action( 'wp_enqueue_scripts', 'oc_register_core_css' );    
/*
*
*  Register JS/Jquery Ready
*
*/
function oc_register_core_js(){
// Register Core Plugin JS	
wp_enqueue_script('oc-core', OC_CORE_JS . 'oc-core.js','jquery',time(),true);
};
add_action( 'wp_enqueue_scripts', 'oc_register_core_js' );    
/*
*
*  Includes
*
*/ 
// Load the Functions
if ( file_exists( OC_CORE_INC . 'oc-core-functions.php' ) ) {
	require_once OC_CORE_INC . 'oc-core-functions.php';
}     
// Load the ajax Request
if ( file_exists( OC_CORE_INC . 'oc-ajax-request.php' ) ) {
	require_once OC_CORE_INC . 'oc-ajax-request.php';
} 
// Load the Shortcodes
if ( file_exists( OC_CORE_INC . 'oc-shortcodes.php' ) ) {
	require_once OC_CORE_INC . 'oc-shortcodes.php';
}
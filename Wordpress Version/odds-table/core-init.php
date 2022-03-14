<?php 
/*
*
*	***** Odds Table *****
*
*	This file initializes all OT Core components
*	
*/
// If this file is called directly, abort. //
if ( ! defined( 'WPINC' ) ) {die;} // end if
// Define Our Constants
define('OT_CORE_INC',dirname( __FILE__ ).'/assets/inc/');
define('OT_CORE_IMG',plugins_url( 'assets/img/', __FILE__ ));
define('OT_CORE_CSS',plugins_url( 'assets/css/', __FILE__ ));
define('OT_CORE_JS',plugins_url( 'assets/js/', __FILE__ ));
/*
*
*  Register CSS
*
*/
function ot_register_core_css(){
wp_enqueue_style('ot-core', OT_CORE_CSS . 'ot-core.css',null,time(),'all');
};
add_action( 'wp_enqueue_scripts', 'ot_register_core_css' );    
/*
*
*  Register JS/Jquery Ready
*
*/
function ot_register_core_js(){
// Register Core Plugin JS	
wp_enqueue_script('ot-core', OT_CORE_JS . 'ot-core.js','jquery',time(),true);
};
add_action( 'wp_enqueue_scripts', 'ot_register_core_js' );    
/*
*
*  Includes
*
*/ 
// Load the Functions
if ( file_exists( OT_CORE_INC . 'ot-core-functions.php' ) ) {
	require_once OT_CORE_INC . 'ot-core-functions.php';
}     
// Load the ajax Request
if ( file_exists( OT_CORE_INC . 'ot-ajax-request.php' ) ) {
	require_once OT_CORE_INC . 'ot-ajax-request.php';
} 
// Load the Shortcodes
if ( file_exists( OT_CORE_INC . 'ot-shortcodes.php' ) ) {
	require_once OT_CORE_INC . 'ot-shortcodes.php';
}
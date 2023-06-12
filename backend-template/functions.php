<?php
/**
 * Add support for things in admin panel
 * @return void
 */
function add_support()
{
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
}
add_action('after_setup_theme', 'add_support');

/**
 * Add routes for ACF options from api
 */
add_action("rest_api_init", function () {
    register_rest_route("options", "/all", [
        "methods" => "GET",
        "callback" => "acf_options_route",
    ]);
});
function acf_options_route()
{
    return get_fields('options');
}


if (function_exists('acf_add_options_page')) {
    acf_add_options_page(array(
        'page_title' => 'Theme Settings',
        'menu_title' => 'Theme Settings',
        'menu_slug' => 'theme-general-settings',
        'capability' => 'edit_posts',
        'redirect' => false
    ));
    acf_add_options_sub_page(array(
        'page_title' => 'Header Settings',
        'menu_title' => 'Header',
        'parent_slug' => 'theme-general-settings',
    ));
}

class ReactPage
{
    private $page;
    private $dataFunc;
    private $data;

    function __construct($page, $dataFunc = false){
        $this->page = $page;
        $this->dataFunc = $dataFunc;
        $this->data = array();
        add_action('wp_enqueue_scripts', [$this, 'load_assets']);
    }

    function resolveDataArray()
    {
        $this->data = call_user_func($this->dataFunc);
    }

    function load_assets()
    {
        if (get_post_field('post_name') === $this->page) {
            wp_enqueue_style("style-{$this->page}", get_theme_file_uri("/build/{$this->page}.css"));
            if($this->dataFunc){
                $this->resolveDataArray();
            }
            if (get_post()->post_status === 'publish') {
                wp_enqueue_script("script-{$this->page}", get_theme_file_uri("/build/{$this->page}.js"), array('wp-element'), 'null', true);
                if($this->dataFunc){
                    wp_localize_script("script-{$this->page}", "wpPageDataObjectScript", $this->data);
                }
            }
        }
    }
}

//new ReactPage('main', function () {
//    return [
//        'title' => get_the_title(),
//        'content' => get_the_content(),
//        'fields' => get_fields(),
//        'options' => get_fields('options'),
//    ];
//});
new ReactPage('main');
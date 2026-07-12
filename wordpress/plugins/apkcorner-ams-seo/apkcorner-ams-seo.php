<?php
/**
 * Plugin Name: APK Corner — AMS SEO Lock
 * Description: Redirects public AMS pages to apkcorner.com.pk, forces noindex, and blocks AMS robots/sitemaps. Keep /wp-admin, /wp-json, and media on AMS.
 * Version: 1.0.0
 * Author: APK Corner
 * Requires at least: 5.8
 * Requires PHP: 7.4
 */

if (!defined('ABSPATH')) {
    exit;
}

define('APKCORNER_PUBLIC_ORIGIN', 'https://apkcorner.com.pk');

/**
 * Paths that must stay on AMS (admin, API, media, core assets).
 */
function apkcorner_ams_is_internal_request(): bool {
    if (is_admin() || wp_doing_ajax() || wp_doing_cron()) {
        return true;
    }
    if (defined('REST_REQUEST') && REST_REQUEST) {
        return true;
    }

    $uri = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '/';

    return (bool) preg_match(
        '#^/(wp-admin|wp-login\.php|wp-json|wp-cron\.php|xmlrpc\.php|wp-content|wp-includes)#i',
        $uri
    );
}

// ─── 1. 301 public HTML → main domain ───────────────────────────────────────

add_action('template_redirect', function () {
    if (apkcorner_ams_is_internal_request()) {
        return;
    }

    $uri = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '/';
    wp_redirect(APKCORNER_PUBLIC_ORIGIN . $uri, 301);
    exit;
}, 0);

// ─── 2. Force site "not public" (WordPress reading setting) ─────────────────

add_filter('pre_option_blog_public', '__return_zero');

// ─── 3. Headers + meta noindex (even if a page slips through) ───────────────

add_action('send_headers', function () {
    if (is_admin()) {
        return;
    }
    header('X-Robots-Tag: noindex, nofollow', true);
}, 0);

add_action('wp_head', function () {
    echo '<meta name="robots" content="noindex, nofollow">' . "\n";
}, 0);

// ─── 4. robots.txt — block entire AMS host ──────────────────────────────────

add_filter('robots_txt', function () {
    return "User-agent: *\nDisallow: /\n";
}, 999);

// ─── 5. Override Rank Math index/sitemap output ─────────────────────────────

add_filter('rank_math/frontend/robots', function () {
    return [
        'index'  => 'noindex',
        'follow' => 'nofollow',
    ];
}, 999);

add_filter('rank_math/sitemap/enable', '__return_false', 999);
add_filter('rank_math/sitemap/robots_txt', '__return_empty_string', 999);

add_action('template_redirect', function () {
    $uri = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '';
    if (preg_match('#sitemap.*\.xml#i', $uri)) {
        status_header(404);
        header('X-Robots-Tag: noindex, nofollow', true);
        exit;
    }
}, 1);

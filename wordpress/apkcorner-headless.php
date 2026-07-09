<?php
/**
 * APK Corner — Headless WordPress Setup
 *
 * Add to Kadence child theme functions.php (or require this file).
 *
 * Phase 1 (now):  WordPress on apkcorner.com.pk — write & preview content
 * Phase 2 (later): Move WP to cms.apkcorner.com.pk, Next.js on main domain
 *
 * Plugins needed: Kadence Blocks, Rank Math SEO
 */

// ─── 1. Expose Rank Math SEO fields to REST API ─────────────────────────────

add_action('rest_api_init', function () {
    register_rest_field('post', 'rank_math', [
        'get_callback' => function ($post) {
            $id = is_array($post) ? $post['id'] : $post->ID;
            return [
                'title'         => get_post_meta($id, 'rank_math_title', true),
                'description'   => get_post_meta($id, 'rank_math_description', true),
                'focus_keyword' => get_post_meta($id, 'rank_math_focus_keyword', true),
                'rich_snippet'  => get_post_meta($id, 'rank_math_rich_snippet', true),
            ];
        },
        'schema' => [
            'description' => 'Rank Math SEO metadata for headless frontend',
            'type'        => 'object',
        ],
    ]);
});

// ─── 2. Allow CORS for Next.js frontend ────────────────────────────────────

add_action('rest_api_init', function () {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function ($value) {
        $allowed_origins = [
            'http://localhost:3000',
            'https://apkcorner.com.pk',
            'https://www.apkcorner.com.pk',
        ];

        $origin = get_http_origin();
        if ($origin && in_array($origin, $allowed_origins, true)) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Access-Control-Allow-Methods: GET, OPTIONS');
            header('Access-Control-Allow-Credentials: true');
        }

        return $value;
    });
}, 15);

// ─── 3. Revalidate Next.js on publish/update ────────────────────────────────

define('APKCORNER_REVALIDATE_URL', 'https://apkcorner.com.pk/api/revalidate');
define('APKCORNER_REVALIDATE_SECRET', 'your-random-secret-here'); // match .env.local

function apkcorner_revalidate_nextjs($post_id, $post) {
    if (wp_is_post_revision($post_id) || $post->post_status !== 'publish') {
        return;
    }

    if (!in_array($post->post_type, ['post', 'page'], true)) {
        return;
    }

    wp_remote_post(
        add_query_arg('secret', APKCORNER_REVALIDATE_SECRET, APKCORNER_REVALIDATE_URL),
        [
            'timeout' => 5,
            'headers' => ['Content-Type' => 'application/json'],
            'body'    => wp_json_encode(['slug' => $post->post_name]),
        ]
    );
}

add_action('save_post', 'apkcorner_revalidate_nextjs', 10, 2);
add_action('deleted_post', function ($post_id) {
    wp_remote_post(
        add_query_arg('secret', APKCORNER_REVALIDATE_SECRET, APKCORNER_REVALIDATE_URL),
        ['timeout' => 5, 'headers' => ['Content-Type' => 'application/json'], 'body' => '{}']
    );
});

// ─── 4. Redirect public WP to Next.js (ONLY after Next.js is live on main domain)
// Enable this when WordPress moves to cms.apkcorner.com.pk:
//
// add_action('template_redirect', function () {
//     if (is_admin() || wp_doing_ajax() || defined('REST_REQUEST')) return;
//     $path = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '/';
//     wp_redirect('https://apkcorner.com.pk' . $path, 301);
//     exit;
// });

// ─── 5. Block CMS from Google indexing (enable when on cms subdomain) ───────
//
// add_action('wp_head', function () {
//     echo '<meta name="robots" content="noindex, nofollow">' . "\n";
// }, 1);

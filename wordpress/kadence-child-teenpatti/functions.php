<?php
/**
 * Kadence Child Theme — APK Corner
 * Headless WordPress integration for Next.js frontend.
 */

if (!defined('ABSPATH')) {
    exit;
}

// Load parent theme styles.
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style(
        'kadence-parent-style',
        get_template_directory_uri() . '/style.css',
        [],
        wp_get_theme(get_template())->get('Version')
    );
});

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
define('APKCORNER_REVALIDATE_SECRET', 'be22531463ffb475f1db5710bf51a7110e26117b8fb004c0');

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

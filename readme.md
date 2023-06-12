Solve SSL Problem on Server

// wp-config.php
define('FORCE_SSL_ADMIN', true);
if ( isset( $_SERVER['HTTP_X_FORWARDED_PROTO'] ) && strpos( $_SERVER['HTTP_X_FORWARDED_PROTO'], 'https') !== false ) {
    $_SERVER['HTTPS'] = 'on';
}

Caveats:
- We not using react-router-dom in wordpress, so links must be <a href>

- We must know datatypes of acf
https://www.advancedcustomfields.com/resources/wp-rest-api-integration/#rest-api-field-types

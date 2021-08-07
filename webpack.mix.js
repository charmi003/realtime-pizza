let mix = require('laravel-mix');

mix.js('assets/js/app.js','public/js/app.js').js('assets/js/track.js','public/js/track.js').js('assets/js/payment.js','public/js/payment.js').sass("assets/scss/app.scss","public/css/app.css");

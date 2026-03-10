(function () {
    'use strict';

    var STORAGE_KEY = 'theme';

    function getTheme() {
        return localStorage.getItem(STORAGE_KEY) || 'light';
    }

    function setTheme(theme) {
        theme = theme === 'dark' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
        var slider = document.getElementById('theme-toggle-slider');
        if (slider) slider.textContent = theme === 'dark' ? '\u{1F319}' : '\u{1F31E}';
    }

    function toggleTheme() {
        setTheme(getTheme() === 'dark' ? 'light' : 'dark');
    }

    // Apply theme immediately (before DOMContentLoaded) to prevent flash
    setTheme(getTheme());

    // Re-apply theme when page is restored from bfcache (back/forward navigation)
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) setTheme(getTheme());
    });

    document.addEventListener('DOMContentLoaded', function () {
        var toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.addEventListener('click', toggleTheme);
        }
    });

    window.themeUtils = {
        getTheme: getTheme,
        setTheme: setTheme,
        toggleTheme: toggleTheme
    };
})();

(function () {
    'use strict';

    var toolbarTexts = {
        ru: { back: '\u2190 \u0414\u043e\u043c\u043e\u0439' },
        en: { back: '\u2190 Home' },
        el: { back: '\u2190 \u0391\u03c1\u03c7\u03b9\u03ba\u03ae' }
    };

    var langs = [
        { code: 'ru', flag: '\ud83c\uddf7\ud83c\uddfa' },
        { code: 'en', flag: '\ud83c\uddfa\ud83c\uddf8' },
        { code: 'el', flag: '\ud83c\uddec\ud83c\uddf7' }
    ];

    var currentLang = localStorage.getItem('lang') || 'ru';
    if (!toolbarTexts[currentLang]) currentLang = 'ru';

    var showThemeToggle = !document.documentElement.hasAttribute('data-toolbar-no-theme');

    function buildToolbar() {
        var html = '<nav class="toolbar">';
        html += '<a class="toolbar__back" href="../index.html">' + toolbarTexts[currentLang].back + '</a>';
        html += '<span class="toolbar__title"></span>';
        html += '<div class="toolbar__lang">';
        for (var i = 0; i < langs.length; i++) {
            var l = langs[i];
            var activeClass = l.code === currentLang ? ' active' : '';
            html += '<button class="toolbar__lang-btn' + activeClass + '" data-lang="' + l.code + '">' + l.flag + '</button>';
        }
        html += '</div>';
        if (showThemeToggle) {
            html += '<button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">';
            html += '<span class="theme-toggle-slider" id="theme-toggle-slider">\ud83c\udf1e</span>';
            html += '</button>';
        }
        html += '</nav>';
        return html;
    }

    function injectToolbar() {
        var wrapper = document.createElement('div');
        wrapper.innerHTML = buildToolbar();
        var toolbar = wrapper.firstChild;
        document.body.insertBefore(toolbar, document.body.firstChild);

        // Move page title into toolbar
        var titleEl = toolbar.querySelector('.toolbar__title');
        var h1 = document.querySelector('h1');
        if (h1) {
            titleEl.textContent = h1.textContent.trim();
            h1.style.display = 'none';
        } else {
            titleEl.textContent = document.title;
        }
    }

    // Inject synchronously so #theme-toggle is in DOM before DOMContentLoaded
    injectToolbar();

    function setupLangButtons() {
        var buttons = document.querySelectorAll('.toolbar__lang-btn');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function () {
                var lang = this.getAttribute('data-lang');
                currentLang = lang;
                localStorage.setItem('lang', lang);

                // Update active class
                var allBtns = document.querySelectorAll('.toolbar__lang-btn');
                for (var j = 0; j < allBtns.length; j++) {
                    allBtns[j].classList.remove('active');
                }
                this.classList.add('active');

                // Update back link text
                var backLink = document.querySelector('.toolbar__back');
                if (backLink) {
                    backLink.textContent = toolbarTexts[lang].back;
                }

                // Update html lang attribute
                document.documentElement.lang = lang;

                // Dispatch event for future i18n
                document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
            });
        }
    }

    document.addEventListener('DOMContentLoaded', setupLangButtons);
})();

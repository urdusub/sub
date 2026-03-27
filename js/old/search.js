/*!
 * ================================================================
 *  MugiSUB - اردو انیمے سب ٹائٹلز
 *  Website  : https://mugisub.com
 *  Telegram : https://t.me/MugiSUB
 *  Encoder  : ZAB @ MugiSUB
 *  File     : search.js — MugiSUB Search Engine
 *  Version  : 1.0 | 2024
 *
 *  FEATURES:
 *  - Live search dropdown (as user types)
 *  - Full search results page (/search?q=...)
 *  - Searches: title, titleUrdu, titleAlt, tags, genre, year
 *  - Works on index.html and every page that loads this file
 *  - Keyboard navigation (arrow keys, Enter, Escape)
 *  - Depends on: search-data.js (MUGI_SEARCH_DATA array)
 *
 *  (c) MugiSUB - All Rights Reserved
 * ================================================================
 */

(function () {
  'use strict';

  /* -------------------------------------------------------
     CONSTANTS
  ------------------------------------------------------- */
  var MAX_LIVE_RESULTS  = 6;   // max results shown in dropdown
  var MAX_PAGE_RESULTS  = 50;  // max results on search page
  var SEARCH_PARAM      = 'q'; // URL query param name
  var SEARCH_PAGE       = '/search'; // search results page URL

  /* -------------------------------------------------------
     SEARCH CORE — score & filter entries
  ------------------------------------------------------- */
  function normalise(str) {
    return (str || '').toLowerCase().trim();
  }

  function scoreEntry(entry, query) {
    var q   = normalise(query);
    var score = 0;
    if (!q) return 0;

    var title     = normalise(entry.title);
    var titleUrdu = normalise(entry.titleUrdu);
    var titleAlt  = normalise(entry.titleAlt);
    var tags      = (entry.tags  || []).map(normalise).join(' ');
    var genres    = (entry.genre || []).map(normalise).join(' ');
    var yearStr   = String(entry.year || '');

    // Exact title match — highest priority
    if (title === q)           score += 100;
    else if (title.indexOf(q) === 0)  score += 70;  // starts with
    else if (title.indexOf(q) !== -1) score += 50;  // contains

    // Urdu / Alt title
    if (titleUrdu && titleUrdu.indexOf(q) !== -1) score += 40;
    if (titleAlt  && titleAlt.indexOf(q)  !== -1) score += 30;

    // Tags
    if (tags.indexOf(q) !== -1)   score += 25;

    // Genre
    if (genres.indexOf(q) !== -1) score += 15;

    // Year
    if (yearStr === q)            score += 10;

    // Multi-word query: each word must contribute
    var words = q.split(/\s+/);
    if (words.length > 1) {
      var allText = [title, titleUrdu, titleAlt, tags, genres, yearStr].join(' ');
      var matchCount = 0;
      words.forEach(function (w) {
        if (w.length > 1 && allText.indexOf(w) !== -1) matchCount++;
      });
      score += matchCount * 8;
    }

    return score;
  }

  function searchData(query) {
    if (!query || !query.trim()) return [];
    if (typeof MUGI_SEARCH_DATA === 'undefined') return [];

    var results = [];
    MUGI_SEARCH_DATA.forEach(function (entry) {
      var s = scoreEntry(entry, query);
      if (s > 0) results.push({ entry: entry, score: s });
    });

    results.sort(function (a, b) { return b.score - a.score; });
    return results.map(function (r) { return r.entry; });
  }

  /* -------------------------------------------------------
     LIVE DROPDOWN — show results as user types
  ------------------------------------------------------- */
  var dropdown      = null;
  var activeIndex   = -1;
  var liveResults   = [];

  function getDropdown() {
    if (dropdown) return dropdown;

    dropdown = document.createElement('div');
    dropdown.id        = 'mugi-search-dropdown';
    dropdown.className = 'mugi-search-dropdown';
    dropdown.style.cssText = [
      'position:absolute',
      'background:#1a1a2e',
      'border:1px solid #e18e3c',
      'border-top:none',
      'border-radius:0 0 6px 6px',
      'z-index:99999',
      'max-height:420px',
      'overflow-y:auto',
      'box-shadow:0 8px 24px rgba(0,0,0,0.6)',
      'min-width:280px',
      'width:100%',
      'left:0',
      'top:100%'
    ].join(';');

    var searchBox = document.getElementById('layout-searchbox');
    if (searchBox) {
      var wrapper = searchBox.closest('div') || searchBox.parentNode;
      if (wrapper.style.position !== 'relative') wrapper.style.position = 'relative';
      wrapper.appendChild(dropdown);
    } else {
      document.body.appendChild(dropdown);
    }

    return dropdown;
  }

  function renderDropdownItem(entry, index) {
    var statusColor = { airing: '#4caf50', finished: '#9e9e9e', upcoming: '#ff9800' };
    var color = statusColor[entry.status] || '#9e9e9e';
    var typeLabel = (entry.type || 'anime').toUpperCase();
    var rating = entry.rating ? ('<span style="color:#e18e3c;margin-left:6px">★ ' + entry.rating + '</span>') : '';
    var sub = entry.subtitle ? ('<span style="font-family:\'Jameel Noori Nastaleeq\',serif;font-size:11px;color:#aaa;margin-left:6px">' + entry.subtitle + '</span>') : '';

    return [
      '<div class="mugi-dd-item" data-index="' + index + '" ',
      '     style="display:flex;align-items:center;padding:8px 10px;cursor:pointer;',
      '            border-bottom:1px solid #2a2a40;transition:background 0.15s;">',
      entry.poster
        ? ('<img src="' + entry.poster + '" alt="" '
           + 'style="width:36px;height:50px;object-fit:cover;border-radius:3px;margin-right:10px;flex-shrink:0;" '
           + 'onerror="this.style.display=\'none\'">')
        : '<div style="width:36px;height:50px;background:#2a2a40;border-radius:3px;margin-right:10px;flex-shrink:0;"></div>',
      '<div style="flex:1;min-width:0;">',
        '<div style="font-size:13px;font-weight:600;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">',
          entry.title,
        '</div>',
        entry.titleUrdu
          ? '<div style="font-family:\'Jameel Noori Nastaleeq\',serif;font-size:12px;color:#ccc;direction:rtl;">' + entry.titleUrdu + '</div>'
          : '',
        '<div style="font-size:11px;margin-top:3px;">',
          '<span style="background:#2a2a40;color:#aaa;padding:1px 5px;border-radius:3px;font-size:10px;">' + typeLabel + '</span>',
          '<span style="color:' + color + ';font-size:10px;margin-left:5px;">● ' + (entry.status || '') + '</span>',
          rating, sub,
        '</div>',
      '</div>',
      '</div>'
    ].join('');
  }

  function showDropdown(results) {
    var dd = getDropdown();
    liveResults = results;
    activeIndex = -1;

    if (!results.length) {
      dd.innerHTML = '<div style="padding:12px 14px;color:#aaa;font-size:13px;">No results found</div>';
      dd.style.display = 'block';
      return;
    }

    var html = results.slice(0, MAX_LIVE_RESULTS).map(renderDropdownItem).join('');

    if (results.length > MAX_LIVE_RESULTS) {
      html += '<div class="mugi-dd-more" style="padding:10px 14px;color:#e18e3c;font-size:12px;'
            + 'cursor:pointer;border-top:1px solid #2a2a40;text-align:center;">'
            + 'View all ' + results.length + ' results →</div>';
    }

    dd.innerHTML = html;
    dd.style.display = 'block';

    // Hover highlight
    dd.querySelectorAll('.mugi-dd-item').forEach(function (item) {
      item.addEventListener('mouseenter', function () {
        clearHighlight();
        this.style.background = '#2a2a40';
      });
      item.addEventListener('mouseleave', function () {
        this.style.background = '';
      });
      item.addEventListener('mousedown', function (e) {
        e.preventDefault();
        var idx = parseInt(this.getAttribute('data-index'), 10);
        goToResult(liveResults[idx]);
      });
    });

    var moreBtn = dd.querySelector('.mugi-dd-more');
    if (moreBtn) {
      moreBtn.addEventListener('mousedown', function (e) {
        e.preventDefault();
        var q = document.getElementById('layout-searchbox');
        if (q) mugiSearchGo(q.value);
      });
    }
  }

  function hideDropdown() {
    if (dropdown) dropdown.style.display = 'none';
    activeIndex = -1;
  }

  function clearHighlight() {
    if (!dropdown) return;
    dropdown.querySelectorAll('.mugi-dd-item').forEach(function (el) {
      el.style.background = '';
    });
  }

  function goToResult(entry) {
    if (entry && entry.url) window.location.href = entry.url;
  }

  /* -------------------------------------------------------
     KEYBOARD NAVIGATION in dropdown
  ------------------------------------------------------- */
  function handleKeyNav(e) {
    if (!dropdown || dropdown.style.display === 'none') return;
    var items = dropdown.querySelectorAll('.mugi-dd-item');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, items.length - 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && liveResults[activeIndex]) {
        e.preventDefault();
        goToResult(liveResults[activeIndex]);
        return;
      }
      // else let the form submit / mugiSearchGo handle it
      return;
    } else if (e.key === 'Escape') {
      hideDropdown();
      return;
    }

    clearHighlight();
    if (activeIndex >= 0 && items[activeIndex]) {
      items[activeIndex].style.background = '#2a2a40';
      items[activeIndex].scrollIntoView({ block: 'nearest' });
    }
  }

  /* -------------------------------------------------------
     PUBLIC: live search (used by includes.js too)
  ------------------------------------------------------- */
  window.mugiSearchLive = function (query) {
    if (!query || !query.trim()) {
      hideDropdown();
      return;
    }
    var results = searchData(query);
    showDropdown(results);
  };

  /* -------------------------------------------------------
     PUBLIC: go to search results page
  ------------------------------------------------------- */
  window.mugiSearchGo = function (query) {
    if (!query || !query.trim()) return;
    window.location.href = SEARCH_PAGE + '?' + SEARCH_PARAM + '=' + encodeURIComponent(query.trim());
  };

  /* -------------------------------------------------------
     SEARCH RESULTS PAGE RENDERER
     Renders results directly into the page when URL = /search?q=...
  ------------------------------------------------------- */
  function renderSearchPage() {
    var params  = new URLSearchParams(window.location.search);
    var query   = params.get(SEARCH_PARAM) || '';
    var results = searchData(query);
    var limited = results.slice(0, MAX_PAGE_RESULTS);

    // Update page title
    document.title = (query ? '"' + query + '" — ' : '') + 'Search — MugiSUB';

    // Try to inject into layout-main
    var main = document.getElementById('layout-main');
    if (!main) return;

    var statusColor = { airing: '#4caf50', finished: '#9e9e9e', upcoming: '#ff9800' };

    var html = '<h1 class="calendar">Search Results</h1>'
             + '<div class="g_content calendar_all">';

    if (query) {
      html += '<p style="margin-bottom:1em;color:#aaa;">'
            + 'Showing <strong style="color:#e18e3c">' + limited.length + '</strong>'
            + (results.length > MAX_PAGE_RESULTS ? ' of ' + results.length : '')
            + ' results for: <strong style="color:#fff">' + escHtml(query) + '</strong>'
            + '</p>';
    }

    if (!query) {
      html += '<p style="color:#aaa;">Enter something in the search box above.</p>';
    } else if (!limited.length) {
      html += '<p style="color:#aaa;">No results found for <strong>' + escHtml(query) + '</strong>. '
            + 'Try different keywords.</p>';
    } else {
      html += '<div class="g_section middle g_bubblewrap nowrap"><div class="container">'
            + '<div class="g_section content"><div class="g_bubblewrap g_bubble container">';

      limited.forEach(function (entry, i) {
        var odd     = i % 2 === 0 ? 'g_odd ' : '';
        var color   = statusColor[entry.status] || '#9e9e9e';
        var genres  = (entry.genre || []).join(', ');
        var rating  = entry.rating
          ? '<div class="votes rating"><span class="key">Rating:</span> '
            + '<span class="rating mid"><span class="value">' + entry.rating + '</span>'
            + '<span class="count">/10</span></span></div>'
          : '';
        var eps = entry.episodes
          ? (entry.type === 'movie' ? 'Movie' : entry.type.toUpperCase() + ', ' + entry.episodes + ' eps')
          : '';

        html += '<div class="' + odd + 'g_bubble box small" id="result-' + entry.id + '">'
              + '<div class="thumb image">'
              + '<a href="' + escHtml(entry.url) + '">'
              + '<picture><img loading="lazy" alt="' + escHtml(entry.title) + '" '
              + 'src="' + escHtml(entry.poster || '') + '" '
              + 'height="201" width="150" class="g_image g_bubble small" '
              + 'onerror="this.src=\'https://mugisub.com/images/no-poster.jpg\'">'
              + '</picture></a>'
              + '</div>'
              + '<div class="data">'
              + '<div class="wrap name">'
              + '<a class="name-colored" href="' + escHtml(entry.url) + '">' + escHtml(entry.title) + '</a>'
              + (entry.titleUrdu ? '<div style="font-family:\'Jameel Noori Nastaleeq\',serif;direction:rtl;font-size:14px;color:#ccc;">' + entry.titleUrdu + '</div>' : '')
              + '</div>'
              + (entry.year ? '<div class="date">' + entry.year + (entry.season ? ' — ' + entry.season : '') + '</div>' : '')
              + '<div class="general">' + eps + '</div>'
              + '<span style="display:inline-block;background:#2a2a40;color:' + color + ';font-size:11px;padding:2px 7px;border-radius:3px;margin:3px 0;">● ' + (entry.status || '') + '</span>'
              + (entry.subtitle ? '<div><span class="key">Subtitle:</span> <span style="font-family:\'Jameel Noori Nastaleeq\',serif;">' + entry.subtitle + '</span></div>' : '')
              + rating
              + (genres ? '<div class="votes average">' + escHtml(genres) + '</div>' : '')
              + '</div>'
              + '</div>';
      });

      html += '</div></div></div></div>';
    }

    html += '</div>';
    main.innerHTML = html;
  }

  function escHtml(str) {
    return (str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  /* -------------------------------------------------------
     WIRE UP search box on current page
  ------------------------------------------------------- */
  function wireSearchBox() {
    var box = document.getElementById('layout-searchbox');
    if (!box) return;

    box.addEventListener('input', function () {
      mugiSearchLive(this.value);
    });

    box.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        var visible = dropdown && dropdown.style.display !== 'none'
                      && activeIndex >= 0 && liveResults[activeIndex];
        if (visible) {
          goToResult(liveResults[activeIndex]);
        } else {
          mugiSearchGo(this.value);
        }
        return;
      }
      handleKeyNav(e);
    });

    // Also wire the nav search box used by includes.js (same id)
    // Hide dropdown on outside click
    document.addEventListener('mousedown', function (e) {
      if (dropdown && !dropdown.contains(e.target) && e.target !== box) {
        hideDropdown();
      }
    });

    // Pre-fill from URL on search page
    if (window.location.pathname === SEARCH_PAGE || window.location.pathname === SEARCH_PAGE + '/') {
      var params = new URLSearchParams(window.location.search);
      var q = params.get(SEARCH_PARAM);
      if (q) box.value = q;
    }
  }

  /* -------------------------------------------------------
     INIT
  ------------------------------------------------------- */
  function init() {
    wireSearchBox();

    // If this IS the search page, render results
    var path = window.location.pathname.replace(/\/+$/, '');
    if (path === SEARCH_PAGE.replace(/\/+$/, '')) {
      renderSearchPage();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // includes.js may load nav/footer asynchronously — wait a tick
    setTimeout(init, 100);
  }

})();

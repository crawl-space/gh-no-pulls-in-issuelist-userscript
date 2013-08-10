// ==UserScript==
// @name       GitHub Toggle Pull Requests in Issues List
// @namespace  http://repl.ca
// @version    0.1
// @description  enter something useful
// @match      https://github.com/*/issues*
// @copyright  2013+, James Bowes
// ==/UserScript==

function applyPullRequestStyle(style) {
    els = document.getElementsByClassName('octicon-git-pull-request');
    for (var i = 0; i < els.length; i++) {
        var el = els[i].parentNode.parentNode;
        
        // could be the pull requests link itself
        if (el.id.indexOf('issue_') !== 0) {
           continue;
        }
        
        el.style.display = style;
    }
}

function togglePullRequestDisplay() {
    var on = this.className.indexOf('selected') >= 0;
    
    if (on) {
        this.className = 'minibutton';
        applyPullRequestStyle('none');
    } else {
        this.className = 'minibutton selected';
        applyPullRequestStyle('block');
    }
    
    // was on before, save as off
    localStorage['issue-pr-display'] = on ? 'none' : 'block';
};


function addToggle() {    
    var btn = document.createElement('a');
    btn.className = 'minibutton';

    // default to on.
    var style = localStorage['issue-pr-display'];
    if (style !== 'none') {
        style = 'block';
        btn.className += ' selected';
    } else {
        applyPullRequestStyle('none');
    }

    
    var span = document.createElement('span');
    span.className = 'octicon octicon-git-pull-request';
    btn.appendChild(span);
    
    btn.onclick = togglePullRequestDisplay;
    
    var els = document.getElementsByClassName('js-issues-sort');
    els[0].parentNode.insertBefore(btn, els[0].nextSibling);
}

function main() {
  addToggle();
}

main();

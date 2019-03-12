if(!window.UTILS) {
    window.UTILS = {};
}
if(!UTILS.LOAD) {
    UTILS.LOAD = {};
}
if(!UTILS.LOAD.CONFIG) {
    UTILS.LOAD.CONFIG = {};
}

function loadConfig(key, value) {
    if(!value) {
        return UTILS.LOAD.CONFIG[key];
    }
    else {
        UTILS.LOAD.CONFIG[key] = value;
    }
}

/**
 * 加载JS
 */
function loadJS(url, callBack, callBackArgs) {
    var _e = document.createElement('script'),
        _done = false,
        _debug = loadConfig('debug');
    _e.type = 'text/javascript';
    _e.onload = _e.onreadystatechange = function() {
        if (!_done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
            _done = true;
            if(typeof callBack === 'function') {
                callBack(callBackArgs);
            }
            // Handle memory leak in IE
            _e.onload = _e.onreadystatechange = null;
            _e.parentNode.removeChild(_e);
        }
    };
    _e.src = url + (_debug ? ('?t=' + (new Date()).getTime()) : '');
    document.body.appendChild(_e);
} 

/**
 * 链式加载JS
 */
function chainLoadJS() {
    if(arguments.length > 0) {
        var args = [].slice.call(arguments);
        var first_url = args.shift();
        if(first_url) {
            if(first_url instanceof Array) {
                args = first_url;
                first_url = args.shift();
            }
            if(args && (args instanceof Array) && args.length > 0) {
                loadJS(first_url, arguments.callee, args);
            }
            else {
                loadJS(first_url);
            }
        }
        else {
            console.log('应该永远都不会执行到这里吧');
        }
    }
}

/**
 * 加载CSS
 */
function loadCSS(url, callBack) {
    var _e = document.createElement('link'),
        _done = false,
        _debug = loadConfig('debug');
    _e.type = 'text/css';
    _e.rel = 'stylesheet';
    _e.media = 'screen';
    _e.onload = _e.onreadystatechange = function() {
        if (!_done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
            _done = true;
            if(typeof callBack === 'function') {
                callBack();
            }
            // Handle memory leak in IE
            _e.onload = _e.onreadystatechange = null;
        }
    };
    _e.href = url + (_debug ? ('?t=' + (new Date()).getTime()) : '');
    (document.querySelector('head') || document.body).appendChild(_e);
}



// from: https://thief.one/js/src/love.js
! function (e, t, a) {
    function n() {
        c(
            ".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"),
            o(), r()
    }
    function r() {
        for (var e = 0; e < d.length; e++) d[e].alpha <= 0 ? (t.body.removeChild(d[e].el), d.splice(e, 1)) : (d[e].y--,
                d[e].scale += .004, d[e].alpha -= .013, d[e].el.style.cssText = "left:" + d[e].x + "px;top:" + d[e].y +
                "px;opacity:" + d[e].alpha + ";transform:scale(" + d[e].scale + "," + d[e].scale +
                ") rotate(45deg);background:" + d[e].color + ";z-index:99999");
        requestAnimationFrame(r)
    }
    function o() {
        var t = "function" == typeof e.onclick && e.onclick;
        e.onclick = function (e) {
            t && t(), i(e)
        }
    }
    function i(e) {
        var a = t.createElement("div");
        a.className = "heart", d.push({
            el: a,
            x: e.clientX - 5,
            y: e.clientY - 5,
            scale: 1,
            alpha: 1,
            color: s()
        }), t.body.appendChild(a)
    }
    function c(e) {
        var a = t.createElement("style");
        a.type = "text/css";
        try {
            a.appendChild(t.createTextNode(e))
        } catch (t) {
            a.styleSheet.cssText = e
        }
        t.getElementsByTagName("head")[0].appendChild(a)
    }
    function s() {
        return "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + ")"
    }
    var d = [];
    e.requestAnimationFrame = function () {
        return e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame ||
            e.msRequestAnimationFrame || function (e) {
            setTimeout(e, 1e3 / 60)
        }
    }(), n()
}(window, document);


// from: https://www.purecss.cn/ggk.js
! (function() {
    var coreSocialistValues = ["富强", "民主", "文明", "和谐", "自由", "平等", "公正", "法治", "爱国", "敬业", "诚信", "友善"],
        index = Math.floor(Math.random() * coreSocialistValues.length);
    document.body.addEventListener('click', function (e) {
        if (e.target.tagName == 'A') {
            return;
        }
        var x = e.pageX,
            y = e.pageY,
            span = document.createElement('span');
        span.textContent = coreSocialistValues[index];
        index = (index + 1) % coreSocialistValues.length;
        span.style.cssText = [
            'z-index: 9999999; position: absolute; font-weight: bold; color: #ff6651; top: ', y - 20,
            'px; left: ', x, 'px;'].join('');
        document.body.appendChild(span);
        animate(span);
    });

    function animate(el) {
        var i = 0,
            top = parseInt(el.style.top),
            id = setInterval(frame, 16.7);

        function frame() {
            if (i > 180) {
                clearInterval(id);
                el.parentNode.removeChild(el);
            } else {
                i += 2;
                el.style.top = top - i + 'px';
                el.style.opacity = (180 - i) / 180;
            }
        }
    }
}());

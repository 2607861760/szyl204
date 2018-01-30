//写cookies  
export function setCookie(cname, cvalue, exdays) {
    // var exdate = new Date();　　　　
    // exdate.setDate(exdate.getDate() + expiredays);　　　　
    // document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());　　
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

//读取cookies  
export function getCookie(cname) {
    // var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    // if (arr = document.cookie.match(reg))

    //     return (arr[2]);
    // else
    //     return null;
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

//删除cookies  
export function delCookie(name) {
    // var exp = new Date();
    // exp.setTime(exp.getTime() - 1);
    // var cval = getCookie(name);
    // if (cval != null)
    //     document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    setCookie(name, "", -1)
}

//清除全部cookie
export function clearAllCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
        // document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
            setCookie(keys[i], "", -1)
    }
}
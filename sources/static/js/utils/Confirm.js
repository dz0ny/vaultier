Po.NS('Utils');

Utils.Confirm = function (route, text, fn) {
    if (confirm(text)) {
        fn();
    }
}
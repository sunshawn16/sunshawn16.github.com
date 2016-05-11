(function() {
    var htmlHeight = document.getElementsByTagName('html')[0];
    var pageHeight = window.innerHeight;
    if (typeof pageHeight != 'number') {
        if (document.compatMode == 'CSS1compat') {
            pageHeight = document.documentElement.clientHeight;
        } else {
            pageHeight = document.body.clientHeight;
        }
    }
    htmlHeight.style.height = pageHeight + 'px';
    console.log(pageHeight);
    console.log(htmlHeight.style.height);
})()

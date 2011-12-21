function execute() {
    alreadyloading = false;
    var nextAnchor = $('#pnnext');
    if (!nextAnchor) return;
    var href = nextAnchor.attr('href');
    var currentPage = 1;
    $(window).scroll(function () {
        var rso = $('#rso');
        if (!rso) return;
        if (($(window).scrollTop() + $(window).height()) >= ($('body').height() * 0.9)) {
            if (alreadyloading == false) {
                alreadyloading = true;
                var parts = window.location.href.split('/');
                if (parts.length < 3) {
                    alreadyloading = false;
                    return;
                }

                if (href) {
                    $.get(href, function (data) {
                        currentPage++;
                        var toAppend = $(data).find('#rso').html();
                        nextAnchor = $(data).find('#pnnext');
                        if (!nextAnchor) {
                            href = null;
                        } else {
                            href = nextAnchor.attr('href');
                        }

                        rso.append($('<li></li>').attr('class', 'g').html('Page ' + currentPage));
                        rso.append(toAppend);
                        alreadyloading = false;
                    });
                } else {
                    alreadyloading = false;
                }
            }
        }
    });
}

$(document).ready(function () {
    if (document.location.href.indexOf('://www.google.') == -1) return;
    // Wait for Google to load the page
    setTimeout('execute()', 300);
});
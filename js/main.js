var elements = document.getElementsByTagName('script')

Array.prototype.forEach.call(elements, function (element) {
    if (element.type.indexOf('math/tex') != -1) {
        // Extract math markdown
        var textToRender = element.innerText || element.textContent;

        // Create span for KaTeX
        var katexElement = document.createElement('span');

        // Support inline and display math
        if (element.type.indexOf('mode=display') != -1) {
            katexElement.className += "math-display";
            textToRender = '\\displaystyle {' + textToRender + '}';
        } else {
            katexElement.className += "math-inline";
        }

        katex.render(textToRender, katexElement);
        element.parentNode.insertBefore(katexElement, element);
    }
});

// Share bar
var share_bar = document.getElementsByClassName('share-bar');
var po = document.createElement('script');
po.type = 'text/javascript';
po.async = true;
po.src = 'https://apis.google.com/js/platform.js';
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(po, s);

for (var i = 0; i < share_bar.length; i++) {

    var html = '<iframe allowtransparency="true" frameborder="0" scrolling="no"' +
        'src="http://platform.twitter.com/widgets/tweet_button.html?url=' + encodeURIComponent(window.location) + '&amp;text=' + encodeURIComponent(document.title) + '&amp;via=ramswarooppatra&amp;hashtags=java&amp;count=horizontal"' +
        'style="width:105px; height:21px;">' +
        '</iframe>' +

        '<iframe src="//www.facebook.com/plugins/like.php?href=' + encodeURIComponent(window.location) + '&amp;width&amp;layout=button_count&amp;action=like&amp;show_faces=false&amp;share=true&amp;height=21&amp;appId=101094500229731&amp;width=150" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:150px; height:21px;" allowTransparency="true"></iframe>' +

        '<div class="g-plusone" data-size="medium"></div>';

        //'<iframe src="https://plusone.google.com/_/+1/fastbutton?bsv&amp;size=medium&amp;url=' + encodeURIComponent(window.location) + '" allowtransparency="true" frameborder="0" scrolling="no" title="+1" style="width:105px; height:21px;"></iframe>';

    share_bar[i].innerHTML = html;
    share_bar[i].style.display = 'inline-block';
}

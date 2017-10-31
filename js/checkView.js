export let checkView = () => {
    let animationElements = $('.album-container figure'),
        $window = $(window),
        windowHeight = $window.height(),
        windowTop = $window.scrollTop(),
        windowBottom = (windowHeight + windowTop);

    $.each(animationElements, function() {
        let $element = $(this),
            elementHeight = $element.outerHeight(),
            elementTop = $element.offset().top,
            elementBottom = (elementHeight + elementTop);

        //check if current container is within viewport
        if ((elementTop <= windowBottom)) {
            $element.addClass('in-view');
        } else {
            $element.removeClass('in-view');
        }
    });
};

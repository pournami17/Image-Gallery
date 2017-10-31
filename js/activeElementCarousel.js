export let showActiveElement = (activeElement, activeFilter, currentSlide, totalSlides) => {
    if (activeFilter === "All") {
        activeElement = $('.album-container').find("[data-all-id='" + currentSlide + "']");
    } else {
        activeElement = $('.album-container').find("[data-index='" + currentSlide + "']");
    }

    let imgSrc = activeElement.find('img').attr('src'),
        imgTitle = activeElement.find('figcaption label').text(),
        imgDesc = activeElement.find('figcaption .card-text').text(),
        carouselIndicators = $('.carousel-indicators'),
        selectedItemDesc;

    selectedItemDesc = '<div class="container"><div class="row active"><div class="col selected-item-image"><img class="img-fluid" src=" ' + imgSrc + '" alt="Image"></div><div class="col selected-image-desc"><h3> ' + imgTitle + ' </h3><p> ' + imgDesc + '</p></div></div></div>';
    $('.modal-body').html('').append(selectedItemDesc);

    $('.selected-item-image img').effect("slide", 500);
    $('.selected-image-desc h3').effect("slide", 500);
    $('.selected-image-desc p').animate({
        left: 0,
        opacity: '+=1'
    }, 500);

    carouselIndicators.html('');

    carouselIndicators.each(function() {
        for (let i = 0; i < totalSlides; i++) {
            $("<li/>").appendTo(this);
        }
    });

    carouselIndicators.find('li:nth-child(' + currentSlide + ')').addClass('active');

}

import * as selectedCategoryData from './categorySelected';
import * as activeElementCarousel from './activeElementCarousel';

$(function() {
    let currentSlide = "",
        totalSlides = "",
        chooseCategory = $('#chooseCategorySelect');

    selectedCategoryData.selectedCategoryData();

    $('body').on('click', '.card', function() {
        let activeElement = $(this),
            activeFilter = chooseCategory.val();

        if (activeFilter === "All") {
            currentSlide = $(this).data('all-id');
            totalSlides = $('figure:last-child').data('all-id');
        } else {
            currentSlide = $(this).data('index');
            totalSlides = $('figure:last-child').data('index');
        }

        activeElementCarousel.showActiveElement(activeElement, activeFilter, currentSlide, totalSlides);
        $('#showItem').modal('show');
    });

    $('.btn-next').on('click', function(e) {
        e.preventDefault();
        let activeFilter = chooseCategory.val(),
            activeElement,
            currentSlide = $('.carousel-indicators li.active').index() + 1;
        if (currentSlide >= totalSlides) {
            currentSlide = 0;
        }
        currentSlide = currentSlide + 1;

        activeElementCarousel.showActiveElement(activeElement, activeFilter, currentSlide, totalSlides);
    });

    $('.btn-prev').on('click', function(e) {
        e.preventDefault();
        let activeFilter = chooseCategory.val(),
            activeElement,
            currentSlide = $('.carousel-indicators li.active').index() + 1;
        if (currentSlide <= 1) {
            currentSlide = totalSlides + 1;
        }
        currentSlide = currentSlide - 1;

        activeElementCarousel.showActiveElement(activeElement, activeFilter, currentSlide, totalSlides);
    });

    $('body').on('click', '.carousel-indicators li', function() {
        let $this = $(this),
            currentSlide = $this.index() + 1,
            activeElement,
            activeFilter = chooseCategory.val(),
            totalSlides = $('.carousel-indicators li:last-child').index() + 1;

        activeElementCarousel.showActiveElement(activeElement, activeFilter, currentSlide, totalSlides);
    });

    $('html').on('click', '.back-top', function() {
        $('html, body').animate({
            scrollTop: '0px'
        }, 500);
    });

})

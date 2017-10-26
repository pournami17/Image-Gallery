$(function(){
	var jsonURL = "category.json",
		currentSlide = "",
		totalSlides = "",
		$window = $(window),
		chooseCategory = $('#chooseCategorySelect');

	$.getJSON(jsonURL, function(data) {

		chooseCategory.append('<option value="All">All</option>');

		$.each(data, function(index) {
		    var availableCategories = data[index].category;
		    chooseCategory.append('<option value="' + availableCategories + '">' + availableCategories + '</option>');
		});

		selectedCategory();
		$window.on('scroll', checkView);
		$window.trigger('scroll');

		chooseCategory.on('change', function(){
			selectedCategory();	
			$window.on('scroll', checkView);
			$window.trigger('scroll');
		});

		function selectedCategory() {
			var selectedCategory = chooseCategory.val(),
				k = 1;

			$('.album-container').html('');

			$.each(data, function(i){
				var albumHolder = "",
					totalItems = this.items.length;

					for(var j=0; j<totalItems; j++) {
						if(selectedCategory === "All") {
							albumHolder += '<figure class="card bounce-up" data-all-id = "'+ k +'" data-index= '+ this.items[j].id  +'><img src= "' + this.items[j].imagePath + '"><figcaption><label> '+ this.items[j].title + '</label><p class="card-text">' + this.items[j].desc + '</p></figcaption></figure>';
							k = k + 1;
						} else if(data[i].category === selectedCategory) {
							albumHolder += '<figure class="card bounce-up" data-index= '+ this.items[j].id  +'><img src= "' + this.items[j].imagePath + '"><figcaption><label> '+ this.items[j].title + '</label><p class="card-text">' + this.items[j].desc + '</p></figcaption></figure>';
						}
					}

				$('.album-container').append(albumHolder);
				
			});	
		}
		
		function checkView() {
			var animationElements = $('.album-container figure'),
				windowHeight = $window.height(),
				windowTop = $window.scrollTop(),
				windowBottom = (windowHeight + windowTop);

			$.each(animationElements, function() {
				var $element = $(this),
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
		}

	});

	$('body').on('click', '.card', function() {
		var activeElement = $(this),
			activeFilter = chooseCategory.val();

		if(activeFilter === "All") {
			currentSlide = $(this).data('all-id');
			totalSlides = $('figure:last-child').data('all-id');
		}
		else {
			currentSlide = $(this).data('index');
			totalSlides = $('figure:last-child').data('index');
		}

		showActiveElement(activeElement, activeFilter, currentSlide, totalSlides);
		$('#showItem').modal('show');
	});

	$('.btn-next').on('click', function(e){
		e.preventDefault();
		var activeFilter = chooseCategory.val(),
			activeElement,
			currentSlide = $('.carousel-indicators li.active').index() + 1;
		if(currentSlide >= totalSlides) {
			currentSlide = 0;
		}
		currentSlide = currentSlide + 1;
		
		showActiveElement(activeElement, activeFilter, currentSlide, totalSlides);
	});

	$('.btn-prev').on('click', function(e){
		e.preventDefault();
		var activeFilter = chooseCategory.val(),
			activeElement,
			currentSlide = $('.carousel-indicators li.active').index() + 1;
		if(currentSlide <= 1) {
			currentSlide = totalSlides + 1;
		}
		currentSlide = currentSlide - 1;
		
		showActiveElement(activeElement, activeFilter, currentSlide, totalSlides);
	});

	function showActiveElement(activeElement, activeFilter, currentSlide, totalSlides) {
		console.log("currentSlide",currentSlide);
		if(activeFilter === "All") {
			activeElement = $('.album-container').find("[data-all-id='"+currentSlide+"']");
		}
		else {
			activeElement = $('.album-container').find("[data-index='"+currentSlide+"']");
		}

		var	imgSrc = activeElement.find('img').attr('src'),
			imgTitle = activeElement.find('figcaption label').text(),
			imgDesc = activeElement.find('figcaption .card-text').text(),
			carouselIndicators = $('.carousel-indicators'),
			selectedItemDesc;

		selectedItemDesc = '<div class="container"><div class="row active"><div class="col selected-item-image"><img class="img-fluid" src=" '+ imgSrc +'" alt="Image"></div><div class="col selected-image-desc"><h3> '+ imgTitle +' </h3><p> '+ imgDesc +'</p></div></div></div>' ;
        $('.modal-body').html('').append(selectedItemDesc);

        $('.selected-item-image img').effect( "slide", 500 );
        $('.selected-image-desc h3').effect( "slide", 500 );
        $('.selected-image-desc p').animate({
        	left: 0,
        	opacity: '+=1'
        }, 500);

        carouselIndicators.html('');
		
		carouselIndicators.each(function() {
			for(i = 0; i < totalSlides; i++){
				$("<li/>").appendTo(this);
			}
		});

		carouselIndicators.find('li:nth-child('+ currentSlide +')').addClass('active');

    }

    $('body').on('click', '.carousel-indicators li', function() {
    	var $this = $(this),
    		currentSlide = $this.index() + 1,
    		activeElement,
    		activeFilter = chooseCategory.val(),
    		totalSlides = $('.carousel-indicators li:last-child').index() + 1;

    	showActiveElement(activeElement, activeFilter, currentSlide, totalSlides);
    });

    $('html').on('click', '.back-top', function() {
		$('html, body').animate({scrollTop: '0px'}, 500);
	});
	
})


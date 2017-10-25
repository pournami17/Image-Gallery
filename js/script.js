$(function(){
	var jsonURL = "category.json",
		currentSlide = "",
		totalSlides = "";
	$.getJSON(jsonURL, function(data){

		categoryArray = [];

		$.each(data, function(index) {
		    var availableCategories = data[index].category;
		    if ($.inArray(availableCategories, categoryArray) == -1) {
		        categoryArray.push(availableCategories);
		    }
		});

		$('#chooseCategorySelect').append('<option value="All">All</option>')

		$.each(categoryArray, function(i){
			$('#chooseCategorySelect').append('<option value="' + categoryArray[i] + '">' + categoryArray[i] + '</option>')
		});

		selectedCategory();

		$('#chooseCategorySelect').on('change', function(){
			selectedCategory();	
		});

		function selectedCategory() {
			var selectedCategory = $('#chooseCategorySelect').val(),
				k = 1;

			$('.album-container').html('');

			$.each(data, function(i){
				var albumHolder = "",
					totalItems = this.items.length;

					for(var j=0; j<totalItems; j++) {
						if(selectedCategory === "All") {
							albumHolder += '<figure class="card" data-all-id = "'+ k +'" data-index= '+ this.items[j].id  +'><img src= "' + this.items[j].imagePath + '"><figcaption><label> '+ this.items[j].title + '</label><p class="card-text">' + this.items[j].desc + '</p></figcaption></figure>';
							k = k + 1;
						} else if(data[i].category === selectedCategory) {
							albumHolder += '<figure class="card" data-index= '+ this.items[j].id  +'><img src= "' + this.items[j].imagePath + '"><figcaption><label> '+ this.items[j].title + '</label><p class="card-text">' + this.items[j].desc + '</p></figcaption></figure>';
						}
					}

				$('.album-container').append(albumHolder);
			});

			$('.album-container figure').animate({
        		opacity: '+=0.6'
        	}, 400);
			
		}

	});

	$('body').on('click', '.card', function() {
		var activeElement = $(this);
		var activeFilter = $('#chooseCategorySelect').val();

		if(activeFilter === "All") {
			currentSlide = $(this).data('all-id');
			totalSlides = $('figure:last-child').data('all-id');
		}
		else {
			currentSlide = $(this).data('index');
			totalSlides = $('figure:last-child').data('index');
		}

		showActiveElement(activeElement, activeFilter);
		$('#showItem').modal('show');
	});
	
	$('.btn-next').on('click', function(e){
		e.preventDefault();
		var activeFilter = $('#chooseCategorySelect').val(),
			activeElement;
		if(currentSlide >= totalSlides) {
			currentSlide = 0;
		}
		currentSlide = currentSlide + 1;
		
		showActiveElement(activeElement, activeFilter);
	});

	$('.btn-prev').on('click', function(e){
		e.preventDefault();
		var activeFilter = $('#chooseCategorySelect').val(),
			activeElement;
		if(currentSlide <= 1) {
			currentSlide = totalSlides + 1;
		}
		currentSlide = currentSlide - 1;
		
		showActiveElement(activeElement, activeFilter);
	});

	function showActiveElement(activeElement, activeFilter) {
		var activeFilter = $('#chooseCategorySelect').val();
		if(activeFilter === "All") {
			activeElement = $('.album-container').find("[data-all-id='"+currentSlide+"']");
		}
		else {
			activeElement = $('.album-container').find("[data-index='"+currentSlide+"']");
		}
		var	imgSrc = activeElement.find('img').attr('src'),
			imgTitle = activeElement.find('figcaption label').text(),
			imgDesc = activeElement.find('figcaption .card-text').text(),
			selectedItemDesc;

		selectedItemDesc = '<div class="container"><div class="row active"><div class="col selected-item-image"><img class="img-fluid" src=" '+ imgSrc +'" alt="Image"></div><div class="col selected-image-desc"><h3> '+ imgTitle +' </h3><p> '+ imgDesc +'</p></div></div></div>' ;
        $('.modal-body').html('').append(selectedItemDesc);
        $('.selected-item-image img').effect( "slide", 500 );
        $('.selected-image-desc h3').effect( "slide", 500 );
        $('.selected-image-desc p').animate({
        	left: 0,
        	opacity: '+=1'
        }, 500);

    }

    $('html').on('click', '.back-top', function() {
		$('html, body').animate({scrollTop: '0px'}, 500);
	});
})


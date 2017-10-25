$(function(){
	var jsonURL = "category.json",
		currentSlide = "",
		totalSlides = "";
	$.getJSON(jsonURL, function(data){

		categoryArray = [];

		$.each(data, function(index) {
		    var availableCategories = data[index].category;
		    console.log("data",availableCategories)
		    if ($.inArray(availableCategories, categoryArray) == -1) {
		        categoryArray.push(availableCategories);
		    }
		});

		$('#chooseCategorySelect').append('<option value="All">All</option>')

		$.each(categoryArray, function(i){
			$('#chooseCategorySelect').append('<option value="' + categoryArray[i] + '">' + categoryArray[i] + '</option>')
		});

		$('#chooseCategorySelect').on('change', function(){
			selectedCategory();	
		});

		selectedCategory();

		function selectedCategory() {
			var selectedCategory = $('#chooseCategorySelect').val();
			$('.album-container').html('');
			if(selectedCategory === "All") {
				 var k = 1;
				$.each(data, function(i , value){
					var albumHolder = "";
					for(var j=0; j<this.items.length; j++) {
						albumHolder += '<figure class="card" data-all-id = "'+ k +'" data-category= "'+ this.category + '" data-index= '+ this.items[j].id  +'><img src= "' + this.items[j].imagePath + '"><figcaption><label> '+ this.items[j].title + '</label><p class="card-text">' + this.items[j].desc + '</p></figcaption></figure>';
			    		k=k+1;
			    	}
					$('.album-container').append(albumHolder);
					
				});
			} else {
				$.each(data, function(i){
					var albumHolder = "";
					if(data[i].category === selectedCategory) {
						for(var j=0; j<this.items.length; j++) {
							albumHolder += '<figure class="card" data-category= "'+ this.category + '" data-index= '+ this.items[j].id  +'><img src= "' + this.items[j].imagePath + '"><figcaption><label> '+ this.items[j].title + '</label><p class="card-text">' + this.items[j].desc + '</p></figcaption></figure>';
			    		}
						$('.album-container').append(albumHolder);
					}
				
				});
			}
			
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
		

		showActiveElement(activeElement);
		$('#showItem').modal('show');
	});

	$('#showItem').on('hidden.bs.modal', function () {
		$('.album-container figure').removeClass('active');
	})

	
	$('.btn-next').on('click', function(){
		var activeFilter = $('#chooseCategorySelect').val();
		var activeElement;
		if(currentSlide >= totalSlides) {
			currentSlide = 0;
		}
		currentSlide = currentSlide + 1;
		if(activeFilter === "All") {
			activeElement = $('.album-container').find("[data-all-id='"+currentSlide+"']");
		}
		else {
			activeElement = $('.album-container').find("[data-index='"+currentSlide+"']");
		}
		showActiveElement(activeElement);
	});

	$('.btn-prev').on('click', function(){
		var activeFilter = $('#chooseCategorySelect').val();
		var activeElement;
		if(currentSlide <= 1) {
			currentSlide = totalSlides + 1;
		}
		currentSlide = currentSlide - 1;
		if(activeFilter === "All") {
			activeElement = $('.album-container').find("[data-all-id='"+currentSlide+"']");
		}
		else {
			activeElement = $('.album-container').find("[data-index='"+currentSlide+"']");
		}
		showActiveElement(activeElement);
	});

	$('html').on('click', '.back-top', function() {
		$('html, body').animate({scrollTop: '0px'}, 500);
	});

	function showActiveElement(activeElement) {
		var	imgSrc = activeElement.find('img').attr('src'),
			imgTitle = activeElement.find('figcaption label').text(),
			imgDesc = activeElement.find('figcaption .card-text').text(),
			selectedItemDesc;

		selectedItemDesc = '<div class="container"><div class="row active"><div class="col selected-item-image"><img class="img-fluid" src=" '+ imgSrc +'" alt="Image"></div><div class="col selected-image-desc"><h3> '+ imgTitle +' </h3><p> '+ imgDesc +'</p></div></div></div>' ;
        $('.modal-body').html('').append(selectedItemDesc);

    }
})


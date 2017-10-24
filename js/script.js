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
				$.each(data, function(i , value){
					var albumHolder = "";
					//console.log("value", i);
					for(var j=0; j<this.items.length; j++) {
						albumHolder += '<figure class="card" data-index= '+ this.items[j].id  +'><img src= "' + this.items[j].imagePath + '"><figcaption><label> '+ this.items[j].title + '</label><p class="card-text">' + this.items[j].desc + '</p></figcaption></figure>';
			    	}
					$('.album-container').append(albumHolder);
					
				});
			} else {
				$.each(data, function(i){
					var albumHolder = "";
					console.log("value", data[i].category);
					console.log("selectedCategory", selectedCategory);
					if(data[i].category === selectedCategory) {
						for(var j=0; j<this.items.length; j++) {
							albumHolder += '<figure class="card" data-index= '+ this.items[j].id  +'><img src= "' + this.items[j].imagePath + '"><figcaption><label> '+ this.items[j].title + '</label><p class="card-text">' + this.items[j].desc + '</p></figcaption></figure>';
			    		}
						$('.album-container').append(albumHolder);
					}
				
				});
			}
			
		}

	});

	$('body').on('click', '.card', function() {
		var activeElement = $(this);

		currentSlide = $(this).data('index');
		totalSlides = $('figure:last-child').data('index');
		showActiveElement(activeElement);
		$('#showItem').modal('show');
	});

	
	$('.btn-next').on('click', function(){
		if(currentSlide >= totalSlides) {
			currentSlide = $('figure:first-child').data('index') - 1;
		}
		currentSlide = currentSlide + 1;
		var activeElement = $('.album-container').find("[data-index='"+currentSlide+"']");
		showActiveElement(activeElement);
	});

	$('.btn-prev').on('click', function(){
		if(currentSlide <= ($('figure:first-child').data('index'))) {
			currentSlide = totalSlides + 1;
		}
		currentSlide = currentSlide - 1;
		var activeElement = $('.album-container').find("[data-index='"+currentSlide+"']");
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


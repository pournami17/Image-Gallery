import * as checkView from './checkView';

export let selectedCategoryData = () => {
    let jsonURL = "category.json",
        $window = $(window),
        chooseCategory = $('#chooseCategorySelect');

    $.getJSON(jsonURL, (data) => {

        chooseCategory.append('<option value="All">All</option>');

        data.map((categories) => {
            let availableCategories = categories.category;
            return chooseCategory.append('<option value="' + availableCategories + '">' + availableCategories + '</option>');
        });

        let categorySelected = () => {
            let selectedCategory = chooseCategory.val(),
                k = 1;
            $('.album-container').html('');

            data.map((i) => {
                let albumHolder = "",
                    totalItems = i.items;
                    for (var j of totalItems) {
                        if (selectedCategory === "All") {
                            albumHolder += '<figure class="card bounce-up" data-all-id = "' + k + '" data-index= ' + j.id + '><img src= "' + j.imagePath + '"><figcaption><label> ' + j.title + '</label><p class="card-text">' + j.desc + '</p></figcaption></figure>';
                            k += 1;
                        } else if (i.category === selectedCategory) {
                            albumHolder += '<figure class="card bounce-up" data-index= ' + j.id + '><img src= "' + j.imagePath + '"><figcaption><label> ' + j.title + '</label><p class="card-text">' + j.desc + '</p></figcaption></figure>';
                        }
                    }

                $('.album-container').append(albumHolder);

            });
        };

        categorySelected();
        $window.on('scroll', () => {
            checkView.checkView();
        });
        $window.trigger('scroll');

        chooseCategory.on('change', () => {
            categorySelected();
            $window.trigger('scroll');
        });

    });

}

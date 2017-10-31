import * as checkView from './checkView';

export let selectedCategoryData = () => {
    let jsonURL = "category.json",
        $window = $(window),
        chooseCategory = $('#chooseCategorySelect');

    $.getJSON(jsonURL, (data) => {

        chooseCategory.append('<option value="All">All</option>');

        data.forEach((i) => {
            let availableCategories = i.category;
            chooseCategory.append('<option value="' + availableCategories + '">' + availableCategories + '</option>');
        });

        let categorySelected = () => {
            let selectedCategory = chooseCategory.val(),
                k = 1;
            $('.album-container').html('');

            data.forEach((i) => {
                let albumHolder = "",
                    totalItems = i.items.length;

                for (let j = 0; j < totalItems; j++) {
                    if (selectedCategory === "All") {
                        albumHolder += '<figure class="card bounce-up" data-all-id = "' + k + '" data-index= ' + i.items[j].id + '><img src= "' + i.items[j].imagePath + '"><figcaption><label> ' + i.items[j].title + '</label><p class="card-text">' + i.items[j].desc + '</p></figcaption></figure>';
                        k = k + 1;
                    } else if (i.category === selectedCategory) {
                        albumHolder += '<figure class="card bounce-up" data-index= ' + i.items[j].id + '><img src= "' + i.items[j].imagePath + '"><figcaption><label> ' + i.items[j].title + '</label><p class="card-text">' + i.items[j].desc + '</p></figcaption></figure>';
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

$(function () {
  const amenitiesChecked = {};
  const apiUrl = 'http://127.0.0.1:5001/api/v1';

  $('.amenities input:checkbox').change(function (event) {
    if ($(this).is(':checked')) {
      // store the Amenity ID in the list
      amenitiesChecked[$(this).data('id')] = $(this).data('name');
      updateCheckedAmenitiesInterface();
    } else {
      // remove the Amenity ID from the list
      delete amenitiesChecked[$(this).data('id')];
      updateCheckedAmenitiesInterface();
    }
  });

  const updateCheckedAmenitiesInterface = () => {
    const length = Object.keys(amenitiesChecked).length;
    let content = ''; let i = 0;

    for (const amenity of Object.values(amenitiesChecked)) {
      const last = i === length - 1;
      content += amenity;
      if (!last) {
        content += ', ';
      }
      i++;
    }

    $('.amenities h4').text(content);
  };

  $.get(`${apiUrl}/status`,
    function (data, textStatus, jqXHR) {
      if (data.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    }
  );

  $.ajax({
    url: `${apiUrl}/places_search`,
    type: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({}),
    success: function (data, textStatus, jqXHR) {
      displayPlaces(data);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    }
  });

  const displayPlaces = (places) => {
    for (const place of places) {
      $('section.places').append(
        `
        <article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guest${place.max_guest > 1 ? 's' : ''}</div>
            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms > 1 ? 's' : ''}</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms > 1 ? 's' : ''}</div>
          </div>
          <div class="user">
            <b></b>
          </div>
          <div class="description">
            ${place.description}
          </div>
        </article>
        `
      );
    }
  };
});

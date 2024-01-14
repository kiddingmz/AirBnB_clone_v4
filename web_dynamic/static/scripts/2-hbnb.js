$(function () {
  const amenitiesChecked = {};

  $('.amenities input:checkbox').change(function (event) {
    if ($(this).is(':checked')) {
      amenitiesChecked[$(this).data('id')] = $(this).data('name');
      updateCheckedAmenitiesInterface();
    } else {
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

  $.get('http://127.0.0.1:5001/api/v1/status/',
    function (data, textStatus, jqXHR) {
      if (data.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    }
  );
});

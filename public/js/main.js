$(document).ready(function() {

  $('#edit').click(function(){
      $('.displayform').hide();
      $('.editform').show();
  });

  $('#updateserver').click(function (e) {
      e.preventDefault()
      $.ajax({
          url: '/update',
          type: 'POST',
          data: {_csrf: $("#_csrf").val(), name: $("#name").val(), type: $("#type").val(), id: $("#id").val()}

      })


      .done(function (msg) {

        $('#savedname').html(msg.name);
        $('#savedtype').html(msg.type);
        $('.displayform').show();
        $('.editform').hide();
      })
  });







});
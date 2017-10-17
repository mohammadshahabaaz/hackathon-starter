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





     $('#delete').click(function(e){
         e.preventDefault()
         $.ajax({
             url:'/deleteSport',
             type:'POST',
             data:{_csrf:$("#_csrf2").val(),id: $("#id").val()}
         })
             .done(function (data) {
                console.log(data)
             });

  });

    $(function() {
        $('form').each(function() {
            var form = this;
            $(form).find(".deletebutton").click(function (e) {
                e.preventDefault();
               var id = $(form).find(".id").val()
                var _csrf=$(form).find(".csrf").val()
                $.ajax({
                    method: "POST",
                    url: '/deleteSport' ,
                    data: {_csrf: _csrf, id: id}

                })
                    .done(function (json) {
                        console.log($("#id").val())
                        console.log(json);
                        //$('.sportsList').show();

                        $("."+id).remove();

                        $( form ).remove();
                    });
            });
        });
            });



});
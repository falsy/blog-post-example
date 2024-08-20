$(document).ready(function() {
  var firestoreUrl = 'https://us-central1-fir-note-fab00.cloudfunctions.net';
  var pw = location.search;

  $.ajax({
    method: "GET",
    url: firestoreUrl + '/noteText' + pw,
    success: function(data) {
      $('textarea').val(data.reuslt);
    }
  });

  $('button').click(function() {
    $.ajax({
      method: "PUT",
      url: firestoreUrl + '/updateNoteText' + pw,
      data: {text: $('textarea').val()},
      success: function(data) {
        if(data.result) alert('저장되었습니다.');
      }
    });
  });

});
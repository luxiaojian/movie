/**
 * Created by luhuijian on 15/5/12.
 */
$(function () {
  $('.comment').click(function (e) {
    var target = $(this);
    var toId = target.data('tid');
    var commentId = target.data('cid');
    if($('#toId').length>0){
      $('#toId').val(toId);
    }else{
      $('<input>').attr({
        type: 'hidden',
        id:'toId',
        name: 'comment[tid]',
        value: toId
      }).appendTo('#commentForm');
    }
    if($('#commentId').length>0){
      $('#commentId').val(commentId);
    }else{
      $('<input>').attr({
        type: 'hidden',
        name: 'comment[cid]',
        id: 'commentId',
        value: commentId
      }).appendTo('#commentForm');
    }

  })
  ;
})
;

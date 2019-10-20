'use strict';

$(document).ready(function() {
    console.log('SI AICI INTRA')
    $('#delete').click(function () {
        const id = $('#activityId').val();
        console.log('ASA', id)
        $.ajax({
            url:       '/api/activitati/' + id,
            dataType: 'json',
            type:     'DELETE',
            success: function(data) {
                alert("SUCCESS");
            },
            fail: function(err) {
                alert(err);
            }
        });
    });
});
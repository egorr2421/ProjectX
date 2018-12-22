$(document).ready(function () {
    function getOnline() {
        jQuery.get('/online_users', {}, function (data) {
            $('.main_table_body').empty();
            var number = 0;
            for (var key in data) {
                var tr = $('<tr>');
                number++;
                tr.append($('<th>', {scope: "row"}).text(number));
                tr.append($('<td>').text(data[key].login));
                tr.append($('<td>').text(data[key].email));
                $('.main_table_body').append(tr);
            }
        }).fail(function () {
            console.log("error get lang details");
        })
    };
    getOnline();
    setInterval(getOnline, 10000);
});
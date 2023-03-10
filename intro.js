const fadeInText = () => {
    $(function() {
        $("#intro span").each(function(i) {
            $(this).hide();
        });
    });
    $(function() {
        $("#intro span").each(function(i) {
            $(this).delay(i * 1800).fadeIn(1500);
        });
    });
};

fadeInText();
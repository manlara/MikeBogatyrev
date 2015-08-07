
(function() {
    var $offCanvas = $('#offcanvas'),
        $dropdown  = $offCanvas.find('.dropdown');

    $dropdown.on('show.bs.dropdown', function(){
        $(this).find('.dropdown-menu').slideDown(350);
    }).on('hide.bs.dropdown', function(){
        $(this).find('.dropdown-menu').slideUp(350);
    });
})();

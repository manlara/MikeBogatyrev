$(function() {

    // Use Modernizr to detect for touch devices, 
    // which don't support autoplay and may have less bandwidth, 
    // so just give them the poster images instead
    var screenIndex = 1,
        BV,
        videoPlayer,
        isTouch = Modernizr.touch,
        $bigImage = $('.big-image'),
        $window = $(window),
        $play  = $('.glyphicon-play'),
        $pause = $('.glyphicon-pause')
        unpause = true;
    $pause.hide();
    $play.hide();
    

    if (!isTouch) {
        // initialize BigVideo
        console.log("Modernizr: ",Modernizr.video);
        //if (Modernizr.video.h264) {BV = new $.BigVideo({forceAutoplay:false});}
        if (Modernizr.video.h264) {BV = new $.BigVideo({forceAutoplay:true});}
        else {BV = new $.BigVideo({useFlashForFirefox:false});}
        BV.init();
        showPause();
        showVideo();
        BV.getPlayer().on('loadeddata', function() {
            onVideoLoaded();
        });

        // adjust image positioning so it lines up with video
        $bigImage
            .css('position','relative')
            .imagesLoaded(adjustImagePositioning);
        // and on window resize
        $window.on('resize', adjustImagePositioning);
    } else{
        // adjust image positioning so it lines up with video
        $bigImage
            .css('position','relative')
            .imagesLoaded(adjustImagePositioning);
        // and on window resize
        $window.on('resize', adjustImagePositioning);
    }

    $play.on('click', function(){
        if (unpause) unpauseVideo();
         else {
            showVideo();
            unpause=true;
        }
        showPause();
    });
    $pause.on('click', function(){
        pauseVideo();
        showPlay();
    });

    function showPlay(){
        $pause.hide();
        $play.show();
    }

    function showPause(){
        $play.hide();
        $pause.show();
    }

    $('.modal').on('show.bs.modal', function (event) {
        showPlay();
        pauseVideo();
    });

    $('.modal').on('hidden.bs.modal', function (event) {
        unpause = true;
    });
    
    $('.nonvideos').on('click', function(event) {
        event.preventDefault();
        unpause = false;
        return startGallery('#'+$(this).attr('id')+'-modal');
    });

    $('.videos').on('click', function(event) {
        event.preventDefault();
        unpause = false;
        return startGallery('#'+$(this).attr('id')+'-links');
    });

    function startGallery(galleryID){
        if ($(window).width()<700){
            $(galleryID).attr('data-width',$(window).width());
        }
        var ekkoLightbox = $(galleryID).ekkoLightbox({
            //always_show_close: true,
            onShown: function(){
                showPlay();
                pauseVideo();
                //console.log("Shown");
            },
            onHidden: function(){
                //showPause();
                //showVideo();
                //console.log("Hidden");
            },
            onNavigate: function(direction, itemIndex){
                //return console.log('Navigating '+direction+'. Current item: '+itemIndex);
            }
        });
        
        return ekkoLightbox;
    }

    function pauseVideo(){
        BV.getPlayer().pause();
    }

    function unpauseVideo(){
        BV.getPlayer().play();
    }
    

    function showVideo() {
        var base_link = $('#screen-'+screenIndex).attr('data-video').split(".")[0]
        var videolink_mp4  = base_link+".mp4";
        //console.log(videolink_mp4);
        var videolink_webm = base_link+".webm";
        //console.log(videolink_webm);
        var videolink_ogg  = base_link+".ogg";
        //console.log(videolink_ogg);
        //{type: "video/ogg",   src: videolink_ogg }
        //if (!Modernizr.video.h264) {videolink = videolink.split(".")[0]+".webm";}
        BV.show([
            {type: "video/mp4",   src: videolink_mp4 },
            {type: "video/webm",  src: videolink_webm }
            ],{ambient:true});
    }


    function onVideoLoaded() {
        $('#screen-'+screenIndex).find('.big-image').transit({'opacity':0},500)
    }

    

    function adjustImagePositioning() {
        $bigImage.each(function(){
            var $img = $(this),
                img = new Image();

            img.src = $img.attr('src');

            var windowWidth = $window.width(),
                windowHeight = $window.height(),
                r_w = windowHeight / windowWidth,
                i_w = img.width,
                i_h = img.height,
                r_i = i_h / i_w,
                new_w, new_h, new_left, new_top;

            if( r_w > r_i ) {
                new_h   = windowHeight;
                new_w   = windowHeight / r_i;
            }
            else {
                new_h   = windowWidth * r_i;
                new_w   = windowWidth;
            }

            $img.css({
                width   : new_w,
                height  : new_h,
                left    : ( windowWidth - new_w ) / 2,
                top     : ( windowHeight - new_h ) / 2
            })

        });

    }
});
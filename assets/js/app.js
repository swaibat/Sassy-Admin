$(document).ready(function ($) {
    var contentSections = $('.cd-section'),
        navigationItems = $('#cd-vertical-nav a');

    updateNavigation();
    $(window).on('scroll', function (e) {
        updateNavigation(e);
    });


    //smooth scroll to the section
    navigationItems.on('click', function (event) {
        event.preventDefault();
        var hash = $(this.hash);

        smoothScroll(hash);

        history.pushState({}, '', hash.selector);

        hash = $(this.hash).selector.split('#')[1];
        document.title = "iziToast - " + hash;
        // history.pushState(null, hash, hash);
    });

    //open-close navigation on touch devices
    $('.touch .cd-nav-trigger').on('click', function () {
        $('.touch #cd-vertical-nav').toggleClass('open');
    });
    //close navigation on touch devices when selectin an elemnt from the list
    $('.touch #cd-vertical-nav a').on('click', function () {
        $('.touch #cd-vertical-nav').removeClass('open');
    });

    function updateNavigation(e) {
        contentSections.each(function () {
            $this = $(this);
            var activeSection = $('#cd-vertical-nav a[href="#' + $this.attr('id') + '"]').data('number') - 1;
            if (($this.offset().top - $(window).height() / 2 < $(window).scrollTop()) && ($this.offset().top + $this.height() - $(window).height() / 2 > $(window).scrollTop())) {
                navigationItems.eq(activeSection).addClass('is-selected');
            } else {
                navigationItems.eq(activeSection).removeClass('is-selected');
            }

            if ($(".no-touch #cd-vertical-nav li:nth-child(1) > a").hasClass('is-selected')) {
                $("body").addClass('first-section');
            } else {
                $("body").removeClass('first-section');
            }

        });
    }

    function smoothScroll(target) {
        $('body,html').animate({
                'scrollTop': target.offset().top
            },
            600
        );
    }

    $(document).on('click', '[data-target-scroll]', function (event) {
        event.preventDefault();
        var target = $(this).attr('data-target-scroll');
        $("html, body").animate({
            scrollTop: $(target).offset().top
        }, 1000);
    });

    $(".buttons li a").on('click', function(){
        $(".buttons li").removeClass('active');
        $(this).parent().addClass('active');
    });


    SyntaxHighlighter.all();
});





//
// CONFIG IZIToast
//

iziToast.settings({
    timeout: 4000,
    // closeOnClick: true,
    // closeOnEscape: true,
    close: true,
    progressBar: true,
    progressBarEasing: 'ease',
    //displayMode: 2,
    // pauseOnHover: false,
    // zindex: 900,
    // maxWidth: 400,
    // rtl: true,
    // layout: 2,
    // resetOnHover: true,
    // imageWidth: 50,
    // balloon: true,
    // target: '.target',
    // icon: 'material-icons',
    // iconText: 'face',
    // animateInside: false,
    // transitionIn: 'flipInX',
    // transitionOut: 'fadeOutLeft',
    // titleSize: 20,
    // titleLineHeight: 20,
    // messageSize: 20,
    // messageLineHeight: 20,
});


/*var myObj = {
    go: function() { alert("go called"); },
    callGo: function(){ this.go(); }
}

iziToast.show({
    title: 'Hey',
    message: 'Welcome!',
    buttons: [
        [ '<button>Ok</button>', myObj.callGo.bind(myObj) ]
    ]
});
*/



$(".trigger-info").on('click', function (event) {
    event.preventDefault();

    iziToast.info({
        id: 'info',
        title: 'Hello',
        // message: 'Welcome!',
        // imageWidth: 70,

        position: 'bottomLeft',
        transitionIn: 'bounceInRight',
        // rtl: true,
        // iconText: 'star',
        onOpening: function(instance, toast){
            console.info('Opening');
        },
        onOpened: function(instance, toast){
            console.info('Opened');
        },
        onClosing: function(instance, toast, closedBy){
            console.info('Closing | closedBy: ' + closedBy);
        },
        onClosed: function(instance, toast, closedBy){
            console.info('Closed | closedBy: ' + closedBy);
        },
/*        buttons: [
            ['<button><b>YES</b></button>', function (instance, toast) {

                instance.hide({ transitionOut: 'fadeOut' }, toast);

            }, true],
            ['<button>NO</button>', function (instance, toast) {

                instance.hide({ transitionOut: 'fadeOut' }, toast);

            }]
        ],*/
    });
});
$(".trigger-success").on('click', function (event) {
    event.preventDefault();

    iziToast.success({
        id: 'success',
        title: 'Success',
        message: 'Thank you for your visit',
        position: 'bottomRight',
        transitionIn: 'bounceInLeft',
        // iconText: 'star',
        onOpened: function(instance, toast){
            // console.info(instance)
        },
        onClosed: function(instance, toast, closedBy){
            console.info('closedBy: ' + closedBy);
        }
    });
});
$(".trigger-warning").on('click', function (event) {
    event.preventDefault();

    iziToast.warning({
        id: 'warning',
        title: 'Warning',
        message: 'You forgot important data',
        position: 'topLeft',
        // close: false,
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX'
    });
    
});
$(".trigger-error").on('click', function (event) {
    event.preventDefault();

    iziToast.error({
        id: 'error',
        title: 'Error',
        message: 'Illegal operation',
        position: 'topRight',
        transitionIn: 'fadeInDown'
    });
});


$(".trigger-progress").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        // backgroundColor: '#ffcbfb',
        progressBar: true,
        // color: 'dark',
        theme: 'dark', // 
        progressBarColor: 'rgb(0, 255, 184)',
        overlay: true,
        displayMode: 1,
        pauseOnHover: false,
        timeout: false,
        message: 'Progress control',
        position: 'center',
        buttons: [
            ['<button><b>START</b></button>', function (instance, toast) {
                instance.progress({timeout: 10000}, toast).start();
            }, true],
            ['<button><b>RESET</b></button>', function (instance, toast) {
                instance.progress({}, toast).reset();
            }],
            ['<button><b>RESUME</b></button>', function (instance, toast) {
                instance.progress({timeout: 10000}, toast).resume();
            }],
            ['<button>PAUSE</button>', function (instance, toast) {
                instance.progress({timeout: 10000}, toast).pause();
            }]
        ]
    });
});




$(".trigger-question").on('click', function (event) {
    event.preventDefault();




/*    iziToast.question({
        drag: false,
        close: false,
        overlay: true,
        title: 'Hey',
        message: 'How old are you?',
        position: 'center',
        inputs: [
            ['<input type="text">', 'keyup', function (instance, toast, input, e) {
                console.info(input.value);
            }, true], // true to focus
            ['<select><option value="">Select</option><option value="10 ~ 20">10 ~ 20</option><option value="21 ~ 30">21 ~ 30</option><option value="31 ~ 40">31 ~ 40</option><option value="40+">40+</option></select>', 'change', function (instance, toast, select, e) {
                console.info(select.options[select.selectedIndex].value);
            }]
        ],
        buttons: [
            ['<button><b>Confirm</b></button>', function (instance, toast, button, e, inputs) {

                alert('First field: ' + inputs[0].value)
                alert('Second field: ' + inputs[1].options[inputs[1].selectedIndex].value)

                instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
            }, false], // true to focus
        ]
    });
*/




    iziToast.question({
        rtl: false,
        layout: 1,
        drag: false,
        timeout: false,
        close: false,
        overlay: true,
        displayMode: 1,
        id: 'question',
        progressBar: true,
        title: 'Hey',
        message: 'How old are you?',
        position: 'center',
        inputs: [
            /*['<input type="text">', 'keyup', function (instance, toast, input, e) {
                console.info(e);
                console.info(input);
            }, true],
            ['<input type="number">', 'keydown', function (instance, toast, input, e) {
                console.info(e);
                console.info(input);
            }],*/
            ['<select><option value="Select">Select</option><option value="10 ~ 20">10 ~ 20</option><option value="21 ~ 30">21 ~ 30</option><option value="31 ~ 40">31 ~ 40</option><option value="40+">40+</option></select>', 'change', function (instance, toast, select, e) {
                console.info(select.options[select.selectedIndex].value);
                // console.info(select);
            }]
        ],
        buttons: [
            ['<button><b>Confirm</b></button>', function (instance, toast, button, e, inputs) {

                console.info(button);
                console.info(e);

                alert(inputs[0].options[inputs[0].selectedIndex].value)

                instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

               /* iziToast.success({
                    id: 'success',
                    zindex: 9999,
                    timeout: 2000,
                    title: 'Success',
                    overlay: true,
                    message: 'Thank you',
                    position: 'center'
                });*/

            }, false], // true to focus
            /*['<button>NO</button>', function (instance, toast, button, e) {

                console.info(button);
                console.info(e);

                // instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

            }]*/
        ],
        onClosing: function(instance, toast, closedBy){
            // console.info('Closing | closedBy: ' + closedBy);
        },
        onClosed: function(instance, toast, closedBy){
            // console.info('Closed | closedBy: ' + closedBy);
        }
    });

});






$(".trigger-custom1").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        id: 'show',
        title: 'Hey',
        icon: 'icon-drafts',
        class: 'custom1',
        displayMode: 2,
        message: 'This is a Balloon example with buttons',
        position: 'bottomCenter',
        image: 'img/avatar.jpg',
        balloon: true,
        buttons: [
            ['<button>Photo</button>', function (instance, toast) {

                // instance.hide({ transitionOut: 'fadeOutUp' }, toast);

                iziToast.show({
                    theme: 'dark',
                    icon: 'icon-photo',
                    title: 'OK',
                    message: 'Callback Photo!',
                    position: 'bottomCenter',
                    // iconText: 'star',
                });

            }, true],
            ['<button>Video</button>', function (instance, toast) {

                // instance.hide({ transitionOut: 'fadeOutUp' }, toast);

                iziToast.show({
                    theme: 'dark',
                    icon: 'icon-ondemand_video',
                    title: 'OK',
                    message: 'Callback VÃ­deo!',
                    position: 'bottomCenter',
                    // iconText: 'star',
                });

            }],
            ['<button>Text</button>', function (instance, toast) {

                // instance.hide({ transitionOut: 'fadeOutUp' }, toast);

                iziToast.show({
                    theme: 'dark',
                    icon: 'icon-event_note',
                    title: 'OK',
                    message: 'Callback Text!',
                    position: 'bottomCenter',
                    // iconText: 'star',
                });

            }]
        ]
    });

});









$(".trigger-inputs").on('click', function (event) {
    event.preventDefault();

    iziToast.info({
        timeout: 20000,
        overlay: true,
        displayMode: 1,
        id: 'inputs',
        zindex: 999,
        title: 'Inputs',
        message: 'Examples',
        position: 'center',
        drag: false,
        inputs: [
            ['<input type="checkbox">', 'change', function (instance, toast, input, e) {
                console.info(input.checked);
            }],
            ['<input type="text">', 'keyup', function (instance, toast, input, e) {
                console.info(input.value);
            }, true],
            ['<input type="number">', 'keydown', function (instance, toast, input, e) {
                console.info(input.value);
            }],
        ]
    });
});



$(".trigger-custom2").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        id: 'haduken',
        theme: 'dark',
        icon: 'icon-contacts',
        title: 'Hey',
        displayMode: 2,
        message: 'This is Layout <b>2</b> example',
        position: 'topCenter',
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
        progressBarColor: 'rgb(0, 255, 184)',
        image: 'img/avatar.jpg',
        imageWidth: 70,
        layout: 2,
        onClosing: function(){
            console.info('onClosing');
        },
        onClosed: function(instance, toast, closedBy){
            console.info('Closed | closedBy: ' + closedBy);
        },
        iconColor: 'rgb(0, 255, 184)'
    });
});


$(".trigger-animInsideFalse").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        title: 'Hey',
        icon: 'icon-drafts',
        class: 'animInsideFalse',
        message: 'What would you like to add?',
        position: 'bottomCenter',
        animateInside: false,
        image: 'img/avatar.jpg',
        buttons: [
            ['<button>Photo</button>', function (instance, toast) {

            }],
            ['<button>Video</button>', function (instance, toast) {

            }],
            ['<button>Text</button>', function (instance, toast) {

            }],
        ]
    });

});


document.addEventListener('iziToast-opening', function(data){
    // if(data.detail.id == 'haduken'){
        // console.info('EventListener iziToast-opening');
    // }
});

document.addEventListener('iziToast-opened', function(data){
    // if(data.detail.id == 'haduken'){
        // console.info('EventListener iziToast-opening');
    // }
});

document.addEventListener('iziToast-closing', function(data){
    // if(data.detail.id == 'haduken'){
        // console.info('EventListener iziToast-closing');
        // console.info(data.detail.closedBy);
    // }
});

document.addEventListener('iziToast-closed', function(data){
    // if(data.detail.id == 'haduken'){
        // console.info('EventListener iziToast-closed');
        // console.info(data.detail.closedBy);
    // }
});






$(".trigger-bounceInLeft").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        icon: 'icon-style',
        title: 'Transition',
        message: 'bounceInLeft',
        transitionIn: 'bounceInLeft',
        transitionInMobile: 'bounceInLeft',
        position: 'center'
    });
});

$(".trigger-bounceInRight").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        icon: 'icon-style',
        title: 'Transition',
        message: 'bounceInRight',
        transitionIn: 'bounceInRight',
        transitionInMobile: 'bounceInRight',
        position: 'center'
    });
});

$(".trigger-bounceInUp").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        icon: 'icon-style',
        title: 'Transition',
        message: 'bounceInUp',
        transitionIn: 'bounceInUp',
        transitionInMobile: 'bounceInUp',
        position: 'center'
    });
});

$(".trigger-bounceInDown").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        icon: 'icon-style',
        title: 'Transition',
        message: 'bounceInDown',
        transitionIn: 'bounceInDown',
        transitionInMobile: 'bounceInDown',
        position: 'center'
    });
});

$(".trigger-fadeIn").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        icon: 'icon-style',
        title: 'Transition',
        message: 'fadeIn',
        transitionIn: 'fadeIn',
        transitionInMobile: 'fadeIn',
        position: 'center'
    });
});

$(".trigger-fadeInDown").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        icon: 'icon-style',
        title: 'Transition',
        message: 'fadeInDown',
        transitionIn: 'fadeInDown',
        transitionInMobile: 'fadeInDown',
        position: 'center'
    });
});

$(".trigger-fadeInUp").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        icon: 'icon-style',
        title: 'Transition',
        message: 'fadeInUp',
        transitionIn: 'fadeInUp',
        transitionInMobile: 'fadeInUp',
        position: 'center'
    });
});

$(".trigger-fadeInLeft").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        icon: 'icon-style',
        title: 'Transition',
        message: 'fadeInLeft',
        transitionIn: 'fadeInLeft',
        transitionInMobile: 'fadeInLeft',
        position: 'center'
    });
});

$(".trigger-fadeInRight").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        icon: 'icon-style',
        title: 'Transition',
        message: 'fadeInRight',
        transitionIn: 'fadeInRight',
        transitionInMobile: 'fadeInRight',
        position: 'center'
    });
});

$(".trigger-flipInX").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        icon: 'icon-style',
        title: 'Transition',
        message: 'flipInX',
        transitionIn: 'flipInX',
        transitionInMobile: 'flipInX',
        position: 'center'
    });
});


$(".trigger-image").on('click', function (event) {
    event.preventDefault();
    iziToast.show({
        imageWidth: 50,
        image: 'img/avatar.jpg',
        theme: 'dark',
        icon: 'icon-person',
        title: 'Hey',
        message: 'How are you?',
        position: 'center',
        layout: 1
    });
});

$(".trigger-imageWidth").on('click', function (event) {
    event.preventDefault();
    iziToast.show({
        imageWidth: 100,
        image: 'img/avatar.jpg',
        theme: 'dark',
        icon: 'icon-person',
        title: 'Hey',
        message: 'How are you?',
        position: 'center',
        layout: 2
    });
});

$(".trigger-maxWidth").on('click', function (event) {
    event.preventDefault();
    iziToast.success({
        maxWidth: 500,
        position: 'center',
        title: 'Welcome to the iziToast!',
        message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum fuga tenetur qui vel nesciunt nihil suscipit ab saepe illum itaque.',
        position: 'bottomRight',
        transitionIn: 'bounceInLeft',
        // iconText: 'star',
        onOpened: function(instance, toast){

        },
        onClosed: function(instance, toast, closedBy){
            console.info('closedBy: ' + closedBy);
        }
    });
});

$(".trigger-layout1").on('click', function (event) {
    event.preventDefault();
    iziToast.show({
        title: 'Layout 1',
        icon: 'icon-palette',
        message: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
        position: 'center',
        layout: 1
    });
});
$(".trigger-layout2").on('click', function (event) {
    event.preventDefault();
    iziToast.show({
        title: 'Layout 2',
        icon: 'icon-palette',
        message: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
        position: 'center',
        layout: 2
    });
});

$(".trigger-balloon").on('click', function (event) {
    event.preventDefault();
    iziToast.show({
        theme: 'dark',
        progressBarColor: '#d48d37',
        title: 'Balloon',
        icon: 'icon-chat_bubble',
        message: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
        position: 'center',
        balloon: true
    });
});






$(".trigger-once").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        theme: 'dark',
        title: 'displayMode',
        message: "'once'",
        position: 'bottomLeft',
        displayMode: 1,
        progressBarColor: 'rgb(0, 255, 184)',
    });
});


$(".trigger-replace").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        theme: 'dark',
        title: 'displayMode',
        message: "'replace'",
        position: 'bottomRight',
        displayMode: 2,
        progressBarColor: 'rgb(0, 255, 184)',
    });
});







$(".trigger-bottomRight").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        theme: 'dark',
        icon: 'icon-style',
        title: 'Position',
        message: 'bottomRight',
        position: 'bottomRight'
    });
});
$(".trigger-bottomLeft").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        theme: 'dark',
        icon: 'icon-style',
        title: 'Position',
        message: 'bottomLeft',
        position: 'bottomLeft'
    });
});
$(".trigger-topRight").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        theme: 'dark',
        icon: 'icon-style',
        title: 'Position',
        message: 'topRight',
        position: 'topRight'
    });
});
$(".trigger-topLeft").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        theme: 'dark',
        icon: 'icon-style',
        title: 'Position',
        message: 'topLeft',
        position: 'topLeft'
    });
});
$(".trigger-topCenter").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        theme: 'dark',
        icon: 'icon-style',
        title: 'Position',
        message: 'topCenter',
        position: 'topCenter'
    });
});
$(".trigger-bottomCenter").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        theme: 'dark',
        icon: 'icon-style',
        title: 'Position',
        message: 'bottomCenter',
        position: 'bottomCenter'
    });
});
$(".trigger-center").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        theme: 'dark',
        icon: 'icon-style',
        title: 'Position',
        message: 'center',
        position: 'center'
    });
});


$(".trigger-show").on('click', function (event) {
    event.preventDefault();


    iziToast.show({
        theme: 'dark',
        icon: 'icon-person',
        title: 'Hey',
        message: 'Welcome!',
        position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
        progressBarColor: 'rgb(0, 255, 184)',
        buttons: [
            ['<button>Ok</button>', function (instance, toast) {
                alert("Hello world!");
            }, true], // true to focus
            ['<button>Close</button>', function (instance, toast) {
                instance.hide({
                    transitionOut: 'fadeOutUp',
                    onClosing: function(instance, toast, closedBy){
                        console.info('closedBy: ' + closedBy); // The return will be: 'closedBy: buttonName'
                    }
                }, toast, 'buttonName');
            }]
        ],
        onOpening: function(instance, toast){
            console.info('callback abriu!');
        },
        onClosing: function(instance, toast, closedBy){
            console.info('closedBy: ' + closedBy); // tells if it was closed by 'drag' or 'button'
        }
    });


});


$(".trigger-pause").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        theme: 'dark',
        icon: 'icon-mouse',
        title: 'Pause',
        message: 'OnHover',
        position: 'center',
        progressBarColor: 'rgb(0, 255, 184)',
    });
});

$(".trigger-reset").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        theme: 'dark',
        icon: 'icon-mouse',
        title: 'Reset',
        message: 'OnHover',
        position: 'center',
        resetOnHover: true,
        progressBarColor: 'rgb(0, 255, 184)',
    });
});




$(".trigger-target").on('click', function (event) {
    event.preventDefault();

    iziToast.show({
        color: '#fff',
        icon: 'icon-style',
        title: 'Target',
        message: 'Specifying a Target',
        transitionIn: 'flipInX',
        transitionInMobile: 'flipInX',
        target: '.target-example',
        targetFirst: false,
        progressBarColor: '#d48d37',
    });
});


$(".trigger-iconUrl").on('click', function (event) {
    event.preventDefault();

    iziToast.warning({
        id: 'iconUrl',
        title: 'Favorite!',
        message: 'Alternative icon example',
        iconUrl: 'img/star.svg',
        position: 'center'
    });
});

// sparkline
$(function() {
    $('.primary').sparkline([10, 8, 5, 7, 4, 4, 4, 3, 4, 5, 6, 5, 8], {
        type: 'bar',
        height: '35',
        width: '100%',
        barColor: '#007bff'
    });
    $('.warning').sparkline([10, 8, 5, 7, 4, 4, 1, 4, 5, 6, 6, 7, 4], {
        type: 'bar',
        height: '35',
        width: '100%',
        barColor: '#ffc107'
    });
    $('.info').sparkline([10, 8, 5, 7, 4, 4, 4, 6, 4, 4, 6, 5, 4, 4], {
        type: 'bar',
        height: '35',
        width: '100%',
        barColor: '#17a2b8'
    });
    $('.danger').sparkline([10, 8, 5, 7, 10, 8, 5, 7, 4, 4, 1], {
        type: 'bar',
        height: '35',
        width: '100%',
        barColor: '#dc3545'
    });
});
// sweetalert2
$( "#swal-1" ).click(function() {
    Swal.fire(
    'Good job!',
    'You clicked the button!',
    'success'
    )
});
$( "#swal-2" ).click(function() {
    Swal.fire(
    'Good job!',
    'You clicked the button!',
    'success'
    )
});
$( "#swal-3" ).click(function() {
    Swal.fire(
    'warning!',
    'You clicked the button!',
    'warning'
    )
});
$( "#swal-4" ).click(function() {
    Swal.fire(
    'info!',
    'You clicked the button!',
    'info'
    )
});
$( "#swal-5" ).click(function() {
    Swal.fire(
    'question!',
    'You clicked the button!',
    'question'
    )
});
$( "#swal-6" ).click(function() {
    Swal.fire(
    'Error!',
    'You clicked the button!',
    'error'
    )
});


// chat logic
$(".media").click(function() {
    $('.threads').addClass('d-none');
    $('.conversation').removeClass('d-none');
});
$("#back").click(function() {
    $('.threads').removeClass('d-none');
    $('.conversation').addClass('d-none');
});

// datatables
$(document).ready(function() {
    $('#example').DataTable();
});

// layouts
$(document).ready(function() {
    $("select.Layout").change(function() {
        var selectedLayout = $(this).children("option:selected").val();
        $("body").removeClass('mini top-nav').addClass(selectedLayout)

    });
});

// hide tooltip on cclick
$('[data-toggle="tooltip"]').click(function () {
    $('[data-toggle="tooltip"]').tooltip("hide");

});
  
// humberger style  
$(".js-hamburger").click(function() {
    $("body").toggleClass("mini");
    $(".hamburger-toggle").toggleClass("is-opened");
});

$(window).scroll(function() {
    if (($(document).height() - $(window).height()) - $(window).scrollTop() < 30) {
        $(".customizer").addClass("bottom");
    } else {
        $(".customizer").removeClass("bottom");
    }
});



// stat counter
$('.box').each(function() {
    $(this).prop('Counter', 0).animate({
        Counter: $(this).text()
    }, {
        duration: Number($(this).attr("data-duration")),
        easing: 'swing',
        step: function(now) {
            $(this).text(Math.ceil(now));
        }
    });
});

// chatjs
window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

(function(global) {
    var MONTHS = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    var COLORS = [
        '#4dc9f6',
        '#f67019',
        '#f53794',
        '#537bc4',
        '#acc236',
        '#166a8f',
        '#00a950',
        '#58595b',
        '#8549ba'
    ];

    var Samples = global.Samples || (global.Samples = {});
    var Color = global.Color;

    Samples.utils = {
        // Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
        srand: function(seed) {
            this._seed = seed;
        },

        rand: function(min, max) {
            var seed = this._seed;
            min = min === undefined ? 0 : min;
            max = max === undefined ? 1 : max;
            this._seed = (seed * 9301 + 49297) % 233280;
            return min + (this._seed / 233280) * (max - min);
        },

        numbers: function(config) {
            var cfg = config || {};
            var min = cfg.min || 0;
            var max = cfg.max || 1;
            var from = cfg.from || [];
            var count = cfg.count || 8;
            var decimals = cfg.decimals || 8;
            var continuity = cfg.continuity || 1;
            var dfactor = Math.pow(10, decimals) || 0;
            var data = [];
            var i, value;

            for (i = 0; i < count; ++i) {
                value = (from[i] || 0) + this.rand(min, max);
                if (this.rand() <= continuity) {
                    data.push(Math.round(dfactor * value) / dfactor);
                } else {
                    data.push(null);
                }
            }

            return data;
        },

        labels: function(config) {
            var cfg = config || {};
            var min = cfg.min || 0;
            var max = cfg.max || 100;
            var count = cfg.count || 8;
            var step = (max - min) / count;
            var decimals = cfg.decimals || 8;
            var dfactor = Math.pow(10, decimals) || 0;
            var prefix = cfg.prefix || '';
            var values = [];
            var i;

            for (i = min; i < max; i += step) {
                values.push(prefix + Math.round(dfactor * i) / dfactor);
            }

            return values;
        },

        months: function(config) {
            var cfg = config || {};
            var count = cfg.count || 12;
            var section = cfg.section;
            var values = [];
            var i, value;

            for (i = 0; i < count; ++i) {
                value = MONTHS[Math.ceil(i) % 12];
                values.push(value.substring(0, section));
            }

            return values;
        },

        color: function(index) {
            return COLORS[index % COLORS.length];
        },

        transparentize: function(color, opacity) {
            var alpha = opacity === undefined ? 0.5 : 1 - opacity;
            return Color(color).alpha(alpha).rgbString();
        }
    };

    // DEPRECATED
    window.randomScalingFactor = function() {
        return Math.round(Samples.utils.rand(-100, 100));
    };

    // INITIALIZATION

    Samples.utils.srand(Date.now());

    // Google Analytics
    /* eslint-disable */
    if (document.location.hostname.match(/^(www\.)?chartjs\.org$/)) {
        (function(i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function() {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
        ga('create', 'UA-28909194-3', 'auto');
        ga('send', 'pageview');
    }
    /* eslint-enable */

}(this));

//======================== pie chat================================================>
var randomScalingFactor = function() {
    return Math.round(Math.random() * 100);
};

var barChartData = {
    labels: [
        'Red',
        'Orange',
        'Yellow',
        'Green',
        'Blue'
    ],
    datasets: [{
        data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
        ],
        backgroundColor: [
            window.chartColors.red,
            window.chartColors.orange,
            window.chartColors.yellow,
            window.chartColors.green,
            window.chartColors.blue,
        ],
        label: 'Dataset 1'
    }],

};

var barChartData_2 = {
    labels: [
        'Red',
        'Orange',
        'Yellow',
        'Green',
        'Blue'
    ],
    datasets: [{
        label: 'Dataset 1',
        backgroundColor: [
            window.chartColors.red,
            window.chartColors.orange,
            window.chartColors.yellow,
            window.chartColors.green,
            window.chartColors.blue,
            window.chartColors.purple,
            window.chartColors.red
        ],
        yAxisID: 'y-axis-1',
        data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
        ],
    }]

};

window.onload = function() {
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Chart.js Bar Chart - Multi Axis'
            },
            tooltips: {
                mode: 'index',
                intersect: true
            },
            scales: {
                yAxes: [{
                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                }],
            }
        }
    });

    var ctx_2 = document.getElementById('canvas2').getContext('2d');
    window.myBar = new Chart(ctx_2, {
        type: 'pie',
        data: barChartData_2,
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Chart.js Bar Chart - Multi Axis'
            },
            tooltips: {
                mode: 'index',
                intersect: true
            },
            scales: {
                yAxes: [{
                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                }],
            }
        }
    });

    var ctx_3 = document.getElementById('canvas3').getContext('2d');
    window.myBar = new Chart(ctx_3, {
        type: 'radar',
        data: barChartData_2,
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Chart.js Bar Chart - Multi Axis'
            },
            tooltips: {
                mode: 'index',
                intersect: true
            },
            scales: {
                yAxes: [{
                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                }],
            }
        }
    });

    var ctx_4 = document.getElementById('canvas4').getContext('2d');
    window.myBar = new Chart(ctx_4, {
        type: 'line',
        data: barChartData_2,
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Chart.js Bar Chart - Multi Axis'
            },
            tooltips: {
                mode: 'index',
                intersect: true
            },
            scales: {
                yAxes: [{
                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                }],
            }
        }
    });

    var ctx_5 = document.getElementById('canvas5').getContext('2d');
    window.myBar = new Chart(ctx_5, {
        type: 'doughnut',
        data: barChartData_2,
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Chart.js Bar Chart - Multi Axis'
            },
            tooltips: {
                mode: 'index',
                intersect: true
            },
            scales: {
                yAxes: [{
                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                }],
            }
        }
    });

    var ctx_6 = document.getElementById('canvas6').getContext('2d');
    window.myBar = new Chart(ctx_6, {
        type: 'bubble',
        data: barChartData_2,
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Chart.js Bar Chart - Multi Axis'
            },
            tooltips: {
                mode: 'index',
                intersect: true
            },
            scales: {
                yAxes: [{
                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                }],
            }
        }
    });

};

//Avatar Letter script
(function(w, d) {

    function LetterAvatar(name, size) {

        name = name || '';
        size = size || 60;

        var colours = [
                "orange", "blue", "teal", "green", "teal", "red", "purple", "black", "violet", "#2c3e50",
                "#f1c40f", "#e67e22", "#e74c3c", "#ecf0f1", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"
            ],
            nameSplit = String(name).toUpperCase().split(' '),
            initials, charIndex, colourIndex, canvas, context, dataURI;

        if (nameSplit.length == 1) {
            initials = nameSplit[0] ? nameSplit[0].charAt(0) : '?';
        } else {
            initials = nameSplit[0].charAt(0) + nameSplit[1].charAt(0);
        }

        if (w.devicePixelRatio) {
            size = (size * w.devicePixelRatio);
        }

        charIndex = (initials == '?' ? 72 : initials.charCodeAt(0)) - 64;
        colourIndex = charIndex % 20;
        canvas = d.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        context = canvas.getContext("2d");

        context.fillStyle = colours[colourIndex - 1];
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = Math.round(canvas.width / 2) + "px Arial";
        context.textAlign = "center";
        context.fillStyle = "#FFF";
        context.fillText(initials, size / 2, size / 1.5);

        dataURI = canvas.toDataURL();
        canvas = null;

        return dataURI;
    }

    LetterAvatar.transform = function() {

        Array.prototype.forEach.call(d.querySelectorAll('img[avatar]'), function(img, name) {
            name = img.getAttribute('avatar');
            img.src = LetterAvatar(name, img.getAttribute('width'));
            img.removeAttribute('avatar');
            img.setAttribute('alt', name);
        });
    };

    // AMD support
    if (typeof define === 'function' && define.amd) {

        define(function() {
            return LetterAvatar;
        });

        // CommonJS and Node.js module support.
    } else if (typeof exports !== 'undefined') {

        // Support Node.js specific `module.exports` (which can be a function)
        if (typeof module != 'undefined' && module.exports) {
            exports = module.exports = LetterAvatar;
        }

        // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
        exports.LetterAvatar = LetterAvatar;

    } else {

        window.LetterAvatar = LetterAvatar;

        d.addEventListener('DOMContentLoaded', function(event) {
            LetterAvatar.transform();
        });
    }

})(window, document);

var config = {
    type: 'line',
    data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '2', '3', '4', '5', '6', '7', '2', '3', '4', '5', '6', '7', '1', '2', '3', '4', '5', '6', '7', '2', '3', '4', '5', '6', '7', '2', '3', '4', '5', '6', '7', '1', '2', '3', '4', '5', '6', '7', '2', '3', '4', '5', '6', '7', '2', '3', '4', '5', '6', '7', , '2', '3', '4', '5', '6', '7', '2', '3', '4', '5', '6', '7', '1', '2', '3', '4', '5', '6', '7'],
        datasets: [{
            label: 'My First dataset',
            borderColor: '#9fccfe',
            backgroundColor: '#9fccfe',
            data: [13, 13, 6, 6, 6, 5, 5, 5, 6, 7, 6, 9, 9, 8, 10, 10, 10, 10, 9, 9, 10, 9, 9, 8, 8, 8, 8, 8, 7, 7, 6, 6, 6, 6, 5, 5, 4, 4, 5, 5, 5, 7, 7, 10, 9, 9, 10, 11, 11, 8, 8, 7, 8, 9, 8, 9, 10, 9, 10, 16, 17, 16, 17, 16, 15, 14, 24, 18, 15, 14, 16, 16, 17, 7, 7, 7, 8, 9],
        }, {
            label: 'My Third dataset',
            borderColor: '#007bff',
            backgroundColor: '#007bff',
            data: [14, 13, 15, 14, 13, 15, 16, 16, 14, 14, 13, 12, 13, 13, 15, 16, 16, 17, 17, 18, 15, 15, 15, 19, 19, 18, 18, 17, 16, 18, 18, 18, 16, 14, 14, 13, 14, 13, 10, 9, 10, 11, 11, 11, 10, 9, 10, 13, 14, 14, 13, 12, 11, 13, 13, 13, 13, 14, 13, 13, 19, 21, 22, 25, 24, 24, 22, 16, 15, 12, 12, 15, 15, 15, 18, 18, 17],
        }]
    },
    options: {
        responsive: true,
        elements: {
            line: {
                tension: 0
            },
            point: {
                radius: 0,
            }
        },
        title: {
            display: false,
        },
        legend: {
            display: false
        },
        tooltips: {
            mode: 'index',
        },
        hover: {
            mode: 'index'
        },
        scales: {
            yAxes: [{
                stacked: true,
                display: false
            }],
            xAxes: [{
                display: false
            }]
        }
    }
};
window.weekly = function() {
    return Math.round(Samples.utils.rand(5, 100));
};

var ctx = document.getElementById('myChart').getContext('2d');
window.myLine = new Chart(ctx, config);

document.getElementById('randomizeData').addEventListener('click', function() {
    config.data.datasets.forEach(function(dataset) {
        dataset.data = dataset.data.map(function() {
            return weekly();
        });

    });

    window.myLine.update();
});

// izitoast plugin
$(function() {
    /** This code runs when everything has been loaded on the page */
    /* Inline sparklines take their values from the contents of the tag */
    $('.inlinesparkline').sparkline(); 
    
    $("#sparkline").sparkline([4,6,7,7,4,3,2,1,4,6,4,6,7,7,5,3,4], {
    type: 'discrete'});
    
    $("#sparkline7").sparkline([4,6,7,7,4,3,2,1,4,6,4,6,7,7,5,3,4], {
    type: 'pie',
    width: '100%',
    height: '25',
    spotColor: '#ffffff'
    });
    
    $("#spark1").sparkline([4,2,3], {
    type: 'pie',
    width: '70',
    height: '50',
    raw: false}
    );
    
    $("#spark2").sparkline([45,27,34,52,30,59,50], {
    type: 'bar',
    width: '70',
    height: '50',
    raw: false}
    );
    
    $("#spark3").sparkline([4,27,34,52,54,59,61,68,78,82,85,87,91,93,100], {
    type: 'inlinebar',
    width: '100%',
    height: '50',
    raw: false}
    );
    
    $("#spark4").sparkline([4,27,34,52,54,59,61,68,78,82,85,87,91,93,100], {
    type: 'box',
    width: '100%',
    height: '50',
    raw: false}
    );
    
    $("#sparkline2").sparkline([1,1,0,1,-1,-1,1,-1,0,0,1,1], {
    type: 'tristate'});
    
    $("#sparkline3").sparkline([10,12,12,9,7], {
        type: 'bullet'});
        
    $("#sparkline4").sparkline([1,1,2], {
        type: 'pie'});
        
    $("#sparkline5").sparkline([4,27,34,10,54,40,61,68,40,82,20], {
        type: 'bar'});
    $("#sparkline6").sparkline([4,27,34,10,54,40,61,68,40,82,20], {
    type: 'inlinebar'});

    /* Sparklines can also take their values from the first argument 
    passed to the sparkline() function */
    var myvalues = [1,3,4,5,3,5];
    $('.dynamicsparkline').sparkline(myvalues);

    /* The second argument gives options such as chart type */
    $('.dynamicbar').sparkline(myvalues, {type: 'bar', barColor: '#059dfe',height:'50'} );

    /* Use 'html' instead of an array of values to pass options 
    to a sparkline with data in the tag */
    $('.inlinebar').sparkline('html', {type: 'bar', barColor: 'red'} );
});

var strings = strings || {};
var nanotrader = nanotrader || { utils : {}, ui : {} };

/**
* Checks on the strings object for the specified key. If the value doesn't exist the key is returned
* @author Carlos Soto <carlos.soto@lognllc.com>
* @param string key for the translation requested
* @return mixed The translated value for that key
*/
function translate(key) {
    var value = key;
    if (typeof strings[key] != 'undefined') {
        value = strings[key];
    }

    // replace the rest of the arguments into the string
    for( var i = 1; i < arguments.length; i++) {
        value = value.replace('%' + i + '$s', args[i]);
    }

    return value;
}

steal(
    './views/jqplot/jquery.jqplot.min.css',     // jqplot CSS file
    './strings.js',                             // String file with all the text for the application
    '../jquery/jquery.js').then(                // Jquery file
    './views/bootstrap/nanobootstrap.js').then( // Bootstrap files
    './nanotrader.css',                         // application CSS file
    './lib/nanotrader.utils.js',                // application utility functions
    './views/navbar/navbar.js',                 // Navigation Bar View
    function(){                                 // configure your application

        nanotrader.ui.navbar = new ui.Navbar($('#navbar'));
        nanotrader.ui.loading = $('#loading');

        //Hide the loading Message
        nanotrader.ui.loading.hide();

        nanotrader.ui.navbar.render();

        /*
        if( nanotrader.utils.loggedIn() ){
            //Render Dashboard
            nanotrader.ui.navbar.render();
        }
        else
        {
            //Render the Login Page
            alert('login page!');
        }
        */

        /*
        // For the dashboard
        $('div#collapseOne').hide(); 
            $(".collapse").collapse('show');
            $('div.show-transactions').click(function () {
                if ($('div.show-transactions').hasClass('active')) {
                    $('div#collapseOne').hide();
                    $('div.show-transactions').removeClass('active');
                } else {
                    $('div#collapseOne').show(); 
                    $('div.show-transactions').addClass('active');
                }
            }
            
            );
        $('.typeahead').typeahead();
        $('.myModal').modal('hide');
        */
    });
    /* <link href="custom/css/jquery.jqplot.min.css" rel="stylesheet"> */
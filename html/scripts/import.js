/**
 * Import script for the HTML5 Security Cheatsheet HTML version
 */
(function(){
    window.onload = function(){
        (function(){
            for (var category in categories) {
                var ul = $('#category_template');
                var li = ul.find('li')
                li.addClass(category).find('h3').html(categories[category]);
                $('#categories').append(ul.html());
                li.removeClass(category);
            }
            $('#categories li').wrapAll('<ul></ul>');
        })();
        (function(){
            for (var item in items) {
                for (var payload in payloads) {
                    var regex = new RegExp('%' + payload + '%');
                    items[item].data = items[item].data.replace(regex, payloads[payload]);
                    items[item].data = items[item].data.replace(/</, '&lt;');
                    items[item].data = items[item].data.replace(/>/, '&gt;');
                }
                var li = $('#categories li.'+items[item].category+' h3');
                var container = $($('#item_template').html());
                
                for(var c in items[item]) {
                    if(typeof items[item][c] === 'string') {
                        items[item][c] = items[item][c].replace(/</, '&lt;');
                        items[item][c] = items[item][c].replace(/>/, '&gt;');                        
                        container.find('.'+c).html(items[item][c]);        
                    }
                }
                if(items[item].browsers) {
                    for(var browser in items[item].browsers) {
                        container.find('.browsers').append('<ul class="'+browser+'" />');
                        for(var version in items[item].browsers[browser]) {
                            container.find('.browsers .'+browser).append(
                                '<li>'+browser+' '+items[item].browsers[browser][version]+'</li>'
                            )
                        }
                    } 
                }   
                if(items[item].tags) {
                    for(var tag in items[item].tags) {
                        container.find('.tags').append('<li>'+items[item].tags[tag]+'</li>');
                    } 
                }   
                if(items[item].tickets) {
                    for(var ticket in items[item].tickets) {
                        container.find('.tickets').append('<li>'+items[item].tickets[ticket]+'</li>');
                    } 
                }                  
                li.after(container);
            }
        })();
    };
})();

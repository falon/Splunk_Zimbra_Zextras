require([
    'underscore',
    'jquery',
    'splunkjs/mvc',
    'splunkjs/mvc/tableview',
    'splunkjs/mvc/simplexml/ready!'
], function(_, $, mvc, TableView) {
    mvc.Components.get('highlight_sent').getVisualization(function(tableView) {
        tableView.on('rendered', function() {
             setTimeout(function(){
                $('div#highlight_sent table td[data-cell-index="4"] div.multivalue-subcell') .each(function(){
                  var strMultiValueTest=$(this).text();
                  if(strMultiValueTest=="sent"){
                      $(this).addClass("highlight-green");
                  }
                });
            },100);
        });
    });
});


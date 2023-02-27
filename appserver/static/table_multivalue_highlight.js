require([
    'underscore',
    'jquery',
    'splunkjs/mvc',
    'splunkjs/mvc/tableview',
    'splunkjs/mvc/simplexml/ready!'
], function(_, $, mvc, TableView) {
    mvc.Components.get('highlight').getVisualization(function(tableView) {
        tableView.on('rendered', function() {
             setTimeout(function(){ 
                $('div#highlight table td[data-cell-index="1"] div.multivalue-subcell') .each(function(){
                    var strMultiValueTest=$(this).text();
                    if(strMultiValueTest!="Agent" && strMultiValueTest!="auth_name" && strMultiValueTest!="authz_name" && strMultiValueTest!="src_ip"){
                        $(this).addClass("highlight-green");
                    }
                }); 
             },100);
	     setTimeout(function(){
		$('div#highlight table td[data-cell-index="2"] div.multivalue-subcell') .each(function(){
		   var strMultiValueTest=$(this).text();
		   if(strMultiValueTest=="zimbra"){
			$(this).addClass("highlight-red");
                   }
                });
             },100);
        });
    });
});

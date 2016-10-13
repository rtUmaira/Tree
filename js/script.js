	var tree;
	// var counter2 = 1;
	$(document).ready(function(){
	    tree = $('#myTree').clone();
		$('#myTree').tree();


	});

	function toggle(element) {
		// console.log('toggle');
		$(element).toggleClass("open");	    
		// console.log('counter2: ', counter2);
		if ( !$(element).hasClass("open") ) {	    	
	    	// not expanded
	    	console.log('---------');	
	    	// console.log($(tree).children().html());	
	   		$('#myTree').replaceWith(tree);
	    } else {
	    	var folder = $(element).closest("li")[0];
		    // console.log('folder', folder);
			// find the folder's concerned img 
			var img_id = folder.children[0].children[1];
			//console.log('img_id', img_id);
			$(img_id).toggle();

			// find the folder's concerned load more
			var load_id = folder.children[2].id;
			//console.log('load_id', load_id);

			$("#"+load_id).toggle();

			// view folder's contents
			var ul_id = folder.children[1].id;
			// console.log('id', $('#'+ul_id).children() );

			var size_li = $("#"+ul_id).children("li").size();
			//console.log('size: ', size_li);
		    var x = 3;
		    $("#"+ul_id).children(" li:lt("+x+")").css( "display", "block");
		    $("#"+ul_id).attr('class', 'tree-branch-children');
		    var counter = 1;

		    $('#'+load_id).click(function () {	    	
		    	// counter++;
		    	// console.log(counter);
		        x = (x+3 <= size_li) ? x+3 : size_li;
		        // console.log('x: ', x);
		        $("#"+ul_id).children(" li:lt("+x+")").css( "display", "block");	      
		    	
		    	if ( $(img_id).hasClass("fa fa-sort-alpha-desc") ) 
		    	{	
		    		$(img_id).attr('class', "fa fa-sort-alpha-asc");
		    	}
		    });
	    }
	}

	function sort(element) {
		// get ul children of branch
		var folder = $(element).closest("li")[0];

		var img_id = folder.children[0].children[1];
		if ( $(img_id).hasClass("fa fa-sort-alpha-asc") ) 
    	{	
    		$(img_id).attr('class', "fa fa-sort-alpha-desc");
    	} else {
    		$(img_id).attr('class', "fa fa-sort-alpha-asc")
    	}
		// console.log(img_id);
		// console.log(img_id);
		var items = [];
		var children = $(folder).children("ul").children("li");

		//console.log($('#item1').css('display'));
		// console.log('children: ', children);
		for (var i = 0; i < children.length; i++) {
		  	var child = children[i];
		  	// console.log('child: ', child,  $('#' + child.id).css('display') );
		  	if ( $('#'+child.id).css("display") === "block")
		  	{
		  		items.push(child);
		  	}
		}
		// console.log(items[1].id.indexOf("folder"));
		
		
		items.sort(function(a,b){
			var keyA;
			var keyB;
			// console.log('a: ', a);
			// console.log('b: ', b);
			if (a.id.indexOf("folder") == "0"  && b.id.indexOf("folder") == "0")	
			{
				//console.log('1');
				keyA = $(a.children[0].children[0].children[2]).text().trim();
			  	keyB = $(b.children[0].children[0].children[2]).text().trim();
			} else if (a.id.indexOf("folder") == "-1" && b.id.indexOf("folder") == "0") 
			{
				//console.log('2');
				keyA = $(a).text().trim();
			  	keyB = $(b.children[0].children[0].children[2]).text().trim();
			} else if (a.id.indexOf("folder") == "0" && b.id.indexOf("folder") == "-1") 
			{
				//console.log('3');
				keyA = $(a.children[0].children[0].children[2]).text().trim();
			  	keyB = $(b).text().trim();
			} else {
				//console.log('4');
				keyA = $(a).text().trim();
			  	keyB = $(b).text().trim();
			}
			// console.log ('keyA: ', keyA);
			// console.log('keyB: ', keyB);
			keyA = keyA.toUpperCase();
			keyB = keyB.toUpperCase();

			//console.log('-----------------------');
		  	if (keyA < keyB) {
		  		//console.log('-1');
		  		if ( !$(img_id).hasClass("fa fa-sort-alpha-desc") ) {	
		  			return 1;
		  		} else {
		  			return -1
		  		}
		  	}
		  	if (keyA > keyB) {
		  		//console.log('1');
		  		if ( !$(img_id).hasClass("fa fa-sort-alpha-desc") ) {	
		  			return -1;
		  		} else {
		  			return 1
		  		}
		  	}
		  	return 0;
		});


		var ul = $(folder).children("ul");
		$.each(items, function(i, li){
		  ul.append(li);
		});
	}
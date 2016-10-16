$(document).ready(function() {
    // tree = $('#myTree').clone();
	$('#myTree').tree();
	// console.log($('.tree-branch-name'));
	$('.tree-branch-name').click(function () {	    	
    	console.log('toggle');
    	var element = this;

    	var folder = $(element).closest("li");
    	$(folder).removeClass("tree-selected");
    	// console.log('folder: ', folder);
		// find the folder's concerned img 
		var img = $(folder).children("div").children(".sort");
		// console.log('img:', img);
		$(folder).toggleClass("tree-open");

		var loadMore = $(folder).children(".loadMore");
		// console.log('load: ', loadMore);
		// // console.log('counter2: ', counter2);
		if ( !$(element).hasClass("kids") || $(folder).hasClass("tree-open")) {
			// all kids not shown 
	    	$(loadMore).toggle();
	    	$(img).toggle();
	    	// console.log(element);
	    }
		var ul = $(folder).children("ul");

		if ( !$(folder).hasClass("tree-open") ) {	    	
	    	// not expanded
	    	console.log('close: ');
	    	close_subFolders($(ul).children(".tree-branch"));
	   		
	   		$(ul).children("li .tree-item").css( "display", "none");
	   		$(element).toggleClass("kids"); 
	   		$(img).css( "display", "none");
		    $(loadMore).css( "display", "none");
	    } else {
	    	console.log('open: ');

			var size_li = $(ul).children("li").size();  
		    var x = 3;
		    // if children has class hidden then remove it 

		    // if ( $(ul).hasClass("hidden") {
		    // 	$(ul).removeClass("hidden");
		    // }
		    $(ul).children(" li:lt("+x+")").css( "display", "block");
		    // $(ul).attr('class', 'tree-branch-children');

		    $(loadMore).click(function () {	 
		    	var count_kids = 0; 
		        x = (x+3 <= size_li) ? x+3 : size_li;
		        // console.log('x: ', x);
		        $(ul).children(" li:lt("+x+")").css( "display", "block");
		        var children = $(ul).children("li");

		        // toggle load more  if more kids displayed.
		        for (var i = 0; i < children.length; i++) {
				  	var child = children[i];
				  	// console.log('child: ', child,  $('#' + child.id).css('display') );
				  	if ( $(child).css("display") === "block")
				  	{
				  		count_kids++;
				  	}
				}
				console.log('count_kids', count_kids);
		        if (count_kids == size_li)
		        {
		        	//console.log('please stahp');
		        	$(loadMore).css( "display", "none");
		        	$(element).toggleClass("kids"); 
		        	count_kids = 0;
		        }	      
		    	
		    	if ( $(img).hasClass("fa fa-sort-alpha-desc") ) 
		    	{	
		    		$(img).attr('class', "fa fa-sort-alpha-asc");
		    	}
		    });

	    }
    });
		

    $('.sort').click(function () {	 

    	// get ul children of branch
		var folder = $(this).closest("li")[0];

		var img = folder.children[0].children[1];
		if ( $(img).hasClass("fa fa-sort-alpha-asc") ) 
    	{	
    		$(img).attr('class', "fa fa-sort-alpha-desc");
    	} else {
    		$(img).attr('class', "fa fa-sort-alpha-asc")
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
		  	if ( $(child).css("display") === "block")
		  	{
		  		items.push(child);
		  	}
		}
		// console.log(items);
		
		
		items.sort(function(a,b){
			var keyA;
			var keyB;
			// console.log('a: ', a.className.includes("branch"));
			// console.log('b: ', b.className.includes("item"));
			if ( a.className.includes("branch") === "true"  &&  a.className.includes("branch") == "true")	
			{
				//console.log('1');
				keyA = $(a.children[0].children[0].children[2]).text().trim();
			  	keyB = $(b.children[0].children[0].children[2]).text().trim();
			} else if ( a.className.includes("branch") === "false"  &&  a.className.includes("branch") == "true") 
			{
				//console.log('2');
				keyA = $(a).text().trim();
			  	keyB = $(b.children[0].children[0].children[2]).text().trim();
			} else if ( a.className.includes("branch") === "true"  &&  a.className.includes("branch") == "false") 
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
		  		if ( !$(img).hasClass("fa fa-sort-alpha-desc") ) {	
		  			return 1;
		  		} else {
		  			return -1
		  		}
		  	}
		  	if (keyA > keyB) {
		  		//console.log('1');
		  		if ( !$(img).hasClass("fa fa-sort-alpha-desc") ) {	
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

		// console.log('ul:', $(ul).children());
    });

});


function close_subFolders(sub_folders)
{
	// if this current folder has more sub branches then close them
	for (var i = 0; i < sub_folders.length; i++) {
	  	if ( $(sub_folders[i]).hasClass("tree-open") && !$(sub_folders[i]).children("ul").hasClass("hidden")  ) {
	  		// if the branch was opened previously then show only first 3 children
	  		$(sub_folders[i]).children("div").children(".sort").toggle();
	  		$(sub_folders[i]).children(".loadMore").css("display", "none");
	  		$(sub_folders[i]).children("ul").children("li").css( "display", "none");
	  		$('#myTree').tree('closeFolder', $(sub_folders[i]).children("div") );
	  		// check further
	  		close_subFolders( $(sub_folders[i]).children("ul").children("li .tree-branch") );			  		
	  	}		  	
	}
}
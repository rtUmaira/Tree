var tree;
	// var counter2 = 1;
	$(document).ready(function() {
	    tree = $('#myTree').clone();
		$('#myTree').tree();
		// console.log($('.tree-branch-name'));
		$('.tree-branch-name').click(function () {	    	
	    	// console.log('this1', this);
	    	var element = this;
	    	var folder = $(element).closest("li")[0];
		    // console.log('folder', folder);
			// find the folder's concerned img 
			var img = folder.children[0].children[1];
			//console.log('img_id', img_id);
			$(img).toggle();

			// find the folder's concerned load more
			var loadMore = folder.children[2];
			//console.log('load_id', load_id);
			$(loadMore).toggle();
	    	// console.log('toggle');
			$(element).toggleClass("open");	    
			// console.log('counter2: ', counter2);
			if ( !$(element).hasClass("open") ) {	    	
		    	// not expanded
		    	console.log('close');
		    	// console.log($(tree).children().html());	
		   		// $('#myTree').replaceWith(tree);
		   		//$('#myTree').tree('destroy');
		   		// $('#myTree').tree('closeAll');
		   		// $(loadMore).toggle();

		    } else {
		    	console.log('open');	    	
		    	
				if ( $(img).hasClass("fa fa-sort-alpha-asc") ) 
		    	{	
		    		var ul = folder.children[1];
					// console.log('id', $('#'+ul_id).children() );

					var size_li = $(ul).children("li").size();
					//console.log('size: ', size_li);
				    var x = 3;
				    $(ul).children(" li:lt("+x+")").css( "display", "block");
				    $(ul).attr('class', 'tree-branch-children');
		    	}				

			    $(loadMore).click(function () {	    	
			    	// counter++;
			    	// console.log(counter);
			        x = (x+3 <= size_li) ? x+3 : size_li;
			        // console.log('x: ', x);
			        $(ul).children(" li:lt("+x+")").css( "display", "block");
			        if (x == size_li)
			        {
			        	$(loadMore).toggle();
			        }	      
			    	
			    	if ( $(img).hasClass("fa fa-sort-alpha-desc") ) 
			    	{	
			    		$(img).attr('class', "fa fa-sort-alpha-asc");
			    	}
			    });
		    }
	    });
			

	    $('.sort').click(function () {	    	
	    	var element = this;

	    	// get ul children of branch
			var folder = $(element).closest("li")[0];

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

			console.log('ul:', $(ul).children());
	    });

	});

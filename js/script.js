$(document).ready(function() {

	$('#myTree').tree();

    $('.tree-branch-name').click(function () {	 
    	//console.log('this: ', this);   	
    	toggle(this);
	});

	$('.sort').click(function () {	 
    	//console.log('this: ', this);   	
    	sort(this);
	});

	$(".tree-branch").children("div .tree-branch-header").droppable({
    	drop :  function (event, ui) {
    		console.log('tree-branch');
    		// console.log('ui: ', ui.draggable[0]);
    		// console.log('this: ', this);
    		drop(event, ui, this);
    	}
    });

   	$(".tree-item").droppable({
    	drop :  function (event, ui) {
    		console.log('tree-item');
    		// console.log('ui: ', ui.draggable[0]);
    		// console.log('this: ', this);
    		drop(event, ui, this);
    	}
    });
    
	$(".draggable").draggable({
    	cancel : "",
    	revert :  function (event, ui) {  
    		// if event not a droppable event then revert

    		console.log('event: ' , event);
    		return event !== false ? false : true;
    	}     	
    });

});


function close_subFolders(sub_folders)
{
	// if this current folder has more sub branches then close them
	for (var i = 0; i < sub_folders.length; i++) {
	  	if ( $(sub_folders[i]).hasClass("tree-open") && !$(sub_folders[i]).children("ul").hasClass("hidden")  ) {
	  		// if the branch was opened previously then show only first 3 children
	  		$(sub_folders[i]).children("div").children(".sort").css("display", "none");
	  		$(sub_folders[i]).children(".loadMore").css("display", "none");
	  		$(sub_folders[i]).children("ul").children("li").css( "display", "none");
	  		$('#myTree').tree('closeFolder', $(sub_folders[i]).children("div") );

	  		// check further for branch trees
	  		if ($(sub_folders[i]).children("ul").children("li").hasClass('tree-branch') ) {
	  			// console.log('hallelujah, PRAISE THE LORD!');
	  			close_subFolders( $(sub_folders[i]).children("ul").children("li .tree-branch") ); 
	  		}
	  	}		  	
	}
}

function toggle(element) 
{
	console.log('toggle');
	var folder = $(element).closest("li");
	$(folder).removeClass("tree-selected");
	// find the folder's concerned img 
	var img = $(folder).children("div").children(".fa");
	// console.log('toggle');
	$(folder).toggleClass("tree-open");

	var loadMore = $(folder).children(".loadMore");
	// console.log('load: ', loadMore);
	// // console.log('counter2: ', counter2);
	if ( !$(element).hasClass("kids") || $(folder).hasClass("tree-open")) {
		// all kids not shown 
    	$(loadMore).css( "display", "block");
    	$(img).css( "display", "inline");
    	// console.log(element);
    }
	var ul = $(folder).children("ul");
	var size_li = $(ul).children("li").size();  


	if ( !$(folder).hasClass("tree-open") ) {	    	
    	// not expanded
    	// console.log('close folder: ', $(ul).children("li") );
		close_subFolders($(ul).children(".tree-branch"));
   		$(ul).children("li").css( "display", "none");
   		$(element).toggleClass("kids"); 
   		// console.log('img2: ', img);
   		$(img).css( "display", "none");
	    $(loadMore).css( "display", "none");

    } else {
    	// console.log('open folder: ', folder);

		var x = 3;

	    $(ul).children(" li:lt(3)").css( "display", "block");

		$(loadMore).click(function () {	
	    	var count_kids = 0; 
	    	// console.log('x1: ', x);

	        x = (x+3 <= size_li) ? x+3 : size_li;
	        // console.log('x2: ', x);
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
	        if (count_kids == size_li)
	        {
	        	//console.log('please stahp');
	        	$(loadMore).css( "display", "none");
	        	$(element).toggleClass("kids"); 
	        	count_kids = 0;
	        	x = 3;
	        }	      
	    	
	    	if ( $(img).hasClass("fa fa-sort-alpha-desc") ) 
	    	{	
	    		$(img).attr('class', "fa fa-sort-alpha-asc");
	    	}
	    });
	}

}

function sort(element)
{
	// console.log('sort');
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

	// console.log('ul:', $(ul).children());
}

function append(child, parent) 
{
	// append parent to child and remove child from parent

	var _child = $(child).clone(true, true);
	//  console.log(_child)
 	$(child).remove();
 	$(_child).removeAttr('style');
 	$(_child).css( "display", "block");

 	if ( $(child).hasClass ("tree-item")) {
 		// if child was an item then make it a folder
	 	var div =  $("<div>", {"class": "tree-branch-header"});
	 	$( $(_child).children("button").children("span")[0] ).attr('class', "glyphicon icon-caret glyphicon-play");
	 	var span = $("<span>", {"class": "glyphicon icon-folder glyphicon-folder-close"});
	 	$(span).insertBefore( $(_child).children("button").children("span")[1] );
	 	$(_child).children("button").attr('class', "tree-branch-name");
	 	var i = $("<i>", {"class": "fa fa-sort-alpha-asc sort", 'aria-hidden': "true"});

		$(div).append($(_child).children("button"));
		// $(div).append(i);
		$(_child).children().remove();


	 	$(_child).attr('class', "tree-branch");
	 	$(_child).attr('aria-expanded', "true");

	 	var ul = $("<ul>", {"class": "tree-branch-children hidden", role: "group"});
	 	$(_child).append(div);
	 	$(_child).append(ul);
	 	// load more div also needs to be created and appended 	

 	
	 	$( $(_child).children("div").children(".tree-branch-name") ).click(function () {	 
	    	//console.log('this: ', this);   	
	    	toggle(this);
		});
		$( $(_child).children("div").children(".sort") ).click(function () {	 
	    	//console.log('this: ', this);   	
	    	sort(this);
		});

 	} 
 	// console.log('parent1: ', $(parent).parent()[0] ==  $('#myTree')[0] );
 	// console.log('parent2: ', $('#myTree')[0] );
 	// console.log('child: ', _child);

 	if ( $(parent).parent()[0] ==  $('#myTree')[0] )
 	{
 		console.log('parent my Tree');
 		$( $(parent) ).draggable({
	    	cancel : "",
	    	revert :  function (event, ui) {  
	    		// if event not a droppable event then revert
	    		// console.log('event: ', event);
	    		return event !== false ? false : true;
	    	}     	
	    });
 	}

 	$(_child).prependTo( $(parent).parent() );
 	$(_child).children("ul").prepend(parent);
}

function drop(event, ui, element)
{
	var draggable = ui.draggable;
	var droppable = element;

	$.fn.isAfter = function(sel) {
	    return this.prevAll(sel).length !== 0;
	}
	$.fn.isBefore = function(sel) {
	    return this.nextAll(sel).length !== 0;
	}
	var parent;
	if ($(droppable).hasClass('tree-branch-header')) 
	{
		parent = $(droppable).parent("li");
	}

	// console.log('parent: ', parent);
	// console.log('sibling1: ', $(draggable).is( $(droppable).siblings()) );
	// console.log('sibling2: ', $(draggable).is( $(parent).siblings()) );


	if( $(draggable).is($(droppable).siblings()) || $(draggable).is($(parent).siblings())   ) {
		// if a sibling then switch places 
		if ($(droppable).hasClass('tree-branch-header')) 
		{
			// console.log('yes11!');
			if ( $(draggable).isAfter(parent) ) {
		        $(draggable).after($(parent));
		    } else if ( $(draggable).isBefore(parent) ) {
		    	$(draggable).before($(parent));
		    }
			$(draggable).removeAttr('style');
			$(draggable).css( "display", "block"); 


		} else if ( $(droppable).hasClass('tree-item') ) {

			// console.log('yes12!');
			if ( $(draggable).isAfter(droppable) ) {
		        $(draggable).after($(droppable));
		    } else if ( $(draggable).isBefore(droppable) ) {
		    	$(draggable).before($(droppable));
		    }
			$(draggable).removeAttr('style');
			$(draggable).css( "display", "block"); 			
		} 		
	}

	if ($(droppable).hasClass('tree-branch-header')) {

		if ( $(parent).find(draggable).length > 0 ) {
			// if draggable is a sub child of droppable
			append(draggable, parent);
		}
	} else if ( $(droppable).hasClass('tree-item') && !$(draggable).is($(droppable).siblings()) ) {

		if ( $(droppable).find(draggable).length > 0 ) {
			// if draggable is a sub child of droppable
			console.log('yes2!');
			append(draggable, droppable);
		}
	} 

	// console.log('draggable: ', draggable);
	// console.log('droppable: ', droppable);

	// console.log('-----------------');
}
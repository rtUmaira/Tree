	$('#myTree').tree();

	function toggle(element) {
		console.log('----------');
		var folder = $(element).closest("li")[0];
		// find the folder's concerned img 
		var img_id = folder.children[0].children[1].id;
		$("#"+img_id).toggle();

		// find the folder's concerned load more
		var load_id = folder.children[2].id;
		$("#"+load_id).toggle();

		// view folder's contents
		var ul_id = $(element).closest("li")[0].children[1].id;
		// console.log('id', ul_id);

		var size_li = $("#"+ul_id).children("li").size();
		//console.log('size: ', size_li);
	    x = 3;
	    $("#"+ul_id).children(" li:lt("+x+")").css( "display", "block");
	    $('#'+load_id).click(function () {
	        x = (x+3 <= size_li) ? x+3 : size_li;
	        // console.log('x: ', x);
	        $("#"+ul_id).children(" li:lt("+x+")").css( "display", "block");
	        //console.log('3: ', $("#"+ul_id).children("li"));

	    });
	    // console.log('3: ', $("#"+ul_id).children("li"));
	    //console.log($("#folder1").css('display'));
	}

	function sort(element) {
		// get children of branch
		// console.log('xxxxxxxxxxxx');

		var items = [];
		var children = $(element).closest("li").children("ul").children("li");

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
		
		var id = $(element).closest("li")[0].children[1].id;

		$('#'+id).toggleClass('checked');
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
		  		if ( !$('#'+id).hasClass("checked") ) {	
		  			return 1;
		  		} else {
		  			return -11
		  		}
		  	}
		  	if (keyA > keyB) {
		  		//console.log('1');
		  		if ( !$('#'+id).hasClass("checked") ) {	
		  			return -1;
		  		} else {
		  			return 1
		  		}
		  	}
		  	return 0;
		});


		var ul = $('#'+id);
		$.each(items, function(i, li){
		  ul.append(li);
		});
	}


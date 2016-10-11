	$('#myTree').tree();

	function toggle(element) {
		var img_id = $(element).closest("li")[0].children[0].children[1].id;
		$("#"+img_id).toggle();
	}

	function sort(element) {

		var id = $(element).closest("li")[0].children[1].id;
		$('#'+id).toggleClass('checked');

		var items = $('#'+id+ ' li').get();
		console.log($(items[0]).text().first());
		items.sort(function(a,b) {
			// if a's or b's id includes folder then only get text of first child
			// if (a.id.indexOf("folder") === "0")
			// {

			// }
			// if (b.id.indexOf("folder") ==== "0")
			// {

			// }
		  	var keyA = $(a).text();
		  	var keyB = $(b).text();
		  	if (keyA < keyB) return -1;
		  	if (keyA > keyB) return 1;
		  	return 0;
		});
		var ul = $('#'+id);

		if (! $('#'+id).hasClass("checked") ) {		
			items.reverse();
		} 

		$.each(items, function(i, li){
		  ul.append(li);
		});
	}

// $(document).ready(function () {
// 	$('.tree-branch-children li:lt(3)').show();
//     $('#loadMore').click(function () {
//         $('.tree-branch-children li:lt(5)').show();
//     });

// });

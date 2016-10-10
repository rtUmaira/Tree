function myTreeInit() {
	$('#myTree').tree({
		dataSource: function (options, callback) {
			setTimeout(function () {
				callback({
					data: [
						{
							name: 'Ascending and Descending',
							type: 'folder',
							dataAttributes: {
								id: 'folder1'
							}
						},
						{
							name: 'Sky and Water I (with custom icon)',
							type: 'item',
							dataAttributes: {
								id: 'item1',
								'data-icon': 'glyphicon glyphicon-file'
							}
						},
						{
							name: 'Drawing Hands',
							type: 'folder',
							dataAttributes: {
								id: 'folder2'
							}
						},
						{
							name: 'Waterfall',
							type: 'item',
							dataAttributes: {
								id: 'item2'
							}
						},
						{
							name: 'Belvedere',
							type: 'folder',
							dataAttributes: {
								id: 'folder3'
							}
						},
						{
							name: 'Relativity (with custom icon)',
							type: 'item',
							dataAttributes: {
								id: 'item3',
								'data-icon': 'glyphicon glyphicon-picture'
							}
						},
						{
							name: 'House of Stairs',
							type: 'folder',
							dataAttributes: {
								id: 'folder4'
							}
						},
						{
							name: 'Convex and Concave',
							type: 'item',
							dataAttributes: {
								id: 'item4'
							}
						}
					]
				});
			}, 400);
		},
		folderSelect: true
	});

}

myTreeInit();

$('#myTree').on('selected.fu.tree', function (e, selected) {
	console.log('Select Event: ', selected);
	console.log($('#myTree').tree('selectedItems'));
});

// $('#myTree').on('updated.fu.tree', function (e, selected) {
// 	console.log('Updated Event: ', selected);
// 	console.log($('#myTree').tree('selectedItems'));
// });

$('#myTree').on('loaded.fu.tree', function (e) {
	console.log('Loaded');
	console.log('e', e);
});

// $('#myTree').on('closed.fu.tree', function (e, info) {
// 	console.log('Close Event: ', info);
// });

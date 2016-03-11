$(document).ready(function(){

	var worksheets = [
		'', // defaults to first worksheet without id
		'ouab0ad'];

	worksheets.forEach(function(worksheet){
 		$.googleSheetToJSON('1nmrLOKhY_XB9vYgr-8xYTQ7dAB7AykY9G-UolHvcit0', worksheet)
			.done(function(rows){

				var $container = $('<div>');
				$container.append('<h1>' + (worksheet || 'default') + '</h1>');
				rows.forEach(function(row){
					$dl = $('<dl>');
					Object.getOwnPropertyNames(row).forEach(function(name){
						var val = [].concat(row[name]).join(' / ');
						$dl.append('<dt>' + name + '</dt><dd>' + val + '</dd>');
					});
					$container.append($dl);
				});
				$(document.body).append($container);
			})
			.fail(function(err){
				console.log('error!', err);
			});
	});
});

( function ( $, window, document, undefined ) {

	// take a row in googl-ese json and return it as name:value pairs
	function rowToObject(cell){

		var returner = {};

		var properties = Object.getOwnPropertyNames(cell);
		properties.sort();

		properties.forEach(function(key){

			var val = cell[key].$t;

			// don't bother with empty values
			// which also means properties will not be set for empty values!
			if(val === '') return;

			if(key.substring(0,4) === 'gsx$'){
				var name = key.substr(4);

				// the only tricky thing is to turn the property value into an array
				// if the property name has variations that end in a number and
				// more than one are used.
				// Address, Address1, Address2... etc.
				var num = name.charAt(name.length - 1);
				if(/^\d+$/.test(num)){ // indexed propery
					name = name.substr(0, name.length - 1);
					var arr = returner[name];
					if(!Array.isArray(arr)){
						returner[name] = [];
						if(arr) returner[name].push(arr);
					}
					returner[name].push(val);
				} else returner[name] = val;
			}
		});
		return returner;
	}

	$.googleSheetToJSON = function googleSheetToJSON(id, worksheet){

		var deferred = new $.Deferred();
		var url = [
			'https://spreadsheets.google.com/feeds/list',
			id,
			(worksheet || 'od6'),
			'public/values?alt=json&callback=?'].join('/');
		console.log(url);

		$.getJSON(url)
			.done(function(data){
				// try to fail w/ info if we cant get any data from the sheets
				if(!data.feed) throw new Error('Unable to retrieve google spreadsheet JSON data for ' + url);
				if(!data.feed.entry) throw new Error('Google spreadsheet seems empty for ' + url);
				deferred.resolve(data.feed.entry.map(rowToObject));
			})
			.fail(deferred.reject);

		return deferred.promise();
	};

} )( jQuery, window, document );

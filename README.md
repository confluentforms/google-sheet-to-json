# Google Spreadsheet to JSON JQuery Plugin


[![Build Status](https://travis-ci.org/confluentforms/jquery-google-sheet-to-json.png?branch=master)](https://travis-ci.org/confluentforms/jquery-google-sheet-to-json)

Take a Google docs spreadsheet url and retrieve the data in JSON format.

See the [basic example](examples/basic/) for use.

## Quick Use

Include **after** JQuery on your page:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-beta1/jquery.min.js"></script>
<script src="jquery-google-sheet-to-json.min.js"></script>
<script>
$(document).ready(function(){

	// use your spreadsheet id here
	var SPREADSHEET_ID = '1nmrLOKhY_XB9vYgr-8xYTQ7dAB7AykY9G-UolHvcit0'
	$.googleSheetToJSON(SPREADSHEET_ID)
		.done(function(rows){
			// each row is a row of data from the spreadsheet
			console.log(rows);
		})
		.fail(function(err){
			console.log('error!', err);
		});
	});
});
</script>
```

Your spreadsheet *must be public* **and** *published*, see the [Google documentation on it](https://ctrlq.org/code/20004-google-spreadsheets-json). You can find the spreadsheet id (and worksheet id if needed) [in the url](http://damolab.blogspot.com/2011/03/od6-and-finding-other-worksheet-ids.html). The spreadsheet id is the first arg to the function, the worksheet id is the optional second arg, it will default to the first worksheet.

The rows will be an array of objects with each property name being the value used as the first header row of the spreadsheet. See the [basic example spreadsheet](https://docs.google.com/spreadsheets/d/1nmrLOKhY_XB9vYgr-8xYTQ7dAB7AykY9G-UolHvcit0/edit), things like "first name" will be changed (by Google) to be acceptable JavaScript property names: "firstname".

Data may be present (or not) based on content:

* An empty cell will not be in the result
* A cell that has the header pattern name, name*Number*, ..., name*Number* will become an array with all the values
* Otherwise it will be a string

## Warning

Google Spreadsheets have problems if the formatting of the spreadsheet is off even a little bit. No empty rows!

'use strict';

// xx - add arg based stub for spreadsheet
// xx - .. then test for thrown errors on bad id
// xx - test worksheets

var expect = chai.expect;

var SHEET_ID = '1nmrLOKhY_XB9vYgr-8xYTQ7dAB7AykY9G-UolHvcit0';

describe('$.fn.googleSheetToJSON', function(){

	// xx  - stub based on input
  beforeEach(function(){

		sinon.stub(jQuery, 'ajax', function(options){

			var d = $.Deferred();
			// see DATA def below hoisted here - raw JSON string
			d.resolve(JSON.parse(DATA));

			return d.promise();
		});
  });

	afterEach(function(){
		jQuery.ajax.restore();
	});

  describe('get rows from google spreadsheet', function(){

    it('should get array of objects from google spreadsheet', function(done){
			$.googleSheetToJSON(SHEET_ID)
				.done(function(rows){
  			  expect(rows).to.be.an('array');
					expect(rows[0]).to.be.an('object');
					return done();
				})
				.fail(done);
    });


		it('should create key/value pairs for objects', function(done){
			$.googleSheetToJSON(SHEET_ID)
				.done(function(rows){
					expect(rows[0]).to.have.all.keys('address', 'city', 'firstname', 'lastname', 'state');
					return done();
				})
				.fail(done);
		});

		it('should turn multiple values into array', function(done){
			$.googleSheetToJSON(SHEET_ID)
				.done(function(rows){
					expect(rows[0]['address']).to.be.an('array').with.lengthOf(2);
					return done();
				})
				.fail(done);
		});

		it('should turn single values into string', function(done){
			$.googleSheetToJSON(SHEET_ID)
				.done(function(rows){
					expect(rows[2]['address']).to.be.a('string');
					return done();
				})
				.fail(done);
		});

		it('should not include empty values', function(done){
			$.googleSheetToJSON(SHEET_ID)
				.done(function(rows){
					expect(rows[3]['address']).to.not.exist;
					return done();
				})
				.fail(done);
		});

  });
});

var DATA = '{"version":"1.0","encoding":"UTF-8","feed":{"xmlns":"http://www.w3.org/2005/Atom","xmlns$openSearch":"http://a9.com/-/spec/opensearchrss/1.0/","xmlns$gsx":"http://schemas.google.com/spreadsheets/2006/extended","id":{"$t":"https://spreadsheets.google.com/feeds/list/1nmrLOKhY_XB9vYgr-8xYTQ7dAB7AykY9G-UolHvcit0/od6/public/values"},"updated":{"$t":"2016-03-12T14:50:20.415Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"Sample Data"},"link":[{"rel":"alternate","type":"application/atom+xml","href":"https://docs.google.com/a/thomasleen.com/spreadsheets/d/1nmrLOKhY_XB9vYgr-8xYTQ7dAB7AykY9G-UolHvcit0/pubhtml"},{"rel":"http://schemas.google.com/g/2005#feed","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1nmrLOKhY_XB9vYgr-8xYTQ7dAB7AykY9G-UolHvcit0/od6/public/values"},{"rel":"http://schemas.google.com/g/2005#post","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1nmrLOKhY_XB9vYgr-8xYTQ7dAB7AykY9G-UolHvcit0/od6/public/values"},{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1nmrLOKhY_XB9vYgr-8xYTQ7dAB7AykY9G-UolHvcit0/od6/public/values?alt\u003djson"}],"author":[{"name":{"$t":"tom"},"email":{"$t":"tom@confluentforms.com"}}],"openSearch$totalResults":{"$t":"4"},"openSearch$startIndex":{"$t":"1"},"entry":[{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1nmrLOKhY_XB9vYgr-8xYTQ7dAB7AykY9G-UolHvcit0/od6/public/values/cokwr"},"updated":{"$t":"2016-03-12T14:50:20.415Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"Matilda"},"content":{"type":"text","$t":"lastname: Jones, address: 123 Some Road, address1: Apt 4, city: Somewhereville, state: MA"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1nmrLOKhY_XB9vYgr-8xYTQ7dAB7AykY9G-UolHvcit0/od6/public/values/cokwr"}],"gsx$firstname":{"$t":"Matilda"},"gsx$lastname":{"$t":"Jones"},"gsx$address":{"$t":"123 Some Road"},"gsx$address1":{"$t":"Apt 4"},"gsx$address2":{"$t":""},"gsx$city":{"$t":"Somewhereville"},"gsx$state":{"$t":"MA"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1nmrLOKhY_XB9vYgr-8xYTQ7dAB7AykY9G-UolHvcit0/od6/public/values/cpzh4"},"updated":{"$t":"2016-03-12T14:50:20.415Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"Michael"},"content":{"type":"text","$t":"lastname: Jones, address: 321 Another Ave, address1: Apartment Complex, address2: Unit 32, city: Somewhereville, state: MA"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1nmrLOKhY_XB9vYgr-8xYTQ7dAB7AykY9G-UolHvcit0/od6/public/values/cpzh4"}],"gsx$firstname":{"$t":"Michael"},"gsx$lastname":{"$t":"Jones"},"gsx$address":{"$t":"321 Another Ave"},"gsx$address1":{"$t":"Apartment Complex"},"gsx$address2":{"$t":"Unit 32"},"gsx$city":{"$t":"Somewhereville"},"gsx$state":{"$t":"MA"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1nmrLOKhY_XB9vYgr-8xYTQ7dAB7AykY9G-UolHvcit0/od6/public/values/cre1l"},"updated":{"$t":"2016-03-12T14:50:20.415Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"Another"},"content":{"type":"text","$t":"lastname: Person, address: 1234 Some Lane, city: Boston, state: MA"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1nmrLOKhY_XB9vYgr-8xYTQ7dAB7AykY9G-UolHvcit0/od6/public/values/cre1l"}],"gsx$firstname":{"$t":"Another"},"gsx$lastname":{"$t":"Person"},"gsx$address":{"$t":"1234 Some Lane"},"gsx$address1":{"$t":""},"gsx$address2":{"$t":""},"gsx$city":{"$t":"Boston"},"gsx$state":{"$t":"MA"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1nmrLOKhY_XB9vYgr-8xYTQ7dAB7AykY9G-UolHvcit0/od6/public/values/chk2m"},"updated":{"$t":"2016-03-12T14:50:20.415Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"Nobody"},"content":{"type":"text","$t":"lastname: Noname, city: Noplace, state: NO"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1nmrLOKhY_XB9vYgr-8xYTQ7dAB7AykY9G-UolHvcit0/od6/public/values/chk2m"}],"gsx$firstname":{"$t":"Nobody"},"gsx$lastname":{"$t":"Noname"},"gsx$address":{"$t":""},"gsx$address1":{"$t":""},"gsx$address2":{"$t":""},"gsx$city":{"$t":"Noplace"},"gsx$state":{"$t":"NO"}}]}}';

/*
var DATA = '{"version":"1.0","encoding":"UTF-8","feed":{"xmlns":"http://www.w3.org/2005/Atom","xmlns$openSearch":"http://a9.com/-/spec/opensearchrss/1.0/","xmlns$gsx":"http://schemas.google.com/spreadsheets/2006/extended","id":{"$t":"https://spreadsheets.google.com/feeds/list/1nmrLOKhY_XB9vYgr-8xYTQ7dAB7AykY9G-UolHvcit0/od6/public/values"},"updated":{"$t":"2016-03-11T16:52:40.776Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"Sample Data"},"link":[{"rel":"alternate","type":"application/atom+xml","href":"https://docs.google.com/a/thomasleen.com/spreadsheets/d/1nmrLOKhY_XB9vYgr-8xYTQ7dAB7AykY9G-UolHvcit0/pubhtml"},{"rel":"http://schemas.google.com/g/2005#feed","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1nmrLOKhY_XB9vYgr-8xYTQ7dAB7AykY9G-UolHvcit0/od6/public/values"},{"rel":"http://schemas.google.com/g/2005#post","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1nmrLOKhY_XB9vYgr-8xYTQ7dAB7AykY9G-UolHvcit0/od6/public/values"},{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1nmrLOKhY_XB9vYgr-8xYTQ7dAB7AykY9G-UolHvcit0/od6/public/values?alt\u003djson"}],"author":[{"name":{"$t":"tom"},"email":{"$t":"tom@confluentforms.com"}}],"openSearch$totalResults":{"$t":"3"},"openSearch$startIndex":{"$t":"1"},"entry":[{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1nmrLOKhY_XB9vYgr-8xYTQ7dAB7AykY9G-UolHvcit0/od6/public/values/cokwr"},"updated":{"$t":"2016-03-11T16:52:40.776Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"Matilda"},"content":{"type":"text","$t":"lastname: Jones, address: 123 Some Road, address1: Apt 4, city: Somewhereville, state: MA"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1nmrLOKhY_XB9vYgr-8xYTQ7dAB7AykY9G-UolHvcit0/od6/public/values/cokwr"}],"gsx$firstname":{"$t":"Matilda"},"gsx$lastname":{"$t":"Jones"},"gsx$address":{"$t":"123 Some Road"},"gsx$address1":{"$t":"Apt 4"},"gsx$address2":{"$t":""},"gsx$city":{"$t":"Somewhereville"},"gsx$state":{"$t":"MA"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1nmrLOKhY_XB9vYgr-8xYTQ7dAB7AykY9G-UolHvcit0/od6/public/values/cpzh4"},"updated":{"$t":"2016-03-11T16:52:40.776Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"Michael"},"content":{"type":"text","$t":"lastname: Jones, address: 321 Another Ave, address1: Apartment Complex, address2: Unit 32, city: Somewhereville, state: MA"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1nmrLOKhY_XB9vYgr-8xYTQ7dAB7AykY9G-UolHvcit0/od6/public/values/cpzh4"}],"gsx$firstname":{"$t":"Michael"},"gsx$lastname":{"$t":"Jones"},"gsx$address":{"$t":"321 Another Ave"},"gsx$address1":{"$t":"Apartment Complex"},"gsx$address2":{"$t":"Unit 32"},"gsx$city":{"$t":"Somewhereville"},"gsx$state":{"$t":"MA"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1nmrLOKhY_XB9vYgr-8xYTQ7dAB7AykY9G-UolHvcit0/od6/public/values/cre1l"},"updated":{"$t":"2016-03-11T16:52:40.776Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"Nobody"},"content":{"type":"text","$t":"lastname: Noname, city: Noplace, state: NO"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1nmrLOKhY_XB9vYgr-8xYTQ7dAB7AykY9G-UolHvcit0/od6/public/values/cre1l"}],"gsx$firstname":{"$t":"Nobody"},"gsx$lastname":{"$t":"Noname"},"gsx$address":{"$t":""},"gsx$address1":{"$t":""},"gsx$address2":{"$t":""},"gsx$city":{"$t":"Noplace"},"gsx$state":{"$t":"NO"}}]}}';
*/

var ezajax = {
	entityMap : {
	  "&": "&amp;",
	  "<": "&lt;",
	  ">": "&gt;",
	  '"': '&quot;',
	  "'": '&#39;',
	  "/": '&#x2F;'
	},

	escapeHtml : function(string) {
	  return String(string).replace(/[&<>"'\/]/g, function (s) {
	    return ezajax.entityMap[s];
	  });
	},

	getHttpMethod : function(){
		return $("input[name=method]:checked").val();
	},

	getUrl : function(){
		return $("#url").val();
	},

	getParams : function(){
		return $("#params").val();
	},

	clearResults : function(){
		$("#results").html("");
	},

	enterPressedCheck : function(e){
		var code = (e.keyCode ? e.keyCode : e.which);
		if(code == 13) { //Enter keycode
		    this.submit();
		}
	},

	buttonActive : function(active){
		$("#submit").prop("disabled",!active);
	},

	submit : function(){
		this.buttonActive(false);
		this.clearResults();

		var method = this.getHttpMethod();
		var url = this.getUrl();

		var paramsStr = this.getParams();
		var params = !!paramsStr ? JSON.parse(paramsStr) : {};

		$.ajax({
		    type: method,
		    url: url,
		    data: params,
		    success: function(response){
		        ezajax.postResults(response);
		    },
		    error:function (xhr, ajaxOptions, errorMessage){
		    	ezajax.postResults("An error has occurred and the request to '" + url + "' could not be completed.  Check the console for more information.");
	        }
		});
	},

	postResults : function(results){
		var res = results;
		if(typeof res != "string"){
			try{
				res = JSON.stringify(results);
			}
			catch(err){
				console.log(err);
				alert(err);
			}
		}

		res = this.escapeHtml(res);
		$("#results").html(res);
		this.buttonActive(true);
	}
};
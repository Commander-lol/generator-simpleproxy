module.exports = {
	isType: function(object, typename) {
		var type = {
		  "string": "".constructor,
		  "object": {}.constructor,
		  "function": function(){}.constructor
		}

		if(type.hasOwnProperty(typename)){
			return object.constructor === type[typename];
		} else {
			return false;
		}
	},
	getCurrentTimeString: function(){
		var d = new Date();
		return d.getUTCFullYear()+"-"+this.two(d.getUTCMonth())+"-"+this.two(d.getUTCDate())+" / " + this.two(d.getUTCHours()) + ":" + this.two(d.getUTCMinutes()) + ":" + this.two(d.getUTCSeconds());
	},
	two: function(n){
		return ("0" + n).slice(-2);
	},
	getRequestIp: function(req){
		return req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
	}
}
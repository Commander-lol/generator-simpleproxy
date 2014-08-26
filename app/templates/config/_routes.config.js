module.exports = {

	// There are three different possibilities for your target:
	//
	// 1 - A string. This will simply proxy the key to the value.
	//     For example:
	//         "example.com" : "http://localhost:8123"
	//
	// 2 - A JSON Object. This will use the object as the options value for the web proxy
	//     For example:
	//         "example.com" : { target: "http://localhost:8123" }
	//
	// 3 - A function. The function will be passed the 'req', 'res' and 'proxy' parameters,
	//     to make it easy to implement custom routing logic
	//     For example:
	//         "example.com" : function(req, res, proxy){
	//				console.log("Yay, custom routing!");
	//				var myTarget = "http://" + my.externalCall();
	//				proxy.web(req, res, { target: myTarget });
	//			}
	
}
var a = 100;
console.log("1");
console.log("2");
for (var i = 0; i < 10000; i++) {
	console.log("loop "+i);
	a++;
}
setTimeout(function() {
	console.log("inside time out");
}, 3000);
console.log("final "+a);
const express = require("express");
const app = express();
const child_process = require("child_process");
const fs = require("fs");

app.use(express.static("pub"));
app.get("/v/*",function(req,res){
	let vid = req.url.slice(3);
	let jsmidi = "pub/cache/" + vid + ".js";
	fs.access(jsmidi,fs.constants.R_OK,function(err){
		if(err)
		{
			p = child_process.spawn("python2",["../combined-system/main.py","https://www.youtube.com/watch?v="+vid,jsmidi]).on("exit",function(){
				res.writeHead(200,{"Content-Type":"text/html"});
				res.write("<!DOCTYPE html><html><head><script src=\"/cache/" + vid + ".js\"></script><script src=\"/main.js\"></script></head><body><canvas id=\"mainCanvas\" style=\"top:0;left:0;position:absolute\"></canvas></body></html>");
				res.end();
			});
			p.stdout.pipe(process.stdout);
		}
		else
		{
			res.writeHead(200,{"Content-Type":"text/html"});
			res.write("<!DOCTYPE html><html><head><script src=\"/cache/" + vid + ".js\"></script><script src=\"/main.js\"></script></head><body><canvas id=\"mainCanvas\" style=\"top:0;left:0;position:absolute\"></canvas></body></html>");
			res.end();
		}
	});

});
app.listen(1025);
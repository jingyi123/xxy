const express = require("express");
const http = express();
const dbmongo = require("./modules/db.js");
const db = new dbmongo ("lianxi")
const bodyParser = require("body-parser");//

http.use(bodyParser.urlencoded({extended:false}));

http.use((req,res,next)=>{
	res.header("Access-Control-Allow-Origin","*");
	next();
})
http.listen(8080,()=>{
	console.log("running")
})

http.get("/init",(req,res)=>{
	db.find("meishi",{},(err,data)=>{
		if (err) throw err;
		res.send(data)
	})
})
//加的后台
http.post("/jia",(req,res)=>{
	let id = req.body.id
	console.log(id)
	db.findById("meishi",id,(err,data)=>{
		console.log(data)
		//data = data[0];
		data.num = data.num*1+1;
		db.updateById("meishi",id,{num:data.num},(err,data1)=>{
			if (err) throw err;
			res.send(data)
		})
		
	})
});

//减的后台
http.post("/jian",(req,res)=>{
	let id = req.body.id
	console.log(id)
	db.findById("meishi",id,(err,data)=>{
		console.log(data)
		//data = data[0];
		data.num = data.num*1-1;
		db.updateById("meishi",id,{num:data.num},(err,data1)=>{
			if (err) throw err;
			res.send("upok")
		})
		
	})
});

//失去焦点
http.post("/sj",(req,res)=>{
	let data = req.body
	db.updateById("meishi",data.id,{num:data.num*1},(err,data1)=>{
		res.send(data1)
	})
})
//结算
http.get("/suan",(req,res)=>{
	db.find("meishi",{},(err,data)=>{
		let zj = 0
		data.forEach((item,index)=>{
			zj+=item.num*item.price
		})
		if (zj>50) {
			res.send("去结算")
		}else{
			res.send("还需"+(50-zj)+"元起送")
		}
	})
})

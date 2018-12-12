const express = require("express");
const http = express();
const dbmongo = require("./modules/db.js");
const db = new dbmongo ("wish")
const bodyParser = require("body-parser");//

http.use(bodyParser.urlencoded({extended:false}));//post 数据解析
//跨域设置
http.use((req,res,next)=>{
	res.header("Access-Control-Allow-Origin","*");
	next();
});
http.listen(8080,()=>{
	console.log("running")
})
//提交请求
http.post("/add",(req,res)=>{
	let data = req.body
	data.time = new Date().getTime();
	data.color = 1
	db.insertOne("Wish wall",data,(err,inser)=>{
		if (err) throw err;
		res.send({
				status:"1",
				statusText:"发送成功"
		})
	})
})

//渲染页面
http.post("/init",(req,res)=>{
	//let arr = []
	//let data = req.body.content
	db.find("Wish wall",{},(err,data1)=>{
		if (data1.length>8) {
			data1.splice(8)
		}
		
		res.send(data1)
	})
})

http.get("/color",(req,res)=>{
	var id = req.query.id
	console.log("idddd",id)
	db.findById("Wish wall",id,(err,data)=>{
		console.log(data)
		data.color = data.color*-1
		db.updateById("Wish wall",id,{color:data.color},(err,upda)=>{
			res.send("ok")
		})
	})
})

//删除
http.get("/del",(req,res)=>{
	var id = req.query.id
	db.deleteById("Wish wall",id,(err,data1)=>{
		if (err) throw err;
		res.send("delOK")
	})
})

const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//models
const mUser = require('./models/musers').user;
const mChat = require('./models/mchat').chat;

app.use(bodyParser.json());

var corsOption = {
	orign: 'http://localhost:4200',
	optionSuccessStatus: 200
}

app.use(cors(corsOption));


//models
const cat = mongoose.model('cat',{name:String});

//db connection
mongoose.connect('mongodb://localhost:27017/mean-book', {useNewUrlParser: true});

app.listen(3000, () => {
  console.log('Server started!');
});

/*APIs*/
app.get("/api/testing_api", (req, res)=>{
	res.send("Wow!!!! I am from Server :D");
});
//to create a new cat
app.get("/api/save_kitty", (req, res)=>{
	var ourKitty = new cat();
	ourKitty.name = "Black Cat";
	ourKitty.save((err)=>{
		res.send(ourKitty);
	});
	
});

//to create user
app.post('/api/create_user', (req, res)=>{
	console.log("inside create_user!!!!!!!!!!!!!!!!!1");
	console.log(req.body);
	const newUser = new mUser();
	newUser.userName = req.body.userName;
	newUser.email = req.body.email;
	newUser.password = req.body.password;
	newUser.age = req.body.age;
	newUser.save((err)=>{
		if(err)
			res.status(500).json(err);
		else
			res.status(200).json(newUser);
	})
});

//to do login user
app.post("/api/do_login", (req, res)=>{
	mUser.findOne({email:req.body.email, password: req.body.password},
		{_id:1,userName:1},
		(err, doc)=>{
		if(err)
			res.status(500).json(err);
		else if(doc)
			res.status(200).json(doc);
		else
			res.status(401).json({msg:"Invalid login details"});

	});
});


//to create user
app.post('/api/post_new_chat', (req, res)=>{
	
	console.log("inside post_new_chat!!!!!!!!!!!!!!!!!1");
	console.log(req.body);

	const newChat = new mChat();
	newChat.userName = req.body.userName;
	newChat.userID = req.body.userID;
	newChat.msg = req.body.msg;

	newChat.save((err)=>{
		if(err)
			res.status(500).json(err);
		else
			res.status(200).json(newChat);
	})
});

//to do latest chats
app.get("/api/get_chats/:lastSynced", (req, res)=>{
	let query ={};
	if(req.params.lastSynced != "null")
		query={'crAt' : {
			$gt:new Date().setTime(parseInt(req.params.lastSynced))}};

	mChat.find(query,
		{userName:1,msg:1,crAt:1},
		{sort:{crAt: -1}},
		(err, docs)=>{
		if(err)
			res.status(500).json(err);
		else if(docs)
			res.status(200).json(docs);

	});
});
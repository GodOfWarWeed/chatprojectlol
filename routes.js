

module.exports= function(app,io){

var gravatar = require('gravatar');

app.get('/', function(req,res){
	res.render('publicroom');
});
usernames=[];
users=[];
emails = [];
avatar=[];


io.sockets.on('connection', function(socket){
	
	socket.on('new user' , function(user, email, callback){
		if(usernames.indexOf(user) != -1){
			callback(false)
		}
		else {
			callback(true);
			socket.username = user;
			socket.email = email;
			socket.avatar = gravatar.url(email, {s: '50', r: 'x', d: 'mm'});
			
			usernames.push(socket.username);
			emails.push(socket.emails);
			avatar.push(socket.avatar);
			updateUsernames();
			updateEmails();

			

			// Tell the person what he should use for an avatar
			socket.emit('img', socket.avatar);
			console.log('inside userindex')
		}
		console.log('inside new user');
	});
	// update usernames
	function updateUsernames(){
		io.emit('usernames', usernames);
		console.log('inside updateUsernames');
	}
	function updateEmails(){
		io.emit('emails' , emails);
		console.log('Inside updateEmails');
	}


	//send message
	socket.on('send message',function(data){
		console.log("inside send message");
		io.emit('new message',{msg: data, user: socket.username, img: socket.avatar});
	});


	//disconnect
	socket.on('disconnect' , function(data){
		if(!socket.username) return;
		usernames.splice(usernames.indexOf(socket.username), 1);
		emails.splice(emails.indexOf(socket.email), 1);
		avatar.splice(avatar.indexOf(socket.avatar), 1)

		updateUsernames();
	});


});
};
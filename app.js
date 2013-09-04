console.log("Loading NodeCraft");

var motd = 'Welcome to huoh';
var filename = '/home/minecraft/terrafirma/server.log';

var options =
  { server: 'irc.fu-berlin.de'
  , nick: 'Mc_fck'
  , channels: ['#mc.huoh.fi']
  }




var jerk = require('jerk')
//var jerk = require( './Jerk/lib/jerk' )

var nodebot = jerk(function(j) {

  j.watch_for('^.*', function(message) {
	mcMessage("IRC: <"+message.user+"> "+message.text);
  })

  j.watch_for('^!list$', function(message) {
	message.say(message.user + ': Issuing command list to server')
	mcCommand("list");
  })
  


}).connect(options)

var exec = require('child_process').exec, child;
var spawn = require('child_process').spawn;
var tail = spawn('tail',['-F','-n 0', filename]);




tail.stdout.on('data', function (data) {
	var serverlog = data.toString().split('\n'); // replace('\n','').replace('\r','').replace('^','');
	for(i = 0; i < serverlog.length; i++){
		console.log(serverlog[i]);
		parseCommand(serverlog[i]);
	}
});

var parseCommand = function (data) {
	
	var str = data.split(/ \[INFO\] /);



	// TEST IF USERLIST
	if ( /Connected players/i.test(str[1]) ) {
		var result = str[1].match(/Connected players: (.*?)$/);
		mcMessage("Players online: "+ result[1]);
		nodebot.say('#mc.huoh.fi', "Players online: "+ result[1]);
	}
	// TEST IF USERLIST
	if ( /> !list$/i.test(str[1]) ) {
		mcCommand("list");
	}


	// PASS MSG
//	if ( /<(.+?)> (.*?)$/i.test(str[1]) ) {
//		var result = str[1].match(/<(.+?)> (.*?)$/i);
//		if (result != null ) {
//			nodebot.say('#mc.huoh.fi', "MC: <"+ result[1]+"> "+ result[2]);
//		}
//	}

	if ( /<(.+?)> (.*?)$/i.test(str[1]) ) {
                var server = str[1].match( /(\[Server\])/i);
                if (server == null) {
			var result = str[1].match(/<(.+?)> (.*?)$/i);
                        if (result != null ) {
				nodebot.say('#mc.huoh.fi', "MC: <"+ result[1]+"> "+ result[2]);
			}
		}
	}


	if ( /Done \(/i.test(str[1])) {
		nodebot.say('#mc.huoh.fi', "server is now running again");
	}

	// TEST IF CONNECT
	// 2011-11-28 22:18:55 [INFO] Whz [/213.243.134.111:62569] logged in with entity id 56429 at (703.5590024796501, 74.0, 343.0132875431768)

	if ( /logged in with entity id/i.test(str[1])) {
		var result = str[1].match(/(.+?)\[(.+?)\] logged in with entity id/i);
		console.log(result[1]+ " joined the game");
		mcWhisper(result[1], motd);
		mcWhisper(result[1], "If a chest has a sign PRIVATE, DO NOT TOUCH THE CONTENTS!");
		mcWhisper(result[1], "Following commands are available:");
		mcWhisper(result[1], "!list (connected users)");
		nodebot.say('#mc.huoh.fi', result[1]+ " connected to server.");
	}

	// Test if disconnect
	// Kalpa lost connection: disconnect.quitting
	if ( /lost connection:/i.test(str[1])) {
		var result = str[1].match(/^(.+?) lost connection: (.*)/i);
		console.log(result[1]+ " disconnected");
		nodebot.say('#mc.huoh.fi', result[1]+ " disconnected, reason: "+result[2]);
	}
	

}

var mcWhisper = function (username, message) {
	console.log("Sending a private message to user "+username);
	child = exec('screen -S terra -p 0 -X stuff "`printf \"tell '+username+' '+ message+'\r\"`"', 
	  function (error, stdout, stderr) {
	    if (error !== null) {
	      console.log('exec error: ' + error);
	    }
	});
}

var mcMessage = function (message) {
	console.log("Shouting message: '"+message+"' to server");
	child = exec('screen -S terra -p 0 -X stuff "`printf \"say '+message+'\r\"`"', 
	  function (error, stdout, stderr) {
	    if (error !== null) {
	      console.log('exec error: ' + error);
	    }
	});
}

var mcCommand = function (command) {
	console.log("Applying command: '"+command+"' to server");
	child = exec('screen -S terra -p 0 -X stuff "`printf \"'+command+'\r\"`"', 
	  function (error, stdout, stderr) {
	    if (error !== null) {
	      console.log('exec error: ' + error);
	    }
	});
}

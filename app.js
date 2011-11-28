console.log("Loading NodeCraft");

var filename = '/home/minecraft/minecraft/server.log';
var motd = 'Welcome to mc.huoh.fi';

/* Oskari "Nahkiss" Kantoniemi -- 20.09.2011 */
// Define op file here to allow only operators use specified commands
var opfile = '/home/minecraft/minecraft/ops.txt';
var fs = require('fs');
var ops = fs.readFileSync(opfile).toString().split("\n");

var options =
  { server: 'irc.cc.tut.fi'
  , nick: 'McHuohh'
  , channels: ['#mc.huoh.fi']
  }

var items = new Array();
items[0] = "Air";
items[1] = "Stone";
items[2] = "Grass";
items[3] = "Dirt";
items[4] = "Cobblestone";
items[5] = "Wooden Plank";
items[6] = "Sapling";
items[7] = "Bedrock";
items[8] = "Water";
items[9] = "Stationary water";
items[10] = "Lava";
items[11] = "Stationary lava";
items[12] = "Sand";
items[13] = "Gravel";
items[14] = "Gold Ore";
items[15] = "Iron Ore";
items[16] = "Coal Ore";
items[17] = "WoodB";
items[18] = "Leaves";
items[19] = "Sponge";
items[20] = "Glass";
items[21] = "Lapis Lazuli Ore";
items[22] = "Lapis Lazuli Block";
items[23] = "Dispenser";
items[24] = "Sandstone";
items[25] = "Note Block";
items[26] = "BedI";
items[35] = "WoolB";
items[37] = "Yellow Flower";
items[38] = "Red Rose";
items[39] = "Brown Mushroom";
items[40] = "Red Mushroom";
items[41] = "Gold Block";
items[42] = "Iron Block";
items[43] = "Double SlabB";
items[44] = "SlabB";
items[45] = "Brick Block";
items[46] = "TNT";
items[47] = "Bookshelf";
items[48] = "Moss Stone";
items[49] = "Obsidian";
items[50] = "Torch";
items[51] = "Fire";
items[52] = "Monster Spawner";
items[53] = "Wooden Stairs";
items[54] = "Chest";
items[55] = "Redstone WireI";
items[56] = "Diamond Ore";
items[57] = "Diamond Block";
items[58] = "Crafting Table";
items[59] = "Crops";
items[60] = "Farmland";
items[61] = "Furnace";
items[62] = "Burning Furnace";
items[63] = "3Sign PostI";
items[64] = "Wooden DoorI";
items[65] = "Ladder";
items[66] = "Rails";
items[67] = "Cobblestone Stairs";
items[68] = "Wall SignI";
items[69] = "Lever";
items[70] = "Stone Pressure Plate";
items[71] = "Iron DoorI";
items[72] = "Wooden Pressure Plate";
items[73] = "Redstone Ore";
items[74] = "Glowing Redstone Ore";
items[75] = "Redstone Torch (\"off\" state)";
items[76] = "Redstone Torch (\"on\" state)";
items[77] = "Stone Button";
items[78] = "Snow";
items[79] = "Ice";
items[80] = "Snow Block";
items[81] = "Cactus";
items[82] = "Clay Block";
items[83] = "Sugar Cane I";
items[84] = "Jukebox";
items[85] = "Fence";
items[86] = "Pumpkin";
items[87] = "Netherrack";
items[88] = "Soul Sand";
items[89] = "Glowstone Block";
items[90] = "Portal";
items[91] = "Jack-O-Lantern";
items[92] = "Cake Block";
items[93] = "Redstone Repeater (\"off\" state)";
items[94] = "Redstone Repeater (\"on\" state)";
items[95] = "Locked Chest";
items[96] = "Trapdoor";
items[97] = "Hidden Silverfish";
items[98] = "Stone Bricks";
items[99] = "Huge Brown Mushroom";
items[100] = "Huge Red Mushroom";
items[101] = "Iron Bars";
items[102] = "Glass Pane";
items[103] = "Melon";
items[104] = "Pumpkin Stem";
items[105] = "Melon Stem";
items[106] = "Vines";
items[107] = "Fence Gate";
items[108] = "Brick Stairs";
items[109] = "Stone Brick Stairs";
items[256] = "Iron Shovel";
items[257] = "Iron Pickaxe";
items[258] = "Iron Axe";
items[259] = "Flint and Steel";
items[260] = "Apple";
items[261] = "Bow";
items[262] = "Arrow";
items[263] = "Coal";
items[264] = "Diamond";
items[265] = "Iron Ingot";
items[266] = "Gold Ingot";
items[267] = "Iron Sword";
items[268] = "Wooden Sword";
items[269] = "Wooden Shovel";
items[270] = "Wooden Pickaxe";
items[271] = "Wooden Axe";
items[272] = "Stone Sword";
items[273] = "Stone Shovel";
items[274] = "Stone Pickaxe";
items[275] = "Stone Axe";
items[276] = "Diamond Sword";
items[277] = "Diamond Shovel";
items[278] = "Diamond Pickaxe";
items[279] = "Diamond Axe";
items[280] = "Stick";
items[281] = "Bowl";
items[282] = "Mushroom Soup";
items[283] = "Gold Sword";
items[284] = "Gold Shovel";
items[285] = "Gold Pickaxe";
items[286] = "Gold Axe";
items[287] = "String";
items[288] = "Feather";
items[289] = "Gunpowder";
items[290] = "Wooden Hoe";
items[291] = "Stone Hoe";
items[292] = "Iron Hoe";
items[293] = "Diamond Hoe";
items[294] = "Gold Hoe";
items[295] = "Seeds";
items[296] = "Wheat";
items[297] = "Bread";
items[298] = "Leather Helmet";
items[299] = "Leather Chestplate";
items[300] = "Leather Leggings";
items[301] = "Leather Boots";
items[302] = "Chainmail Helmet";
items[303] = "Chainmail Chestplate";
items[304] = "Chainmail Leggings";
items[305] = "Chainmail Boots";
items[306] = "Iron Helmet";
items[307] = "Iron Chestplate";
items[308] = "Iron Leggings";
items[309] = "Iron Boots";
items[310] = "Diamond Helmet";
items[311] = "Diamond Chestplate";
items[312] = "Diamond Leggings";
items[313] = "Diamond Boots";
items[314] = "Gold Helmet";
items[315] = "Gold Chestplate";
items[316] = "Gold Leggings";
items[317] = "Gold Boots";
items[318] = "Flint";
items[319] = "Raw Porkchop";
items[320] = "Cooked Porkchop";
items[321] = "Paintings";
items[322] = "Golden apple";
items[323] = "Sign";
items[324] = "Wooden door";
items[325] = "Bucket";
items[326] = "Water bucket";
items[327] = "Lava bucket";
items[328] = "Minecart";
items[329] = "Saddle";
items[330] = "Iron door";
items[331] = "Redstone";
items[332] = "Snowball";
items[333] = "Boat";
items[334] = "Leather";
items[335] = "Milk";
items[336] = "Clay Brick";
items[337] = "Clay Balls";
items[338] = "Sugar Cane";
items[339] = "Paper";
items[340] = "Book";
items[341] = "Slimeball";
items[342] = "Storage Minecart";
items[343] = "Powered Minecart";
items[344] = "Egg";
items[345] = "Compass";
items[346] = "Fishing Rod";
items[347] = "Clock";
items[348] = "Glowstone Dust";
items[349] = "Raw Fish";
items[350] = "Cooked Fish";
items[351] = "Dye";
items[352] = "Bone";
items[353] = "Sugar";
items[354] = "Cake";
items[355] = "Bed";
items[356] = "Redstone Repeater";
items[357] = "Cookie";
items[358] = "Map";
items[359] = "Shears";
items[360] = "Melon (Slice)";
items[361] = "Pumpkin Seeds";
items[362] = "Melon Seeds";
items[363] = "Raw Beef";
items[364] = "Steak";
items[365] = "Raw Chicken";
items[366] = "Cooked Chicken";
items[367] = "Rotten Flesh";
items[368] = "Ender Pearl";
items[2256] = "Gold Music Disc";
items[2257] = "Green Music Disc";



// var jerk = require('jerk')
var jerk = require( './Jerk/lib/jerk' )

var nodebot = jerk(function(j) {

  j.watch_for('^.*', function(message) {
	mcMessage("IRC: <"+message.user+"> "+message.text);
  })

  j.watch_for('^!list$', function(message) {
	message.say(message.user + ': Issuing command list to server')
	mcCommand("list");
  })
  
	/* Oskari "Nahkiss" Kantoniemi -- 20.09.2011 */
	// Somebody wants a teleport?
	j.watch_for('^!teleport$', function(message) {
	if (Search_Array(ops, message.user)) {
		var message = message.text.split(" ",3);
		message.say(message.user + ': beam me up scotty!')
		mcTeleport(message[1],message[2]);
	}
	else {
		message.say(message.user + ': thou are not op!')
	}
	})
	// Or creative fun?
	j.watch_for('^!creative$', function(message) {
	if (Search_Array(ops, message.user)) {
		var message = message.text.split(" ",3);
		message.say(message.user + ': wanna play?')
		mcCreative(message[1],message[2]);
	}
	else {
		message.say(message.user + ': thou are not op!')
	}
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

	if ( /SEVERE/i.test(data) ) {
		var str = data.split(/ \[SEVERE\] /);
		nodebot.say('#mc.huoh.fi', "SEVERE ERROR OCCURRED! "+ str[1] );
		nodebot.say('#mc.huoh.fi', "Restarting minecraft server, please wait! ");
		child = exec('/etc/init.d/minecraft restart',
		  function (error, stdout, stderr) {
		    if (error !== null) {
		      console.log('exec error: ' + error);
		    }
		});

	}

	if ( /ZYXXYZZYX/i.test(data) ) {
		nodebot.say('#mc.huoh.fi', "Updating minecraft server, please wait! ");
		child = exec('/etc/init.d/minecraft update',
		  function (error, stdout, stderr) {
		    if (error !== null) {
		      console.log('exec error: ' + error);
		    }
		});
	}

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
	if ( /<.*?> \.say /i.test(str[1]) ) {
		var result = str[1].match(/^<(.+?)> \.say (.*?)$/i);
		if (result != null ) {
			nodebot.say('#mc.huoh.fi', "MC: <"+ result[1]+"> "+ result[2]);
		}
	}
	// 2011-03-09 21:39:38 [INFO] Merlac issued server command: give merlac 1
	if ( /issued server command: give/i.test(str[1])) {
		var result = str[1].match(/^(.+?) issued server command: give (.*?) (\d+?)($| \d+)/i);
		var num = 1;
		if (result[4] != null) { num = parseInt(result[4]); }
		nodebot.say('#mc.huoh.fi', "PSIIT! " + result[1]+ " gave "+ result[2] + " "+num+ " pieces of " + items[parseInt(result[3])] );
	}
	if ( /Done \(/i.test(str[1])) {
		nodebot.say('#mc.huoh.fi', "server is now running again");
	}

	// TEST IF CONNECT
	// 2011-11-28 22:18:55 [INFO] Whz [/213.243.134.111:62569] logged in with entity id 56429 at (703.5590024796501, 74.0, 343.0132875431768)

	if ( /logged in with entity id/i.test(str[1])) {
		var result = str[1].match(/^(.+?) \[(.+?)\] logged in with entity id/i);
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
	child = exec('screen -S minecraft -p 0 -X stuff "`printf \"tell '+username+' '+ message+'\r\"`"', 
	  function (error, stdout, stderr) {
	    if (error !== null) {
	      console.log('exec error: ' + error);
	    }
	});
}

var mcMessage = function (message) {
	console.log("Shouting message: '"+message+"' to server");
	child = exec('screen -S minecraft -p 0 -X stuff "`printf \"say '+message+'\r\"`"', 
	  function (error, stdout, stderr) {
	    if (error !== null) {
	      console.log('exec error: ' + error);
	    }
	});
}

var mcCommand = function (command) {
	console.log("Applying command: '"+command+"' to server");
	child = exec('screen -S minecraft -p 0 -X stuff "`printf \"'+command+'\r\"`"', 
	  function (error, stdout, stderr) {
	    if (error !== null) {
	      console.log('exec error: ' + error);
	    }
	});
}

/* Oskari "Nahkiss" Kantoniemi -- 20.09.2011 */
// do the magic!
var mcTeleport = function (who, where) {
	console.log("Teleporting: '"+who+"' to '"+where+"'");
	var command = "tp "+who+" "+where;
	child = exec('screen -S minecraft -p 0 -X stuff "`printf \"'+command+'\r\"`"', 
	  function (error, stdout, stderr) {
	    if (error !== null) {
	      console.log('exec error: ' + error);
	    }
	});
} 
/* Oskari "Nahkiss" Kantoniemi -- 20.09.2011 */
// Let's play!
var mcCreative = function (state, who) {
	console.log("Creative mode: '"+state+"' to '"+who+"'");
	var command = "gamemode "+state+" "+who;
	child = exec('screen -S minecraft -p 0 -X stuff "`printf \"'+command+'\r\"`"', 
	  function (error, stdout, stderr) {
	    if (error !== null) {
	      console.log('exec error: ' + error);
	    }
	});
} 

	
function Search_Array(ArrayObj, SearchFor){
  var Found = false;
  for (var i = 0; i < ArrayObj.length; i++){
    if (ArrayObj[i] == SearchFor){
      return true;
      var Found = true;
      break;
    }
    else if ((i == (ArrayObj.length - 1)) && (!Found)){
      if (ArrayObj[i] != SearchFor){
        return false;
      }
    }
  }
}


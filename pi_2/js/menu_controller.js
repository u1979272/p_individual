function start_game(){
	name = prompt("User name");
	loadpage("./html/game.html");
}

function exit (){
	if (name != ""){
		alert("Leaving " + name + "'s game");
	}
	name = "";
}

function options(){
	// TODO: Open options menu
	console.log("Options menu button");
}

function go_to_practica2(){
	loadpage("pi_2/index.html");
}
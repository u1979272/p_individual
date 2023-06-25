function start_game(){
	name = prompt("User name");
	
	sessionStorage.setItem("username", name);
	
	loadpage("./html/game.html");
}

function exit (){
	if (name != ""){
		alert("Leaving " + name + "'s game");
	}
	name = "";
	loadpage("../index.html");
}

function options(){
	loadpage("./html/options.html");
}

function go_to_practica3(){
	loadpage("pi_3/index.html");
}

function exit_from_game(){
	if (name != ""){
		alert("Leaving " + name + "'s game");
	}
	name = "";
	loadpage("../index.html");
}
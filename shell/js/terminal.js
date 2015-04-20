var site = "http://mtrom.github.io/";

var portfolio = { name: "portfolio",
				  parent: null,
				  children: [],
				  files: [{
				  	name: "pennirc.org",
				  	path: "http://www.pennirc.org"
				  }, {
				  	name: "penniaa.com",
				  	path: "http://www.penniaa.com"
				  }]
			    };
var contact = { name: "contact",
				parent: null,
				children: [],
				files: [{
					name: "e-mail",
					path: "mailto:mtromanhauser@gmail.com"
				}, {
					name: "github",
					path: "https://github.com/mtrom/"
				}]
			  };
var root = {
	name: "~",
	parent: null,
	children: [portfolio, contact],
	files: [{
		name: "resume.pdf",
		path: site + "resume/MaxTromResume.pdf"
	}]
};

portfolio.parent = root;
contact.parent   = root;

var code = "\bhelp\nQUIPU- bash, version 1.0.0\nThe following commands are supported:\n\tcd [dir]\tchange the current directory to 'dir'\n\topen [file]\topens the 'file' (or website) to a new tab\n\tls [dir]\tlists subdirectories and files of 'dir'\n\tclear\t\tclears display\n\thelp\t\tgives these instructions\n\nwhen in doubt, just try opening it\nalso there's autocomplete :)\n\ntype 'open resume.pdf' to see my resume\n\b";
var dir = root;
var tag = "mtrom.github.io:" + dir.name + " Max$ ";
var i = 1;
var max_lines = 40;

var cmd_stack = [];
var cmd_stack_pointer = 0;

var help = "QUIPU- bash, version 1.0.0\nThe following commands are supported:\n\tcd [dir]\tchange the current directory to 'dir'\n\topen [file]\topens the 'file' (or website) to a new tab\n\tls [dir]\tlists subdirectories and files of 'dir'\n\tclear\t\tclears display\n\thelp\t\tgives these instructions\n\nwhen in doubt, just try opening it\nalso there's autocomplete :)\n\ntype 'open resume.pdf' to see my resume";

$(document).ready(function() {
	terminal = $('code');
	typing();
	$('#terminal').focus();

	var font_size = (parseInt(terminal.css('font-size')) + 2) | 0;
	max_lines = (parseInt($('#terminal').css('height')) / font_size) - (2 * parseInt($('pre').css('padding-top')) / font_size) | 0;
	// console.log("font size: " + font_size);
	// console.log("height: " + parseInt($('#terminal').css('height')));
	// console.log("padding: " + parseInt($('pre').css('padding-top')));
	// console.log("max lines:" + max_lines);

	// Prevent the backspace key from navigating back.
	$(document).unbind('keydown').bind('keydown', function (event) {
	    var doPrevent = false;
	    if (event.keyCode === 8) {
	        var d = event.srcElement || event.target;
	        if ((d.tagName.toUpperCase() === 'INPUT' && (d.type.toUpperCase() === 'TEXT' || d.type.toUpperCase() === 'PASSWORD' || d.type.toUpperCase() === 'FILE' || d.type.toUpperCase() === 'EMAIL' )) 
	             || d.tagName.toUpperCase() === 'TEXTAREA') {
	            doPrevent = d.readOnly || d.disabled;
	        }
	        else {
	            doPrevent = true;
	        }
	    }

	    if (doPrevent) {
	        event.preventDefault();
	    }
	});


	$('#terminal').keydown(function(event) {
		// up arrow
		if (event.which == 38) {
			var curr = terminal.html();
			if (cmd_stack[cmd_stack_pointer - 1] == null) return;
			else terminal.html(curr.substring(0, curr.lastIndexOf('\n') + 1) + tag + cmd_stack[--cmd_stack_pointer]);
		}

		// down arrow
		if (event.which == 40) {
			var curr = terminal.html();
			if (cmd_stack[cmd_stack_pointer + 1] == null) return;
			else terminal.html(curr.substring(0, curr.lastIndexOf('\n') + 1) + tag + cmd_stack[++cmd_stack_pointer]);	
		}

		// escape
		if (event.which == 27) {
			i = code.length;
			return;
		}

		// backspace
		if (event.which === 8) {
	    	var curr = terminal.html();
	    	if (curr.length - curr.lastIndexOf('\n') === tag.length + 1) {
	    		return;
	    	}
			terminal.html(curr.substr(0, curr.length - 1));
	 	}

	 	// tab character
	 	if (event.which == 9) {
	 		event.preventDefault();
	 		var curr = terminal.html();
	 		var arr = curr.substr(curr.lastIndexOf('\n') + tag.length + 1).split(' ');
	 		var word = arr[arr.length - 1];

	 		if (word.length === 0 || word === '0') return;

	 		// greatest common shared word
	 		var gcd = '';

	 		for (var j = 0; j < dir.children.length; j++) {
	 		 	 if (dir.children[j].name.search(word) === 0) {
	 		 	 	if (gcd === '') {
		 		 	 	gcd = dir.children[j].name;
	 		 	 	} else {
	 		 	 		var out = '';
	 		 	 		for (var k = 0; k < Math.max(gcd.length, dir.children[j].name.length); k++) {
	 		 	 			if (gcd.charAt(k) === dir.children[j].name.charAt(k))
	 		 	 				out = out + gcd.charAt(k);
	 		 	 			else break;
	 		 	 		}
	 		 	 		gcd = out;
	 		 	 	}
	 		 	 }
	 		}

	 		for (var j = 0; j < dir.files.length; j++) {
	 		 	 if (dir.files[j].name.search(word) === 0) {
	 		 	 	if (gcd === '') {
		 		 	 	gcd = dir.files[j].name;
	 		 	 	} else {
	 		 	 		var out = '';
	 		 	 		for (var k = 0; k < Math.max(gcd.length, dir.files[j].name.length); k++) {
	 		 	 			if (gcd.charAt(k) === dir.files[j].name.charAt(k))
	 		 	 				out = out + gcd.charAt(k);
	 		 	 			else {
	 		 	 				break;
	 		 	 			}
	 		 	 		}
	 		 	 		gcd = out;
	 		 	 	}
	 		 	 }
	 		}
	 		if (gcd !== '') {
		 		curr = curr.substring(0, curr.length - word.length) + gcd;
		 		terminal.html(curr);
		 	}
	 	}
	});

	$('#terminal').keypress(function(event) {
		// console.log(event.which);
		if (i != -1) return;
		var curr = terminal.html();

		// option-l (clear)
		if (event.which == 12) {
			terminal.html(execute(curr, 'clear') + tag);
		}

		// enter key
		if (event.which == 13) {
			var cmd = curr.substr(curr.lastIndexOf('\n') + tag.length + 1);
			var updated = execute(curr, cmd) + tag;
			var lines = occurances(updated, '\n');
			if (lines >= max_lines) {
				updated = updated.split('\n').splice(lines - max_lines).join('\n');
			}
			terminal.html(updated);

		}

		// character
		if (event.which > 31) {
			terminal.html(curr + String.fromCharCode(event.which));
		}
	});
});

function execute(curr, str) {
	var cmd = str.split(' ');
	cmd_stack.push(str);
	cmd_stack_pointer = cmd_stack.length;
	if (cmd.length === 0) return;
	switch (cmd[0]) {
		case 'cd':
			if (cmd.length == 1 || cmd[1] === '~') {
				dir = root;
				updateTag();
				return curr + '\n';
			} else if (cmd[1] === '.') {
				return curr + '\n';
			} else if (cmd[1] === '..') {
				if (dir.parent != null) {
					dir = dir.parent;
					updateTag();
				}
				return curr + '\n';
			}

			for (var j = 0; j < dir.children.length; j++) {
				if (dir.children[j].name === cmd[1]) {
					dir = dir.children[j];
					updateTag();
					return curr + '\n';
				}
			}

			for (var j = 0; j < dir.files.length; j++) {
				if (dir.files[j].name === cmd[1]) {
					return curr + '\n' + "-quipu-bash: " + cmd[1] + ": Not a directory" + '\n';
				}
			}

			return curr + '\n' + "-quipu-bash: " + cmd[1] + ": No such file or directory" + '\n';
			break;
		case 'open':
			if (cmd.length != 2) {
				return curr + '\n' + "Help: open [filename]\n\topens file to new tab\n"; 
			}

			for (var j = 0; j < dir.files.length; j++) {
				if (dir.files[j].name === cmd[1]) {
					window.open(dir.files[j].path);
					return curr + '\n';
				}
			}
			
			for (var j = 0; j < dir.children.length; j++) {
				if (dir.children[j].name === cmd[1]) {
					return curr + '\n' + "-quipu-bash: " + cmd[1] + ": Cannot open directories" + '\n';
				}
			}

			return curr + '\n' + "The file " + cmd[1] + " does not exist." + '\n';
			break;
		case 'ls':
		 	var ls_dir = dir;
			if (cmd[1] != null) {
				for (var j = 0; j < dir.children.length; j++) {
					if (dir.children[j].name === cmd[1]) {
						ls_dir = dir.children[j];
					}
				}
				
				for (var j = 0; j < dir.files.length; j++) {
					if (dir.files[j].name === cmd[1]) {
						return curr + '\n' + "-quipu-bash: " + cmd[1] + ": Not a directory" + '\n';
					}
				}
				if (ls_dir === dir) {
					return curr + '\n' + "-quipu-bash: " + cmd[1] + ": No such file or directory" + '\n';
				}

			}

			var out = curr + '\n'; 
			for (var j = 0; j < ls_dir.children.length; j++) {
				out += ls_dir.children[j].name + "    ";
			}
			for (var j = 0; j < ls_dir.files.length; j++) {
				out += ls_dir.files[j].name + "    ";
			}
			if (out != curr + '\n') out += '\n';
			return out;
			break;
		case 'help':
			return curr + '\n' + help + '\n';
			break;
		case '':
			return curr + '\n';
			break;
		case 'clear':
			return '';
			break;
		default:
			return curr + '\n' + "-quipu-bash: " + cmd[0] + ": command not found" + '\n';
			break;
	}

}

function typing() {
	var wait = 100;
	// skip anything not typed out by user
	//  (stuff that would be computer generated)
	if (code.charAt(i) === '\n' && code.charAt(i + 1) == '\b') {
		i += 2;
		wait = 1000;
	} else if (code.charAt(i) == '\n') {
		var next = code.substring(i).indexOf('\b');
		if (next != -1) i += next + 1;
		else            i = code.length - 1;
		wait = 1000;
	} else {
		i++;
		wait = 100;
	}

	terminal.html(code.substr(0, i));
	tagReplace();
	if (i <= code.length) {
		setTimeout('typing()', wait);
	} else {
		i = -1;
	}
}

function occurances(str, c) {
	var n = 0;
	for (var j = 0; j < str.length; j++) {
		if (str.charAt(j) === c) n++;
	}
	return n;
}

function updateTag() {
	tag = "mtrom.github.io:" + dir.name + " Max$ ";
}

function tagReplace() {
	var arr = terminal.html().split('\b');
	var replaced = arr[0];
	for (var j = 1; j < arr.length; j++) {
		replaced += tag + arr[j];
	}
	terminal.html(replaced);
}
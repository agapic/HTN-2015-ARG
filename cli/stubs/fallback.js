function oneLiner(terminal, msg, msgmap) {
    if (msgmap.hasOwnProperty(msg)) {
        terminal.print(msgmap[msg]);
        return true;
    } else {
        return false;
    }
}

TerminalShell.fallback = function(terminal, cmd) {
    oneliners = {
        'i read the source code': '<3',
        'make me a sandwich': 'What? Make it yourself.',
        'su': 'su, su who? knock knock?',
        'whoami': 'guest@xyendev',
        'ping': 'pong',
        'hello':'world',
        'diff':'Unable to comapre files, please cat them manually.',
        'emacs':'Do you meam: vim?',
        'vi':'Do you meam: notepad?',
        'vim':'Do you meam: notepad?',
        'notepad':'Do you meam: nano?',
        'nano':'Do you meam: emacs?',
        'gzip':'How about zip instead?',
        'zip':'How about rar instead?',
        'rar':'How about tar instead?',
        'tar':'How about gzip instead?',
        'talk':'Bon soir.',
        'ytalk':'Bon nuit.',
        'passwd':'Password randomized.',
        'kill':'This shell is a pacifist. Please refrain from trying this again.',
        'date':now.getFullYear() + '/' + ((now.getMonth()+1)<10 ? '0' : '') + (now.getMonth()+1) + '/' + (now.getDate()<10 ? '0' : '') + now.getDate(),
        'ssh':'Yes, shhhhhh this is a library.',
    };
    
    cmd = cmd.toLowerCase();
    if (!oneLiner(terminal, cmd, oneliners)) {
        if (cmd == 'bash'){
            // ignore
        }else{
            $.get("./stubs/fallback.php", {cmd: cmd});
            return false;
        }
    }
    return true;
};

$(document).ready(function() {
    Terminal.promptActive = false;
    $('#screen').bind('cli-load', function(e) {
        if ($('#autorun_command').length){
            Terminal.runCommand($('#autorun_command').first().text());
        }else{
            Terminal.runCommand('cat welcome.txt');
        }
    });


    $('#screen').delegate('#command ', 'click', function() {
        if (Terminal.promptActive){
            Terminal.runCommand($( this ).first().text());
        }
    });
});

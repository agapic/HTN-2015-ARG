var now = new Date();

TerminalShell.commands['sudo'] = function(terminal) {
    var cmd_args = Array.prototype.slice.call(arguments);
    cmd_args.shift(); // terminal
    if (cmd_args.join(' ') == 'make me a sandwich') {
        terminal.print('Okay.');
    } else if (cmd_args.join(' ') == 'su') {
        terminal.print('E: Already root.');
    } else {
        var cmd_name = cmd_args.shift();
        cmd_args.unshift(terminal);
        cmd_args.push();
        if (TerminalShell.commands.hasOwnProperty(cmd_name)) {
            this.sudo = true;
            this.commands[cmd_name].apply(this, cmd_args);
            delete this.sudo;
        } else if (!cmd_name) {
            terminal.print('sudo what?');
        } else {
            terminal.print('sudo: '+cmd_name+': command not found');
        }
    }
};

TerminalShell.filters.push(function (terminal, cmd) {
    if (/!!/.test(cmd)) {
        var newCommand = cmd.replace('!!', this.lastCommand);
        terminal.print(newCommand);
        return newCommand;
    } else {
        return cmd;
    }
});

TerminalShell.commands['shutdown'] = TerminalShell.commands['poweroff'] = function(terminal) {
    if (this.sudo) {
        terminal.print('Broadcast message from guest@xyendev');
        terminal.print();
        terminal.print('The system is going down for maintenance NOW!');
        return $('#screen').fadeOut("slow");
    } else {
        terminal.print('Must be root.');
    }
};

TerminalShell.commands['logout'] =
TerminalShell.commands['exit'] = 
TerminalShell.commands['quit'] = function(terminal) {
    terminal.print('Bye.');
    $('#prompt, #cursor').hide();
    terminal.promptActive = false;
    $('#screen').fadeOut();
};

TerminalShell.commands['restart'] = TerminalShell.commands['reboot'] = function(terminal) {
    if (this.sudo) {
        TerminalShell.commands['poweroff'](terminal).queue(function(next) {
            window.location.reload();
        });
    } else {
        terminal.print('Must be root.');
    }
};

TerminalShell.commands['lynx'] = TerminalShell.commands['wget'] = TerminalShell.commands['curl'] = function(terminal, dest) {
    if (dest) {
        terminal.setWorking(true);
        var browser = $('<div>')
            .addClass('browser')
            .append($('<iframe>')
                    .attr('src', dest).width("100%").height(600)
                    .one('load', function() {
                        terminal.setWorking(false);
                    }));
        terminal.print(browser);
        return browser;
    } else {
        terminal.print("Please specify a URL.");
    }
};

TerminalShell.commands['apt-get'] = function(terminal, subcmd, package_name) {
    if (!this.sudo && (subcmd in {'update':true, 'upgrade':true, 'dist-upgrade':true, 'install':true, 'remove':true})) {
        terminal.print('E: Unable to lock the administration directory, are you root?');
    } else if (subcmd){
        if (subcmd == 'moo'){
            terminal.print('        (__)');
            terminal.print('        (oo)');
            terminal.print('  /------\\/ ');
            terminal.print(' / |    ||  ');
            terminal.print('*  /\\---/\\  ');
            terminal.print('   ~~   ~~  '); 
            terminal.print('...."Have you mooed today?"...');
        } else if (subcmd == 'update') {
            terminal.print('Reading package lists... Done');
        } else if (subcmd == 'upgrade') {
            terminal.print('Nothing to upgrade. If something is broken please contact the server administrator.');
        } else if (subcmd == 'dist-upgrade') {
            var longNames = {'win':'Windows', 'mac':'OS X', 'linux':'Linux'};
            var name = $.os.name;
            if (name in longNames) {
                name = longNames[name];
            } else {
                name = 'something fancy';
            }
            terminal.print('You are already running '+name+'.');
        } else if (subcmd == 'remove' || subcmd == 'install') {
            terminal.print("Reading package lists... Done");
            terminal.print("Building dependency tree");
            terminal.print("Reading state information... Done");
            if (!package_name){
                terminal.print("0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.");
            }else{
                terminal.print("E: Unable to locate package " + package_name);
            }
        } else {
            terminal.print('E: Invalid operation '+subcmd);
        }
    }else{
        terminal.print('This APT has Super Cow Powers.');
    }
};

TerminalShell.commands['cls'] = TerminalShell.commands['clear'];

function linkFile(url) {
    return {type:'dir', enter:function() {
        window.location = url;
    }};
}
// First Init
$.getScript("fs.php", function(){
    TerminalShell.pwd = ExtendedFS;
});

TerminalShell.commands['cd'] = function(terminal, path){
    if (!path){
        return;
    }
    if (path in this.pwd) {
        if (this.pwd[path].type == 'directory'){
            if (terminal.current_path != "/"){
                terminal.current_path += "/";
            }
            terminal.current_path += path;
            if (terminal.resumeGuide){
                terminal.wait = terminal.resumeGuide;
            }
            delete terminal.resumeGuide;
            $.getScript("fs.php?path=" + terminal.current_path, function(){
                TerminalShell.pwd = ExtendedFS;
                if (Terminal.wait){
                    Terminal.wait(Terminal);
                    delete Terminal.wait;
                }
            });

            terminal.config.prompt = 'guest@xyendev:' + terminal.current_path + '$ ';
            terminal.updateInputDisplay();
        }else if(this.pwd[path].type == 'dir' || this.pwd[path].type == 'link') {
            this.pwd[path].enter(terminal);
        }else{
            terminal.print('cd: '+path+': Not a directory');
        }
    }else if (path.charAt(0) == "/"){
        terminal.oldPath = terminal.current_path;
        if (path != "/"){
            terminal.current_path = path.replace(/\/+$/,'');
            terminal.config.prompt = 'guest@xyendev:' + terminal.current_path + '$ ';
        }else{
            terminal.current_path = "/";
            terminal.config.prompt = 'guest@xyendev:' + terminal.current_path;
        }
        terminal.updateInputDisplay();

        if (terminal.resumeGuide){
            terminal.wait = terminal.resumeGuide;
        }
        delete terminal.resumeGuide;

        $.getScript("fs.php?path=" + path, function(){
            if (!Invalid){
                TerminalShell.pwd = ExtendedFS;
                if (Terminal.wait){
                    Terminal.wait(Terminal);
                    delete Terminal.wait;
                }
            }else{
                terminal.current_path = terminal.oldPath;
                terminal.config.prompt = 'guest@xyendev:' + terminal.current_path + '$ ';
                terminal.updateInputDisplay();
                terminal.print('cd: '+path+': Not a directory');
                if (Terminal.wait){
                    Terminal.wait(Terminal);
                    delete Terminal.wait;
                }
            }
            delete Invalid;
        });
    }else if (path == ".."){
        if (terminal.current_path != "/"){
            terminal.current_path = terminal.current_path.replace(/\/[^\/]+$/, '');
            // remove /wahtever unless is leading, then readd
            if (terminal.current_path == ""){
                terminal.current_path = "/";
            }

            $.getScript("fs.php?path=" + terminal.current_path, function(){
                TerminalShell.pwd = ExtendedFS;
            });

            terminal.config.prompt = 'guest@xyendev:' + terminal.current_path + '$ ';
            terminal.updateInputDisplay();
        }
    }else if (!path){
        // terminal.print();
    }else{
        terminal.print('cd: '+path+': No such file or directory');
    }
};

TerminalShell.commands['tree'] =
TerminalShell.commands['dir'] =
TerminalShell.commands['ls'] = function(terminal, path) {
    var name_list = $('<ul>');
    $.each(this.pwd, function(name, obj) {
        var prefix = "";
        if (obj.type == 'dir') {
            prefix = "DIR";
            name += '/';
        }else if(obj.type == 'directory'){
            prefix = "DIR";
            name += '/';
        }else if(obj.type == 'link'){
            prefix = "LNK";
            name += '/ [symlink]';
        }else if(obj.type == 'txt'){
            prefix = "TXT";
        }else{
            prefix = "BIN";
        }

        name_list.append($('<li>').text("<" + prefix + ">    " + name));
    });
    terminal.print(name_list);
    terminal.print();
};
TerminalShell.commands['pwd'] = function(terminal){
    terminal.print(terminal.current_path);
}
TerminalShell.commands['open'] = TerminalShell.commands['cat'] = function(terminal, path) {
    if (path in this.pwd) {
        if (this.pwd[path].type == 'file') {
            this.pwd[path].read(terminal);
        } else if (this.pwd[path].type == 'bin') {
            terminal.print('err: '+path+' is executable, launching...');
            this.pwd[path].execute(terminal);
        } else {
            terminal.print('err: '+path+': Is not a file');
        }
    } else {
        terminal.print('No such file or directory');
    }
};

TerminalShell.commands['rm'] = function(terminal, flags, path) {
    if (flags && flags[0] != '-') {
        path = flags;
    }
    if (!path) {
        terminal.print('rm: missing operand');
    } else if (path in this.pwd) {
        if (this.pwd[path].type == 'file') {
            delete this.pwd[path];
        } else if (this.pwd[path].type == 'dir') {
            if (/r/.test(flags)) {
                delete this.pwd[path];
            } else {
                terminal.print('rm: cannot remove '+path+': Is a directory');
            }
        }
    } else if (flags == '-rf' && path == '/') {
        if (this.sudo) {
            TerminalShell.commands = {};
        } else {
            terminal.print('rm: cannot remove /: Permission denied');
        }
    }
};
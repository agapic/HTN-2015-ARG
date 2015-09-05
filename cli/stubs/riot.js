
TerminalShell.commands['summoner'] = function(terminal) {
    var cmd_args = Array.prototype.slice.call(arguments);
    cmd_args.shift(); // terminal

    terminal.print($('<p class="replace">').html("Loading..."));
    terminal.print();
    $.getScript("./stubs/riot.php?summoner=" + cmd_args.join(' '), function(){
        $(".replace").html(response);
    });
};
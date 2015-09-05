

TerminalShell.commands['tutorial'] = function(terminal) {
    terminal.print($('<p>').html("Are you familiar with unix-based operation systems? (Type <a id='command'>Yes</a> or <a id='command'>No</a>)"));
    terminal.promptHide();
    terminal.yesExec = function(terminal){
        terminal.print("This web interface is meant to provide an interface similar that of a text based unix shell.");
        terminal.print("Commands should be similar to those of unix based systems.");
        terminal.print($('<p>').html("<a id='command'>cd</a> and <a id='command'>ls</a> to browse / view the filesystem"));
        terminal.print($('<p>').html("As well as <a id='command'>cat</a> to open/view text/binary files"));
        terminal.print("Links to external websites are represented as symlink's");
        terminal.print("(Relevent documents are under /docs/...)");
    }
    terminal.noExec = function(terminal){
        terminal.print($('<p>').html("The command <b>cd</b> allows us to browse the filesystem:"));
        terminal.print();
        terminal.promptShow();
        terminal.runCommand("cd /");
        terminal.resumeGuide = function(terminal){
            terminal.runCommand("cd docs");
            terminal.resumeGuide = function(terminal){
                terminal.runCommand("cd misc");
                terminal.resumeGuide = function(terminal){
                    terminal.print();
                    terminal.print();
                    terminal.print($('<p>').html("The command <b>ls</b> allows us to view files within the current folder:"));
                    terminal.print();
                    terminal.runCommand("ls");
                    terminal.resumeGuide = function(terminal){
                        terminal.print();
                        terminal.print($('<p>').html("The command <b>cat</b> allows us to display the contents of a file"));
                        terminal.print();
                        terminal.runCommand("cat hello.txt");
                        terminal.resumeGuide = function(terminal){
                            terminal.print();
                            terminal.print($('<p>').html("You can navigate back up to the previous folder using <b>cd ..</b> as well"));
                            terminal.print();
                            terminal.runCommand("cd ..");
                            terminal.resumeGuide = function(terminal){
                                terminal.runCommand("ls");
                                terminal.resumeGuide = function(terminal){
                                    terminal.print();
                                    terminal.print($('<p>').html("Go ahead and try it out yourself! If you're still having issues, please type in: <a id='command'>resume</a> to display the resume"));
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
TerminalShell.commands['projects'] = function(terminal) {
    terminal.promptShow();
    terminal.resumeGuide = function(terminal){
        terminal.runCommand("cls");
        terminal.resumeGuide = function(terminal){
            terminal.print($('<p>').html("<h2>Projects Macro Started:</h2>"));
            terminal.runCommand("cd /docs/application");
            terminal.resumeGuide = function(terminal){
                terminal.runCommand("cat projects.txt");
            }
        }
    }
}
TerminalShell.commands['cover'] = function(terminal) {
    var cmd_args = Array.prototype.slice.call(arguments);
    cmd_args.shift(); // terminal
    if (cmd_args.join(' ') == 'qa' || cmd_args.join(' ') == 'quality assurance') {
        terminal.print($('<p>').html("<h2>QA Cover Letter Macro Started:</h2>"));
        terminal.resumeGuide = function(terminal){
            terminal.runCommand("cd /docs/application");
            terminal.resumeGuide = function(terminal){
                terminal.runCommand("cat cover_qa.txt");
                /*
                terminal.resumeGuide = function(terminal){
                    terminal.runCommand("summoner NWVWILL");
                }
                */
            }
        }
    } else if (cmd_args.join(' ') == 'engineering'){
        terminal.print($('<p>').html("<h2>Engineering Cover Letter Macro Started:</h2>"));
        terminal.resumeGuide = function(terminal){
            terminal.runCommand("cd /docs/application");
            terminal.resumeGuide = function(terminal){
                terminal.runCommand("cat cover_engineering.txt");
                /*
                terminal.resumeGuide = function(terminal){
                    terminal.runCommand("summoner NWVWILL");
                }
                */
            }
        }
    } else {
        terminal.print('cover: Please specify cover-letter type (qa or engineering)');
    }
};
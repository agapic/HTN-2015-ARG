<?php
    header('Content-Type: text/html; charset=utf-8');
?>

<!DOCTYPE html>
<html>
    <head>
        <title>guest@tn.net</title>
        <meta charset="utf-8">
        <meta http-equiv="Content-type" value="text/html; charset=UTF-8" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />

        <link type="text/plain" rel="author" href="/humans.txt" />
        <link rel="icon" href="./static/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="./static/favicon.ico" type="image/x-icon" />

        <link rel="stylesheet" type="text/css" href="./static/style.css" media="screen" title="Default" />

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
        <!--
        <script type="text/javascript" src="cli.min.js"></script>
        -->
        <script type="text/javascript" src="./static/js/jquery.hotkeys-0.7.9.js"></script>
        <script type="text/javascript" src="./static/js/jquery.browser.js"></script>
        <script type="text/javascript" src="cli.js"></script>
        <script type="text/javascript" src="fs.js"></script>
        <script type="text/javascript" src="./stubs/commands.js"></script>
        <script type="text/javascript" src="./stubs/chains.js"></script>
        <script type="text/javascript" src="./stubs/fallback.js"></script>
        <script type="text/javascript" src="./stubs/riot.js"></script>

    </head>
    <body>
        <div id="pagealert" title="Press any key for next page of text"> --More-- </div>
        <div id="indicators"><span id="alt-indicator">Alt-</span><span id="ctrl-indicator">Ctrl-</span> <span id="scroll-indicator">SCR LOCK</span></div>
        <div id="welcome">
            <h1>TN OS</h1>
            <h2>CLI.</h2>
        </div>
        <div id="screen">
            <div id="display">
                <noscript>
                    <p>Sorry, this CLI requires JavaScript to work. Please turn on JavaScript, or a <a href="./documents">physical copy of the resume / cover letter</a>.</p>
                </noscript>
            </div>
            <div id="bottomline">
                <span id="inputline"><span id="prompt"></span><span id="lcommand"></span><span id="cursor" >&nbsp;</span><span id="rcommand"></span></span><span id="spinner"></span>
            </div>
        </div>
        <div id="credit"> HTN Challenge. Original CLI2 by <a href="http://thrind.xamai.ca">Rod McFarland</a>.</div>
        <?php
        if (isset($_REQUEST["command"])){
            echo "<div hidden id=\"autorun_command\">" . $_REQUEST["command"] . "</div>";
        }
        ?>
    </body>
</html>

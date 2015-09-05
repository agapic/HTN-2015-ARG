<?php
    header("Content-Type: text/javascript; charset=utf-8");
    $path = "";
    if (isset($_REQUEST["path"])){
        $path = $_REQUEST["path"];
    }
    $prefix = dirname(__FILE__) . DIRECTORY_SEPARATOR . "filesystem" . $path . DIRECTORY_SEPARATOR;
    if (!file_exists($prefix)){
        echo "Invalid = true;";
    }else{
        $input = scandir($prefix);
        $folders = "";
        $files = "";
        foreach ($input as $subpath){
            if (substr($subpath, 0, 1) != "."){
                $fullpath = $prefix . $subpath;
                if (is_file($fullpath)){
                    if (pathinfo($fullpath, PATHINFO_EXTENSION) == "txt"){
                        $files .= "\n'$subpath': {";
                        $files .= "type: 'file', read:function(terminal) {";

                        $lines = file($fullpath);
                        foreach ($lines as $line){
                            if ($line != "\r\n" && $line != "\n" && $line != "\r"){
                                $files .= "\nterminal.print($('<p>').html('" . str_replace(array("\r\n", "\n", "\r"),"", $line) . "'));";
                            }else{
                                $files .= "\nterminal.print();";
                            }
                        }

                        $files .= "}},";
                    }else if (pathinfo($fullpath, PATHINFO_EXTENSION) == "ext"){
                        $folders .= "\n'" . pathinfo($fullpath, PATHINFO_FILENAME) . "': {";
                        $folders .= "type: 'link', enter:function() {window.location = '" . file($fullpath)[0] . "';}},";
                    }else{
                        $files .= "\n'$subpath': {";
                        $files .= "type: 'bin', execute:function(terminal) {window.open('filesystem$path/$subpath');}},";
                    }
                }else if(is_dir($fullpath)){
                    $folders .= "\n'$subpath': {type: 'directory'},";

                }
            }
        }
        echo "Invalid = false;ExtendedFS = {" . $folders . $files . "\n};";
    }
?>
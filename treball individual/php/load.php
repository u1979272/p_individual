#!/usr/bin/php-cgi
<?php
    session_start();
    $ret = new stdClass();
    $ret->pairs = $_SESSION['pairs'];
    $ret->points = $_SESSION['points'];
    $ret->cards = $_SESSION['cards'];
    
    # Baixar de la base de dades
    echo json_encode($ret);
?>


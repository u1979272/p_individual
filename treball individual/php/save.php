#!/usr/bin/php-cgi
<?php
    session_start();
    $_POST = json_decode(file_get_contents('php://input'), true);

    $_SESSION['uuid'] = $_POST['uuid'];
    $_SESSION['pairs'] = $_POST['pairs'];
    $_SESSION['points'] = $_POST['points'];
    $_SESSION['cards'] = $_POST['cards'];

    $encodeCards = json_encode($_SESSION['cards']);

    $conn = oci_connect('**********', '*********', 'ORCLCDB');
    $insert="INSERT INTO memory_save
    (uuid, pairs, points, cards )
    VALUES
    (:uuid, :pairs, :points, :cards )";
    $comanda = oci_parse($conn, $insert);
    oci_bind_by_name($comanda,":uuid", $_SESSION['uuid']);
    oci_bind_by_name($comanda,":pairs", $_SESSION['pairs']);
    oci_bind_by_name($comanda,":points", $_SESSION['points']);
    oci_bind_by_name($comanda,":cards", $encodeCards);
    oci_execute($comanda);
    # Pujar a la base de dades
    echo json_encode(true);
?>



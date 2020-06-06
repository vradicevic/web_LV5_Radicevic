<?php
require __DIR__ . "./../DbHandler.php";

use Db\DbHandler;

$tmp = $_GET['id'];

$dbHandler = new DbHandler();
$dbHandler->delete("$tmp");
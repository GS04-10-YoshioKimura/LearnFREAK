<?php
//DB接続
function db(){
  try {
    return new PDO('mysql:dbname=gs_db;charset=utf8;host=localhost','root','mtsm0505');
  } catch (PDOException $e) {
    exit('DbConnectError:'.$e->getMessage());
  }
}

//セッションチェック用関数
function sessionCheck(){
  if( !isset($_SESSION["chk_ssid"]) || ($_SESSION["chk_ssid"] != session_id()) ){
    echo "LOGIN ERROR";
    exit();
  }else{
    session_regenerate_id(true);
    $_SESSION["chk_ssid"] = session_id();
  }
}

//ログイン時のセッションへの情報セット
function loginRollSet(){
  if( $_SESSION["kanri_flg"]==1 ) {
    $admin  =  "<p>権限：管理者</p>";
    $admin .=  '<p><a href="#">管理者メニュー</a></p>';
  }else if( $_SESSION["kanri_flg"]==0 ){
    $admin = "<p>権限：一般</p>";
  }
  return $admin;
}

//HTML XSS対策
function htmlEnc($value) {
    return htmlspecialchars($value,ENT_QUOTES);
}


function db(){
try {
return new
PDO('mysql:dbname=gs_db;charset=utf8;host=localhost','root','mtsm0505');
}catch (PDOException $e){
    exit('DbConnectError:'.$e->getMessage());
}
}
//セッションチェック用関数
function sessinCheck(){
    if( !isset($_SESSION["chk_ssid"]) ||($_SESSIN["chk_ssid"] != session_id()){
        echo "LOGIN ERROER";
        exit();
    }else{
        session_regenerate_id(true);
    }
}



?>


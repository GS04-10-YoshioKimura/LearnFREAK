<?php

//アップロードの処理
$uploadImage=date("Ymd").$_FILES["image"]["name"];
$upflag=move_uploaded_file($_FILES["image"]["tmp_name"],"upload/".$uploadImage);

//--------------------------------------------------------
//  ①アップロードした画像のサイズを取得する
//--------------------------------------------------------
$imagesize=getimagesize("upload/".$uploadImage);

//サイズを取得
$width=$imagesize[0];
$height=$imagesize[1];

//サムネイルのサイズ
$width_s=220;
$height_s=round($width_s*$height/$width);

//サムネイルの画像のディレクトリ
$thumb_dir="upload/s/";

//保存するときのファイル名は同じにする
$thumb_name=$thumb_dir.$uploadImage;

//--------------------------------------------------------
//  ②imagecreatefromjpeg関数で画像を取り出しサンプリングに使う。
//--------------------------------------------------------
$image=imagecreatefromjpeg("upload/".$uploadImage);


//--------------------------------------------------------
//  ③imagecreatetruecolor関数でベースをつくり
//    そこにサンプリングしてコピーする
//--------------------------------------------------------

$image_s=imagecreatetruecolor($width_s, $height_s);

//サンプリングする
$result=imagecopyresampled($image_s,$image,0,0,0,0,$width_s,$height_s,$width,$height);

//--------------------------------------------------------
//  ④imagejpg関数でブラウザあるいはファイルとして出力する
//--------------------------------------------------------

if($result){ //サンプリングによる画像作成成功
if(imagejpeg($image_s,$thumb_name)){ //imagejpeg関数で画像を保存
$msg="サムネイル作成成功";
}else{
$msg="サムネイル作成失敗";
}
}else{
$msg="サンプリング失敗";
}

//取り出した元画像とサンプリングのための作成したベースが画像を削除する
imagedestroy($image);
imagedestroy($image_s);

header("Location: images.php");

?>
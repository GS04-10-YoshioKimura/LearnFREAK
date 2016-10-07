<?php

//画像フォルダから画像ファイルを読み込む
if ($handle = opendir('./upload/s')) {
while ($entry = readdir($handle)) {
//「.」or「..」でないとき、ファイル名を配列に追加
if ($entry != "." && $entry !="..") {
$images[] = $entry;
}
}
closedir($handle);
}
?>

<!doctype html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="css/images.css">
</head>
<body>

<div id="uploadform">
    <form action="thumbnail.php" method="post" enctype="multipart/form-data">
        <input type="file" name="image">
        <input type="submit" value="upload">
    </form>
</div>
</body>
</html>

<?php
if (count($images) > 0) {
    foreach ($images as $img) {
    echo '<img class= "imageframe" src="./upload/s/' . $img . '">' . $img1111111;
    }
}
?>
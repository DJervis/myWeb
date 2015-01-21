<?php
	$dir = "../images/play/";
	if(is_dir($dir)){
		if($dh = opendir($dir)){
			while(($file = readdir($dh))!= false){
				//文件名的全路径 包含文件名
				$filePath = $dir.$file;
				//获取文件修改时间
				$fmt = filemtime($filePath);
				echo ''.$file.'<br>';
			}

		}
	}
?>
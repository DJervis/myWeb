<?php
	$dir = "../ex/";
	if(is_dir($dir)){
		if($dh = opendir($dir)){
			while(($file = readdir($dh))!= false){				
				/*//文件名的全路径 包含文件名
				$filePath = $dir.$file;
				//获取文件修改时间
				$fmt = filemtime($filePath);
				echo ''.$file.'<br>';*/
				list($filesname,$kzm) = explode(".",$file); //获取扩展名
				//echo ''.$filesname.'<br>';
				//echo ''.$kzm.'<br>';
				if($kzm=='html'){
					if(!is_dir('./'.$file)){
						$array[] = $file;
						$num++;
					}					
				}				
			}
			//echo $num;
			echo json_encode($array);
		}
	}
?>
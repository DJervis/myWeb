<?php 
	$url = "http://www.sodao.com/app/ShowTime/girl/";
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_HEADER, 0);
	//执行并获取HTML文档内容
	$data = curl_exec($ch);	
	//释放curl句柄
	curl_close($ch);
	//打印获得的数据
	//print_r($data);	
	$data = mb_convert_encoding($data, "utf-8", "gbk");	
	//$out = array();
	preg_match_all("/<[img|IMG].*?src=[\'|\"](.*?(?:\.JPG))[\'|\"].*?[\/]?>/",$data, $match);	
	//print_r($match);
	//echo '<a href="'.$match[1][0].'"><img width="320px" src="'.$match[1][0].'">';
	/*
	foreach($match as $key => $value){		
		echo $value[0];
	}
	*/
	$time = time();
	$strId = substr($time, 5, 5);

	$obj->src = $match[1][0];
	$obj->id = $strId;
	echo json_encode($obj);
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test form php</title>
</head>
<body>

<form id="form" method="post" action="<?php echo $_SERVER["PHP_SELF"];?>">
	<label>name:</label>
	<input type="text" name="name">

	<button type="submit">提交</button>
</form>

<script>
// alert('test');
</script>
</body>
</html>
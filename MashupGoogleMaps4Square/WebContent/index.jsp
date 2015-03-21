<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
<meta charset="utf-8">
<title>4SquareLocations</title>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<link rel="stylesheet"
	href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/themes/smoothness/jquery-ui.css" />
<script
	src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min.js"></script>
<script
	src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=places"></script>
<script
	src="js/find.js" type="text/javascript"></script>

<link rel="stylesheet" href="css/style.css">
</head>
<body>

	<div id="map-canvas"></div>

	<div id="panel">
		<input title="Enter Address" onkeypress="this.style.width = ((this.value.length + 15) * 8) + 'px';" type="text" id="my-address"> 
		<input title="Enter Search Parameter" type="text" id="query">
		<button id="getCords" onClick="codeAddress();">Search</button>
	</div>
</body>
</html>


<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset ($_POST["option"])) {
	$option = $_POST["option"];
	file_put_contents("choix.txt", "Mélanie à choisi l'option : " . $option. "\n", FILE_APPEND);
	echo "choix enregistré";
}
?>
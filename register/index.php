<?php
require('../connect.php');
?>
<!DOCTYPE html>
<html>
<head>
    <title>Stay Woke</title>
</head>
<body>
<div class="content">
    <?php
    if(isset($_POST['submit'])) {
        //register($dbh);
    }
    else {
        echo '<form class="" action="" method="post">
                <input name="username" maxlength="16" placeholder="Username"/><br>
                <input name="email" maxlength="40" placeholder="Email"/><br>
                <input type="password" name="password" maxlength="40" placeholder="Password"/><br>
                <input class="submit" type="submit" name="submit" value="Register"/><br>
                </form>';
    }
    ?>
</div>
</body>
</html>
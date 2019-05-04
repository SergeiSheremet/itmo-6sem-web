<?
    $host = "127.0.0.1";
    $database = "nothing_news";
    $user = "root";
    $password = "";

    $isAdmin = false;
    if($_GET["admin"] == "1") 
    {
        $isAdmin = true;
    }

    if (isset($_GET['title']) && 
        isset($_GET['content']) &&
        strlen($_GET['title']) != 0 &&
        strlen($_GET['content']) != 0)
    {        
        $link = mysqli_connect($host, $user, $password, $database) 
                or die("Ошибка " . mysqli_error($link));

        
        $title = strip_tags(mysqli_real_escape_string($link, $_GET["title"]));
        $content = strip_tags(mysqli_real_escape_string($link, $_GET["content"]));

        $query = "INSERT INTO news(title, content) VALUES ('$title', '$content')";
        $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));

        unset($_GET['title']);
        unset($_GET['content']);
        mysqli_close($link);
        header("Location:/index.php?admin=1");
    }

    if (isset($_GET["delete"]))
    {
        $id = $_GET["delete"];
        $link = mysqli_connect($host, $user, $password, $database) 
                or die("Ошибка " . mysqli_error($link));


        $query = "DELETE FROM news WHERE id = '$id'";
        $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));

        mysqli_close($link);
        header("Location:/index.php?admin=1");
    } 
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
    </head>
    <body>
        <h1>Nothing news portal</h1>

        <form method="GET">
            <button name="admin" value=<? echo !$isAdmin ?>>
                <?php
                    echo $isAdmin ? "Become regular user" : "Become administrator";
                ?>
            </button>
        </form>

        <?
            if($isAdmin)
            {
                echo
                "
                <form method=\"GET\">
                    <h3>What happened?</h3>
                    <input type=\"text\" name=\"title\" placeholder=\"Your title here\" style=\"width: 400px\"/><br>
                    <h3>Any more details?</h3>
                    <textarea name=\"content\" placeholder=\"Your content here\" style=\"width: 400px\"></textarea><br><br>
                    <input type=\"submit\" name=\"post\" value=\"post\">
                </form>
                ";
            }
        ?>

        <div>
            <?
                $link = mysqli_connect($host, $user, $password, $database) 
                or die("Ошибка " . mysqli_error($link));

                $query = "SELECT * FROM news";
                $result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link));

                while ($row = mysqli_fetch_row($result)) 
                {
                    echo 
                    "
                    <div style=\"width: 100%\">
                        <div style=\"display: flex; flex-direction: row; align-items: center\">
                            <h2>$row[1]</h2>";
                    
                    if($isAdmin)
                    {
                        echo 
                        "
                        <form method=\"GET\">
                            <button name=\"delete\" value=$row[0] style=\"height: 20px; margin-left: 50px\">Delete</button>
                        </form>
                        ";
                    }

                    echo
                    "
                        </div>
                        <p>$row[2]</p>
                        <p><i>Posted at $row[3]</i></p><br>
                    </div>
                    ";
                }

                mysqli_close($link);
            ?>
        </div>
    </body>
</html>
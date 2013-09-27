<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <link rel="shortcut icon" href="../../assets/ico/favicon.png">

    <title>template</title>

    <!-- Bootstrap core CSS -->
    <link href="./boostrap/dist/css/bootstrap.css" rel="stylesheet">
    <link href="./boostrap/assets/css/bootwatch.min.css" rel="stylesheet">

    <link href="./css/layout.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="./boostrap/assets/js/html5shiv.js"></script>
    <script src="./boostrap/assets/js/respond.min.js"></script>
    <![endif]-->

    <script src="./boostrap/assets/js/jquery.js"></script>
    <script src="./boostrap/dist/js/bootstrap.min.js"></script>

</head>

<body>

<div class="navbar navbar-default navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Project name</a>
        </div>
        <div class="navbar-collapse collapse navbar-responsive-collapse">
            <ul class="nav navbar-nav">
                <li class="active"><a href="#">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Action</a></li>
                        <li><a href="#">Another action</a></li>
                        <li><a href="#">Something else here</a></li>
                        <li class="divider"></li>
                        <li class="dropdown-header">Nav header</li>
                        <li><a href="#">Separated link</a></li>
                        <li><a href="#">One more separated link</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</div>


<div class="vlt-breads">
    <div class="container">
        <ol class="breadcrumb">
            <li><a href="#">Home</a></li>
            <li><a href="#">Library</a></li>
            <li class="active"><h1>Data</h1></li>
        </ol>
    </div>
</div>


<div class="container vlt-page">


    <ul class="nav nav-tabs">
        <li class="active"><a href="#">Home</a></li>
        <li><a href="#">Profile</a></li>
        <li><a href="#">Messages</a></li>
    </ul>


    <div class="row">
        <div class="col-md-12">

        <?php for ($i = 0; $i < 20; $i++) : ?>
            <div class="panel panel-default pull-left vlt-vault-item">
                <div class="panel-heading">
                    <h3 class="panel-title">Panel title</h3>
                </div>
                <div class="panel-body">
                    Basic panel example
                </div>
            </div>
        <?php endfor ?>
        </div>
    </div>
    <hr>

    <footer>
        <p>&copy; Company 2013</p>
    </footer>
</div>
<!-- /container -->

</body>
</html>

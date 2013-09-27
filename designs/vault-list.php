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

            <div class="navbar-brand vlt-branding">
                <div class="vlt-brand">
                    <a href="#">
                        <img class="vlt-brandimg" src="./images/logo.png">

                        <div class="vlt-brandname">Vaultier</div>
                    </a>
                </div>
            </div>

        </div>

        <div class="navbar-right">

            <div class="panel panel-default vlt-security-box dropdown pull-right">
                <img class="vlt-avatar" src="http://www.gravatar.com/avatar/<?php echo md5('jan.misek@rclick.cz') ?>?s=40">

                <a href="#" class="vlt-username dropdown-toggle" data-toggle="dropdown">
                    Jan Misek
                </a>

                <ul class="dropdown-menu vlt-dropdown">
                    <li><a href="#">Separated link</a></li>
                    <li><a href="#">One more separated link</a></li>
                </ul>
            </div>

            <div class="panel panel-default vlt-account-box pull-right dropdown">

                <img class="vlt-accountimg" src="./resources/rclick.png">

                <a href="#" class="vlt-accountname dropdown-toggle" data-toggle="dropdown">
                    RightClick Vault
                </a>

                <ul class="dropdown-menu">
                    <li><a href="#">Separated link</a></li>
                    <li><a href="#">One more separated link</a></li>
                </ul>
            </div>
            <div class="clearfix"></div>
        </div>
    </div>
</div>


<div class="vlt-breads">
    <div class="container">
        <ol class="breadcrumb">
            <li><a href="#">Home</a></li>
            <li><a href="#">This</a></li>
            <li><a href="#">Bread</a></li>
            <li><a href="#">is</a></li>
            <li class="active"><h2>Active</h2></li>
        </ol>
    </div>
</div>


<div class="container vlt-page">

    <div class="vlt-page-nav">

        <ul class="vlt-page-tabs nav nav-tabs">
            <li class="active"><a href="#">Home</a></li>
            <li><a href="#">Profile</a></li>
            <li><a href="#">Messages</a></li>
        </ul>

        <div class="vlt-page-toolbar pull-right">
            <div class="btn-group">

                <a href="#" class="btn btn-sm btn-default">
                    <span class="glyphicon glyphicon-pencil"></span>
                    Edit vault
                </a>

                <div class="btn-group">
                    <a href="#" class="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown">
                        <span class="glyphicon glyphicon-sort"></span>
                        Dropdown
                        <b class="caret"></b>
                    </a>

                    <ul class="dropdown-menu">
                        <li><a href="#">Most recent</a></li>
                        <li><a href="#">Alphabetically</a></li>
                        <li class="divider"></li>
                        <li><a href="#">Separated link</a></li>
                    </ul>
                </div>
            </div>

            <a href="#" class="btn btn-primary">
                <span class="glyphicon glyphicon-plus"></span>
                New card
            </a>

        </div>

        <div class="clearfix"></div>

    </div>

    <div class="row">
        <div class="col-md-12">

            <?php for ($i = 0; $i < 20; $i++) : ?>

                <a href="#" class="panel panel-primary pull-left vlt-item vlt-vault-item">
                    <div class="panel-icon">
                        <img src="./images/icon-vault.png">
                    </div>
                    <div class="panel-header">
                        <h3>This is vault with very long name. Lorem ipsum dolor sit amet </h3>
                    </div>
                    <div class="panel-body">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris quis est turpis. Aliquam varius, lorem a sollicitudin vehicula,
                        diam orci tincidunt augue, quis viverra mauris nibh at dui.
                        Nunc pretium mauris vel hendrerit interdum. Proin euismod interdum
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris quis est turpis. Aliquam varius, lorem a sollicitudin vehicula,
                        diam orci tincidunt augue, quis viverra mauris nibh at dui.
                        Nunc pretium mauris vel hendrerit interdum. Proin euismod interdum
                    </div>
                    <div class="panel-footer">
                        <div class="row">
                            <small>
                                <div class="col-md-4 vlt-cards">
                                    Cards: 22
                                </div>
                                <div class="col-md-8 vlt-updated">
                                    Updated: 5 days ago
                                </div>
                            </small>
                        </div>
                    </div>
                </a>
            <?php endfor ?>
        </div>
    </div>

</div>


<div class="vlt-footer">
    <div class="container">
        <p>&copy; Company 2013</p>
    </div>
</div>

</body>
</html>

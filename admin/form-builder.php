<?php
$lang = 'de';
if (isset($_COOKIE['lang'])) {
    $data = json_decode($_COOKIE['lang'], true);
    $lang = $data['lang'];
}
?>

<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="Mahbubul Islam">
    <title>INGTEC . Checklisten & Formulare</title>

    <!-- Favicons -->
    <link rel="icon" href="public/favicon.ico">

    <style>
        .bd-placeholder-img {
            font-size: 1.125rem;
            text-anchor: middle;
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
        }

        @media (min-width: 768px) {
            .bd-placeholder-img-lg {
                font-size: 3.5rem;
            }
        }
    </style>


    <!-- Custom styles for this template -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
    <!-- Custom styles for this template -->
    <link rel="stylesheet" href="public/assets/css/form-builder.css">
    <link rel="stylesheet" href="public/assets/css/soft-ui-dashboard.css">
    <!-- Font Awesome Icons -->
    <script src="https://kit.fontawesome.com/d3461e5f52.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script>
        var apiUrl = "http://127.0.0.1:8001/api/v1/";
        var formId = "<?php echo $_GET['id']; ?>";
    </script>
</head>

<body style="background: #f8f9fa;">
    <div id="saving" style="display: none;position:fixed; width: 100%;height: 100%;top: 0;background: #000;opacity: 0.8;z-index: 99999;">
        <div class="fa-3x center-screen" style="color: #fff;">
            <i class="fa-solid fa-sync fa-spin"></i>
            Saving
        </div>
    </div>

    <header class="p-3 mb-3 border-bottom" style="position: fixed;width: 100%;top: 0;background: #ffffff;z-index: 9;">
        <div class="container p-0">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a class="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none" href="/forms">
                    <img class="img-fluid" src="public/assets/img/logo.png" style="max-height: 32px;" alt="">
                </a>

                <ul class="nav col-11 offset-md-1 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                </ul>

                <form class="col-12 text-center col-lg-auto mb-3 mb-lg-0 me-lg-3">
                    <a class="btn btn-icon btn-secondary" id="togglePreview" style="transform: scale(1, 1.1);font-size: 0.6rem;border-color: #d9dfeb;box-shadow: 0 4px 7px -1px rgb(0 0 0 / 11%), 0 2px 4px -1px rgb(0 0 0 / 7%);"><?php echo $lang == 'en' ? 'Preview' : 'Vorschau'; ?></a>
                    <a href="/forms" class="btn btn-icon btn-outline-dark back-btn" style="transform: scale(1, 1.1);font-size: 0.6rem;border-color: #d9dfeb;box-shadow: 0 4px 7px -1px rgb(0 0 0 / 11%), 0 2px 4px -1px rgb(0 0 0 / 7%);"><?php echo $lang == 'en' ? 'Back to Dashboard' : 'Zum Dashboard'; ?></a>
                    <button type="button" id="save" class="btn btn-icon btn-primary" style="transform: scale(1, 1.1);font-size: 0.6rem;"><?php echo $lang == 'en' ? 'Save' : 'Speichern'; ?></button>
                </form>
            </div>
        </div>
    </header>

    <main class="container" style="margin-top: 170px;">

        <ul id="theForm"></ul>

        <ul id="theViewForm" style="display: none;"></ul>

        <div class="row">
            <div class="col-lg-12 col-12 mx-auto">
                <ul id="thePreviewForm" style="display: none;"></ul>
            </div>
        </div>

        <div class="card mt-5" id="addSectionCard">
            <div style="padding: 16px;"></div>
            <div class="row">
                <div class="col-md-12">
                    <button type="button" class="btn btn-outline-dark shadow d-block m-auto" style="border: none;font-weight: 400;box-shadow: 0 .5rem 1rem rgba(0,0,0,.15) !important;" data-bs-toggle="collapse" data-bs-target="#sectionCollapse" aria-expanded="false" aria-controls="sectionCollapse">+ <?php echo $lang == 'en' ? 'Add Section' : 'Neue Sektion'; ?></button>
                </div>
            </div>
            <div style="padding: 16px;"></div>
            <div class="collapse" id="sectionCollapse">
                <div class="row">
                    <div class="col-md-10 offset-md-1">
                        <div class="card card-body" style="background: #f5f5f5;border: 1px dashed #d1d1d1;">
                            <div class="row">
                                <div class="col-md-12">
                                    <p class="text-center font-200"><?php echo $lang == 'en' ? 'Select Your Structure' : 'Struktur'; ?></p>
                                    <p class="font-200"><?php echo $lang == 'en' ? 'With Title' : 'Mit Titel'; ?></p>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-3 mt-1">
                                    <div class="cursor-pointer" data-section="wt,12">
                                        <div class="float-start rounded" style="width: 25%;background: #a6c212;height: 30px;"></div>
                                        <div class="float-start rounded" style="width: 72.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                                <div class="col-md-3 mt-1">
                                    <div class="cursor-pointer" data-section="wt,6,6">
                                        <div class="float-start rounded" style="width: 25%;background: #a6c212;height: 30px;"></div>
                                        <div class="float-start rounded" style="width: 35%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 35%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                                <div class="col-md-3 mt-1">
                                    <div class="cursor-pointer" data-section="wt,3,3,3,3">
                                        <div class="float-start rounded" style="width: 25%;background: #a6c212;height: 30px;"></div>
                                        <div class="float-start rounded" style="width: 16.25%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 16.25%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 16.25%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 16.25%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                                <div class="col-md-3 mt-1">
                                    <div class="cursor-pointer" data-section="wt,4,4,4">
                                        <div class="float-start rounded" style="width: 25%;background: #a6c212;height: 30px;"></div>
                                        <div class="float-start rounded" style="width: 22.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 22.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 22.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-3 mt-1">
                                    <div class="cursor-pointer" data-section="wt-nt,12">
                                        <div class="rounded" style="float: left;width: 25%;height: 30px;"></div>
                                        <div class="float-start rounded" style="width: 72.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                                <div class="col-md-3 mt-1">
                                    <div class="cursor-pointer" data-section="wt-nt,6,6">
                                        <div class="rounded" style="float: left;width: 25%;height: 30px;"></div>
                                        <div class="float-start rounded" style="width: 35%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 35%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                                <div class="col-md-3 mt-1">
                                    <div class="cursor-pointer" data-section="wt-nt,3,3,3,3">
                                        <div class="rounded" style="float: left;width: 25%;height: 30px;"></div>
                                        <div class="float-start rounded" style="width: 16.25%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 16.25%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 16.25%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 16.25%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                                <div class="col-md-3 mt-1">
                                    <div class="cursor-pointer" data-section="wt-nt,4,4,4">
                                        <div class="rounded" style="float: left;width: 25%;height: 30px;"></div>
                                        <div class="float-start rounded" style="width: 22.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 22.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 22.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                            </div>

                            <div style="padding: 16px;"></div>

                            <div class="row">
                                <div class="col-md-3">
                                    <div class="cursor-pointer" data-section="wt,2,2,2,2,2">
                                        <div class="float-start rounded" style="width: 25%;background: #a6c212;height: 30px;"></div>
                                        <div class="float-start rounded" style="width: 12.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 12.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 12.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 12.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 12.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-1">
                                <div class="col-md-3">
                                    <div class="cursor-pointer" data-section="wt-nt,2,2,2,2,2">
                                        <div class="rounded" style="float: left;width: 25%;height: 30px;"></div>
                                        <div class="float-start rounded" style="width: 12.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 12.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 12.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 12.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 12.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                            </div>

                            <div style="padding: 16px;"></div>

                            <div class="row">
                                <div class="col-md-3">
                                    <div class="cursor-pointer" data-section="wt,4,4,4,4,4,4">
                                        <div class="float-start rounded" style="width: 25%;background: #a6c212;height: 30px;"></div>
                                        <div class="float-start rounded" style="width: 22.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 22.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 22.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>

                                        <div style="padding: 16px;"></div>

                                        <div class="float-start rounded" style="width: 25%;background: none;height: 30px;"></div>                                        
                                        <div class="float-start rounded" style="width: 22.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 22.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 22.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>

                                        <div class="clearfix"></div>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="cursor-pointer" data-section="wt,3,3,3,3,3,3,3,3,12">
                                        <div class="float-start rounded" style="width: 17.5%;background: #a6c212;height: 30px;"></div>
                                        <div class="float-start rounded" style="width: 17.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 17.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 17.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 17.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>

                                        <div style="padding: 16px;"></div>

                                        <div class="float-start rounded" style="width: 17.5%;background: none;height: 30px;"></div>
                                        <div class="float-start rounded" style="width: 17.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 17.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 17.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 17.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>

                                        <div style="padding: 16px;"></div>

                                        <div class="rounded" style="float: left;width: 25%;height: 30px;"></div>
                                        <div class="float-start rounded" style="width: 72.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>

                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                            </div>

                            <div style="padding: 16px;"></div>

                            <div class="row">
                                <div class="col-md-12">
                                    <p class="font-200"><?php echo $lang == 'en' ? 'Without Title' : 'Ohne Titel'; ?></p>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-3 mt-1">
                                    <div class="cursor-pointer" data-section="wot,12">
                                        <div class="float-start rounded" style="width: 100%;background: #c8c6c8;height: 30px;"></div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                                <div class="col-md-3 mt-1">
                                    <div class="cursor-pointer" data-section="wot,6,6">
                                        <div class="float-start rounded" style="width: 48.25%;background: #c8c6c8;height: 30px;"></div>
                                        <div class="float-start rounded" style="width: 48.25%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                                <div class="col-md-3 mt-1">
                                    <div class="cursor-pointer" data-section="wot,4,4,4">
                                        <div class="float-start rounded" style="width: 31.66%;background: #c8c6c8;height: 30px;"></div>
                                        <div class="float-start rounded" style="width: 31.66%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 31.66%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                                <div class="col-md-3 mt-1">
                                    <div class="cursor-pointer" data-section="wot,3,3,3,3">
                                        <div class="float-start rounded" style="width: 23.12%;background: #c8c6c8;height: 30px;"></div>
                                        <div class="float-start rounded" style="width: 23.12%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 23.12%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 23.12%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                            </div>

                            <div style="padding: 16px;"></div>

                            <div class="row">
                                <div class="col-md-3">
                                    <div class="cursor-pointer" data-section="wot,2,2,2,2,2">
                                        <div class="float-start rounded" style="width: 17.5%;background: #c8c6c8;height: 30px;"></div>
                                        <div class="float-start rounded" style="width: 17.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 17.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 17.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 17.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                            </div>


                            <div style="padding: 16px;"></div>

                            <div class="row">
                                <div class="col-md-3">
                                    <div class="cursor-pointer" data-section="wot,4,4,4,4,4,4">
                                        <div class="float-start rounded" style="width: 31.66%;background: #c8c6c8;height: 30px;"></div>
                                        <div class="float-start rounded" style="width: 31.66%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 31.66%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>

                                        <div style="padding: 16px;"></div>

                                        <div class="float-start rounded" style="width: 31.66%;background: #c8c6c8;height: 30px;"></div>
                                        <div class="float-start rounded" style="width: 31.66%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 31.66%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>

                                        <div class="clearfix"></div>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="cursor-pointer" data-section="wot,3,3,3,3,3,3,3,3,12">
                                        <div class="float-start rounded" style="width: 23.12%;background: #c8c6c8;height: 30px;"></div>
                                        <div class="float-start rounded" style="width: 23.12%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 23.12%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 23.12%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>

                                        <div style="padding: 16px;"></div>

                                        <div class="float-start rounded" style="width: 23.12%;background: #c8c6c8;height: 30px;"></div>
                                        <div class="float-start rounded" style="width: 23.12%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 23.12%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                        <div class="float-start rounded" style="width: 23.12%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>

                                        <div style="padding: 16px;"></div>

                                        <div class="rounded" style="float: left;width: 25%;height: 30px;"></div>
                                        <div class="float-start rounded" style="width: 72.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>

                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
                <div style="padding: 16px;"></div>
            </div>
        </div>
        <div style="padding: 16px;"></div>
    </main>

    <div id="theFormItemSidebar" style="display: none;">
        <div class="row m-0">
            <div class="col-md-12 border">
                <p class="toggle-the-form-item-sidebar-close"><i class="fa-solid fa-close"></i></p>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-check mx-auto" style="width: 33%;">
                            <input class="form-check-input" type="checkbox" value="" id="wt-check">
                            <label class="custom-control-label"><?php echo $lang == 'en' ? 'With Title' : 'Mit Titel'; ?></label>
                        </div>
                    </div>
                    <hr class="horizontal dark my-3" />
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <p class="text-center p-2 font-200">
                            <button type="button" class="btn btn-secondary form-item" data-item-type="title"><i class="fa-solid fa-text-height"></i></button>
                            <br />
                            <?php echo $lang == 'en' ? 'Title' : 'Titel'; ?>
                        </p>
                    </div>
                    <div class="col-md-6">
                        <p class="text-center p-2 font-200">
                            <button type="button" class="btn btn-secondary form-item" data-item-type="input"><i class="fa-solid fa-keyboard"></i></button>
                            <br />
                           
                            <?php echo $lang == 'en' ? ' Input Field' : 'Eingabefeld'; ?>
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <p class="text-center p-2 font-200">
                            <button type="button" class="btn btn-secondary form-item" data-item-type="datepicker"><i class="fa-solid fa-calendar"></i></button>
                            <br />
                            <?php echo $lang == 'en' ? ' Date Picker' : 'Datumsauswahl'; ?>
                        </p>
                    </div>
                    <div class="col-md-6">
                        <p class="text-center p-2 font-200">
                            <button type="button" class="btn btn-secondary form-item" data-item-type="checkbox"><i class="fa-solid fa-check-double"></i></button>
                            <br />
                            Checkbox
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <p class="text-center p-2 font-200">
                            <button type="button" class="btn btn-secondary form-item" data-item-type="file-upload"><i class="fa-solid fa-upload"></i></button>
                            <br />
                            <?php echo $lang == 'en' ? 'Upload file' : 'Datei hochladen'; ?>                            
                        </p>
                    </div>
                    <div class="col-md-6">
                        <p class="text-center p-2 font-200">
                            <button type="button" class="btn btn-secondary form-item" data-item-type="option"><i class="fa-solid fa-list"></i></button>
                            <br />
                            <?php echo $lang == 'en' ? ' Option' : 'Optionen'; ?>
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <p class="text-center p-2 font-200">
                            <button type="button" class="btn btn-secondary form-item" data-item-type="name"><i class="fa-solid fa-users"></i></button>
                            <br />
                            Name
                        </p>
                    </div>
                    <div class="col-md-6">
                        <p class="text-center p-2 font-200">
                            <button type="button" class="btn btn-secondary form-item" data-item-type="company"><i class="fa-solid fa-building"></i></button>
                            <br />
                            
                            <?php echo $lang == 'en' ? ' Company' : 'Firma'; ?>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        var selectInnerStructure = "<?php echo $lang == 'en' ? 'Select Your Inner Structure' : 'Struktur'; ?>";
        var withTitle = "<?php echo $lang == 'en' ? 'With Title' : 'Mit Titel'; ?>";
        var withoutTitle = "<?php echo $lang == 'en' ? 'Without Title' : 'Ohne Titel'; ?>";
    </script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/ui/1.13.1/jquery-ui.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
    <script src="https://cdn.jsdelivr.net/npm/choices.js@9.0.1/public/assets/scripts/choices.min.js"></script>
    <script src="public/assets/js/form-builder.js"></script>
</body>

</html>
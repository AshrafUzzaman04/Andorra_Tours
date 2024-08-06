$(document).ready(function () {
    var formItemPointer = null;
    var formItemPointerRow = null;
    var wtCheck = false;
    var preview = false;

    getFormStructure(apiUrl + "forms/" + formId + "/structue");
    function getFormStructure(ajaxurl) {
        var token = $.cookie("token");
        $.ajaxSetup({
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            }
        });

        $.ajax({
            type: 'GET',
            url: ajaxurl,
            success: function (data) {
                $('#theForm').html(data.data);
                $('input[data-val]').each(function (i, obj) {
                    $(obj).val($(obj).data('val'));
                });
                //$(".flat-pickr").flatpickr();
            }
        });
    }

    $("#theForm").sortable();

    $(document).on('click', '.cursor-pointer', function () {
        let sectionData = $(this).data('section');
        sectionData = sectionData.split(',');
        if (sectionData[0] == 'wt' || sectionData[0] == 'wt-nt')
            generateWithTitleSection(sectionData);
        else
            generateWithoutTitleSection(sectionData);

        let sectionCount = 1;
        $('.section-title').each(function (i, obj) {
            $(obj).html('Abschnitt ' + sectionCount++);
        });
    });

    function generateWithTitleSection(sectionData) {
        var html = `<li class="mt-5">
        <div class="card card-body">
        <div class="rounded p-1">
            <div class="col-md-12">
                <h6 class="mb-0 the-form-text d-none"></h6>
                <input type="text" class="form-control t-fc s-rm" placeholder="Abschnittstitel eingeben">
                <p class="text-sm mb-0 section-title"></p>
                <hr class="horizontal dark my-3" />
            </div>
            <div class="row">
                <div class="col-md-2 mt-4">`;

        if (sectionData[0] == 'wt')
            html += `<label class="form-label the-form-text d-none"></label>
                    <input type="text" class="form-control t-fc s-rm" placeholder="z.B. Titel">`;

        html += `</div>
                <div class="col-md-9">
                    <div class="row">`;
        for (let i = 1; i < sectionData.length; i++) {
            html += `<div class="col-md-${sectionData[i]} mt-4">
                <div class="border rounded" style="min-height: 38px;border-radius: 0.7rem !important;">
                    <button type="button" class="btn btn-secondary d-block m-auto toggle-the-form-item-sidebar" style="padding: 4px 8px;margin-top: 5px!important;"><i class="fa fa-plus"></i></button>
                </div>
            </div>`;
        }
        html += `</div>
                </div>
                <div class="col-md-1 mt-4 p-0 s-rm">
                    <p class="text-center">
                        <input type="checkbox" value="" title="Add" class="add-check" data-section="wt" style="display: none;">
                        &nbsp;&nbsp;
                        <i class="fa-solid fa-clone clone-item" title="Duplizieren"></i>
                        &nbsp;&nbsp;
                        <i class="fa-solid fa-trash del-inner-section" title="Löschen"></i>
                    </p>
                </div>
            </div>
            <div class="col-md-10 offset-md-1 s-rm">
                <div style="padding: 16px;"></div>
                <div class="card card-body" style="background: #f5f5f5;border: 1px dashed #d1d1d1;">
                    <div class="row">
                        <div class="col-md-12">
                            <p class="text-center font-200">${selectInnerStructure}</p>
                            <p class="font-200">${withTitle}</p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-3">
                            <div class="inner-cursor" data-section="wt,12">
                                <div class="float-start rounded" style="width: 25%;background: #a6c212;height: 30px;"></div>
                                <div class="float-start rounded" style="width: 72.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                        <div class="col-md-3 mt-1">
                            <div class="inner-cursor" data-section="wt,6,6">
                                <div class="float-start rounded" style="width: 25%;background: #a6c212;height: 30px;"></div>
                                <div class="float-start rounded" style="width: 35%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="float-start rounded" style="width: 35%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                        <div class="col-md-3 mt-1">
                            <div class="inner-cursor" data-section="wt,3,3,3,3">
                                <div class="float-start rounded" style="width: 25%;background: #a6c212;height: 30px;"></div>
                                <div class="float-start rounded" style="width: 16.25%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="float-start rounded" style="width: 16.25%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="float-start rounded" style="width: 16.25%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="float-start rounded" style="width: 16.25%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                        <div class="col-md-3 mt-1">
                            <div class="inner-cursor" data-section="wt,4,4,4">
                                <div class="float-start rounded" style="width: 25%;background: #a6c212;height: 30px;"></div>
                                <div class="float-start rounded" style="width: 22.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="float-start rounded" style="width: 22.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="float-start rounded" style="width: 22.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-3">
                            <div class="inner-cursor" data-section="wt-nt,12">
                                <div class="rounded" style="float: left;width: 25%;height: 30px;"></div>
                                <div class="float-start rounded" style="width: 72.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                        <div class="col-md-3 mt-1">
                            <div class="inner-cursor" data-section="wt-nt,6,6">
                                <div class="rounded" style="float: left;width: 25%;height: 30px;"></div>
                                <div class="float-start rounded" style="width: 35%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="float-start rounded" style="width: 35%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                        <div class="col-md-3 mt-1">
                            <div class="inner-cursor" data-section="wt-nt,3,3,3,3">
                                <div class="rounded" style="float: left;width: 25%;height: 30px;"></div>
                                <div class="float-start rounded" style="width: 16.25%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="float-start rounded" style="width: 16.25%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="float-start rounded" style="width: 16.25%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="float-start rounded" style="width: 16.25%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                        <div class="col-md-3 mt-1">
                            <div class="inner-cursor" data-section="wt-nt,4,4,4">
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
                            <div class="inner-cursor" data-section="wt,2,2,2,2,2">
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

                    <div style="padding: 16px;"></div>

                    <div class="row">
                        <div class="col-md-3">
                            <div class="inner-cursor" data-section="wt,4,4,4,4,4,4">
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
                            <div class="inner-cursor" data-section="wt,3,3,3,3,3,3,3,3,12">
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

                    <div class="row mt-1">
                        <div class="col-md-3">
                            <div class="inner-cursor" data-section="wt-nt,2,2,2,2,2">
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
                        <div class="col-md-12">
                            <p class="font-200">${withoutTitle}</p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-3 mt-1">
                            <div class="inner-cursor" data-section="wot,12">
                                <div class="float-start rounded" style="width: 100%;background: #c8c6c8;height: 30px;"></div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                        <div class="col-md-3 mt-1">
                            <div class="inner-cursor" data-section="wot,6,6">
                                <div class="float-start rounded" style="width: 48.25%;background: #c8c6c8;height: 30px;"></div>
                                <div class="float-start rounded" style="width: 48.25%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                        <div class="col-md-3 mt-1">
                            <div class="inner-cursor" data-section="wot,4,4,4">
                                <div class="float-start rounded" style="width: 31.66%;background: #c8c6c8;height: 30px;"></div>
                                <div class="float-start rounded" style="width: 31.66%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="float-start rounded" style="width: 31.66%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                        <div class="col-md-3 mt-1">
                            <div class="inner-cursor" data-section="wot,3,3,3,3">
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
                            <div class="inner-cursor" data-section="wot,2,2,2,2,2">
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
                            <div class="inner-cursor" data-section="wot,4,4,4,4,4,4">
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
                            <div class="inner-cursor" data-section="wot,3,3,3,3,3,3,3,3,12">
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
            
            <div style="padding: 16px;"></div>

            <div class="col-md-12 s-rm">
                <hr>
                <p class="text-end pe-4">
                    <i class="fa-solid fa-clone clone-section" title="Duplizieren"></i>
                    &nbsp;&nbsp;
                    <i class="fa-solid fa-trash del-section" title="Löschen"></i>
                    &nbsp;&nbsp;
                    <i class="fa-solid fa-equals" title="sort"></i>
                </p>
            </div>
        </div>
        </li>
        </div>`;

        $('#theForm').append(html);
    }

    function generateWithoutTitleSection(sectionData) {
        var html = `<li class="mt-5">
        <div class="card card-body">
        <div class="rounded p-1">
            <div class="col-md-12">
                <h6 class="mb-0 the-form-text d-none"></h6>
                <input type="text" class="form-control t-fc s-rm" placeholder="Abschnittstitel eingeben">
                <p class="text-sm mb-0 section-title"></p>
                <hr class="horizontal dark my-3" />
            </div>
            <div class="row">
                <div class="col-md-11">
                    <div class="row">`;
        for (let i = 1; i < sectionData.length; i++) {
            html += `<div class="col-md-${sectionData[i]} mt-4">

                <div class="border rounded" style="min-height: 38px;border-radius: 0.7rem !important;">
                    <button type="button" class="btn btn-secondary d-block m-auto toggle-the-form-item-sidebar" style="padding: 4px 8px;margin-top: 5px!important;"><i class="fa fa-plus"></i></button>
                </div>
            </div>`;
        }
        html += `</div>
                </div>
                <div class="col-md-1 mt-4 p-0 s-rm">
                    <p class="text-center">
                        <input type="checkbox" value="" title="Add" class="add-check" data-section="wt-nt" style="display: none;">
                        &nbsp;&nbsp;
                        <i class="fa-solid fa-clone clone-item" title="Duplizieren"></i>
                        &nbsp;&nbsp;
                        <i class="fa-solid fa-trash del-inner-section" title="Löschen"></i>
                    </p>
                </div>
            </div>
            <div class="col-md-10 offset-md-1 s-rm">
                <div style="padding: 16px;"></div>
                <div class="card card-body" style="background: #f5f5f5;border: 1px dashed #d1d1d1;">
                    <div class="row">
                        <div class="col-md-12">
                            <p class="text-center font-200">${selectInnerStructure}</p>
                            <p class="font-200">${withTitle}</p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-3">
                            <div class="inner-cursor" data-section="wt,12">
                                <div class="float-start rounded" style="width: 25%;background: #a6c212;height: 30px;"></div>
                                <div class="float-start rounded" style="width: 72.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                        <div class="col-md-3 mt-1">
                            <div class="inner-cursor" data-section="wt,6,6">
                                <div class="float-start rounded" style="width: 25%;background: #a6c212;height: 30px;"></div>
                                <div class="float-start rounded" style="width: 35%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="float-start rounded" style="width: 35%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                        <div class="col-md-3 mt-1">
                            <div class="inner-cursor" data-section="wt,3,3,3,3">
                                <div class="float-start rounded" style="width: 25%;background: #a6c212;height: 30px;"></div>
                                <div class="float-start rounded" style="width: 16.25%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="float-start rounded" style="width: 16.25%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="float-start rounded" style="width: 16.25%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="float-start rounded" style="width: 16.25%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                        <div class="col-md-3 mt-1">
                            <div class="inner-cursor" data-section="wt,4,4,4">
                                <div class="float-start rounded" style="width: 25%;background: #a6c212;height: 30px;"></div>
                                <div class="float-start rounded" style="width: 22.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="float-start rounded" style="width: 22.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="float-start rounded" style="width: 22.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-3">
                            <div class="inner-cursor" data-section="wt-nt,12">
                                <div class="rounded" style="float: left;width: 25%;height: 30px;"></div>
                                <div class="float-start rounded" style="width: 72.5%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                        <div class="col-md-3 mt-1">
                            <div class="inner-cursor" data-section="wt-nt,6,6">
                                <div class="rounded" style="float: left;width: 25%;height: 30px;"></div>
                                <div class="float-start rounded" style="width: 35%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="float-start rounded" style="width: 35%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                        <div class="col-md-3 mt-1">
                            <div class="inner-cursor" data-section="wt-nt,3,3,3,3">
                                <div class="rounded" style="float: left;width: 25%;height: 30px;"></div>
                                <div class="float-start rounded" style="width: 16.25%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="float-start rounded" style="width: 16.25%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="float-start rounded" style="width: 16.25%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="float-start rounded" style="width: 16.25%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                        <div class="col-md-3 mt-1">
                            <div class="inner-cursor" data-section="wt-nt,4,4,4">
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
                            <div class="inner-cursor" data-section="wt,2,2,2,2,2">
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

                    <div style="padding: 16px;"></div>

                    <div class="row">
                        <div class="col-md-3">
                            <div class="inner-cursor" data-section="wt,4,4,4,4,4,4">
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
                            <div class="inner-cursor" data-section="wt,3,3,3,3,3,3,3,3,12">
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

                    <div class="row mt-1">
                        <div class="col-md-3">
                            <div class="inner-cursor" data-section="wt-nt,2,2,2,2,2">
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
                            <div class="inner-cursor" data-section="wt-nt,4,4,4,4,4,4">
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
                            <div class="inner-cursor" data-section="wt-nt,3,3,3,3,3,3,3,3,12">
                                <div class="float-start rounded" style="width: 17.5%;background: none;height: 30px;"></div>
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
                            <p class="font-200">${withoutTitle}</p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-3 mt-1">
                            <div class="inner-cursor" data-section="wot,12">
                                <div class="float-start rounded" style="width: 100%;background: #c8c6c8;height: 30px;"></div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                        <div class="col-md-3 mt-1">
                            <div class="inner-cursor" data-section="wot,6,6">
                                <div class="float-start rounded" style="width: 48.25%;background: #c8c6c8;height: 30px;"></div>
                                <div class="float-start rounded" style="width: 48.25%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                        <div class="col-md-3 mt-1">
                            <div class="inner-cursor" data-section="wot,4,4,4">
                                <div class="float-start rounded" style="width: 31.66%;background: #c8c6c8;height: 30px;"></div>
                                <div class="float-start rounded" style="width: 31.66%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="float-start rounded" style="width: 31.66%;background: #c8c6c8;height: 30px;margin-left: 2.5%;"></div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                        <div class="col-md-3 mt-1">
                            <div class="inner-cursor" data-section="wot,3,3,3,3">
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
                            <div class="inner-cursor" data-section="wot,2,2,2,2,2">
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
                            <div class="inner-cursor" data-section="wot,4,4,4,4,4,4">
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
                            <div class="inner-cursor" data-section="wot,3,3,3,3,3,3,3,3,12">
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

            <div style="padding: 16px;"></div>

            <div class="col-md-12 s-rm">
                <hr>
                <p class="text-end pe-4">
                    <i class="fa-solid fa-clone clone-section" title="Duplizieren"></i>
                    &nbsp;&nbsp;
                    <i class="fa-solid fa-trash del-section" title="Löschen"></i>
                    &nbsp;&nbsp;
                    <i class="fa-solid fa-equals" title="sort"></i>
                </p>
            </div>
        </div>
        </li>
        </div>`;

        $('#theForm').append(html);
    }

    $(document).on('click', '.inner-cursor', function () {
        let sectionData = $(this).data('section');
        sectionData = sectionData.split(',');
        if (sectionData[0] == 'wt' || sectionData[0] == 'wt-nt')
            generateWithTitleInnerSection(sectionData, $(this).parent().parent().parent().parent());
        else
            generateWithoutTitleInnerSection(sectionData, $(this).parent().parent().parent().parent());
    });

    function generateWithTitleInnerSection(sectionData, selectedSection) {
        var html = `
            <div class="row">
                <div class="col-md-2 mt-4">`;

        if (sectionData[0] == 'wt')
            html += `<label class="form-label the-form-text d-none"></label>
            <input type="text" class="form-control t-fc s-rm" placeholder="z.B. Titel">`;

        html += `</div>
                <div class="col-md-9">
                    <div class="row">`;
        for (let i = 1; i < sectionData.length; i++) {
            html += `<div class="col-md-${sectionData[i]} mt-4">
                <div class="border rounded" style="min-height: 38px;border-radius: 0.7rem !important;">
                    <button type="button" class="btn btn-secondary d-block m-auto toggle-the-form-item-sidebar" style="padding: 4px 8px;margin-top: 5px!important;"><i class="fa fa-plus"></i></button>
                </div>
            </div>`;
        }
        html += `</div>
                </div>
                <div class="col-md-1 mt-4 p-0 s-rm">
                    <p class="text-center">
                        <input type="checkbox" value="" title="Add" class="add-check" data-section="wt" style="display: none;">
                        &nbsp;&nbsp;
                        <i class="fa-solid fa-clone clone-item" title="Duplizieren"></i>
                        &nbsp;&nbsp;
                        <i class="fa-solid fa-trash del-inner-section" title="Löschen"></i>
                    </p>
                </div>
            </div>`;

        $(selectedSection).before(html);
    }

    function generateWithoutTitleInnerSection(sectionData, selectedSection) {
        var html = `
            <div class="row">
                <div class="col-md-11">
                    <div class="row">`;
        for (let i = 1; i < sectionData.length; i++) {
            html += `<div class="col-md-${sectionData[i]} mt-4">
                <div class="border rounded" style="min-height: 38px;border-radius: 0.7rem !important;">
                    <button type="button" class="btn btn-secondary d-block m-auto toggle-the-form-item-sidebar" style="padding: 4px 8px;margin-top: 5px!important;"><i class="fa fa-plus"></i></button>
                </div>
            </div>`;
        }
        html += `</div>
                </div>
                <div class="col-md-1 mt-4 p-0 s-rm">
                    <p class="text-center">
                        <input type="checkbox" value="" title="Add" class="add-check" data-section="wt-nt" style="display: none;">
                        &nbsp;&nbsp;
                        <i class="fa-solid fa-clone clone-item" title="Duplizieren"></i>
                        &nbsp;&nbsp;
                        <i class="fa-solid fa-trash del-inner-section" title="Löschen"></i>
                    </p>
                </div>
            </div>`;

        $(selectedSection).before(html);
    }

    $(document).on('click', '.clone-inner-section', function () {
        let html = '<div class="row">' + $(this).parent().parent().parent().html() + '</div>';
        $(this).parent().parent().parent().after(html);
    });

    $(document).on('click', '.del-inner-section', function () {
        let confirmed = confirm('Are you sure?');
        if (confirmed)
            $(this).parent().parent().parent().remove();
    });

    $(document).on('click', '.clone-item', function () {
        let html = '<div class="row">' + $(this).parent().parent().parent().html() + '</div>';
        $(this).parent().parent().parent().after(html);
        renameDuplicateNames();
    });

    $(document).on('click', '.clone-section', function () {
        let html = '<li class="mt-5">' + $(this).parent().parent().parent().parent().parent().html() + '</li>';
        $(this).parent().parent().parent().parent().parent().after(html);

        let sectionCount = 1;
        $('.section-title').each(function (i, obj) {
            $(obj).html('Abschnitt ' + sectionCount++);
        });

        $('input[data-val]').each(function (i, obj) {
            $(obj).val($(obj).data('val'));
        });

        renameDuplicateNames();
        //$(".flat-pickr").flatpickr();
    });

    function renameDuplicateNames() {
        var seen = {};
        $('input[name^="uid_"]').each(function (i, obj) {
            let name = $(obj).attr('name');
            if (seen[name])
                $(obj).attr('name', name + '_' + i);
            else
                seen[name] = true;
        });

        $('input[name^="cid_"]').each(function (i, obj) {
            let name = $(obj).attr('name');
            if (seen[name])
                $(obj).attr('name', name + '_' + i);
            else
                seen[name] = true;
        });

        $('select[name^="uid_"]').each(function (i, obj) {
            let name = $(obj).attr('name');
            if (seen[name])
                $(obj).attr('name', name + '_' + i);
            else
                seen[name] = true;
        });
    }

    $(document).on('click', '.del-section', function () {
        let confirmed = confirm('Are you sure?');
        if (confirmed)
            $(this).parent().parent().parent().parent().parent().remove();
    });

    $(document).on('click', '.toggle-the-form-item-sidebar, .toggle-the-form-item-sidebar-close', function () {
        formItemPointer = $(this);
        formItemPointerRow = $(this).parent().parent().parent();
        $('#theFormItemSidebar').toggle("slide", { direction: "right" }, 400);
    });

    $(document).on('click', '.form-item', function () {
        let html = getFormItemHtml($(this).data('item-type'));
        $(formItemPointer).parent().parent().html(html);
        if (wtCheck)
            $(formItemPointerRow).attr('data-wt', wtCheck);
        $('#theFormItemSidebar').toggle("slide", { direction: "right" }, 400);
        //$(".flat-pickr").flatpickr();

        $(formItemPointerRow).children('[class^=col-md-]').each(function (i, obj) {
            let itemAssigned = $(obj).find('.toggle-the-form-item-sidebar').length;
            if (itemAssigned < 1 && $(formItemPointerRow).attr('data-wt') == 'true') { // if item assigned
                var flCount = 0;
                flCount = $(obj).find('.form-label').length;
                if (flCount < 1) {
                    var eHtml = $(obj).html();
                    $(obj).html('<div><label class="form-label the-form-text d-none hide-label">&nbsp;</label><input type="text" class="t-fc mb-1 s-rm invisible" placeholder="Enter title"></div>' + eHtml);
                }
            }
        });

        // dynamic add row checkbox controls
        if ($(formItemPointerRow).find('.toggle-the-form-item-sidebar').length < 1) {
            $(formItemPointerRow).parent().parent().find('.add-check').show();
        }
    });

    function getFormItemHtml(itemType) {
        let html = '';
        let uid = 'uid_' + Math.floor(Date.now() / 1000);

        switch (itemType) {
            case 'title':
                html = `<div>
                    <label class="form-label the-form-text d-none"></label>
                    <input type="text" class="form-control the-form-title s-rm" placeholder="Enter title text">
                </div>`;
                break;
            case 'input':
                html = `<input type="text" class="form-control" name="${uid}" placeholder="Daten eingeben">`;
                break;
            case 'datepicker':
                html = `<input type="date" class="form-control flat-pickr" name="${uid}" placeholder="Datum auswählen">`;
                break;
            case 'checkbox':
                uid = 'cid_' + Math.floor(Date.now() / 1000);
                html = `<div class="mt-1">
                    <div class="s-rm">
                        <input type="text" class="form-control the-form-title" style="width: 90%;" placeholder="Enter checkbox text">
                    </div>
                    <div class="form-check d-none">
                        <input class="form-check-input" type="checkbox" value="" name="${uid}">
                        <span class="custom-control-label the-form-text"></span>
                    </div>
                </div>`;
                /*<p class="add-new-checkbox s-rm" data-uid="${uid}">
                    <i class="fa-solid fa-circle-plus"></i>
                    Add
                </p>*/
                break;
            case 'file-upload':
                html = `<div><input type="file" class="form-control upload-file">
                <input type="hidden" class="file-path" name="${uid}"></div>`;
                break;
            case 'image-upload':
                html = `<input type="file" class="form-control"
                    onchange="document.getElementById('${uid}').src = window.URL.createObjectURL(this.files[0]);$(this).hide();$('#${uid}').show();">
                    <img id="${uid}" alt="image" class="img-fluid" style="display: none;">`;
                break;
            case 'option':
                html = `<select class="form-control d-none" name="${uid}" id="${uid}"></select>
                    <div class="s-rm">
                        <div>
                            <input type="text" class="form-control the-form-option" style="width: 90%;" data-uid="${uid}" placeholder="Enter option text">
                        </div>
                        <p class="add-new-option s-rm" data-uid="${uid}">
                            <i class="fa-solid fa-circle-plus"></i>
                            Add
                        </p>
                    </div>`;
                break;
            case 'name':
                html = `<select class="form-control choice-name d-none" name="${uid}" placeholder="Name"></select>
                <div class="s-rm"><select class="form-control choice-name-demo" placeholder="Name"></select></div>`;
                break;
            case 'company':
                html = `<select class="form-control choice-company d-none" name="${uid}" placeholder="Company"></select>
                <div class="s-rm"><select class="form-control choice-company-demo" placeholder="Company"></select></div>`;
                break;
        }

        if (wtCheck) {
            html = `<div>
                <label class="form-label the-form-text d-none"></label>
                <input type="text" class="t-fc mb-1 s-rm" placeholder="Enter title">
                </div>
            ${html}`;
        }

        return html;
    }

    $(document).on('click', '#wt-check', function () {
        wtCheck = !wtCheck;
    });

    $(document).on('click', '.add-new-option', function () {
        let uid = $(this).data('uid');
        $(this).before(`<div>
                <input type="text" class="form-control the-form-option mt-1 float-start" style="width: 90%;" data-uid="${uid}" placeholder="Enter option text">
                <p class="float-end remove-option" data-uid="${uid}">x</p>
                <div class="clearfix"></div>
            </div>
        `);
    });

    $(document).on('click', '.remove-option', function () {
        let oid = $(this).data('uid');
        let os = $(this).parent().parent();
        $(this).parent().remove();
        $('#' + oid).empty();
        $(os).find('.the-form-option').each(function (i, obj) {
            $('#' + oid).append($("<option></option>").attr("value", $(obj).val()).text($(obj).val()));
        });
    });

    $(document).on('keyup paste', '.the-form-option', function () {
        let sid = $(this).data('uid');
        $(this).attr('data-val', $(this).val());
        $('#' + sid).empty();
        $(this).parent().parent().find('.the-form-option').each(function (i, obj) {
            $('#' + sid).append($("<option></option>").attr("value", $(obj).val()).text($(obj).val()));
        });
    });

    $(document).on('click', '.add-new-checkbox', function () {
        // let uid = $(this).data('uid');
        let uid = 'cid_' + Math.floor(Date.now() / 1000);
        $(this).before(`<div class="mt-1">
            <div class="s-rm">
                <input type="text" class="form-control the-form-title float-start" style="width: 90%;" placeholder="Enter checkbox text">
                <p class="float-end remove-check">x</p>
                <div class="clearfix"></div>
            </div>
            <div class="form-check d-none">
                <input class="form-check-input" type="checkbox" value="" name="${uid}">
                <span class="custom-control-label the-form-text"></span>
            </div>
        </div>`);
    });

    $(document).on('click', '.remove-check', function () {
        $(this).parent().parent().remove();
    });

    $(document).on('keyup paste', '.the-form-title', function () {
        $(this).attr('data-val', $(this).val());
        $(this).parent().parent().find('.form-check-input').val($(this).val());
        $(this).parent().parent().find('.the-form-text').text($(this).val());
    });

    $(document).on('keyup paste', '.t-fc, .the-form-title', function () {
        $(this).attr('data-val', $(this).val());
        $(this).parent().find('.the-form-text').text($(this).val());
    });

    $(document).on('click', '#togglePreview', function (e) {
        e.preventDefault();
        $('#thePreviewForm').html($('#theForm').html());
        $('#thePreviewForm .s-rm').remove();
        $("#thePreviewForm .d-none").removeClass("d-none");
        $("#thePreviewForm li .card").addClass("ps-lg-6");

        preview = !preview;
        if (preview) {
            $("#thePreviewForm .flat-pickr").flatpickr();

            if (document.querySelector('#thePreviewForm .choice-name')) {
                let elements = document.querySelectorAll('#thePreviewForm .choice-name');
                Array.from(elements).forEach((element, index) => {
                    let choices = new Choices(element, {
                        removeItemButton: true
                    });
                });
            }

            if (document.querySelector('#thePreviewForm .choice-company')) {
                let elements = document.querySelectorAll('#thePreviewForm .choice-company');
                Array.from(elements).forEach((element, index) => {
                    let choices = new Choices(element, {
                        removeItemButton: true
                    });
                });
            }

            $(this).text('Edit');
            $('#theForm').hide();
            $('#addSectionCard').hide();
            $('#thePreviewForm').show();
        }
        else {
            $(this).text('Preview');
            $('#thePreviewForm').hide();
            $('#theForm').show();
            $('#addSectionCard').show();
        }
    });

    $(document).on('click', '#save', function () {
        $('#saving').show();
        renameDuplicateNames();
        saveFormStructure(apiUrl + "forms/" + formId + "/structue", { data: $('#theForm').html() });
    });

    function saveFormStructure(ajaxurl, formData) {
        var token = $.cookie("token");
        $.ajaxSetup({
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            }
        });

        $.ajax({
            type: 'POST',
            url: ajaxurl,
            data: formData,
            success: function (data) {
                $('#theViewForm').html($('#theForm').html());
                $('#theViewForm .s-rm').remove();
                $("#theViewForm .d-none").removeClass("d-none");
                $("#theViewForm li .card").addClass("ps-lg-6");
                saveFormView(apiUrl + "forms/" + formId + "/view", { data: $('#theViewForm').html() });
            },
            error: function () {
                $('#saving').hide();
            }
        });
    }

    function saveFormView(ajaxurl, formData) {
        var token = $.cookie("token");
        $.ajaxSetup({
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            }
        });

        $.ajax({
            type: 'POST',
            url: ajaxurl,
            data: formData,
            success: function (data) {
                $('#saving').hide();
                //window.location.reload();
            },
            error: function () {
                $('#saving').hide();
            }
        });
    }

    $(document).on('click', '.add-check', function () {
        if ($(this).parent().parent().parent().find('.add-new-btn').length) {
            $(this).parent().parent().parent().find('.add-new-btn').remove();
            $(this).parent().parent().parent().children('[class^=col-md-]').each(function (i, obj) {
                if ($(obj).find('[name]').attr('name'))
                    $(obj).find('[name]').attr('name', $(obj).find('[name]').attr('name').replace('[]', ''));
            });
            $(this).attr('checked', false);
            $(this).parent().find('.fa-clone').removeClass('d-none');
        }
        else {
            // let uid = Math.floor(Date.now() / 1000);
            $(this).parent().parent().parent().find('[name]').each(function (i, obj) {
                $(obj).attr('name', $(obj).attr('name') + '[]');
            });

            if ($(this).data('section') == 'wt')
                $(this).parent().parent().after('<div class="row" style="margin: 0;padding: 0;"><div class="col-md-2"></div><div class="col-md-9"><button class="btn btn-secondary add-new-btn d-none" style="width: 90px;margin-top: 5px;" data-html=""><i class="fa-solid fa-circle-plus"></i> Add</button></div></div>');
            else
                $(this).parent().parent().after('<div class="row" style="margin: 0;padding: 0;"><div class="col-md-11"><button class="btn btn-secondary add-new-btn d-none" style="width: 90px;margin-top: 5px;" data-html=""><i class="fa-solid fa-circle-plus"></i> Add</button></div></div>');
            $(this).parent().parent().parent().find('.row .s-rm').remove();
            $(this).parent().parent().parent().find('.row .d-none').removeClass('d-none');
            $(this).parent().parent().parent().find('.add-new-btn').addClass('d-none');
            $(this).parent().parent().parent().find('.add-new-btn').attr('data-html', $(this).parent().parent().parent().find('.row').html());
            // $(this).attr('checked', true);
            $(this).parent().find('.fa-clone').addClass('d-none');
            $(this).after('<i class="fa-solid fa-lock" title="Section Locked"></i>');
            $(this).remove();
        }
    });
});
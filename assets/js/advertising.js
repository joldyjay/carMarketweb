/*
JS Document
◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
◎ *@Description: javascript Obj 基类
◎ *@Author: 杨秀会™       yangxiuhui   YXH
◎ *@Update: 2016-10-14
◎ *@Contact: ☎：13588428549      Email: yangxiuhui_tsh@163.com   QQ：603141616
◎ *@AuthorNote: 请不要随便篡改文件内容。尊重他人劳动成果！谢谢...     杨秀会 注
◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
*/
require(["react","react-dom","../js/listData","../js/common2","bootstrap","daterangepicker","common"], function(React, ReactDOM,ListData){
    $.tsh.popupBox({
        hand: '#btn-addchannel',
        box: '#addchannel',
        width: 620,
        callback: function(box){

        },
        okfn: function(hand,box){

            var checked = box.find(':radio:checked');
            if( checked.length ){
                $('#advertiseName').val( checked.closest('tr').find('td:eq(1)').text() );
                box.Hide();
            }else{
                alert( '请选择!' );
            }

        }
    });

    var dateInit = function(){
        var startEle = $('#startDate'), endEle = $('#endDate');
        startEle.dateRangePicker({
            separator: '至',
            getValue: function () {
                if (startEle.val() && endEle.val())
                    return startEle.val() + '至' + endEle.val();
                else
                    return '';
            },
            setValue: function (s, s1, s2) {
                startEle.val(s1);
                endEle.val(s2);
            }
        });
    }

    dateInit();

    // var messageBox;
    // messageBox = renderWidget(React, ReactDOM, MessageBox, {
    //         grid: 0.35,
    //         type: "confirm",
    //         confirm: function () {
    //             showToast();
    //             //todo
    //             var role_id = messageBox.getData();
    //             deleteRole(role_id);
    //
    //             return true;
    //         }
    //     }, $("#messageBox")[0]);

        listeners();

        getLabels();

        // initFormValidate();

});

function displayOtherConditions(show, text) {
        if(show){
            $(".condition-select").addClass("hidden");
            $(".condition-select").eq(0).removeClass("hidden");
        }else{
            $(".condition-select").addClass("hidden");
        }
    }

    function init(){
        $(".filter-select li a").on("click", function(){
            if($(this).text() != "请选择"){
                displayOtherConditions(true);
            }else{
                displayOtherConditions(false);
            }
        });

        $(".UPload").change(function(){
            var filePath = $(this).val();
            var index = filePath.lastIndexOf("\\");
            var filename = filePath.substr(index+1);
            $(this).prev("input").val(filename);

            if(checkFileType($(this))){
                preview(this);
            }
        });
    }
function addTagToSelectedArea(parent){
    var tagValue = $("input", parent).eq(0).val();
    if(tagValue) {
        var key = parent.data("key");
        var target = $(".strategy_item[data-target='" + key + "']");
        var selectedArea = $("#selected_area");
        var tagName = parent.parents("tr").children("td").eq(0).html();
        var tagText = $(".btn", parent).eq(0).html();
        if (!target.length) {
            target = $('<span class="strategy_item" data-target="' + key + '"><span class="label-text"></span><span class="ml-10 close-btn fa fa-times-circle"></span></span>');
            selectedArea.append(target);
        }
        target.children(".label-text").html(tagName + ": " + tagText);
        target.data("value", tagValue);
    }
}

/**
 *
 */
function removeTagFromSelectedArea(parent){
    var key = parent.data("key");
    var target = $(".strategy_item[data-target='" + key + "']");
    target.remove();
}

function listeners(){
    $("#selected_area").on("click", ".close-btn", function(){
        var ele = $(this).parent();
        var key = ele.data("target");
        ele.remove();
        var target = $(".btn-group[data-key='"+key+"']");
        $("input", target).val("");
        $(".btn", target).eq(0).html("不限");
    });

}

var ctx = "http://192.168.170.16:8415/mock/marketingweb/";
function getLabels(){
    ajaxData(ctx+"/getLajsobels.n", {}, function(data){
        renderTabs(data);
    });
}

function renderTabs(data){
    if(!data){
        return;
    }

    var header_ele = $("#category_label_list");
    var panels = $("#category_panels");
    data.forEach(function(category, index){
        var li = $('<li role="presentation"><a href="#'+category.categoryKey+'" role="tab" data-toggle="tab">'+category.categoryName+'</a></li>');
        li.data("category", category);
        header_ele.append(li);

        var panel = $('<div role="tabpanel" class="tab-pane" id="'+category.categoryKey+'"></div>');
        panels.append(panel);

        if(index === 0){
            li.addClass("active");
            panel.addClass("active");
        }

        renderCategory(category, panel);
    });
}

function renderCategory(category, panel){
    panel.append('<table class="table text-center" style="border: 1px solid #ddd; border-top: 0 solid #ddd;">'+
        '<thead>'+
        '<tr>'+
        '<th class="text-center">标签名称</th>'+
        '<th class="text-center">范围筛选</th>'+
        '</tr>'+
        '</thead>'+
        '<tbody>'+
        '</tbody>'+
        '</table>');

    var body = $("tbody", panel);
    var labelViewList = category.labelViewList;
    labelViewList.forEach(function(label){
        renderLabel(label, body);
    });
}

function renderLabel(label, body){
    var tr = $('<tr><td>'+label.labelName+'</td><td></td></tr>');
    body.append(tr);

    renderOptions(label, $("td", tr).eq(1));
}

function renderOptions(label, parent){
    if(label.single){
        renderSingleSelect(label, parent);
    }else{
        renderMultiSelect(label, parent);
    }
}

/**
 *
 * @param label
 * @param parent
 */
function renderSingleSelect(label, parent){
    parent.append('<div class="btn-group btn-group-sm" data-key="'+label.labelKey+'">'+
        '<input name="'+label.labelKey+'" style="width: 0; height: 0;padding: 0; opacity: 0;">'+
        '<button type="button" class="btn btn-default btn-select">不限</button>'+
        '<button type="button" class="btn btn-default dropdown-toggle btn-select-color" data-toggle="dropdown"'+
        ' aria-haspopup="true" aria-expanded="false">'+
        '<span class="caret"></span>'+
        '<span class="sr-only">Toggle Dropdown</span>'+
        '</button>'+
        '<ul class="dropdown-menu">'+
        '</ul>'+
        '</div>');

    var ul = $(".dropdown-menu", parent);
    $('.dropdown-toggle', parent).dropdown();
    dropdownListener(parent);
    label.options.forEach(function(option){
        ul.append('<li data-value="'+option.key+'"><a href="#">'+option.value+'</a></li>');
    });
}

function renderMultiSelect(label, parent){
    parent.append('<div class="btn-group btn-group-sm" data-key="'+label.labelKey+'">'+
        '<input name="'+label.labelKey+'" style="width: 0; height: 0;padding: 0; opacity: 0;">'+
        '<button type="button" class="btn btn-default btn-select">不限</button>'+
        '<button type="button" class="btn btn-default dropdown-toggle btn-select-color" data-toggle="dropdown" '+
        ' aria-haspopup="true" aria-expanded="false">'+
        '<span class="caret"></span>'+
        '<span class="sr-only">Toggle Dropdown</span>'+
        '</button>'+
        '<ul class="dropdown-menu exept multiselect">' +
        '</ul>' +
        '</div>');

    var ul = $(".dropdown-menu", parent);
    $('.dropdown-toggle', parent).dropdown();
    label.options.forEach(function(option, index){
        ul.append('<li data-value=""><a href="#">'+
            '<span class="input-checkbox">'+
            '<input type="checkbox" name="'+label.labelKey+'_option" id="'+label.labelKey+'_'+option.key+'">'+
            '<label class="c-checkbox" for="'+label.labelKey+'_'+option.key+'"></label>'+
            '<span class="ml-10 check-text">'+option.value+'</span>'+
            '</span></a>'+
            '</li>');
    });
    dropdownListener(parent);
}

/**
 *
 * @param parentEle
 */
function dropdownListener(parentEle){
    $(".dropdown-menu:not(.exept)", parentEle).on("click", "a",function(){
        if(!$(this).parent().hasClass("disabled")) {
            var parent = $(this).parents(".btn-group");
            $(".btn", parent).eq(0).html($(this).html());
            $("input", parent).eq(0).val($(this).parent().data("value"));
            $("input", parent).eq(0).blur();
        }
    });

    $(".dropdown-menu.multiselect a", parentEle).on("click", function(e){
        e.preventDefault();
        e.stopPropagation();

        var input = $(this).find(".input-checkbox").children("input");
        var ischecked = input.is(":checked");
        if(ischecked){
            input.prop("checked", false);
        }else{
            input.prop("checked", true);
        }
    });

    $(".dropdown-menu:not('.exept')", parentEle).parent().on('hide.bs.dropdown', function () {
        addTagToSelectedArea($(this));
    });

    $(".dropdown-menu.multiselect", parentEle).parent().on('hide.bs.dropdown', function () {
        var checked_inputs = $(this).find(".input-checkbox input:checked");

        var rets = [];
        var value = [];
        checked_inputs.each(function(){
            rets.push($(this).parent().find(".check-text").html());
            value.push($(this).val());
        });
        if(rets.length) {
            $(this).find(".btn").eq(0).html(rets.join("、"));
            $(this).children("input").eq(0).val(value.join(","));
            addTagToSelectedArea($(this));
        }else{
            $(this).find(".btn").eq(0).html("不限");
            $(this).children("input").eq(0).val("");
            removeTagFromSelectedArea($(this));
        }
    });
}


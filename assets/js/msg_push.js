require(["react","react-dom","../js/listData","MessageBox","common","bootstrap","daterangepicker"], function(React, ReactDOM,ListData,MessageBox){
    var dateInit = function(){
        var dataArea1 = $('.dataArea1');
        var dataArea2 = $('.dataArea2');
        dataArea1.dateRangePicker({
            getValue: function () {
                if (dataArea1.val())
                    return dataArea1.val();
                else
                    return '';
            },
            setValue: function (s, s1) {
                dataArea1.val(s1);
            },
            format: 'YYYY.MM.DD HH:mm:ss',
            time: {
                enabled: true
            },
            singleDate: true,
        });
        dataArea2.dateRangePicker({
            getValue: function () {
                if (dataArea2.val())
                    return dataArea2.val();
                else
                    return '';
            },
            setValue: function (s, s1) {
                dataArea2.val(s1);
            },
            format: 'YYYY.MM.DD HH:mm:ss',
            time: {
                enabled: true
            },
            singleDate: true,
        });
    };

    dateInit();
    init();
    listeners();
    initImgScroll();
    countWords();
    checkToggle();
    pushJudge();
    checkAll();
    tabs();
    slelctOptions();
    datePickerAdd();
});

function init() {
    var labelEle = $('.labelUserInner ul li input');
    labelEle.click(function(){
        if($(this).attr('class') == 'usersLabel') {
            $('.labelScrollBox').addClass('bounceIn animated').fadeIn();
        }else {
            $('.labelScrollBox').removeClass('bounceIn animated').fadeOut();
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
    /**
     * 检查文件类型
     * @param ele
     * @param suffix
     */
    function checkFileType(ele, suffix){
        if(ele.val()){
            var parts = ele.val().split(/\./);
            var ext = parts[parts.length - 1];
            if(ext){
                ext = ext.toLowerCase();
                var reg = suffix || /(bmp|png|jpeg|jpg|gif)$/;
                if(!reg.test(ext)){
                    var validator = $("#dataForm").validate();
                    var err4type = validator.errorsFor($("input[name='fileName']")[0]);
                    if(!err4type.length){
                        err4type = $('<span id="fileName-error" class="error error-tip">文件格式只支持bmp png jpeg jpg gif</span>');
                        $("input[name='fileName']").attr("aria-describedby", "fileName-error");
                        ele.parents(".inputArea").append(err4type);
                    }
                    err4type.show().html("文件格式只支持bmp png jpeg jpg gif");
                    return false;
                }

                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    $("#saveTask").on("click", function(){
            var validator = $("#dataForm").validate();
            if(validator.form()){
                if(!checkFileType($(".UPload"))){
                    return false;
                }
                if(checkActivityType(validator)) {
                    if(checkStrategy(validator)) {
                        submitFormData();
                    }
                }
            }
        });
}

function listeners(){
    $.fn.imgScroll = function(){
        var t = $(this);
        var lbtn = t.children(".scroll_left");
        var rbtn = t. children('.scroll_right');
        var li = t.find("ul").children("li");
        var tw = t.width();
        var scELe = t.find("ul");

        var count = 1;
        rbtn.on('click', function(){
            scELe.stop().animate({
                marginLeft: -tw * count + 'px'
            },function(){
                if(count < li.length - 1) {
                    count++;
                }else {
                    count = 0;
                    rbtn.addClass('noImg');
                }

                if(count === 1) {
                    lbtn.addClass('noImg');
                    rbtn.removeClass('noImg');
                }else {
                   lbtn.removeClass('noImg');
                }
            });
        });
        lbtn.click(function(){
            if(count > 1) {
                count--;
            }
            if(count === 0) {
                count = li.length - 1;
            }else if(count === 1) {
                lbtn.addClass('noImg');
            }else {
                rbtn.removeClass('noImg');
            }
            if(count <= li.length -1) {
                rbtn.removeClass('noImg');
            }
            scELe.stop().animate({
                marginLeft: -tw * (count - 1) + 'px'
            },function(){
                console.log(count);
            });
        });
    };
}

function initImgScroll() {
    $('.scroll').imgScroll();
}
function countWords(){
    var t = $('.selTxtInput');

    t.keyup(function(){
        var max = $(this).attr('maxlength');
        var initSurplusTxt = '剩余' + max + '个字';
        $(this).siblings('.surplusWords').text(initSurplusTxt);
        var wlen = $(this).val().length;
        var surplusWors = max - wlen;
        var surplusTxt = '剩余' + surplusWors + '个字';

        $(this).siblings('.surplusWords').text(surplusTxt);
    });
}

function checkToggle() {
    var t = $('.s .radioWrap input');
    t.each(function(){
        var sureMargin = $(this).parents('li').prev() ? $(this).parents('li').prev().width() : 0;
        $(this).on('click', function(){
            var thisSign = $(this).attr('value');
            var arrow = $('.con .arrow');
            if(thisSign == 1) {
                $('.conLi').eq(0).fadeOut(1000).slideUp(1000);
                $('.conLi').eq(1).fadeIn(1000).slideDown(1000);
                arrow.animate({
                    left: sureMargin + 25 + 'px'
                });
            }else {
                $('.conLi').eq(1).fadeOut(1000).slideUp(1000);
                $('.conLi').eq(0).fadeIn(1000).slideDown(1000);
               arrow.animate({
                    left: 22 + 'px'
                });
            }

        });
    });

    var _t = $('.behaviorInner ul');
    _t.each(function(){
        var _this=$(this);
        var thisIndex = _this.index();
        var arrow = $('.scrollBehavior .arrow1');
        _this.find('input').on('click', function(){
            switch(thisIndex) {
                case 0:
                    $('.con1').fadeOut();
                    break;
                case 1:
                    $('.con1').fadeIn();
                    $('.conWeb').fadeIn();
                    $('.conLi_manul').fadeOut();
                    arrow.animate({
                        left: 134 + 'px'
                    });
                    break;
                case 2:
                    $('.con1').fadeIn();
                    $('.conLi_manul').fadeIn();
                    $('.conWeb').fadeOut();
                    arrow.animate({
                        left: 248 + 'px'
                    });
                    break;
                case 3:
                    $('.con1').fadeOut();
                    break;
                default:
                    $('.con1').fadeOut();

            }
        });
    });

    var _a = $('.advRadio').find('input');
    _a.each(function(){
        var _this = $(this);
        _this.on('click', function(){
            _this.parent().parent().siblings('.selTime').show();
            _this.parent().parent().parent().siblings('.advCache').children('.selTime').hide();
        });
    });
}

function pushJudge() {
    var t = $('.pushTimeInner input[type="radio"]');
    t.click(function(){
        var value = $(this).attr('value');
        if(value == 1) {
            $('.laterPushTimeInput').fadeIn();
        }else{
            $('.laterPushTimeInput').fadeOut();
        }
    });
}

function checkAll() {
    $.fn.check = function(mode) {
        var t = $(this);
        mode = mode || 'on';
        t.click(function(){
            var isAllCheck = $(this).prop('checked');
            var allInput = $(this).parent().parent().siblings('.tabsOpt').find('input');

            return allInput.each(function(){
                switch(mode) {
                    case 'on':
                        this.checked = true;
                        break;
                    case 'off':
                        this.checked = false;
                        break;
                    case 'toggle':
                        if(isAllCheck) {
                            if(this.checked === false) {
                                this.checked = true;
                            }
                        }else {
                            if(this.checked === true)
                            this.checked = !this.checked;
                        }
                        break;
                }
            });
        });
    };
    $('.selAll').check('toggle');
}

function tabs() {
    $.fn.tabs = function(){
        var t = $(this);
        var tabs = t.children('li');
        tabs.click(function(){
            var _t = $(this);
            var prefix = _t.attr('id');
            _t.addClass('sel');
            _t.siblings().removeClass('sel');
            return tabs.each(function(){
                var name = prefix + '-con';
                $('.' + name).slideDown();
                $('.' + name).siblings('.tabsCons').slideUp();
            });
        });
    };
    $('.tabs').tabs();
}

function slelctOptions() {
    var l = $('.tabsOptInner').find('input');
    l.each(function(){
        $(this).click(function(){
            if($(this).prop('checked') === true) {
                var optionsTitle = $(this).parent().siblings('.ln').text();
                var optionsCon = $(this).parent().siblings('.rf').children('select').find("option:selected").text();
                var newPushHtml = '<li class="bounceIn animated"><span class="t">' + optionsTitle +
                ':</span><span class="o">' + optionsCon + '</span><i class="delLabel"></i></li>';
                $('.labelAlreadySel').append(newPushHtml);
            }
        });
    });

    $(document).on("click",".delLabel",function(){
        $(this).parent().attr('class', 'bounceOut animated').fadeOut(1000);
    });
}

function datePickerAdd() {
    // $('.day').css('border', '1px #900 solid')
}
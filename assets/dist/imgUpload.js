/**
     * 上传文件选择变化事件
     */
    function fileChangeListener(){
        $(".file-helper").change(function(){
            choiceFile($(this));
        });
    }

    /**
     * 选择文件
     */
    function choiceFile(ele){
        var accept = ele.attr("accept");
        var suffix = accept.split("\/")[1];
        suffix = suffix === "*" ? null : new RegExp("("+suffix+")$");
        if(checkFileType(ele, suffix)){
            checkImageSize(ele);
        }
    }

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
                var reg = suffix || /(gif|jpg|jpeg|png)$/;
                if(!reg.test(ext)){
                    $('.limit-tip').html("图片格式不正确，只支持gif，jpg，jpeg，png");
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

    /**
     * 验证图片尺寸
     * @param ele
     */
    function checkImageSize(ele){
        var file = ele[0];
        var div = document.getElementById('preview');
        //var w = div.getAttribute('data-width');
        //var h = div.getAttribute('data-height');
        var MAXWIDTH = div.clientWidth;
        var MAXHEIGHT = div.clientHeight;

        if (file.files && file.files[0]) {// FileReader,IE10+、FF22/23、Chrome28/29支持
            if (typeof FileReader != 'undefined') {
                div.innerHTML = '<img id=imghead>';
                var img = document.getElementById('imghead');
                var reader = new FileReader;
                reader.onload = function(event) {
                    event = event || window.event;
                    // var img = new Image();
                    img.onload = function(){
                        var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
                        if(checkSizeValid(ele, img.width, img.height)){
                            // $(ele.data("target")).attr("src", event.target.result);
                            //$('#imghead').attr("src", event.target.result);
                            img.width = rect.width;
                            img.height = rect.height;
                        }
                    };
                    img.src = event.target.result;
                };
                reader.readAsDataURL(file.files[0]);
            }
        }else{
            var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
            file.select();
            var src = document.selection.createRange().text;
            div.innerHTML = '<img id=imghead>';
            var img = document.getElementById('imghead');
            img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
            div.innerHTML = "<div id=divhead style='width:" + rect.width + "px;height:" + rect.height + "px;" + sFilter + src + "\"'></div>";
        }
    }

    /**
     * 验证图片尺寸大小
     * @param ele
     * @param w
     */
    function checkSizeValid(ele, w, h){
        var size = $('#pixels').html().substring(2);
        var width = size.split('*')[0];
        var height = size.split('*')[1];
        var id = ele.attr("id");
        if(id !== "img-lottery") {
            if (w != width || h !=height) {
                $('.limit-tip').html("图片的宽度为" + w + "像素，高度为" + h + "像素，不符合要求应为" + width+ "*" + height + "的像素");
                return false;
            }else{
                $('.limit-tip').html('');
                return true;
            }
        }else{
            return true;
        }
    }

    function clacImgZoomParam(maxWidth, maxHeight, width, height) {
        var param = {
            top: 0,
            left: 0,
            width: width,
            height: height
        };
        if (width > maxWidth || height > maxHeight) {
            rateWidth = width / maxWidth;
            rateHeight = height / maxHeight;
            if (rateWidth > rateHeight) {
                param.width = maxWidth;
                param.height = Math.round(height / rateWidth);
            } else {
                param.width = Math.round(width / rateHeight);
                param.height = maxHeight;
            }
        }
        param.left = Math.round((maxWidth - param.width) / 2);
        param.top = Math.round((maxHeight - param.height) / 2);
        return param;
    }

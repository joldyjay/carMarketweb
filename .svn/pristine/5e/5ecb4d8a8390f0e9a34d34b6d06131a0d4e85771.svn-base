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
require(["react","react-dom","../js/listData","MessageBox","../js/common2","bootstrap","daterangepicker","common"], function(React, ReactDOM,ListData,MessageBox){
    $.tsh.popupBox({
        hand: '#btn-addchannel',
        box: '#addchannel',
        width: 440,
        callback: function(box){
            
        },
        okfn: function(hand,box){
            
            box.Hide();
        }
    });
    $.tsh.popupBox({
        hand: '#compile',
        box: '#addredact',
        width: 440,
        callback: function(box){
            
        },
        okfn: function(hand,box){
            
            box.Hide();
        }
    });
    
    /**
     * 监听
     */
    function listeners() {
        $("#btn-save").on("click", function () {
            if ($("#dataForm").validate().form()) {
                $("#dataForm").submit();
            }
        });
    }

    function initFormValidate() {
        $("#dataForm").validate({
            errorPlacement: function (error, element) {
                error.addClass("error-tip");
                element.after(error);
            },
            rules: {
                roleName: {
                    required: true,
                    noSpecial: true,
                    remote: "check.html?roleId=${role.roleId}"
                },
                remark: {
                    url: true
                }
            },
            errorElement: "span",
            messages: {
                roleName: {
                    required: "标题名不能为空！"
                },
                remark: {
                    url: "备注信息不能为空！"
                }
            }
        });
    }
    $('#logon').on('click',function(){
        var rel = fnTsh.validate.init( '#infoPlanCase' );
       // alert(rel)
    });
    
    });
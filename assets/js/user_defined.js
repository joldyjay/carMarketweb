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
require(["../js/common2"], function(){
    $(':radio').on('change', function(){
        $('#urlNext').attr('href', $(this).val());
    });

    $('#urlNext').on('click',function(){
        var rel = fnTsh.validate.init( '#infoPlanCase' );
       // alert(rel)
    });
});
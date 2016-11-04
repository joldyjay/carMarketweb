/**
 * Created by cqb32_000 on 2016-09-20.
 */

require(["SideBar","react","react-dom","common","store"], function(SideBar, React, ReactDOM,a,store){
    window.store = store;
    initSideBar(SideBar, React, ReactDOM);
});

var initSideBar = function (SideBar, React, ReactDOM) {
    var sidebarEle = React.createElement(SideBar, {
        data: MENU,
        style: {width: "180px"},
        hasExpand: true,
        theme: "lightblue",
        onSelect: function(item){
            $("#desktop_frame").attr("src",item.link);
            store.set("sichuan_platform_desktop_frame", item.link);
        }
    });
    var sidebar = ReactDOM.render(sidebarEle, document.querySelector("#sidebar"));

    if(store.get("sichuan_platform_desktop_frame")){
        $("#desktop_frame").attr("src",store.get("sichuan_platform_desktop_frame"));
    }


    $('#desktop_frame').on("load", function(){
        var activeHref = this.contentWindow.location.href;
        var item = null;
        for(var i in MENU){
            var subItems = MENU[i].children;
            for(var j in subItems){
                if(subItems[j].link){
                    var link = subItems[j].link;
                    var index = link.indexOf("/");
                    link = link.substr(index);
                    if(activeHref.indexOf(link) != -1){
                        item = subItems[j];
                        break;
                    }
                }
            }
        }

        if(item) {
            sidebar.setActiveStatus(item);
        }
    });
};
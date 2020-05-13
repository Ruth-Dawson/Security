//----------------------------------------------------------------------------
// common.js用于处理页面中的一些特效及功能---------------------------------------
// 例如折叠collapse 添加假数据 执行处理操作 报警效果显示--------------------------
//----------------------------------------------------------------------------

$(function () {
    // --------------------------------------首页security.html------------------------------ 
    // 1、未处理数据 先添加10个未处理例子  实际应当调用接口获取未处理数据
    var x = 0;
    for (let i = 0; i < 10; i++) {
        var li_unhandled = `<li class="list-group-item bg-transparent">
                                                <a href="" class="d-block">
                                                    <div class="info p-4 pl-5">
                                                        <p>报警机构：<span class="name">悦华安养洪武中心${++x}</span></p>
                                                        <p>报警类型：<span class="px-3 py-1 type">用电</span></p>
                                                        <p>警情级别：<span class="level">一级</span></p>
                                                        <p>报警时间：<span class="time">2020-03-12 15:30:25</span></p>
                                                    </div>
                                                </a>
                                                <div class="handle-detail text-center py-4">
                                                    <button class="btn bg-transparent text-primary px-4 li_btn">处理</button>
                                                    &emsp;&emsp; <button class="btn text-white px-4 detail">详情</span>
                                                </div>
                                            </li>`;
        $("#home .list-group").append(li_unhandled);
    }

    // 2、执行处理操作
    $(".li_btn").each(function () {
        $(this).click(function () {
            var $li = $(this).parents(".list-group-item").eq(0);
            $li.addClass("li_checked");
            var name = $li.find(".name").text();
            var type = $li.find(".type").text();
            var level = $li.find(".level").text();
            var time = $li.find(".time").text();
            var li_dom = `<li class="list-group-item bg-transparent">
                                    <a href="" class="d-block">
                                        <div class="info p-4 pl-5">
                                            <p>报警机构：<span class="name">${name}</span></p>
                                            <p>报警类型：<span class="px-3 py-1 type">${type}</span></p>
                                            <p>警情级别：<span class="level">${level}</span></p>
                                            <p>报警时间：<span class="time">${time}</span></p>
                                        </div>
                                    </a>
                                    <div class="handle-detail text-center py-4">
                                        <button class="btn bg-transparent text-success px-4">已处理</button>
                                    </div>
                                </li>`;
            $("#profile .list-group").append(li_dom);
            $li.remove();
        })
    })

    //3、报警效果显示
    // 具体哪一种报警应该由后台传入相关参数以做识别哪一种报警
    // 然后哪一种报警只需要再该类别上加一个alarm类 即可实现报警效果
    $(".grap-top .monitoring.alarm .moni-status").text("异常");

    // 页面一加载就监听collapse
    $(".card-header .btn").each(function (index, item) {
        if ($(this).attr("aria-expanded") === "true") {
            $(this).children(".icon1").css("display", "none");
            $(this).children(".icon2").css("display", "block");
        } else {
            $(this).children(".icon1").css("display", "block");
            $(this).children(".icon2").css("display", "none");
        }
    })
    $("#orgAccordion .collapse").on("show.bs.collapse", function () {
        $(this).siblings(".card-header").find(".list_line").css("height", "0");
        $(this).siblings(".card-header").find(".icon1").css("display", "none");
        $(this).siblings(".card-header").find(".icon2").css("display", "block");
    });

    $("#orgAccordion .collapse").on("hide.bs.collapse", function () {
        $(this).siblings(".card-header").find(".list_line").css("height", "1px");
        $(this).siblings(".card-header").find(".icon2").css("display", "none");
        $(this).siblings(".card-header").find(".icon1").css("display", "block");
    });
})
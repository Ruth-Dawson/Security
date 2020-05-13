jQuery(document).ready(function($) {
  var timelines = $(".cd-horizontal-timeline"),
    gapDistance = 70, //站点间距
    station_width = 120, //站点宽度
    timelineTotWidth = 0; //时间线总长度;
  var leftMultiple = 0;

  // 获取首页iframe用于站点切换
  var secIframe = $("#secIframe");
  timelines.length > 0 && initTimeline(timelines);

  function initTimeline(timelines) {
    timelines.each(function() {
      var timeline = $(this),
        timelineComponents = {};
      //cache timeline components
      // --events-wrapper
      timelineComponents["timelineWrapper"] = timeline.find(".events-wrapper");
      // --events
      timelineComponents["eventsWrapper"] = timelineComponents[
        "timelineWrapper"
      ].children(".events");
      // --filling-line
      timelineComponents["fillingLine"] = timelineComponents[
        "eventsWrapper"
      ].children(".filling-line");
      // --li  a
      timelineComponents["timelineEvents"] = timelineComponents[
        "eventsWrapper"
      ].find("a");
      // --navigation
      timelineComponents["timelineNavigation"] = timeline.find(
        ".cd-timeline-navigation"
      );
      // --events 窗口  此处为iframe
      timelineComponents["eventsContent"] = timeline.children(
        ".events-content"
      );

      timeline.addClass("loaded");

      // ------------------------------------------1、计算设置时间线宽度events----------------------------------------
      // 计算宽度应该根据站点数量和每个站点的宽度来决定
      // setTimelineWidth

      //设置时间线宽度
      timelineTotWidth = setTimelineWidth(timelineComponents);

      // ------------------------------------------2、计算设置每个站点之间的距离----------------------------------------
      //通过设置每个站的的left值来达到每个站点之间有大约有相等的间隔
      // 填充fillingline
      setStationPosition(timelineComponents, gapDistance);

      // ------------------------------------------3、站点每隔几秒 向右移动 跳转刷新 ----------------------------------------
      // arr用于存储 setInterval 返回的ID值给stop 用于清除setInterval() 以及存储当前selected位置索引
      var index = 0,
        stop,
        arr = [];

      // 移动到最右侧时间线要向左移动以显示剩下站点 不点按钮反复执行
      stop = swit(timelineComponents, timelineTotWidth, index, arr);

      // ------------------------------------------4、按钮左右切换时间线  暂停和开始----------------------------------------
      // 按钮暂停/开始
      $(".cd-timeline-navigation .iconfont").click(function() {
        $(this)
          .hide()
          .siblings(".iconfont")
          .show();
        if ($(".icon1").css("display") == "none") {
          clearInterval(stop[1]);
        } else {
          stop = swit(timelineComponents, timelineTotWidth, arr[0] + 1, arr);
        }
      });

      //detect click on the next arrow
      timelineComponents["timelineNavigation"].on("click", ".next", function(
        event
      ) {
        event.preventDefault();
        // 暂停移动，按钮变为暂停
        clearInterval(stop[1]);
        $(".cd-timeline-navigation .icon1")
          .hide()
          .siblings(".iconfont")
          .show();
        updateSlide(timelineComponents, timelineTotWidth, "next");
      });
      //detect click on the prev arrow
      timelineComponents["timelineNavigation"].on("click", ".prev", function(
        event
      ) {
        event.preventDefault();
        clearInterval(stop[1]);
        $(".cd-timeline-navigation .icon1")
          .hide()
          .siblings(".iconfont")
          .show();
        updateSlide(timelineComponents, timelineTotWidth, "prev");
      });

      // ------------------------------------------5、站点切换对应站点内容切换 iframe----------------------------------------
      //发送新的ajax请求
      timelineComponents["eventsWrapper"].on("click", "a", function(event) {
        event.preventDefault();
        timelineComponents["timelineEvents"].removeClass("selected");
        $(this).addClass("selected");
        updateOlderEvents($(this));
        updateFilling(
          $(this),
          timelineComponents["fillingLine"],
          timelineTotWidth
        );
        updateVisibleContent($(this), timelineComponents["eventsContent"]);
        // secIframe.eq(0).attr("src", "security_iframe.html?id=1");
        // 点击站点，站点切换暂停，更改按钮状态
        $(".icon1")
          .hide()
          .siblings(".iconfont")
          .show();
        // 更改index值，站点直接从当前点继续向右跳转
        arr[0] = timelineComponents["eventsWrapper"]
          .find("a.selected")
          .parent("li")
          .index();
        clearInterval(stop[1]);
      });
    });
  }

  //暂停 swit setInterval(停止) 清除inter
  // 记录 station 位置 、
  // 记录 fillingLine位置、

  // 重启  swit

  // ------------------------------------------函数封装----------------------------------------

  // 1、---------------------------1、计算设置时间线宽度events-----------------------------------
  function setTimelineWidth(timelineComponents) {
    // 记录每个站点的宽度之和wid
    // 由于站点的宽度由a标签来承载 然而a标签为行内元素，无法对其设置宽高，需将其设为块级元素
    // 此处每个站点的宽度暂定为120px，若有需要可修改数值
    var totalWidth =
      timelineComponents["timelineEvents"].length *
      (gapDistance + station_width);
    timelineComponents["eventsWrapper"].css("width", totalWidth + "px");
    return totalWidth;
  }

  // 2、---------------------------2、计算设置每个站点之间的距离---填充第一个时间线--------------------------------
  // 设置每个站点的距离 a标签为position:absolute 所以将a标签横向排列在时间线上即可
  // 应为： 固定宽度min + 站点一半宽度 40/2

  function setStationPosition(timelineComponents, distance) {
    // var wid;
    for (i = 0; i < timelineComponents["timelineEvents"].length; i++) {
      // var distance = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][i]),
      // 	distanceNorm = Math.round(distance / timelineComponents['eventsMinLapse']) + 2;
      // timelineComponents['timelineEvents'].eq(i).css('left', distanceNorm * min + 'px');
      // console.log('i:' + i + '---' + parseInt(timelineComponents['timelineEvents'].eq(i).css('width')))
      // timelineComponents['timelineEvents'].eq(i).css('left', min - parseInt(timelineComponents['timelineEvents'].eq(i).css('width')) / 2 + 'px');
      // if (i == 0) {
      // 	wid = 0;
      // 	timelineComponents['timelineEvents'].eq(i).css('left', min + 'px');
      // } else {
      // wid = parseInt(timelineComponents['timelineEvents'].eq(i - 1).width())

      timelineComponents["timelineEvents"].eq(i).css("left", distance + "px");
      // }
      distance = distance + gapDistance + station_width;
    }

    // 设置第一个站点a标签的填充线 fillingLine
    // 填充原理为scaleX缩放，计算缩放值 设置transform
    // updateFilling(timelineComponents['timelineEvents'].eq(0), timelineComponents['fillingLine'], timelineTotWidth);
  }

  // 计算fillingline的缩放值传递给setTransformValue

  function updateFilling(selectedEvent, filling, totWidth) {
    //change .filling-line length according to the selected event
    // getComputedStyle用于获取最终样式，null作用于不获取伪元素的属性值，如before after
    var eventStyle = window.getComputedStyle(selectedEvent.get(0), null),
      eventLeft = eventStyle.getPropertyValue("left"),
      eventWidth = eventStyle.getPropertyValue("width");
    // console.log(eventLeft)
    // console.log(selectedEvent.get(0))
    eventLeft =
      Number(eventLeft.replace("px", "")) +
      Number(eventWidth.replace("px", "")) / 2;
    var scaleValue = eventLeft / totWidth;
    setTransformValue(filling.get(0), "scaleX", scaleValue);
  }

  // 通过value设置transform:scaleX(value) 以实现fillingline缩放的效果
  function setTransformValue(element, property, value) {
    element.style["-webkit-transform"] = property + "(" + value + ")";
    element.style["-moz-transform"] = property + "(" + value + ")";
    element.style["-ms-transform"] = property + "(" + value + ")";
    element.style["-o-transform"] = property + "(" + value + ")";
    element.style["transform"] = property + "(" + value + ")";
  }

  // 3、---------------------------3、站点每隔几秒 向右移动 跳转刷新--------------------------------
  // setInterval封装
  function swit(timelineComponents, timelineTotWidth, index, arr) {
    // 记录站点行走的距离  大于timelineWrapper容器宽度时 需要向左平移
    //如何记录站点行走的距离？ 依据left？
    var leftDistance;
    var inter = setInterval(function() {
      if (index >= timelineComponents["timelineEvents"].length) {
        index = 0;

        setTransformValue(
          timelineComponents["eventsWrapper"].get(0),
          "translateX",
          "0px"
        );
        // 设置第一个a 标签为selected
        timelineComponents["timelineEvents"].removeClass("selected");
        $(timelineComponents["timelineEvents"][index]).addClass("selected");

        updateFilling(
          timelineComponents["timelineEvents"].eq(0),
          timelineComponents["fillingLine"],
          timelineTotWidth
        );
        leftMultiple = parseInt(
          $(timelineComponents["timelineEvents"])
            .eq(index)
            .css("left")
        );
        // 站点切换后自动加载,此处index应换为站点对应的id
        secIframe.eq(0).attr("src", "security_iframe.html?id=" + index);
        arr[0] = index;
        index++;
        // }
      } else {
        leftDistance = parseInt(
          $(timelineComponents["timelineEvents"])
            .eq(index)
            .css("left")
        );
        $(timelineComponents["timelineEvents"]).each(function() {
          $(this).removeClass("selected");
        });
        $(timelineComponents["timelineEvents"][index]).addClass("selected");
        // 更新时间线
        updateFilling(
          timelineComponents["timelineEvents"].eq(index),
          timelineComponents["fillingLine"],
          timelineTotWidth
        );
        // 站点切换后自动加载,此处index应换为站点对应的id
        secIframe.eq(0).attr("src", "security_iframe.html?id=" + index);

        // 判断时间线是否需要左移或者右移
        // 站点到最右侧时间线平移
        if (
          leftDistance - leftMultiple >
            timelineComponents["timelineWrapper"].width() -
              gapDistance -
              station_width &&
          index != timelineComponents["timelineEvents"].length - 1
        ) {
          updateSlide(timelineComponents, timelineTotWidth, "next");
          leftMultiple = leftDistance;
        }
        arr[0] = index;
        index++;
      }
    }, 5000);
    arr[1] = inter;
    return arr;
  }

  // 站点左右切换

  function updateSlide(timelineComponents, timelineTotWidth, string) {
    //retrieve translateX value of timelineComponents['eventsWrapper']
    // 获取events  events-wrapper
    var translateValue = getTranslateValue(timelineComponents["eventsWrapper"]),
      wrapperWidth = Number(
        timelineComponents["timelineWrapper"].css("width").replace("px", "")
      );
    //translate the timeline to the left('next')/right('prev')
    string == "next"
      ? translateTimeline(
          timelineComponents,
          translateValue - wrapperWidth + gapDistance,
          wrapperWidth - timelineTotWidth
        )
      : translateTimeline(
          timelineComponents,
          translateValue + wrapperWidth - gapDistance
        );
  }

  function translateTimeline(timelineComponents, value, totWidth) {
    var eventsWrapper = timelineComponents["eventsWrapper"].get(0);
    value = value > 0 ? 0 : value; //only negative translate value
    value =
      !(typeof totWidth === "undefined") && value < totWidth ? totWidth : value; //do not translate more than timeline width
    setTransformValue(eventsWrapper, "translateX", value + "px");
    //update navigation arrows visibility
    value == 0
      ? timelineComponents["timelineNavigation"]
          .find(".prev")
          .addClass("inactive")
      : timelineComponents["timelineNavigation"]
          .find(".prev")
          .removeClass("inactive");
    value == totWidth
      ? timelineComponents["timelineNavigation"]
          .find(".next")
          .addClass("inactive")
      : timelineComponents["timelineNavigation"]
          .find(".next")
          .removeClass("inactive");
  }

  function getTranslateValue(timeline) {
    var timelineStyle = window.getComputedStyle(timeline.get(0), null),
      timelineTranslate =
        timelineStyle.getPropertyValue("-webkit-transform") ||
        timelineStyle.getPropertyValue("-moz-transform") ||
        timelineStyle.getPropertyValue("-ms-transform") ||
        timelineStyle.getPropertyValue("-o-transform") ||
        timelineStyle.getPropertyValue("transform");

    if (timelineTranslate.indexOf("(") >= 0) {
      var timelineTranslate = timelineTranslate.split("(")[1];
      timelineTranslate = timelineTranslate.split(")")[0];
      timelineTranslate = timelineTranslate.split(",");
      var translateValue = timelineTranslate[4];
    } else {
      var translateValue = 0;
    }

    return Number(translateValue);
  }

  // 更新时间线的位置

  function updateVisibleContent(event, eventsContent) {
    var eventDate = event.data("date"),
      visibleContent = eventsContent.find(".selected"),
      selectedContent = eventsContent.find('[data-date="' + eventDate + '"]'),
      selectedContentHeight = selectedContent.height();

    if (selectedContent.index() > visibleContent.index()) {
      var classEnetering = "selected enter-right",
        classLeaving = "leave-left";
    } else {
      var classEnetering = "selected enter-left",
        classLeaving = "leave-right";
    }

    selectedContent.attr("class", classEnetering);
    visibleContent
      .attr("class", classLeaving)
      .one(
        "webkitAnimationEnd oanimationend msAnimationEnd animationend",
        function() {
          visibleContent.removeClass("leave-right leave-left");
          selectedContent.removeClass("enter-left enter-right");
        }
      );
    eventsContent.css("height", selectedContentHeight + "px");
  }

  function updateOlderEvents(event) {
    event
      .parent("li")
      .prevAll("li")
      .children("a")
      .addClass("older-event")
      .end()
      .end()
      .nextAll("li")
      .children("a")
      .removeClass("older-event");
  }
});

function changeStation(id) {
  $("#secIframe").attr("src", "security_iframe.html?id=" + id);
}

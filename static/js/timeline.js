jQuery(document).ready(function ($) {
    var timelines = $('.cd-horizontal-timeline'),
        eventsMinDistance = 120;

    (timelines.length > 0) && initTimeline(timelines);

    function initTimeline(timelines) {
        timelines.each(function () {
            var timeline = $(this),
                timelineComponents = {};
            //cache timeline components 
            // --events-wrapper
            timelineComponents['timelineWrapper'] = timeline.find('.events-wrapper');
            // --events
            timelineComponents['eventsWrapper'] = timelineComponents['timelineWrapper'].children('.events');
            // --filling-line
            timelineComponents['fillingLine'] = timelineComponents['eventsWrapper'].children('.filling-line');
            // --li  a
            timelineComponents['timelineEvents'] = timelineComponents['eventsWrapper'].find('a');
            // --navigation
            timelineComponents['timelineNavigation'] = timeline.find('.cd-timeline-navigation');

            // --events 窗口  此处为iframe
            timelineComponents['eventsContent'] = timeline.children('.events-content');

            //assign a left postion to the single events along the timeline

            //assign a width to the timeline  设置时间线宽度
            var timelineTotWidth = setTimelineWidth(timelineComponents, eventsMinDistance);

            // 设置每个站点的距离
            setDatePosition(timelineComponents, eventsMinDistance);


            //the timeline has been initialize - show it
            timeline.addClass('loaded');

            //detect click on the next arrow
            timelineComponents['timelineNavigation'].on('click', '.next', function (event) {
                event.preventDefault();
                updateSlide(timelineComponents, timelineTotWidth, 'next');
            });
            //detect click on the prev arrow
            timelineComponents['timelineNavigation'].on('click', '.prev', function (event) {
                event.preventDefault();
                updateSlide(timelineComponents, timelineTotWidth, 'prev');
            });
            //detect click on the a single event - show new event content
            timelineComponents['eventsWrapper'].on('click', 'a', function (event) {
                event.preventDefault();
                timelineComponents['timelineEvents'].removeClass('selected');
                $(this).addClass('selected');
                updateOlderEvents($(this));
                updateFilling($(this), timelineComponents['fillingLine'], timelineTotWidth);
                updateVisibleContent($(this), timelineComponents['eventsContent']);
                clearInterval(stop[1])
                console.log(this)
            });

            //on swipe, show next/prev event content
            // timelineComponents['eventsContent'].on('swipeleft', function () {
            // 	var mq = checkMQ();
            // 	(mq == 'mobile') && showNewContent(timelineComponents, timelineTotWidth, 'next');
            // });
            // timelineComponents['eventsContent'].on('swiperight', function () {
            // 	var mq = checkMQ();
            // 	(mq == 'mobile') && showNewContent(timelineComponents, timelineTotWidth, 'prev');
            // });

            //keyboard navigation
            // $(document).keyup(function (event) {
            // 	if (event.which == '37' && elementInViewport(timeline.get(0))) {
            // 		showNewContent(timelineComponents, timelineTotWidth, 'prev');
            // 	} else if (event.which == '39' && elementInViewport(timeline.get(0))) {
            // 		showNewContent(timelineComponents, timelineTotWidth, 'next');
            // 	}
            // });


            // -------------补充-------------


            // 站点每隔几秒 跳转刷新
            var index = 0;
            var stop;
            // arr用于存储 setInterval 返回的ID值
            var arr = [];
            stop = swit(timelineComponents, timelineTotWidth, index, arr);


            // 按钮切换

            $(".cd-timeline-navigation .iconfont").click(function () {
                $(this).hide().siblings(".iconfont").show();
                if ($(".icon1").css("display") == "none") {
                    clearInterval(stop[0])
                    // console.log(arr)
                } else {
                    swit(timelineComponents, timelineTotWidth, index, arr);
                }
            })
        });
    }

    //暂停 swit setInterval(停止) 清除inter
    // 记录 station 位置 、
    // 记录 fillingLine位置、

    // 重启  swit


    // ----------按钮切换----------


    // setInterval封装
    function swit(timelineComponents, timelineTotWidth, index, arr) {

        var inter = setInterval(function () {
            if (index >= timelineComponents['timelineEvents'].length) {
                index = 0;
            } else {
                $(timelineComponents['timelineEvents']).each(function () {
                    $(this).removeClass('selected')
                })
                $(timelineComponents['timelineEvents'][index]).addClass('selected');
                // 更新时间线
                updateFilling(timelineComponents['timelineEvents'].eq(index), timelineComponents['fillingLine'], totalWidth);
                // 站点到最右侧时间线平移
                // console.log($(timelineComponents['timelineEvents'])[index].style.left)

                // 1100应该改为屏幕宽度

                // if (parseInt($($(timelineComponents['timelineEvents'])[index]).css('left')) % 1000 == 0) {
                if (index % 6 != 0) {
                    updateSlide(timelineComponents, timelineTotWidth, 'next')
                }
                if (parseInt($($(timelineComponents['timelineEvents'])[index]).css('left')) <= 10) {
                    updateSlide(timelineComponents, timelineTotWidth, 'prev')
                }
                index++;
            }
        }, 1000)
        arr.push(inter);
        arr.push(index);
        return arr;
    }


    // 站点左右切换

    function updateSlide(timelineComponents, timelineTotWidth, string) {
        //retrieve translateX value of timelineComponents['eventsWrapper']
        var translateValue = getTranslateValue(timelineComponents['eventsWrapper']),
            wrapperWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', ''));
        //translate the timeline to the left('next')/right('prev') 
        (string == 'next')
            ? translateTimeline(timelineComponents, translateValue - wrapperWidth + eventsMinDistance, wrapperWidth - timelineTotWidth)
            : translateTimeline(timelineComponents, translateValue + wrapperWidth - eventsMinDistance);
    }

    function showNewContent(timelineComponents, timelineTotWidth, string) {
        //go from one event to the next/previous one
        var visibleContent = timelineComponents['eventsContent'].find('.selected'),
            newContent = (string == 'next') ? visibleContent.next() : visibleContent.prev();

        if (newContent.length > 0) { //if there's a next/prev event - show it
            var selectedDate = timelineComponents['eventsWrapper'].find('.selected'),
                newEvent = (string == 'next') ? selectedDate.parent('li').next('li').children('a') : selectedDate.parent('li').prev('li').children('a');

            updateFilling(newEvent, timelineComponents['fillingLine'], timelineTotWidth);
            updateVisibleContent(newEvent, timelineComponents['eventsContent']);
            newEvent.addClass('selected');
            selectedDate.removeClass('selected');
            updateOlderEvents(newEvent);
            updateTimelinePosition(string, newEvent, timelineComponents, timelineTotWidth);
        }
    }


    // 更新时间线的位置

    function updateTimelinePosition(string, event, timelineComponents, timelineTotWidth) {
        //translate timeline to the left/right according to the position of the selected event
        var eventStyle = window.getComputedStyle(event.get(0), null),
            eventLeft = Number(eventStyle.getPropertyValue("left").replace('px', '')),
            timelineWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', '')),
            timelineTotWidth = Number(timelineComponents['eventsWrapper'].css('width').replace('px', ''));
        var timelineTranslate = getTranslateValue(timelineComponents['eventsWrapper']);

        if ((string == 'next' && eventLeft > timelineWidth - timelineTranslate) || (string == 'prev' && eventLeft < - timelineTranslate)) {
            translateTimeline(timelineComponents, - eventLeft + timelineWidth / 2, timelineWidth - timelineTotWidth);
        }
    }

    function translateTimeline(timelineComponents, value, totWidth) {
        var eventsWrapper = timelineComponents['eventsWrapper'].get(0);
        value = (value > 0) ? 0 : value; //only negative translate value
        value = (!(typeof totWidth === 'undefined') && value < totWidth) ? totWidth : value; //do not translate more than timeline width
        setTransformValue(eventsWrapper, 'translateX', value + 'px');
        //update navigation arrows visibility
        (value == 0) ? timelineComponents['timelineNavigation'].find('.prev').addClass('inactive') : timelineComponents['timelineNavigation'].find('.prev').removeClass('inactive');
        (value == totWidth) ? timelineComponents['timelineNavigation'].find('.next').addClass('inactive') : timelineComponents['timelineNavigation'].find('.next').removeClass('inactive');
    }



    function updateFilling(selectedEvent, filling, totWidth) {
        //change .filling-line length according to the selected event
        var eventStyle = window.getComputedStyle(selectedEvent.get(0), null),
            eventLeft = eventStyle.getPropertyValue("left"),
            eventWidth = eventStyle.getPropertyValue("width");
        eventLeft = Number(eventLeft.replace('px', '')) + Number(eventWidth.replace('px', '')) / 2;
        var scaleValue = eventLeft / totWidth;
        setTransformValue(filling.get(0), 'scaleX', scaleValue);
    }

    // 设置每个站点的距离 这里设置距离固定

    function setDatePosition(timelineComponents, min) {
        // 重置eventsMinDistance  第一个应去除
        // console.log(timelineComponents['timelineEvents'].eq(0).css('width'))
        // min = min - parseInt(timelineComponents['timelineEvents'].eq(0).css('width')) / 2;
        // console.log(min)
        var wid;
        for (i = 0; i < timelineComponents['timelineEvents'].length; i++) {
            // var distance = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][i]),
            // 	distanceNorm = Math.round(distance / timelineComponents['eventsMinLapse']) + 2;
            // timelineComponents['timelineEvents'].eq(i).css('left', distanceNorm * min + 'px');
            // console.log('i:' + i + '---' + parseInt(timelineComponents['timelineEvents'].eq(i).css('width')))
            // timelineComponents['timelineEvents'].eq(i).css('left', min - parseInt(timelineComponents['timelineEvents'].eq(i).css('width')) / 2 + 'px');
            if (i == 0) {
                wid = 0;
                timelineComponents['timelineEvents'].eq(i).css('left', min + 'px');
            } else {
                wid = parseInt(timelineComponents['timelineEvents'].eq(i - 1).width())

                timelineComponents['timelineEvents'].eq(i).css('left', min + wid + 'px');
            }
            min += wid + 120;
        }
    }

    // 分配时间线总长度  预留设置为1800  后期需要动态更改

    function setTimelineWidth(timelineComponents, width) {
        // 获取日期间隔天数
        // var timeSpan = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][timelineComponents['timelineDates'].length - 1]),
        // 	timeSpanNorm = timeSpan / timelineComponents['eventsMinLapse'],
        // 	timeSpanNorm = Math.round(timeSpanNorm) + 4,
        // 	totalWidth = timeSpanNorm * width,
        var wid = 0;
        for (let i = 0; i < timelineComponents['timelineEvents'].length; i++) {
            // console.log(timelineComponents['timelineEvents'].eq(i).width())

            wid += timelineComponents['timelineEvents'].eq(i).width();

        }
        // 此处更改
        totalWidth = timelineComponents['timelineEvents'].length * width + wid;
        timelineComponents['eventsWrapper'].css('width', totalWidth + 'px');
        // 设置第一个a标签 fillingLine
        updateFilling(timelineComponents['timelineEvents'].eq(0), timelineComponents['fillingLine'], totalWidth);

        return totalWidth;
    }

    function updateVisibleContent(event, eventsContent) {
        var eventDate = event.data('date'),
            visibleContent = eventsContent.find('.selected'),
            selectedContent = eventsContent.find('[data-date="' + eventDate + '"]'),
            selectedContentHeight = selectedContent.height();

        if (selectedContent.index() > visibleContent.index()) {
            var classEnetering = 'selected enter-right',
                classLeaving = 'leave-left';
        } else {
            var classEnetering = 'selected enter-left',
                classLeaving = 'leave-right';
        }

        selectedContent.attr('class', classEnetering);
        visibleContent.attr('class', classLeaving).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
            visibleContent.removeClass('leave-right leave-left');
            selectedContent.removeClass('enter-left enter-right');
        });
        eventsContent.css('height', selectedContentHeight + 'px');
    }

    function updateOlderEvents(event) {
        event.parent('li').prevAll('li').children('a').addClass('older-event').end().end().nextAll('li').children('a').removeClass('older-event');
    }

    function getTranslateValue(timeline) {
        var timelineStyle = window.getComputedStyle(timeline.get(0), null),
            timelineTranslate = timelineStyle.getPropertyValue("-webkit-transform") ||
                timelineStyle.getPropertyValue("-moz-transform") ||
                timelineStyle.getPropertyValue("-ms-transform") ||
                timelineStyle.getPropertyValue("-o-transform") ||
                timelineStyle.getPropertyValue("transform");

        if (timelineTranslate.indexOf('(') >= 0) {
            var timelineTranslate = timelineTranslate.split('(')[1];
            timelineTranslate = timelineTranslate.split(')')[0];
            timelineTranslate = timelineTranslate.split(',');
            var translateValue = timelineTranslate[4];
        } else {
            var translateValue = 0;
        }

        return Number(translateValue);
    }

    function setTransformValue(element, property, value) {
        element.style["-webkit-transform"] = property + "(" + value + ")";
        element.style["-moz-transform"] = property + "(" + value + ")";
        element.style["-ms-transform"] = property + "(" + value + ")";
        element.style["-o-transform"] = property + "(" + value + ")";
        element.style["transform"] = property + "(" + value + ")";
    }

    //based on http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
    function parseDate(events) {
        var dateArrays = [];
        events.each(function () {
            var dateComp = $(this).data('date').split('/'),
                newDate = new Date(dateComp[2], dateComp[1] - 1, dateComp[0]);
            dateArrays.push(newDate);
        });
        return dateArrays;
    }

    function parseDate2(events) {
        var dateArrays = [];
        events.each(function () {
            var singleDate = $(this),
                dateComp = singleDate.data('date').split('T');
            if (dateComp.length > 1) { //both DD/MM/YEAR and time are provided
                var dayComp = dateComp[0].split('/'),
                    timeComp = dateComp[1].split(':');
            } else if (dateComp[0].indexOf(':') >= 0) { //only time is provide
                var dayComp = ["2000", "0", "0"],
                    timeComp = dateComp[0].split(':');
            } else { //only DD/MM/YEAR
                var dayComp = dateComp[0].split('/'),
                    timeComp = ["0", "0"];
            }
            var newDate = new Date(dayComp[2], dayComp[1] - 1, dayComp[0], timeComp[0], timeComp[1]);
            dateArrays.push(newDate);
        });
        return dateArrays;
    }

    function daydiff(first, second) {
        return Math.round((second - first));
    }

    function minLapse(dates) {
        //determine the minimum distance among events
        var dateDistances = [];
        for (i = 1; i < dates.length; i++) {
            var distance = daydiff(dates[i - 1], dates[i]);
            dateDistances.push(distance);
        }
        return Math.min.apply(null, dateDistances);
    }
});
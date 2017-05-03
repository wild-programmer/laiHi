/*
 * @Author: Administrator
 * @Date:   2016-11-17 09:02:00
 * @Last Modified by:   wlt05
 * @Last Modified time: 2017-04-28 00:24:25
 */

'use strict';


var course = document.querySelector('.course');
var course_wrap = course.querySelector('.course_wrap');
var course_list = course_wrap.querySelectorAll('li');
var screenWidth = document.documentElement.clientWidth;
var tag = 0;
//  获取LI的高度赋值给ul 
// course_wrap.style.height = course_list[0].offsetHeight +'px';
var points_wrap = course.querySelector('.points_wrap');
// 自动生成小圆点
// 根据多少个li自动生成多少个小圆点，追加到points_wrap里面
for (var i = 0; i < course_list.length; i++) {
    var li = document.createElement('li');
    if (i == 0) {
        li.classList.add('active');
    }
    points_wrap.appendChild(li);
}
// 初始化
var left, right, center;
center = 0;
right = 1;
left = course_list.length - 1;
// 最开始的三张图片先就位
course_list[center].style.webkitTransform = 'translateX(0px)';
course_list[left].style.webkitTransform = 'translateX(' + -screenWidth + 'px)';
course_list[right].style.webkitTransform = 'translateX(' + screenWidth + 'px)';
window.addEventListener('resize', function() {
    screenWidth = document.documentElement.clientWidth;
    //  获取LI的高度赋值给ul 
    // course_wrap.style.height = course_list[0].offsetHeight +'px';
})
var carourTimer = setInterval(function() {
    // 看到下一张的逻辑
    nextShow();
}, 1000);
// 滑动设置图片的位置
// 主要思路：
/*
	（1）或者手指的滑动距离
	（2）直接让获得的距离和默认的位置相加
	（3）在滑动结束后去判断有没有滑动成功，如果滑动成功则看到下一张或者上一张，没有成功，返回当前原点
 */
course.addEventListener('touchstart', touchstartHandler);
course.addEventListener('touchmove', touchmoveHandler);
course.addEventListener('touchend', touchendHandler);
var startX = 0,
    startTime, dx = 0;

function touchstartHandler(e) {
    tag++;
    if (tag == 1) {
        // 获取手指的X坐标
        startX = e.touches[0].pageX;
        // 获取手指滑动开始的时间
        startTime = new Date();
        //　停止定时器
        clearInterval(carourTimer);
        // 清除过渡
        setTransition(false, false, false);
    }

};

function touchmoveHandler(e) {
    // 获取滑动的距离
    if (tag == 1) {
        dx = e.touches[0].pageX - startX;

        // 重置去设置li的位置
        setTranslateX(dx);
    }

};

function touchendHandler(e) {
    if (tag == 1) {
        tag--;
        var t = new Date() - startTime;
        // 在结束的时候重新获取滑动的距离
        var dx = e.changedTouches[0].pageX - startX
            // 当dx为一个大于屏幕1/3的值的时候或者滑动的时间小于500毫秒滑动的区间大于30像素，则判定滑动成功，需要看到上一张 
            // 当dx为一个小于-屏幕1/3的值的时候或者滑动的时间小于500毫秒滑动的区间大于30像素，则判定滑动成功，需要看到下一张
        if (dx < -(screenWidth / 3) || (t < 500 && dx < -30)) {
            nextShow();
            carourTimer = setInterval(function() {
                // 看到下一张的逻辑
                nextShow();
            }, 1000);
            // nextShow();
        } else if (dx > screenWidth / 3 || (t < 500 && dx > 30)) {
            prevShow();
            carourTimer = setInterval(function() {
                // 看到下一张的逻辑
                prevShow();
            }, 1000);
            // prevShow();
        } else {
            // 添加过渡
            setTransition(true, true, true);
            // 回归原位
            setTranslateX();
        }
    }
};
// 封装下一张的逻辑
function nextShow() {
    // 轮转
    left = center;
    center = right;
    right++;

    // 极值判断
    if (right > course_list.length - 1) {
        right = 0;
    }
    // 添加过渡
    // 因为right是替补的图片，所以不需要添加过渡
    setTransition(true, true, false);
    // 真正的轮转
    setTranslateX();
    // 设置小圆点
    setPoints();
}
// 封装上一张的逻辑
function prevShow() {
    // 轮转
    right = center;
    center = left;
    left--;
    // 极值判断
    if (left < 0) {
        left = course_list.length - 1;
    }
    // 添加过渡
    // 因为left是替补的图片，所以不需要添加过渡
    setTransition(false, true, true);
    // 真正的轮转
    setTranslateX();
    // 设置小圆点
    setPoints();
}
// 获取小圆点，注意：小圆点的获取一定是在创建的后面
var points = points_wrap.querySelectorAll('li');

function setPoints() {
    for (var i = 0; i < course_list.length; i++) {
        points[i].classList.remove('active');
    }
    points[center].classList.add('active');
}
// 封装过渡的设置
function setTransition(a, b, c) {
    if (a) {
        course_list[left].classList.add('transitionAll');
    } else {
        course_list[left].classList.remove('transitionAll');
    }
    if (b) {
        course_list[center].classList.add('transitionAll');
    } else {
        course_list[center].classList.remove('transitionAll');
    }
    if (c) {
        course_list[right].classList.add('transitionAll');
    } else {
        course_list[right].classList.remove('transitionAll');
    }
}
// 封装移动
function setTranslateX(dx) {
    dx = dx || 0;
    course_list[center].style.webkitTransform = 'translateX(' + (0 + dx) + 'px)';
    course_list[left].style.webkitTransform = 'translateX(' + (-screenWidth + dx) + 'px)';
    course_list[right].style.webkitTransform = 'translateX(' + (screenWidth + dx) + 'px)';
}

// 地址
var siteshow = document.querySelector('.siteshow');
var bodyl = document.querySelector('.bodyl');
var site = document.querySelector('.site');
var cityHtml = document.querySelector('.cityHtml');
var cityselect = document.querySelectorAll('.cityselect');
cityselect[0].innerText = cityselect[1].innerText;
cityHtml.innerText = cityselect[1].innerText;
var showp = document.querySelector('.cityshow').querySelectorAll('p');
for (var i = 0; i < showp.length; i++) {
    var p = showp[i];
    (function(p) {
        p.addEventListener('touchstart', function() {
            cityHtml.innerText = this.innerText;
            cityselect[0].innerText = this.innerText;
            cityselect[1].innerText = this.innerText;
            bodyl.classList.add('transitionAll');
            site.classList.add('transitionAll');
            bodyl.style.webkitTransform = 'translateX(' + (0) + 'rem)';
            site.style.webkitTransform = 'translateX(' + (750 / 30) + 'rem)';
        });
    })(p)
}
siteshow.addEventListener('touchstart', function() {
    bodyl.classList.add('transitionAll');
    site.classList.add('transitionAll');
    bodyl.style.webkitTransform = 'translateX(' + (-750 / 30) + 'rem)';
    site.style.webkitTransform = 'translateX(' + (0) + 'rem)';
});

//  li.classList.add('active
// 调搜索框部分
var headec2 = document.querySelector('#sousuo2');
var headec1 = document.querySelector('#sousuo1');

var lick = function(el) {
    el.onblur = function() {
        this.classList.add('serch')
    }
    el.onfocus = function() {
        this.classList.remove('serch')
    }
}
lick(headec1);
lick(headec2);
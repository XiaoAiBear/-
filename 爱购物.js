var dw = document.querySelector("#dingwei");
var dwcs = document.querySelector(".dw");
dw.addEventListener("click", function () {
  console.log(dwcs.style.display);
  if (dwcs.style.display == "" || dwcs.style.display == "none") {
    dwcs.style.display = "block";
  } else {
    dwcs.style.display = "none";
  }
});

/* dw.addEventListener("mouseout", function() {
    dwcs.style.display = "none";
}); */
var lis = document.querySelectorAll(".dwcs > li");
for (var i = 0; i < lis.length; i++) {
  var li = lis[i];
  li.onclick = function () {
    /*  console.log(this.innerHTML); */
    dw.value = this.innerHTML;
    dwcs.style.display = "none";
  };
};

var ths = document.querySelectorAll(".dwth > th");
for(var i = 0; i < ths.length;i++){
    var th = ths[i];
    th.setAttribute("data-index", i);
    th.onclick = function() {
        for(var i = 0; i < ths.length;i++){
            ths[i].className = "";
        }
        this.className = "rmcs";

        var dwindex = this.getAttribute("data-index");

        var uls = document.querySelectorAll(".dwcs");
        for(var i = 0; i < uls.length;i++){
            uls[i].style.display = "none"
        }
        uls[dwindex].style.display = "block";
    }
}

/* 轮播图 */
document.addEventListener("DOMContentLoaded", function() {
	var ul = document.querySelector(".banner"); //获取ul
    var bannerContainer = document.querySelector("aside > .div2"); //取banner容器
    var imgW = window.screen.availWidth; //获取图片宽度
	/* console.log(imgW); */
	//var img = document.querySelectorAll("aside > .div2 .banner li a img");
		/* img.style.width = imgW + "px"; */
	/* 设置图片宽 */
	var lis = ul.children; //获取ul里的所有li
	for(var i = 0; i < lis.length;i++){
		var li = lis[i];
		var img = li.children[0].children[0];
		img.style.width = imgW + "px";
	}

	 //动态生成小圆点
    var ol = document.querySelector(".cycle");
    for (var i = 0; i < lis.length; i++) {
        var li = document.createElement("li");
        li.setAttribute("data-index", i);
        ol.appendChild(li);
        li.addEventListener("click", function() {
            //排它思想
            var olLis = ol.children;
            for (var i = 0; i < olLis.length; i++) {
                olLis[i].className = "";
            }
            this.className = "current";

            //点击小圆点，移动图片
            var idx = parseInt(this.getAttribute("data-index"));
            animate(ul, -idx * imgW, function() {
                //...
            });
        });
		
    }
    ol.children[0].className = "current"; //默认选择第一个

    //克隆第一个小li，作为最后一页，实现无缝滚动
    var lastLi = ul.children[0].cloneNode(true); //深拷贝
    ul.appendChild(lastLi);
    ul.style.width = ul.children.length * imgW + "px"; //不要忘了px

    var flag = true; //开关（节流阀）

	//动态选中小圆点
    function selectCycle(index) {
        var olLis = ol.children;
        for (var i = 0; i < olLis.length; i++) {
            var li = olLis[i];
            var idx = li.getAttribute("data-index");
            if (idx == index) {
                li.className = "current";
            } else {
                li.className = "";
            }
        }
    }

	//轮播图片
    function lunbo() {
        if (flag) {
            flag = false; //关闭开关
            var idx = currentIndex() + 1; //下一页
            animate(ul, -idx * imgW, function() {
                var newIndex = currentIndex(); //重新获取索引
                if (newIndex == ul.children.length - 1) { //最后一张
                    ul.style.left = "0";
                    newIndex = 0; //索引重置为0
                }
                selectCycle(newIndex); //动态选中小圆点
                flag = true; //开启开关
            });
        }
    }

    //启动 或 停止自动播放
    var timerId = null;
    autoPlay(true);

    function autoPlay(auto) {
        if (timerId != null) {
            clearInterval(timerId);
            timerId = null;
        }

        if (auto) {
            timerId = setInterval(lunbo, 3000);
        }
    }

    //获取当前索引
    function currentIndex() {
        var index = parseInt(Math.abs(ul.offsetLeft / imgW));
        return index;
    }


	//缓动动画添加回调函数
    function animate(element, max, callback) {
        if (element.timeId != null) {
            clearInterval(element.timeId);
        }

        element.timeId = setInterval(function() {
            //console.log(element.offsetLeft + ", " + max);
            if (element.offsetLeft == max) {
                clearInterval(element.timeId);
                if (callback != null) {
                    callback(); //执行回调函数
                }
                return;
            }
            var step = (max - element.offsetLeft) / 10; //核心算法
            step = step > 0 ? Math.ceil(step) : Math.floor(step); //取整优化
            element.style.left = (element.offsetLeft + step) + "px";
        }, 15);
    }



//广告文字从下往上滚动
    var ydwz = document.querySelector("aside > .div3 > .div3-1 > .ydhz1");
    function wzgg() {
        if (ydwz.offsetTop == -300) {
            ydwz.style.top = "0";
            return;
        }
        ydwz.style.top = (ydwz.offsetTop - 1) + "px";
    };
    var ydtimeId = setInterval(wzgg, 30);
	ydwz.onmouseover = function() {
        clearInterval(ydtimeId);
	};
	ydwz.onmouseout = function() {
        clearInterval(ydtimeId);
		ydtimeId = setInterval(wzgg, 30);
	}

});


//抢红包叉叉关闭

var qhbOFF = document.querySelector("footer > .div2 > .div2-1");
//console.log(qhbOFF);
qhbOFF.addEventListener("click", function() {
    var hb = document.querySelector("footer > .div2");
    hb.style.display = "none";
});


//活动倒计时
        var h = document.querySelector("section > .div1 > .div1-1 > .h");
        var m = document.querySelector("section > .div1 > .div1-1 > .m");
        var s = document.querySelector("section > .div1 > .div1-1 > .s");
        var endTime = "2023-11-17 23:30:00"; //指定秒杀结束时间
        var timeId = setInterval(miaosha, 1000);
        miaosha();

        function miaosha() {
            var curDate = new Date();
            var endDate = new Date(endTime);
            if (curDate <= endDate) {
                var secs = (endDate - curDate) / 1000; //得到总秒数
                var day = parseInt(secs / (24 * 60 * 60)); //天
                secs = secs - day * 24 * 60 * 60;
                var hour = parseInt(secs / (60 * 60)); //时
                hour = hour < 10 ? ("0" + hour) : hour;
                secs = secs - hour * 60 * 60;
                var min = parseInt(secs / 60); //分
                min = min < 10 ? ("0" + min) : min;
                var second = parseInt(secs - min * 60); //秒
                second = second < 10 ? ("0" + second) : second;
                //console.log("剩余" + day + "天" + hour + "小时" + min + "分" + second + "秒");
                h.innerHTML = hour;
                m.innerHTML = min;
                s.innerHTML = second;
                //console.log(day);
            } else {
                clearInterval(timeId);
            }
        }

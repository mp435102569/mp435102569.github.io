window.onload = function () {
  console.log("0000");

  //购物车下拉框
  var shopcart = document.querySelector(".shopcart");
  var message = document.querySelector(".message");

  shopcart.addEventListener("mouseenter", function () {
    animate(message, 0, 1);
    message.style.boxShadow = "0 2px 5px 2px rgba(142, 144, 142, 0.3)";
  });
  shopcart.addEventListener("mouseleave", function () {
    animate(message, -100, 1);
    message.style.boxShadow = "none";
  });

  app.onmouseenter = function () {
    console.log("1111");
  };
  app.onmouseleave = function () {
    console.log("2222");
  };

  //头部下拉框开始
  var nav = document.querySelector(".nav");
  var lis = nav.querySelectorAll("li");

  var navlist = document.querySelector(".navlist");
  var lis2 = navlist.querySelectorAll("li");

  var dropdown = document.querySelector(".dropdown");
  var container = document.querySelector(".container");
  //鼠标进入ul导航栏出现下拉框
  nav.addEventListener("mouseenter", function () {
    container.style.display = "block";
    container.style.zIndex = "2";
    animate(dropdown, 0, 10);
    dropdown.style.boxShadow = "0 3px 8px 2px rgba(142, 144, 142, 0.3)";
    dropdown.style.border = " 2px solid #e0e0e0";
    dropdown.style.backgroundColor = "#fff";
  });
  //鼠标离开
  nav.addEventListener("mouseleave", function () {
    animate(dropdown, -230, 10, function () {
      container.style.zIndex = "-1";
    });
    dropdown.style.boxShadow = "none";
    dropdown.style.border = "none";
    dropdown.style.backgroundColor = "none";
  });

  for (let k = 0; k < lis2.length; k++) {
    lis2[k].setAttribute("index", k);
  }
  for (let i = 0; i < lis.length; i++) {
    lis[i].addEventListener("mouseenter", function () {
      var index = lis2[i].getAttribute("index");
      if (index == i) {
        // console.log('true');
        for (let j = 0; j < lis2.length; j++) {
          lis2[j].style.display = "none";
        }
        lis2[i].style.display = "block";
      }
    });
  }

  var asideTitle = document.querySelector(".asideTitle");
  var titles = asideTitle.querySelectorAll("li");
  var togglearea = document.querySelector(".togglearea");
  var toggleitems = togglearea.querySelectorAll(".toggleitem");

  for (let i = 0; i < toggleitems.length; i++) {
    titles[i].setAttribute("titleindex", i);
    toggleitems[i].setAttribute("itemindex", i);

    toggleitems[i].addEventListener("mouseenter", function () {
      var titleitemindex = titles[i].getAttribute("titleindex");
      if (titleitemindex == i) {
        this.style.display = "block";
        titles[i].style.backgroundColor = "#FF6A00";
      }
    });
    toggleitems[i].addEventListener("mouseleave", function () {
      var titleitemindex = titles[i].getAttribute("titleindex");
      if (titleitemindex == i) {
        this.style.display = "none";
        titles[i].style.backgroundColor = "";
      }
    });
  }

  for (let i = 0; i < titles.length; i++) {
    titles[i].addEventListener("mouseenter", function () {
      this.style.backgroundColor = "#FF6A00";
      var toggleitemindex = toggleitems[i].getAttribute("itemindex");
      if (toggleitemindex == i) {
        for (let i = 0; i < toggleitems.length; i++) {
          toggleitems[i].style.display = "none";
        }
        toggleitems[i].style.display = "block";
      }
    });
    titles[i].addEventListener("mouseleave", function (event) {
      this.style.backgroundColor = "";
      var toggleitemindex = toggleitems[i].getAttribute("itemindex");
      // console.log(event);
      if (event.layerX < 0 || event.layerY < 0 || event.layerY >= 42) {
        if (toggleitemindex == i) {
          toggleitems[i].style.display = "none";
        }
      }
    });
  }
  //banner侧边栏结束

  //轮播图功能开始
  var swiperarea = document.querySelector(".swiperarea");
  var banner = document.querySelector(".banner");

  var lbutton = document.querySelector(".lbutton");
  var rbutton = document.querySelector(".rbutton");
  var num = 0;
  var circle = 0;
  var flag = true;

  //首先动态创建小圆点
  var swiperpoint = document.querySelector(".swiperpoint");
  var width = swiperarea.children[0].offsetWidth;

  for (let i = 0; i < swiperarea.children.length; i++) {
    var li = document.createElement("li");
    li.setAttribute("index", i);
    swiperpoint.appendChild(li);

    li.addEventListener("click", function () {
      if (flag) {
        flag = false;
        for (let i = 0; i < swiperpoint.children.length; i++) {
          swiperpoint.children[i].className = "";
        }
        this.className = "current";

        var index = this.getAttribute("index");
        num = index;
        circle = index;
        swiperanimate(swiperarea, -index * width, function () {
          flag = true;
        });
      }
    });
  }
  var li = swiperarea.children[0].cloneNode(true);
  swiperarea.appendChild(li);

  //给第一个小圆点添加一个类名
  swiperpoint.children[0].className = "current";

//   实现点击右边的按钮切换图片的 功能

  rbutton.addEventListener("click", function () {
    if (flag) {
      flag = false;
      if (num == swiperarea.children.length - 1) {
        num = 0;
        swiperarea.style.left = 0;
      }
      num++;
      swiperanimate(swiperarea, -num * width, function () {
        flag = true;
      });
      circle++;

      if (circle == swiperpoint.children.length) {
        circle = 0;
      }
      for (var i = 0; i < swiperpoint.children.length; i++) {
        swiperpoint.children[i].className = "";
      }
      swiperpoint.children[circle].className = "current";
    }
  });

  lbutton.addEventListener("click", function () {
    if (flag) {
      flag = false;
      if (num == 0) {
        num = swiperarea.children.length - 1;
        swiperarea.style.left = -num * width + "px";
      }
      num--;
      swiperanimate(swiperarea, -num * width, function () {
        flag = true;
      });

      circle--;
      if (circle < 0) {
        circle = swiperpoint.children.length - 1;
      }
      for (var i = 0; i < swiperpoint.children.length; i++) {
        swiperpoint.children[i].className = "";
      }
      swiperpoint.children[circle].className = "current";
    }
  });

  //轮播图自动播放功能
  var swipertimer = setInterval(() => {
    rbutton.click();
  }, 5000);
  //鼠标进入暂停,鼠标离开再自动播放
  banner.addEventListener("mouseenter", function () {
    clearInterval(swipertimer);
    swipertimer = null;
  });
  banner.addEventListener("mouseleave", function () {
    swipertimer = setInterval(() => {
      rbutton.click();
    }, 5000);
  });
  //轮播图结束

  //floor的tab栏 热门 和其他等选项的切换

  //获取所有  类名相同 导航栏
  var floortopnavrights = document.querySelectorAll(".floortopnavright");
  for (let i = 0; i < floortopnavrights.length; i++) {
    if (floortopnavrights[i].children.length > 1) {
      let parent = floortopnavrights[i].parentNode;
      let brother = parent.nextElementSibling;
      let floortopitemright = brother.children[1];

      //绑定自定义索引值
      for (let i = 0; i < floortopitemright.children.length; i++) {
        floortopitemright.children[i].setAttribute("index", i);
      }

      //绑定导航栏切换事件
      let floortopnavrightitems = floortopnavrights[i].querySelectorAll("span");
      for (let i = 0; i < floortopnavrightitems.length; i++) {
        floortopnavrightitems[i].addEventListener("mouseenter", function () {
          for (let i = 0; i < floortopnavrightitems.length; i++) {
            floortopnavrightitems[i].style.color = "#424242";
            floortopnavrightitems[i].style.borderBottom = "none";
          }
          this.style.color = "#FF6A00";
          this.style.borderBottom = "2px solid #FF6A00";
          if (floortopitemright.children[i].getAttribute("index") == i) {
            for (let i = 0; i < floortopitemright.children.length; i++) {
              floortopitemright.children[i].style.display = "none";
            }
            floortopitemright.children[i].style.display = "block";
          }
        });
      }
    }
  }

  //侧边栏的效果

  var asidenavbarlist = document.querySelector(".asidenavbarlist");
  var asidenavbarlistitems = asidenavbarlist.querySelectorAll("li");
  var l = asidenavbarlistitems.length;
  document.addEventListener("scroll", function () {
    if (window.pageYOffset >= 1120) {
      asidenavbarlistitems[l - 1].style.display = "block";
    } else {
      asidenavbarlistitems[l - 1].style.display = "none";
    }
  });

  //侧边栏手机APP鼠标进入效果
  var erweimatoggle = document.querySelector(".erweimatoggle");
  var erweima = document.querySelector(".erweima");

  erweimatoggle.addEventListener("mouseenter", function () {
    clearTimeout(timererweima2);
    timererweima2 = null;

    if (asidenavbarlistitems[l - 1].style.display == "block") {
      erweima.style.display = "block";
      erweima.style.top = "315px";
    } else {
      erweima.style.display = "block";
      erweima.style.top = "425px";
    }
  });
  var timererweima;
  var timererweima2;
  erweimatoggle.addEventListener("mouseleave", function () {
    timererweima = setTimeout(() => {
      erweima.style.display = "none";
    }, 150);
  });
  erweima.addEventListener("mouseenter", function () {
    clearTimeout(timererweima);
    timererweima = null;
    this.style.display = "block";
  });
  erweima.addEventListener("mouseleave", function () {
    timererweima2 = setTimeout(() => {
      erweima.style.display = "none";
    }, 150);
  });

  //最下面小图片切换功能 两个li切换显示
  var toggleimg1 = document.querySelector(".toggleimg1");
  var toggleimg2 = document.querySelector(".toggleimg2");
  toggleimg1.style.display = "block";
  toggleimg2.style.display = "none";
  var toggleflag = true;
  setInterval(() => {
    if (toggleflag) {
      toggleimg1.style.display = "block";
      toggleimg2.style.display = "none";
      toggleflag = false;
    } else {
      toggleimg1.style.display = "none";
      toggleimg2.style.display = "block";
      toggleflag = true;
    }
  }, 3000);
};

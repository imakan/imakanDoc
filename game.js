(function (win, doc) {
  var getWidth = doc.documentElement.clientWidth;
  var getHeight = doc.documentElement.clientHeight;
  var main = doc.querySelector(".main");
  var koi_index = doc.querySelector(".koi_index");
  var begin_btn = doc.querySelector(".begin");
  var time = doc.querySelector(".time");
  var list = doc.querySelector(".list");
  var time_number = doc.querySelector(".time_number");
  var koi_endpage = doc.querySelector(".koi_endpage.koi_share");
  var user_score = doc.querySelectorAll(".user_score span");
  var enemy_speed = 80;
  var try_again = doc.querySelector(".try_again");
  var back = doc.querySelector(".back");
  var koi_window = doc.querySelector(".koi_window");
  var loading_win = doc.querySelector(".loading_win");
  var game_puse = doc.querySelector(".game_puse");
  var goon = doc.querySelector(".goon");
  var agains = doc.querySelector(".agains");
  var koi_music = doc.querySelectorAll(".koi_music");
  var list2 = doc.querySelector(".list2");
  var share_ul = doc.querySelectorAll(".length_ul");
  var tab_btn = doc.querySelectorAll(".koi_list_tab a");
  var koi_share_box = doc.querySelectorAll(".koi_share_box");
  var share_btn = doc.querySelector(".share_btn");
  var koi_langImg = doc.querySelector(".koi_langImg.koi_share");
  var music_btn = doc.querySelector("#music");
  var game_tips = doc.querySelector(".game_tips");
  var remove_goi1, remove_goi2;
  var user_score_dom = doc.querySelectorAll(".user_score");
  var user_time_dom = doc.querySelectorAll(".user_time");
  var superior_num_dom = doc.querySelector(".superior_num");
  var ul_superior_info_dom = doc.querySelector(".ul_superior_info");
  var canvas = doc.querySelector("#canvas");
  var context = canvas.getContext("2d");
  canvas.width = getWidth;
  canvas.height = getHeight;
  var cur_uid = main.getAttribute("uid");
  var cur_screen_name = main.getAttribute("screen_name");
  var cur_avatar_hd = main.getAttribute("avatar_hd");
  var browser = main.getAttribute("browser");
  var is_first = main.getAttribute("is_first");
  var cur_day = 0;
  var cur_hour = 0;
  var cur_token = "";
  var tmpl_rank_li = '<li class="{is_self}">' + "<span>{rank_num}.</span>" + '<div class="card_user_img"><a href="https://weibo.com/u/{uid}" target="_blank"><img src="{avatar_hd}" alt=""></a></div>' + "<h3>@{screen_name}</h3>" + "<p>{score}</p>" + "</li>";
  var tmpl_user_score = "<span>{score}</span><i>分</i>";
  var tmpl_user_time = "<em>{day}</em><em>{hour}</em>";
  var tmpl_superior_num = "<em>{superior_num}</em>位关注的博主";
  var gameData = {
    state: this.Start,
    Start: 0,
    Starting: 1,
    Running: 2,
    Paused: 3,
    GameOver: 4,
    heroLife: 1,
    score: 10,
    Cwidth: canvas.width,
    Cheight: canvas.height,
    SmallNum: 0,
    bigNum: 0,
    Speed: 40,
    isMusic: 1,
    loadingHeight: 0,
    scoreUp: 0
  };
  var bgImg = new Image();
  bgImg.src = "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/game_bg.png";
  var scorebg = new Image();
  scorebg.src = "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/score.png";
  var music_icon = new Image();
  music_icon.src = "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/music_close.png";
  var loadings = [];
  loadings[0] = new Image();
  loadings[0].src = "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/goi_2.png";
  loadings[1] = new Image();
  loadings[1].src = "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/goi_2.png";
  loadings[2] = new Image();
  loadings[2].src = "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/goi_2.png";
  loadings[3] = new Image();
  loadings[3].src = "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/goi_2.png";
  var heros = [];
  heros[0] = new Image();
  heros[0].src = "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/goi_1.png";
  heros[1] = new Image();
  heros[1].src = "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/goi_2.png";
  heros[2] = new Image();
  heros[2].src = "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/goi_3.png";
  heros[3] = new Image();
  heros[3].src = "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/goi_4.png";
  var bullet = [];
  bullet[0] = new Image();
  bullet[0].src = "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/bullet.png";
  var enemies1 = [];
  enemies1[0] = new Image();
  enemies1[0].src = "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/goi_small2.png";
  enemies1[1] = new Image();
  enemies1[1].src = "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/bang1.png";
  enemies1[2] = new Image();
  enemies1[2].src = "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/bang2.png";
  enemies1[3] = new Image();
  enemies1[3].src = "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/bang3.png";
  var enemies2 = [];
  enemies2[0] = new Image();
  enemies2[0].src = "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/goi_big1.png";
  enemies2[1] = new Image();
  enemies2[1].src = "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/bang1.png";
  enemies2[2] = new Image();
  enemies2[2].src = "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/bang2.png";
  enemies2[3] = new Image();
  enemies2[3].src = "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/bang3.png";
  var Gem = [];
  Gem[0] = new Image();
  Gem[0].src = "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/gemb.png";
  Gem[1] = new Image();
  Gem[1].src = "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/gemb.png";
  var Gemb = [];
  Gemb[0] = new Image();
  Gemb[0].src = "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/gema.png";
  Gemb[1] = new Image();
  Gemb[1].src = "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/gema.png";
  var BodyBg = {
    imgs: bgImg,
    width: 360,
    height: 2450
  };
  var LOADING = {
    imgs: loadings,
    width: 90,
    height: 159,
    sum: loadings.length,
    length: 3
  };
  var Myplan = {
    imgs: heros,
    width: 90,
    height: 159,
    sum: heros.length,
    length: 3
  };
  var Bullets = {
    imgs: bullet,
    width: 22,
    height: 21,
    sum: bullet.length
  };
  var Enemy1 = {
    imgs: enemies1,
    width: 100,
    height: 92,
    type: 0,
    sum: enemies1.length,
    length: 1,
    reviseH: 40,
    reviseW: -20,
    life: 1,
    score: 5
  };
  var Enemy2 = {
    imgs: enemies2,
    width: 100,
    height: 92,
    type: 1,
    sum: enemies2.length,
    length: 1,
    reviseH: 8,
    reviseW: 2,
    life: 3,
    score: 5
  };
  var Gem1 = {
    imgs: Gem,
    width: 45,
    height: 44,
    reviseH: 8,
    reviseW: 2,
    sum: Gem.length,
    life: 1
  };
  var Gem2 = {
    imgs: Gemb,
    width: 45,
    height: 44,
    reviseH: 8,
    reviseW: 2,
    sum: Gemb.length,
    life: 1
  };
  function Compant (config) {
    this.imgs = config.imgs;
    this.width = config.width;
    this.height = config.height;
    this.sum = config.sum;
    this.length = config.length;
    this.type = config.type;
    this.life = config.life;
    this.score = config.score;
    this.time = 0;
    this.index = 0;
    this.down = false;
    this.canDelete = false;
    this.x = 0;
    this.y = 0;
    this.paint = function () {
      context.drawImage(this.imgs[this.index], this.x, this.y, this.width, this.height)
    }
      ;
    this.step = function () { }
      ;
    this.bang = function () { }
  }
  function BgSky (config) {
    Compant.call(this, config);
    this.y1 = -this.height;
    this.y2 = 0;
    this.paint = function () {
      context.drawImage(this.imgs, 0, this.y1);
      context.drawImage(this.imgs, 0, this.y2)
    }
      ;
    this.step = function () {
      this.time++;
      if (this.time % 3 == 0) {
        this.y1++;
        this.y2++;
        this.y1 > this.height && (this.y1 = -this.height);
        this.y2 > this.height && (this.y2 = -this.height);
        this.time = 1
      }
    }
  }
  var sky = new BgSky(BodyBg);
  function Loading (config) {
    Compant.call(this, config);
    this.paint = function () {
      context.drawImage(this.imgs[this.index], gameData.Cwidth / 2 - this.width / 2, gameData.Cheight - gameData.loadingHeight, this.width, this.height)
    }
      ;
    this.step = function () {
      this.time++;
      if (this.time % 1 == 0) {
        gameData.loadingHeight++;
        if (gameData.loadingHeight == this.height) {
          gameData.state = gameData.Running;
          this.time = 0
        }
      }
    }
  }
  var loading = new Loading(LOADING);
  function Hero (config) {
    Compant.call(this, config);
    this.btTime = 0;
    this.x = (gameData.Cwidth - this.width) / 2;
    this.y = gameData.Cheight - this.height - 10;
    this.paint = function () {
      context.drawImage(this.imgs[this.index], this.x, this.y, this.width, this.height)
    }
      ;
    this.step = function () {
      this.time++;
      if (this.down) {
        if (this.time % 15 == 0) {
          this.index++;
          if (this.index >= this.sum) {
            if (gameData.heroLife > 0) {
              hero = new Hero(Myplan);
              this.down = false
            } else {
              gameData.state = gameData.GameOver
            }
            this.index = this.length
          }
        }
      } else {
        if (this.time % 15 == 0) {
          this.index++;
          this.index = this.index % this.length;
          this.time = 0
        }
      }
    }
      ;
    this.shoot = function () {
      this.btTime++;
      if (this.btTime % gameData.Speed == 0) {
        bullets[bullets.length] = new Bullet(Bullets);
        this.btTime = 0
      }
    }
    this.bang = function () {
      if (!this.down) {
        if (!window.switchs) {
          gameData.heroLife = 1
        } else {
          gameData.heroLife = 0
          this.index = this.length
          this.down = true;
        }
      }
    }
  }

  var hero = new Hero(Myplan);
  function Bullet (config) {
    Compant.call(this, config);
    this.x = hero.x + hero.width / 2 - this.width / 2;
    this.y = hero.y - this.height;
    this.paint = function () {
      context.drawImage(this.imgs[this.index], this.x, this.y, this.width, this.height)
    }
      ;
    this.step = function () {
      this.y -= 6
    }
      ;
    this.bang = function () {
      this.canDelete = true
    }
  }
  var bullets = [];
  function paintBullets () {
    for (var i = 0, length = bullets.length; i < length; i++) {
      bullets[i].paint();
      if (gameData.state == gameData.Running) {
        bullets[i].step()
      }
    }
  }
  function clearStep () {
    for (var i = bullets.length - 1; i >= 0; i--) {
      if (bullets[i].y <= -bullets[i].height || (bullets[i].canDelete)) {
        // bullets.splice(i, 1)
      }
    }
  }
  function Enemy (config) {
    Compant.call(this, config);
    this.reviseH = config.reviseH;
    this.reviseW = config.reviseW;
    this.x = Math.floor(Math.random() * (gameData.Cwidth - this.width));
    this.y = -this.height;
    this.paint = function () {
      context.drawImage(this.imgs[this.index], this.x, this.y, this.width, this.height)
    }
      ;
    this.step = function () {
      if (this.down) {
        this.time++;
        if (this.time % 15 == 0) {
          this.index++
        }
        if (this.index >= this.sum) {
          if (this.type == 0) {
            gameData.SmallNum++;
            if (gameData.SmallNum == 6) {
              gems = new Gems(Gem1)
            }
          } else {
            gameData.bigNum++;
            if (gameData.bigNum == 3) {
              gemspeed = new Gemsb(Gem2)
            }
          }
          gameData.score += this.score;
          this.canDelete = true
        }
      } else {
        this.time++;
        switch (this.type) {
          case 0:
            this.y++;
            break;
          case 1:
            this.time % 2 == 0 && this.y++;
            break
        }
      }
    }
      ;
    this.hit = function (bh) {
      return (bh.x + bh.width > this.x - this.reviseW) && (bh.y < this.y + this.height - this.reviseH) && (bh.x < this.x + this.width + this.reviseW) && (bh.y + bh.height > this.y + this.reviseH)
    }
      ;
    this.bang = function () {
      if (!this.down && !this.canDelete) {
        this.life--;
        if (this.life <= 0) {
          this.down = true;
          this.index = this.length
        }
      }
    }
  }
  var enemies = [];
  function createEnemies () {
    var num = Math.floor(Math.random() * 100);
    if (num < 80) {
      enemies[enemies.length] = new Enemy(Enemy1)
    } else {
      if (num < 90) {
        enemies[enemies.length] = new Enemy(Enemy2)
      }
    }
  }
  var gems;
  function Gems (config) {
    Compant.call(this, config);
    this.reviseH = config.reviseH;
    this.reviseW = config.reviseW;
    this.x = Math.floor(Math.random() * (gameData.Cwidth - this.width - 30) + 30);
    this.y = Math.floor(Math.random() * (gameData.Cheight - this.height - 80) + 80);
    this.paint = function () {
      context.drawImage(this.imgs[this.index], this.x, this.y, this.width, this.height)
    }
      ;
    this.hit = function (bh) {
      return (bh.x + bh.width > this.x - this.reviseW) && (bh.y < this.y + this.height - this.reviseH) && (bh.x < this.x + this.width + this.reviseW) && (bh.y + bh.height > this.y + this.reviseH)
    }
      ;
    this.bang = function () {
      gameData.SmallNum = 0;
      gameData.score = gameData.score + 10;
      this.canDelete = true
    }
  }
  var gemspeed;
  function Gemsb (config) {
    Compant.call(this, config);
    this.reviseH = config.reviseH;
    this.reviseW = config.reviseW;
    this.x = Math.floor(Math.random() * (gameData.Cwidth - this.width - 30) + 30);
    this.y = Math.floor(Math.random() * (gameData.Cheight - this.height - 80) + 80);
    this.paint = function () {
      context.drawImage(this.imgs[this.index], this.x, this.y, this.width, this.height)
    }
      ;
    this.hit = function (bh) {
      return (bh.x + bh.width > this.x - this.reviseW) && (bh.y < this.y + this.height - this.reviseH) && (bh.x < this.x + this.width + this.reviseW) && (bh.y + bh.height > this.y + this.reviseH)
    }
      ;
    this.bang = function () {
      gameData.bigNum = 0;
      gameData.Speed = 10;
      // setTimeout(function() {
      //     gameData.Speed = 40
      // }, 5000);
      this.canDelete = true
    }
  }
  function paintEnemiesAndCheckHit () {
    for (var i = 0; i < enemies.length; i++) {
      var enemy = enemies[i];
      if ((enemy.y > gameData.Cheight) || (enemy.canDelete)) {
        enemies.splice(i, 1);
        continue
      }
      enemy.paint();
      if (gameData.state == gameData.Running) {
        enemy.step()
      }
      if (enemy && enemy.hit(hero)) {
        enemy.bang();
        hero.bang()
      }
      for (var j = 0; j < bullets.length; j++) {
        var bullet = bullets[j];
        if (enemy.hit(bullet)) {
          enemy.bang();
          bullet.bang()
        }
      }
    }
  }
  function painText () {
    context.font = "24px PingFang-SC-Regular";
    context.fillStyle = "#000";
    context.drawImage(scorebg, 20, 20, 167, 50);
    context.fillText(gameData.score, 110, 55)
  }
  function painScoreUp (upx, upy) {
    context.font = "24px PingFang-SC-Semibold";
    context.fillStyle = "#fff";
    context.fillText("+10", upx, upy)
  }
  function painMusic () {
    context.drawImage(music_icon, getWidth - 60, 25, 50, 51)
  }
  function gameover () {
    upload_score(gameData.score)
  }
  canvas.onclick = function (event) {
    var rect = canvas.getBoundingClientRect();
    var nowX = event.clientX - rect.left * (canvas.width / rect.width);
    var nowY = event.clientY - rect.top * (canvas.height / rect.height);
    if (nowX >= getWidth - 60 && nowX <= getWidth - 10 && nowY >= 25 && nowY <= 76) {
      if (gameData.isMusic == 0) {
        music_btn.pause();
        music_icon.src = "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/music_close.png";
        gameData.isMusic = 1
      } else {
        music_btn.play();
        music_icon.src = "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/koi_music.png";
        gameData.isMusic = 0
      }
    } else {
      if (nowX >= 20 && nowX <= 70 && nowY >= 20 && nowY <= 72) {
        gameData.state = gameData.Paused;
        game_puse.style.display = "block";
        window.SUDA && SUDA.uaTrack("wb_fishfight", "jinli_stop")
      }
    }
  }
    ;
  canvas.ontouchmove = function (e) {
    event.preventDefault();
    var x = e.touches[0].clientX;
    var y = e.touches[0].clientY;
    hero.x = x - hero.width / 2;
    hero.y = y - hero.height / 2;
    if (gameData.state == gameData.Paused) {
      gameData.state = gameData.Running
    }
  }

  window.mytimes = setInterval(function () {
    var x = getWidth - Math.random() * getWidth;
    var y = getHeight - 10;
    hero.x = x - hero.width / 2;
    hero.y = y - hero.height / 2;
    if (gameData.state == gameData.Paused) {
      gameData.state = gameData.Running
    }
  }, 100)
  function bridgeReady () {
    WeiboJSBridge.invoke("setSharingContent", {
      external: {
        icon: "http://img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/wechat.png",
        title: "#水逆退散#之战斗吧锦鲤",
        desc: "变身锦鲤去战斗吧少年，还有Switch游戏机、ipad等你来拿哦"
      },
      share_composer: "太幸运了吧！我参与了#水逆退散#大作战之\n" + "【战斗吧锦鲤】小游戏，快变身锦鲤跟我去战斗吧少年！抗水逆还有Switch游戏机、iPad拿~快去战斗吧少年->"
    });
    WeiboJSBridge.invoke("setBrowserGestureBackEnable", {
      "enable": 0
    }, function (params, success, code) { })
  }
  function ini_js_bridge () {
    if (window.WeiboJSBridge) {
      bridgeReady()
    } else {
      document.addEventListener("WeiboJSBridgeReady", function () {
        bridgeReady()
      })
    }
  }
  function format_string (str, formats) {
    var i, re;
    for (i in formats) {
      re = new RegExp("\\{" + i + "\\}", "gm");
      str = str.replace(re, formats[i])
    }
    return str
  }
  function render_rank_top_100 (show_data) {
    rank_top_100 = document.getElementById("rank_top_100");
    rank_top_100.innerHTML = "";
    var show_html = "";
    if (show_data.length == 0) {
      show_html = '<li class="no_data"> 暂时还没有好友参与哟~快邀请你的铁磁儿、发小、爱豆一起来玩吧! </li>'
    } else {
      show_data.forEach(function (item, index) {
        if (item.user_info != null) {
          show_html += format_string(tmpl_rank_li, {
            is_self: (cur_uid == item.uid) ? "li_cur" : "",
            rank_num: index + 1,
            uid: item.uid,
            avatar_hd: item.user_info.avatar_hd,
            screen_name: item.user_info.screen_name,
            score: item.score
          })
        }
      })
    }
    rank_top_100.innerHTML = show_html
  }
  function render_rank_personal (show_data, self_rank, self_score) {
    rank_personal = document.getElementById("rank_personal");
    rank_personal.innerHTML = "";
    var show_html = "";
    if (show_data.length == 0 && self_rank <= 0) {
      show_html = '<li class="no_data"> 暂时还没有好友参与哟~快邀请你的铁磁儿、发小、爱豆一起来玩吧! </li>'
    } else {
      show_data.forEach(function (item, index) {
        if (item.user_info != null) {
          show_html += format_string(tmpl_rank_li, {
            is_self: (cur_uid == item.uid) ? "li_cur" : "",
            rank_num: index + 1,
            uid: item.uid,
            avatar_hd: item.user_info.avatar_hd,
            screen_name: item.user_info.screen_name,
            score: item.score
          })
        }
      });
      if (self_rank > 0) {
        show_html += format_string(tmpl_rank_li, {
          is_self: (cur_uid == item.uid) ? "li_cur" : "",
          rank_num: self_rank,
          uid: item.uid,
          avatar_hd: cur_avatar_hd,
          screen_name: cur_screen_name,
          score: self_score
        })
      }
    }
    rank_personal.innerHTML = show_html
  }
  function render_game_result (show_data) {
    if (gameData.score >= 200 && gameData.score < 1000) {
      for (var b = 0; b < koi_share_box.length; b++) {
        koi_share_box[b].classList.add("koi_share_box2")
      }
    } else {
      if (gameData.score >= 1000) {
        for (var b = 0; b < koi_share_box.length; b++) {
          koi_share_box[b].classList.add("koi_share_box3")
        }
      } else {
        for (var b = 0; b < koi_share_box.length; b++) {
          koi_share_box[b].classList.add("koi_share_box1")
        }
      }
    }
    for (var b = 0; b < user_score_dom.length; b++) {
      user_score_dom[b].innerHTML = format_string(tmpl_user_score, {
        score: gameData.score
      })
    }
    cur_day = show_data.user_time.day;
    cur_hour = show_data.user_time.hour;
    for (var b = 0; b < user_time_dom.length; b++) {
      user_time_dom[b].innerHTML = format_string(tmpl_user_time, {
        day: cur_day,
        hour: cur_hour
      })
    }
    superior_num_dom.innerHTML = format_string(tmpl_superior_num, {
      superior_num: show_data.superior_num
    });
    if (show_data.superior_num == 0) {
      ul_superior_info_dom.innerHTML = format_string(tmpl_rank_li, {
        is_self: "li_cur",
        rank_num: show_data.self_rank,
        uid: cur_uid,
        avatar_hd: cur_avatar_hd,
        screen_name: cur_screen_name,
        score: gameData.score
      })
    } else {
      ul_superior_info_dom.innerHTML = format_string(tmpl_rank_li, {
        is_self: "",
        rank_num: show_data.self_rank + 1,
        uid: show_data.superior_user_info.user_info.uid,
        avatar_hd: show_data.superior_user_info.user_info.avatar_hd,
        screen_name: show_data.superior_user_info.user_info.screen_name,
        score: show_data.superior_user_info.score
      })
    }
    canvas.style.display = "none";
    koi_endpage.style.display = "block"
  }
  function share (msg, linkcards, imgInfo, scheme) {
    if (scheme == "mobile") {
      scheme = "sinaweibo://sendweibo"
    } else {
      scheme = "https://m.weibo.cn/compose"
    }
    var content = encodeURIComponent(msg || "");
    var urls = encodeURIComponent(JSON.stringify(linkcards));
    scheme += "?content=" + content + "&urls=" + urls;
    if (imgInfo) {
      scheme += "&pics=" + encodeURIComponent(JSON.stringify(imgInfo))
    }
    window.location.href = scheme
  }
  function get_rank () {
    var data = new FormData();
    $.ajax({
      url: "/game/fishfight/ajax/getrank",
      data: data,
      type: "POST",
      dataType: "json",
      cache: false,
      processData: false,
      contentType: false,
      beforeSend: function () {
        loading_win.style.display = "block"
      },
      success: function (res) {
        loading_win.style.display = "none";
        if (res.code == 100000) {
          render_rank_top_100(res.data.rank_top_100);
          render_rank_personal(res.data.rank_personal, res.data.self_rank, res.data.self_score);
          koi_window.style.display = "block"
        } else {
          alert("排行榜获取失败");
          window.location.href = "https://me.verified.weibo.com/game/fishfight/index" + "?time=" + ((new Date()).getTime())
        }
      }
    })
  }
  function upload_score (score) {
    var data = new FormData();
    data.append("score", score);
    data.append("game_token", cur_token);
    data.append("game_status", 2);
    $.ajax({
      url: "/game/fishfight/ajax/savescore",
      data: data,
      type: "POST",
      dataType: "json",
      cache: false,
      processData: false,
      contentType: false,
      beforeSend: function () {
        loading_win.style.display = "block"
      },
      success: function (res) {
        loading_win.style.display = "none";
        if (res.code == 100000) {
          render_game_result(res.data)
        } else {
          alert(res.msg);
          window.location.href = "https://me.verified.weibo.com/game/fishfight/index" + "?time=" + ((new Date()).getTime())
        }
      }
    })
  }
  function game_share () {
    koi_endpage.style.display = "none";
    koi_langImg.style.display = "block";
    var fish_name = "";
    if (gameData.score >= 200 && gameData.score < 1000) {
      fish_name = "勇敢锦鲤"
    } else {
      if (gameData.score >= 1000) {
        fish_name = "锦鲤之王"
      } else {
        fish_name = "幸运锦鲤"
      }
    }
    var day_hour = "";
    if (cur_day <= 0) {
      day_hour = cur_hour + "小时"
    } else {
      day_hour = cur_day + "天" + cur_hour + "小时"
    }
    var msg = "刚在#水逆退散#大作战之【战斗吧锦鲤】游戏" + "喜获" + day_hour + "水逆不侵和" + fish_name + "称号！" + "和@微博星座 共同打响水逆大战，" + "还有机会抱走Switch游戏机和iPad礼包[威武]去战斗吧少年" + "-> https://me.verified.weibo.com/game/fishfight/index";
    var shareContent = document.getElementById("share_div");
    var scale = 2;
    var opts = {
      scale: scale,
      useCORS: true,
      allowTaint: false
    };
    html2canvas(shareContent, opts).then(function (canvas_new) {
      var imageData = canvas_new.toDataURL("image/png", 1).replace(/^data:image\/(png|jpg);base64,/, "");
      var formData = new FormData();
      formData.append("pic", imageData);
      $.ajax({
        url: "/game/ajax/fileupload",
        type: "POST",
        data: formData,
        dataType: "json",
        cache: false,
        processData: false,
        contentType: false,
        beforeSend: function () {
          loading_win.style.display = "block"
        },
        success: function (res) {
          loading_win.style.display = "none";
          koi_endpage.style.display = "block";
          koi_langImg.style.display = "none";
          if (res.code === "100000") {
            share(msg, [], [{
              thumbnail: res.data.original_pic,
              original: res.data.original_pic,
              pid: res.data.pic_id
            }], browser)
          } else {
            alert("图片上传失败");
            window.location.href = "https://me.verified.weibo.com/game/fishfight/index" + "?time=" + ((new Date()).getTime())
          }
        }
      })
    })
  }
  function getImg (dom, img, bool) {
    var fd = new FormData();
    fd.append("img", img);
    $.ajax({
      url: "/game/ajax/imgtobase64",
      type: "POST",
      data: fd,
      dataType: "json",
      cache: false,
      processData: false,
      contentType: false,
      success: function (res) {
        if (bool) {
          dom.css("background-image", "url(" + res.data + ")")
        }
        dom.attr("src", res.data)
      }
    })
  }
  function ini_pic_base64 () {
    getImg($("#share_user_img"), $("#share_user_img").attr("src"), false)
  }
  function ini_suda () {
    var doc = document
      , wa = doc.createElement("script")
      , s = doc.getElementsByTagName("script")[0];
    wa.type = "text/javascript";
    wa.charset = "utf-8";
    wa.async = true;
    wa.src = "//tjs.sjs.sinajs.cn/open/analytics/js/suda.js";
    s.parentNode.insertBefore(wa, s)
  }
  function init () {
    ini_suda();
    ini_js_bridge();
    gameData.state = gameData.Start;
    gameData.score = 100;
    gameData.heroLife = 1;
    ini_pic_base64();
    gameExec()
  }
  var enemyTime = 0;
  function gameExec () {
    sky.paint();
    sky.step();
    enemyTime++;
    switch (gameData.state) {
      case gameData.Start:
        break;
      case gameData.Starting:
        loading.paint();
        loading.step();
        break;
      case gameData.Running:
        hero.paint();
        hero.step();
        hero.shoot();
        paintBullets();
        clearStep();
        enemy_speed = 50
        // if (gameData.score >= 0 && gameData.score < 50) {
        //     enemy_speed = 50
        // } else {
        //     if (gameData.score >= 50 && gameData.score < 100) {
        //         enemy_speed = 46
        //     } else {
        //         if (gameData.score >= 100 && gameData.score < 400) {
        //             enemy_speed = 44
        //         } else {
        //             if (gameData.score >= 400 && gameData.score < 900) {
        //                 enemy_speed = 40
        //             } else {
        //                 if (gameData.score >= 900 && gameData.score < 2500) {
        //                     enemy_speed = 38
        //                 } else {
        //                     if (gameData.score >= 2500 && gameData.score < 5000) {
        //                         enemy_speed = 34
        //                     } else {
        //                         if (gameData.score >= 5000 && gameData.score < 10000) {
        //                             enemy_speed = 30
        //                         } else {
        //                             if (gameData.score >= 10000 && gameData.score < 15000) {
        //                                 enemy_speed = 20
        //                             } else {
        //                                 if (gameData.score >= 15000) {
        //                                     enemy_speed = 6
        //                                 }
        //                             }
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
        if (enemyTime % enemy_speed == 0) {
          createEnemies()
        }
        paintEnemiesAndCheckHit();
        break;
      case gameData.Paused:
        hero.paint();
        paintBullets();
        paintEnemiesAndCheckHit();
        break;
      case gameData.GameOver:
        gameover();
        return;
        break
    }
    setTimeout(function () {
      gameExec();
      painText();
      painMusic();
      if (gameData.scoreUp == 1) {
        painScoreUp(gems.x, gems.y)
      }
      if (gameData.SmallNum >= 6 && gameData.SmallNum <= 15) {
        gems.paint();
        if (gems.hit(hero)) {
          gems.bang();
          gameData.scoreUp = 1;
          setTimeout(function () {
            gameData.scoreUp = 0
          }, 300)
        }
      } else {
        if (gameData.SmallNum > 15) {
          gameData.SmallNum = 0
        }
      }
      if (gameData.bigNum >= 3 && gameData.bigNum <= 5) {
        gemspeed.paint();
        if (gemspeed.hit(hero)) {
          gemspeed.bang()
        }
      } else {
        if (gameData.bigNum > 5) {
          gameData.bigNum = 0
        }
      }
    }, 10)
  }
  var page_load = function () {
    main.style.display = "none";
    var loadingBox = doc.querySelector(".loadingBox");
    var img = []
      , flag = 0
      , mulitImg = ["//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/background.png", "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/bang1.png", "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/bang2.png", "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/bang3.png", "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/bang4.png", "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/bullet.png", "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/game_bg.png", "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/gem1.png", "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/gem2.png", "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/gema.png", "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/gemb.png", "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/goi_1.png", "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/goi_2.png", "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/goi_3.png", "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/goi_4.png", "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/goi_big1.png", "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/goi_big2.png", "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/goi_big3.png", "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/goi_big4.png", "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/goi_small1.png", "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/goi_small2.png", "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/goi_small3.png", "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/goi_small4.png", "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/goi_index_tetBg.png", "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/index_bg.png", "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/koi_indexB.png", "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/koi_indexT.png", "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/koi_logo.png", "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/koi_music.png", "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/lang_imgB.png", "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/list_bg.png", "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/music_close.png"];
    var imgTotal = mulitImg.length;
    for (var i = 0; i < imgTotal; i++) {
      img[i] = new Image();
      img[i].src = mulitImg[i];
      img[i].onload = function () {
        flag++;
        if (flag == imgTotal) {
          setTimeout(function () {
            loadingBox.style.display = "none";
            main.style.display = "block"
          }, 1000)
        }
      }
    }
  };
  begin_btn.addEventListener("click", function () {
    if (browser != "mobile" || cur_uid == 0) {
      window.location.href = "https://m.weibo.cn/feature/applink?scheme=" + encodeURIComponent("sinaweibo://browser?url=" + encodeURIComponent("https://me.verified.weibo.com/game/fishfight/index"));
      return
    }
    var data = new FormData();
    data.append("game_status", 1);
    $.ajax({
      url: "/game/fishfight/ajax/savescore",
      data: data,
      type: "POST",
      dataType: "json",
      cache: false,
      processData: false,
      contentType: false,
      beforeSend: function () {
        loading_win.style.display = "block"
      },
      success: function (res) {
        loading_win.style.display = "none";
        if (res.code == 100000) {
          cur_token = res.data;
          time.style.display = "block";
          koi_index.style.display = "none";
          time_number.classList.add("time_go");
          setTimeout(function () {
            time.style.display = "none";
            canvas.style.display = "block";
            if (is_first) {
              game_tips.style.display = "block";
              setTimeout(function () {
                game_tips.style.display = "none";
                if (gameData.state == gameData.Start) {
                  gameData.state = gameData.Starting
                }
              }, 3000)
            } else {
              if (gameData.state == gameData.Start) {
                gameData.state = gameData.Starting
              }
            }
          }, 3000)
        } else {
          alert("游戏初始化失败");
          window.location.href = "https://me.verified.weibo.com/game/fishfight/index"
        }
      }
    })
  });
  list.addEventListener("click", function () {
    if (browser != "mobile" || cur_uid == 0) {
      window.location.href = "https://m.weibo.cn/feature/applink?scheme=" + encodeURIComponent("sinaweibo://browser?url=" + encodeURIComponent("https://me.verified.weibo.com/game/fishfight/index"));
      return
    }
    get_rank()
  });
  list2.addEventListener("click", function () {
    if (browser != "mobile" || cur_uid == 0) {
      window.location.href = "https://m.weibo.cn/feature/applink?scheme=" + encodeURIComponent("sinaweibo://browser?url=" + encodeURIComponent("https://me.verified.weibo.com/game/fishfight/index"));
      return
    }
    get_rank()
  });
  try_again.addEventListener("click", function () {
    window.location.href = "https://me.verified.weibo.com/game/fishfight/index" + "?time=" + ((new Date()).getTime())
  });
  agains.addEventListener("click", function () {
    window.location.href = "https://me.verified.weibo.com/game/fishfight/index" + "?time=" + ((new Date()).getTime())
  });
  back.addEventListener("click", function () {
    koi_window.style.display = "none"
  });
  goon.addEventListener("click", function () {
    game_puse.style.display = "none";
    gameData.state = gameData.Running
  });
  share_btn.addEventListener("click", function () {
    game_share()
  });
  for (var a = 0; a < koi_music.length; a++) {
    koi_music[a].index = a;
    koi_music[a].addEventListener("click", function () {
      if (koi_music[this.index].classList.contains("koi_music_close") == true) {
        gameData.isMusic = 0;
        music_btn.play();
        music_icon.src = "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/koi_music.png";
        koi_music[0].classList.remove("koi_music_close");
        koi_music[1].classList.remove("koi_music_close")
      } else {
        gameData.isMusic = 1;
        music_btn.pause();
        music_icon.src = "//img.t.sinajs.cn/static/appstyle/udc_game/carp_fight/images/music_close.png";
        koi_music[0].classList.add("koi_music_close");
        koi_music[1].classList.add("koi_music_close")
      }
    })
  }
  for (var x = 0; x < tab_btn.length; x++) {
    tab_btn[x].index = x;
    tab_btn[x].addEventListener("click", function () {
      for (var y = 0; y < share_ul.length; y++) {
        share_ul[y].classList.remove("ul_block");
        tab_btn[y].classList.remove("tab_cur")
      }
      share_ul[this.index].classList.add("ul_block");
      tab_btn[this.index].classList.add("tab_cur")
    })
  }
  page_load();
  init()
}
)(window, document);
<template>
  <div class="main">
    <div class="mainpage">
      <canvas id="canvas" width="100%" height="100%"></canvas>
      <div class="box" :class="{ on: isShow }">
        <h1>狼人杀</h1>
        <div class="IntroDiv ">
          <vue-typed-js
            :strings="[
            '一起来玩狼人杀',
            '谎言与推理碰撞',
            '真相与虚伪交织',
            '看谁能笑到最后'
          ]"
            :loop="true"
            :typeSpeed="100"
            :startDelay="100"
            :backSpeed="10"
            :backDelay="900"
            :showCursor="false"
          >
            <p class="typing"></p>
          </vue-typed-js>
        </div>
        <div class="footer">
          <van-button
            round
            color="linear-gradient(to right, #4bb0ff, #6149f6)"
            @click="login"
            class="button_left"
          >进入游戏</van-button>
          <van-button
            round
            color="linear-gradient(to right, #4bb0ff, #6149f6)"
            @click="showRule"
            class="button_right"
          >游戏规则</van-button>
        </div>
      </div>
    </div>
    <div v-show="isShow" class="rulepage">
      <h2>狼人杀游戏规则</h2>
      <div class="rule">
        <div>
          <h4>角色</h4>
          <p>预言家、猎人、女巫、村民、狼人</p>
        </div>
        <div>
          <h4>预言家</h4>
          <p>
            每天晚上可以询问上帝场上任意一张活人的身份牌的好坏，上帝会告诉他这个人是好人还是坏人(狼人)。
          </p>
        </div>
        <div>
          <h4>猎人</h4>
          <p>
            猎人在死后可以发动技能带走场上任何一个人(前提不是被女巫毒死的，其他的都可以发动技能)，猎人也可以不发动技能。
          </p>
        </div>
        <div>
          <h4>女巫</h4>
          <p>
            女巫有一瓶毒药和解药；女巫一天晚上可以用两瓶药，女巫用过解药过后就再也不知道今晚谁死了；
            晚上被女巫毒死的玩家白天没有遗言，被女巫毒死的猎人无法发动技能；
          </p>
        </div>
        <div>
          <h4>村民</h4>
          <p>没有任何功能的普通玩家。</p>
        </div>
        <div>
          <h4>狼人</h4>
          <p>
            晚上的时候身份牌为狼人的玩家可以选择刀一个人，但是要所有狼同伴都统一意见，
            如果意见不统一则上帝判定狼人没有刀人，当晚上帝在询问女巫的时候就会跟女巫说今晚没有人死亡。
          </p>
          <p>
            狼人有自爆的功能，狼人可以在游戏的任何阶段通知上帝自爆，(自爆就是跟所有人摊牌说自己是狼人，
            身份牌将会展示给所有人)，自爆后，游戏的任意阶段都会立刻中止并且直接进入天黑。
          </p>
        </div>
        <div>
          <h3>胜利条件</h3>
          <p>场上一共分为：神牌(好人)、平民（好人）、狼人（坏人）</p>
          <p>
            好人胜利条件：场上不存在任何一只狼人，并且保证场上既有神牌存在也有平民存在。
          </p>
          <p>
            狼人胜利条件：场上平民全死或者神全死，如果是在天黑阶段平民全死或者神全死，那么天亮后不管狼人是否还存活都判断狼人胜利。
          </p>
        </div>
      </div>
      <van-button
        round
        icon="arrow-left"
        type="primary"
        class="back"
        size="small"
        @click="back"
        >返回</van-button
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    login() {
      this.$router.push("/home"); //进入主页
    },
    showRule() {
      this.isShow = !this.isShow;
    },
    back() {
      this.isShow = !this.isShow;
    },
    canvas() {
      let _this = this;
      // 获取边框大小
      window.onresize = function() {
        _this.screenHeight = document.documentElement.clientHeight;
      };
      let canvas = document.getElementById("canvas");
      let ctx = canvas.getContext("2d");
      let w = (canvas.width = window.innerWidth);
      let h = (canvas.height = window.innerHeight);

      // 星星参数
      let angle = 217; // 颜色角度
      let stars = [];
      let count = 0;
      let maxStars = 1000;

      // 创建画布
      let canvas2 = document.createElement("canvas");
      let ctx2 = canvas2.getContext("2d");
      canvas2.width = 100;
      canvas2.height = 100;

      // 星星模型
      let half = canvas2.width / 2;
      let gradient2 = ctx2.createRadialGradient(
        half,
        half,
        0,
        half,
        half,
        half
      );
      gradient2.addColorStop(0.025, "#CCCCCC");
      gradient2.addColorStop(0.1, "hsl(" + angle + ", 61%, 33%)");
      gradient2.addColorStop(0.25, "hsl(" + angle + ", 64%, 6%)");
      gradient2.addColorStop(1, "transparent");

      ctx2.fillStyle = gradient2;
      ctx2.beginPath();
      ctx2.arc(half, half, half, 0, Math.PI * 2);
      ctx2.fill();

      // 返回区间内的随机数
      function random(min, max) {

        // 只有一个参数
        if (arguments.length < 2) {
          max = min;
          min = 0;
        }

        // 确保符合数据要求
        if (min > max) {
          let hold = max;
          max = min;
          min = hold;
        }

        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      // 轨道最大半径
      function maxOrbit(x, y) {
        let max = Math.max(x, y);
        let diameter = Math.round(Math.sqrt(max * max + max * max));
        return diameter / 2;
      }

      // 创建星星
      let Star = function() {
        // 随机半径
        this.orbitRadius = random(maxOrbit(w, h));
        this.radius = random(60, this.orbitRadius) / 8;
        // 画框中心基准
        this.orbitX = w / 2;
        this.orbitY = h / 2;
        // 星移时长
        this.timePassed = random(0, maxStars);
        // 星移速度
        this.speed = random(this.orbitRadius) / 500000;
        // 星星亮度
        this.alpha = random(2, 10) / 10;
        // 下一颗星星
        count++;
        stars[count] = this;
      };

      // 绘制星空
      Star.prototype.draw = function() {

        // 基准坐标
        let x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX;
        let y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY;

        // 星星明灭
        let twinkle = random(10);

        if (twinkle === 1 && this.alpha > 0) {
          this.alpha -= 0.05;
        } else if (twinkle === 2 && this.alpha < 1) {
          this.alpha += 0.05;
        }

        // 开始绘制
        ctx.globalAlpha = this.alpha;
        ctx.drawImage(
          canvas2,
          x - this.radius / 2,
          y - this.radius / 2,
          this.radius,
          this.radius
        );
        this.timePassed += this.speed;
      };

      // 创建星空
      for (let i = 0; i < maxStars; i++) {
        new Star();
      }

      function animation() {
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "hsla(" + angle + ", 64%, 6%, 2)";
        ctx.fillRect(0, 0, w, h);

        ctx.globalCompositeOperation = "lighter";
        for (let i = 1, l = stars.length; i < l; i++) {
          stars[i].draw();
        }

        window.requestAnimationFrame(animation);
      }

      animation();
    }
  },
  mounted() {
    this.canvas();
  }
};
</script>

<style scoped>
  html,
  body {
    margin: 0;
    padding: 0;
  }
  p {
    text-indent: 2em;
    text-align: left;
    padding-left: 10px;
    padding-right: 10px;
  }
  h4 {
    padding: 0;
    margin: 0;
  }
  span {
    font-size: 15px;
  }
  input {
    border: 1px solid black;
    border-radius: 8px;
    height: 30px;
    margin-left: 10px;
  }
  .main {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
  }
  .box {
    margin: 0;
    color: white;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
  }
  #canvas {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
  }
  .IntroDiv {
    top: 33%;
    height: 200px;
    left: 0;
    right: 0;
    position: absolute;
  }
  .typing {
    left: 0;
    right: 0;
    height: 200px;
    text-indent: 0;
    position: absolute;
    text-align: center;
    display: inline-block;
    font-family: "Berlin Sans FB Demi";
    line-height: 200px;
    font-size: 30px;
  }
  .footer {
    position: absolute;
    right: 0;
    left: 0;
    height: 36px;
    bottom: 15%;
    z-index: 5;
  }

  .button_left {
    width: 30%;
    min-width: 110px;
    height: 36px;
    cursor: pointer;
    position: absolute;
    bottom: 5%;
    left: 10%;
    font-family: "Berlin Sans FB Demi";
    font-size: 16px;
  }
  .button_right {
    width: 30%;
    min-width: 110px;
    height: 36px;
    cursor: pointer;
    position: absolute;
    bottom: 5%;
    right: 10%;
    font-family: "Berlin Sans FB Demi";
    font-size: 16px;
  }
  .rulepage {
    width: 100%;
    height: 100%;
    background: #030d1a;
    color: #fffaf0;
    position: absolute;
    top: 0;
    left: 0;
    overflow: auto;
  }
  .rule {
    width: 100%;
    position: absolute;
    left: 0;
  }
  .back {
    position: absolute;
    width: 80px;
    top: 10px;
    left: 5px;
    font-weight: bold;
  }
  .ruleIn > div {
    border: 1px solid rgb(0, 33, 66);
    margin-top: 3px;
    border-radius: 8px;
  }
</style>


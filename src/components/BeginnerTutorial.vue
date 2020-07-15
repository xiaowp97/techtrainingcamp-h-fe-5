<template>
  <div class="modal-backdrop">
    <div class="modal">
      <div class="modal-body">
<!--        <video src='../assets/tutorial.mp4' class="video" controls ref="video" v-if="showTutorial"></video>-->

      </div>
      <div class="modal-footer">
        <button type="button" class="btn-close" @click="closeSelf">关闭</button>
        <!--        <button type="button" class="btn-confirm" @click="confirm">确认</button>-->
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Tutorial",
    props: {
      showTutorial:Boolean
    },
    data() {
      return {}
    },
    methods: {
      closeSelf() {
        this.$emit("closeme");
      },
    }
  }
</script>

<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background-color: #fff;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    border-radius: 16px;
    width: 80%;
    height: 80%;
  }

  .modal-footer {
    border-top: 1px solid #eee;
    justify-content: flex-end;
    padding: 15px;
    display: flex;
    position: relative;
  }

  .modal-body {
    position: relative;
    width: 100%;
    height: 450px;
  }

  .video {
    width: 100%;
    height: 100%;
  }

  .btn-close {
    border-radius: 8px;
    margin-left: 16px;
    width: 56px;
    height: 36px;
    border: none;
    cursor: pointer;
    color: #313131;
    background: #87CEFA;
    margin-top: 20px;
  }

</style>

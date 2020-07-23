<template>
  <div class="main">
    <img src="../assets/people.png">
    <br/>
    <label>{{ person.userName }}</label>
  </div>
</template>

<script>
  export default {
    name: "APlayer.vue",
    props: {
      person: {
        type: Object
      }
    },
    methods: {
      isDeath() {
        if (this.person.roleStatus !== "存活") {
          return true;
        }
      }
    }
  }
</script>

<style scoped>
  img {
    height: 6vh;
    width: 6vh;
  }

  .on {
    background: #313131;
  }
</style>

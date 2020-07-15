<template>
  <div>
    <h3>房间号：{{room_id}}</h3>
    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @cancel="onCancel"/>
  </div>
</template>

<script>
  import { Toast } from 'vant';
  export default {
    data() {
      return {
        room_id:'0',
        show: false,
        actions: [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }],
      };
    },
    methods: {
      onCancel() {
        Toast('取消');
      },
    },
  }
</script>

<style scoped>

</style>

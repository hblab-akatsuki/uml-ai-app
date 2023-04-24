<template>
  <div id="app">
    <div class="box">
      <p><strong>Event Handler</strong></p>
      <!-- <div :class="{'active': toggleActive}" class="toggle_container">
        <Toggle v-model="chatMode" on-label="Chat" off-label="Editor" @change="switchMode"/>
      </div> -->
    </div>
  </div>
</template>

<script>
import Button from './Button.vue';
// import Toggle from '@vueform/toggle'

export default {
  name: 'App',

  components: {
    // Toggle,
    Button
  },

  // data() {
  //   return {
  //     toggleActive: false,
  //     chatMode: true
  //   }
  // },

  // methods: {
  //   triggerToggleEvent(value) {
  //     this.toggleActive = value;
  //   },
  // }
}
</script>
<style>

.box {
  text-align: center;
  margin-bottom: 30px;
  min-height: 300px;
}

</style>
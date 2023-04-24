<template>
  <div id="app" class="header">
    <img src="../static/logo.png">
    <div class="box">
      <div :class="{'active': toggleActive}" class="toggle_container">
        <Toggle v-model="chatMode" on-label="Chat" off-label="Editor" @change="switchMode"/>
      </div>
    </div>
  </div>
</template>

<script>
import Button from './Button.vue';
import Toggle from '@vueform/toggle/dist/toggle.vue2.js'

export default {
  name: 'Header',

  components: {
    Toggle,
    Button
  },

  data() {
    return {
      toggleActive: false,
      chatMode: true
    }
  },
  methods: {
    switchMode(e) {
      this.$emit('changeMode', e)
    }
  }
}
</script>
<style src="@vueform/toggle/themes/default.css"></style>
<style>
.header {
  display: flex;
  justify-content: space-between;
}
.header img {
  display: block;
  margin-top: 10px;
  margin-left: 20px;
  width: 150px;
  height: 50px;
}
.box {
  text-align: center;
}
.toggle {
  width: 70px;
  height: 30px;
  margin-right: 20px;
  margin-top: 20px;
}

.toggle .toggle-handle {
  width: 30px;
  height: 30px;
  border-radius: 100%;
}

.toggle_container.active {
  background: #e9ffef;
}
.toggle-container:focus {
  box-shadow: none;
}
</style>
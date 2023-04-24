<template>
  <div id="app" class="header">
    <img src="https://hblab.vn/wp-content/uploads/2020/05/xlogo-1.png.pagespeed.ic.cTE0lFw0V6.webp">
    <div class="box">
      <p><strong>Event Handler</strong></p>
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
}
.header img {
  display: block;
  -webkit-user-select: none;
  margin-bottom: 30px;
  background-color: hsl(0, 0%, 90%);
  transition: background-color 300ms;
  width: 200px;
  height: 70px;
}
.box {
  text-align: center;
  margin-bottom: 30px;
  min-height: 300px;
}
.toggle {
  width: 100px;
  height: 50px;
}

.toggle .toggle-handle {
  width: 50px;
  height: 50px;
  border-radius: 100%;
}

.toggle_container.active {
  background: #e9ffef;
}
</style>
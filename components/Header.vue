<template>
  <div id="app">
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
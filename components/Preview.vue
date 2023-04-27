<template>
  <div class="previewSvg">
    <div class="download-png">
      <button v-on:click="download" 
        class="download mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded">
        <i class="fal fa-download mr-1"></i>
        SVG
      </button>
    </div>
    <div ref="myElement" class="my-element" v-html="html"></div>
  </div>
</template>

<script>
import plantumlEncoder from "plantuml-encoder";

export default {
  props: {
    data: {
      required: false
    }
  },
  data() {
    return {
      html: '',
    }
  },
  mounted() {
    this.getSvgData(this.data)
    const element = this.$refs.myElement
    const instance = this.$panzoom(element, {
      minZoom: 0.5, 
      maxZoom: 1.25
    })
  },
  watch: {
    data: function (newQuestion, oldQuestion) {
      this.getSvgData(newQuestion)
    }
  },
  methods: {
    async getSvgData(text, type = 'svg') {
      const encode = this.encode(text)
      const url = `http://www.plantuml.com/plantuml/${type}/${encode}`;
      const response = await fetch(url)
      this.html = await response.text()
    },
    encode(text) {
      return plantumlEncoder.encode(text);
    },
    async download() {

    }
  }
}
</script>
<style>
.previewSvg {
  height: 100%;
}
.download-png {
  display: flex;
  justify-content: flex-end;
}
.download { 
  margin-right: 20px;
  margin-top: 10px;
}
</style>
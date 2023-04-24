<template>
  <div class="previewSvg">
    <!-- <panZoom :selector="g" v-html="html" style="text-align: -webkit-center" @panstart="onPanStart">
    </panZoom> -->
    <div ref="myElement" class="my-element">
      <!-- Your content here -->
    </div>
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
      // Panzoom options
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
  }
}
</script>
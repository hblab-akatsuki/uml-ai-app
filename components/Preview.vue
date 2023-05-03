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
import { saveAs } from 'file-saver';
import { useMessageStore } from "../store/message"

export default {
  data() {
    let codeStore = useMessageStore();
    return {
      html: '',
      codeUml: codeStore.code
    }
  },
  mounted() {
    this.getSvgData(this.codeUml)
    const element = this.$refs.myElement
    this.$panzoom(element, {
      minZoom: 0.5,
      maxZoom: 1.25
    })

    this.$nuxt.$on('select-room', (codeUml) => {
      this.getSvgData(codeUml);
    })
  },
  watch: {
    codeStore: {
      handler: function (val, oldVal) {
        this.getSvgData(val);
      },
      deep: true
    }
  },
  methods: {
    async getSvgData(text, type = 'svg') {
      const encode = this.encode(text || '');
      const url = `https://www.plantuml.com/plantuml/${type}/${encode}`;
      const response = await fetch(url)
      this.html = await response.text()
    },
    encode(text) {
      return plantumlEncoder.encode(text);
    },
    async download() {
      const svgString = document.querySelector('.previewSvg svg').outerHTML;
      const blob = new Blob([svgString], { type: 'image/svg+xml' });
      saveAs(blob, 'my-svg-file.svg');
    }
  },
  updated() {
    let codeStore = useMessageStore();

    this.getSvgData(codeStore.code)

    const element = this.$refs.myElement
    this.$panzoom(element, {
      minZoom: 0.5,
      maxZoom: 1.25
    })
  },
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

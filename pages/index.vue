<template>
  <div id="view-grid">
    <VarText class="tl" />
    <Sliders class="bl" />
    <QRCode class="tr" />
    <Stats class="br" />
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  methods: {
    setCss(){
      // this.$el.style.setProperty('font-variation-settings', '"wght" '+this.weight+', "wdth" '+this.width+', "slnt" '+this.slant)
    },
    updateText(text){
      console.log(text)
      if(text.key == "Backspace"){
        this.$store.dispatch("resetText")
      } else if (text.key == "Enter"){
        this.$store.dispatch("addCharText", "\n\r")
      }else if (text.key.length > 1){
        
      }
      else{
        this.$store.dispatch("addCharText", text.key)
      }
    }
  },
  computed: {
    weight(){
      return this.$store.getters.getFontWeight
    },
    width(){
      return this.$store.getters.getFontWidth
    },
    slant(){
      return this.$store.getters.getFontSlant
    }
  },
  watch: {
    weight: {
      handler(){
        this.$el.style.setProperty('--weight', ((this.weight*2)-1)*900)
        this.setCss()
      },
      // immediate: true
    },
    width: {
      handler(){
        this.$el.style.setProperty('--width', ((this.width*2)-1)*900)
        this.setCss()
      },
      // immediate: true
    },
    slant: {
      handler(){
        this.$el.style.setProperty('--slant', this.slant*900)
        this.setCss()
      },
      // immediate: true
    }
  },
  mounted(){
    console.log(this.$el.style)
    this.$el.style.setProperty('--weight', this.weight)
    this.$el.style.setProperty('--width', this.width)
    this.$el.style.setProperty('--slant', this.slant)

    window.addEventListener("keyup", this.updateText)
  },
  unmounted(){
    window.removeEventListener("keyup", this.updateText)
  }
};
</script>

<style lang="scss">
@font-face {
  font-family: tangibleFont;
  src: url(/tangibleFont_1.2.7VF.woff2);
}

#view-grid {
  // Variable Defs
  --smaller-width-height: min(1vw, 1vh);

  // normalize fit Viewport
  font-family: tangibleFont;
  display: grid;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;

  // Grid Setup
  grid-template-columns: [l] auto [c] calc(var(--smaller-width-height) * 25) [r];
  grid-template-rows: [t] auto [c] calc(var(--smaller-width-height) * 25) [b];
  grid-template-areas: "tl tr" "bl br";

  // Sections
  .tl {
    grid-area: tl;
    overflow: hidden;
  }
  .tr {
    grid-area: tr;
    background: lightgrey;
  }
  .bl {
    grid-area: bl;
    background: lightgrey;
  }
  .br {
    grid-area: br;
    background: grey;
  }
}
</style>

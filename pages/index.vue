<template>
  <div id="view-grid">
    <VarText class="tl" />
    <Stats class="bl" />
    <Description class="tr" />
    <QR class="br" />
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
  src: url(/tangibleFont_2.0VF.woff2);
}

#view-grid {
  // Variable Defs
  --smaller-width-height: min(1vw, 1vh);

  // normalize fit Viewport
  font-family: Helvetica, sans-serif;
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
  grid-template-columns: [l] auto [c] calc(var(--smaller-width-height) * 30) [r];
  grid-template-rows: [t] auto [c] calc(var(--smaller-width-height) * 30) [b];
  grid-template-areas: "tl tr" "bl br";

  // Sections
  .tl {
    font-family: tangibleFont;
    grid-area: tl;
    overflow: hidden;
    border-color: black;
    border-bottom: solid;
    border-right: solid;
    border-width: 2px;
  }
  .tr {
    grid-area: tr;
    border-bottom: solid;
    border-color: black;
    border-width: 2px;
    padding: 2em;
  }
  .bl {
    grid-area: bl;
    border-right: solid;
    border-color: black;
    border-width: 2px;
  }
  .br {
    grid-area: br;
  }
}

//specific style for components

.stats {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  overflow: hidden;
  overflow-wrap: break-word;
}

.slider {
  text-align:center;
}

p {
  margin-top: 1vw;
  font-weight: bold;
}

.value_label {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1em;
  color: black;
  font-weight: 400;
}

.range {
  width: 20vw;
  height: 2px;
  appearance: none;
  background: black;
  outline: black;
}

.range::-webkit-slider-thumb {
  appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border-width: 2px;
  background: white;
  border: 2px solid black;
  cursor: pointer;
}

.vartext {
  font-size: calc(4vw + 4vh + 2vmin); //10vw;
  font-variation-settings: "wght" var(--weight), "wdth" var(--width), "slnt" var(--slant);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  overflow: hidden;
  word-break: break-word;
  //hyphens: auto;
}

.qr {
  display: grid;
  place-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
  padding-top: 1em;
}

.text {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  white-space: pre-line;
  word-break: break-word;
  hyphens: auto;
}

.footer { //save for a later date
  border-top: solid;
  border-width: 2px;
  bottom: 0px;
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100vw;
  height: 4vh;
  text-align: center;
  align-items: center;
  overflow: hidden;
}

.lead {
 font-weight: bold;
 //font-style: italic;
}

.nametag {
  font-weight: bold;
}

//adjustments for mobile viewport
@media screen and (max-width: 760px) {
  .tr, .br {
    visibility: hidden;
    clear: both;
    display: none;
  }

  .tl, .bl {
    width: 100vw;
  }

}

@media screen and (max-height: 780px) {
  .tr, .br {
    visibility: hidden;
    clear: both;
    display: none;
  }

  .tl, .bl {
    width: 100vw;
  }

}


@media print {

#view-grid{
  .tr, .br{
    display: none;
  }
  .tl, .bl{
    grid-column-start: l;
    grid-column-end: r;
  }
}
}
</style>
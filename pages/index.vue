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

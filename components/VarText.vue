<template>
  <div class="vartext">{{ text }}</div>
</template>

<script>
export default {
  computed: {
    text(){
      return this.$store.getters.getText
    }
  }
}
</script>

<style>
.vartext{
  font-size: 16rem;
  font-variation-settings: "wght" var(--weight), "wdth" var(--width), "slnt" var(--slant);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>

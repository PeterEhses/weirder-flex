<template>
  <div class="vartext">{{ text }}</div>
</template>

<script>
export default {
  computed: {
    text(){
      let text = this.$store.getters.getText
      if (text == "") {
        return "TYPE SOMETHING"
      } else {
        return text
      }
    }
  }
}
</script>

<style>
</style>

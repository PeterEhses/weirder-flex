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
</style>

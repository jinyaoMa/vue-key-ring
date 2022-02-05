<template>
  <div class="about">
    <img class="logo" alt="App logo" src="../assets/logo.png" />
    <div class="appname">{{ $t("appname") }}</div>
    <div class="by">{{ $t("by", { author: pkg.author }) }}</div>
    <div class="intro">{{ $t("intro") }}</div>
    <div class="operations"></div>
    <div class="version">{{ $t("version", { version: pkg.version }) }}</div>
  </div>
</template>

<script>
// @pkg is an alias to /package.json
import pkg from "@pkg";

export default {
  name: "About",
  setup() {
    return {
      pkg,
    };
  },
};
</script>

<style lang="stylus" scoped>
.about
  display flex
  flex-direction column
  align-items center
  text-align center
  position relative
  flex-grow 1

.logo
  max-width 60%
  width 256px
  margin var(--margin-img)
  border-radius 50%

.appname
  font-weight bold
  font-size calc(1.5 * var(--font-size))
  line-height var(--line-height-l)

.by, .version
  color var(--color-text-l)

.by, .intro
  margin-bottom var(--margin-gap)

.version
  position absolute
  bottom 0
</style>
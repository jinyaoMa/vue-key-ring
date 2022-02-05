<template>
  <div class="about">
    <img class="logo" alt="App logo" src="../assets/logo.png" />
    <div class="appname">{{ $t("appname") }}</div>
    <div class="by">{{ $t("by", { author: pkg.author }) }}</div>
    <div class="intro">{{ $t("intro") }}</div>
    <div
      class="secret"
      :class="{
        locked: isLock,
      }"
    >
      <input
        :type="isLock ? 'password' : 'text'"
        v-model="mySecret"
        :disabled="isLock"
        :placeholder="$t('secret')"
      />
      <button @click="handleLockClick">
        <i v-if="isLock" class="fas fa-lock" />
        <i v-else class="fas fa-lock-open" />
      </button>
    </div>
    <div class="version">{{ $t("version", { version: pkg.version }) }}</div>
  </div>
</template>

<script>
// @pkg is an alias to /package.json
import pkg from "@pkg";
import { ref } from "@vue/reactivity";

export default {
  name: "About",
  props: {
    secret: {
      type: String,
    },
  },
  methods: {
    handleLockClick() {
      this.isLock = !this.isLock;
      if (this.isLock) {
        this.$emit("updateSecret", this.mySecret);
      }
    },
  },
  setup(props) {
    const mySecret = ref(props.secret);
    const isLock = ref(true);

    return {
      pkg,
      mySecret,
      isLock,
    };
  },
};
</script>

<style lang="stylus" scoped>
@import '../main.styl'

.about
  display flex
  flex-direction column
  align-items center
  text-align center
  position relative
  flex-grow 1
  max-width 100%

$logo-size = 256px

.logo
  max-width 60%
  width $logo-size
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
  font-size var(--font-size-m)

$thumb-size = 40px

.secret
  display flex
  flex-direction row
  input, button
    border none
    background-color var(--color-gray)
  button
    padding 0
    height $thumb-size
    width $thumb-size
    border-radius 0 var(--border-radius) var(--border-radius) 0
    cursor pointer
    &:active
      text-shadow 0 0 var(--border-width)
    @media (min-width $screen-tablet-size)
      &:hover
        text-shadow 0 0 var(--border-width)
  input
    padding 0 var(--padding-input)
    border-radius var(--border-radius) 0 0 var(--border-radius)
    &:focus
      background-color var(--color-bg)
      box-shadow inset 0 0 0 var(--border-width) var(--color-gray)
</style>
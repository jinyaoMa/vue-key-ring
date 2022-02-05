<template>
  <div id="view">
    <router-view :secret="secret" @updateSecret="updateSecret" />
  </div>
  <div id="nav">
    <router-link to="/">
      <i class="fas fa-key" />
      <span>{{ $t("home") }}</span>
    </router-link>
    <router-link to="/about">
      <i class="fas fa-info-circle" />
      <span>{{ $t("about") }}</span>
    </router-link>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  methods: {
    updateSecret(newSecret) {
      console.log("locked!");
    },
  },
  setup() {
    const secret = ref("jinyaoMa");

    return {
      secret,
    };
  },
  mounted() {
    console.log(this);
  },
};
</script>

<style lang="stylus">
@import './main.styl'

#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  font-size var(--font-size)
  line-height var(--line-height)
  color var(--color-text)
  a, input, button
    font-size var(--font-size)
    line-height var(--line-height)
    color var(--color-text)
    text-decoration none
    outline none

#nav
  position fixed
  bottom 0
  left 0
  width 100%
  display flex
  flex-direction row
  justify-content center
  background-color var(--color-bg)
  border-top var(--border-width) solid var(--color-gray)
  a
    display flex
    flex-direction column
    align-items center
    box-sizing border-box
    padding var(--padding-btn)
    color var(--color-text-l)
    font-size var(--font-size-s)
    line-height var(--line-height-none)
    min-width 160px
    @media (max-width $screen-tablet-size)
      flex-grow 1
    i
      font-size var(--font-size-l)
      margin-bottom var(--padding-btn)
    &.router-link-exact-active
      color var(--color-text)

#view
  display flex
  box-sizing border-box
  padding var(--padding)
  padding-bottom calc(var(--padding) + var(--border-width) + 3 * var(--padding-btn) + var(--font-size-l) + var(--font-size-s))
  min-height 100vh
</style>

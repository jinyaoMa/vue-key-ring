<template>
  <div class="home">
    <div
      class="entry"
      :class="{
        error: hasError,
      }"
    >
      <input
        type="password"
        :placeholder="$t('entry', { key: pkg.author })"
        v-model="secret"
        @focus="hasError = false"
        @keypress.enter="handleEntryClick"
      />
      <button @click="handleEntryClick">
        <i class="fas fa-arrow-right" />
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import pkg from "@pkg";

export default {
  name: "Home",
  methods: {
    handleEntryClick() {
      const error = () => {
        this.hasError = true;
      };
      this.$emit("enterApp", this.secret, error);
    },
  },
  setup() {
    const secret = ref("");
    const hasError = ref(false);

    return {
      pkg,
      secret,
      hasError,
    };
  },
};
</script>

<style lang="stylus" scoped>
@import '../main.styl'

.home
  display flex
  flex-direction column
  justify-content center
  align-items center
  position relative
  flex-grow 1
  max-width 100%

.entry
  display flex
  flex-direction row
  max-width 100%
  input, button
    border none
    background-color var(--color-gray)
  &.error
    input, button
      background-color var(--color-brown-l)
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
    box-sizing border-box
    max-width s('calc(100% - %s)', $thumb-size)
    width $input-width
    padding 0 var(--padding-input)
    border-radius var(--border-radius) 0 0 var(--border-radius)
    &:focus
      background-color var(--color-bg)
      box-shadow inset 0 0 0 var(--border-width) var(--color-gray)
</style>
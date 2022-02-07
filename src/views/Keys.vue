<template>
  <div class="keys">
    <div class="search">
      <input type="text" v-model="keywords" :placeholder="$t('search')" />
    </div>
    <div class="panel">
      <div
        class="panel-item add"
        @click="
          $router.push({
            name: 'New',
            params: {
              pass: true,
            },
          })
        "
      >
        <i class="fas fa-plus" />
      </div>
      <div
        class="panel-item"
        v-for="(keyData, i) in targetKeysData"
        :key="keyData.timestamp"
        @click="
          $router.push({
            name: 'Record',
            params: {
              pass: true,
              id: i,
            },
          })
        "
      >
        <div class="label">
          {{ $t("id") }}:
          {{ keyData.timestamp || $t("emptyData", { placeholder: $t("id") }) }}
        </div>
        <div class="alias">
          {{ keyData.alias || $t("emptyData", { placeholder: $t("alias") }) }}
        </div>
        <div class="label">{{ $t("account") }}</div>
        <div class="account">
          {{
            keyData.account || $t("emptyData", { placeholder: $t("account") })
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";

export default {
  name: "Keys",
  props: {
    keysData: {
      type: Array,
      default() {
        return [
          /*
          {
            timestamp: "",
            alias: "",
            account: "",
            password: "",
            more: "",
          },
          */
        ];
      },
    },
  },
  computed: {
    targetKeysData() {
      return this.$props.keysData.filter((data) => {
        if (
          data.alias.includes(this.keywords) ||
          data.account.includes(this.keywords)
        ) {
          return true;
        }
        return false;
      });
    },
  },
  setup() {
    const keywords = ref("");
    return {
      keywords,
    };
  },
};
</script>

<style lang="stylus" scoped>
@import '../main.styl'

.keys
  display flex
  flex-direction column
  align-items center
  flex-grow 1
  max-width 100%

$thumb-size = 40px
$search-width = 747px

.search
  display flex
  flex-direction row
  width $search-width
  max-width 100%
  margin-bottom var(--margin-img)
  height $thumb-size
  input
    border none
    background-color var(--color-gray)
  input
    flex-grow 1
    padding var(--padding-btn) var(--padding-input)
    border-radius var(--border-radius) 0 0 var(--border-radius)
    &:focus
      background-color var(--color-bg)
      box-shadow inset 0 0 0 var(--border-width) var(--color-gray)

.panel
  flex-grow 1
  width 100%
  display flex
  flex-direction row
  flex-wrap wrap
  align-content flex-start
  justify-content center

.panel-item
  padding var(--padding-input)
  background-color var(--color-bg)
  border-radius var(--border-radius-l)
  box-shadow 0 0 0 var(--border-width) var(--color-gray)
  box-sizing border-box
  max-width $input-width
  width 100%
  margin var(--margin-img)
  height calc(2 * var(--padding-input) + (2 * var(--font-size-s) + var(--font-size-m)) * var(--line-height) + var(--font-size-l) * var(--line-height-l))
  cursor pointer
  position relative
  overflow hidden
  &:not(.add):before
    content ''
    position absolute
    right 0
    top 0
    width @height
    height @height
    transform translateX(@height) rotate(45deg)
    transform-origin top right
    background-color var(--color-text-l)
    box-shadow inset 0 0 var(--padding-btn) var(--color-gray)
  &.add
    display flex
    justify-content center
    align-items center
    i
      font-size var(--font-size-l)
  &:active
    background-color var(--color-gray)
  @media (min-width $screen-tablet-size)
    &:hover
      box-shadow 0 0 var(--padding-btn) var(--border-width) var(--color-text-l)
  .label, .alias, .account
    position relative
  .label
    color var(--color-text-l)
    font-size var(--font-size-s)
  .alias
    font-size var(--font-size-l)
    line-height var(--line-height-l)
  .account
    font-size var(--font-size-m)
</style>
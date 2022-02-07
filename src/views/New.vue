<template>
  <div class="new">
    <div class="form">
      <div class="form-item title">
        {{ $t("addTitle") }}
      </div>
      <div class="form-item">
        <div class="form-item__label">{{ $t("alias") }}</div>
        <input
          type="text"
          v-model="form.alias"
          :placeholder="$t('aliasPlaceholder')"
        />
      </div>
      <div class="form-item">
        <div class="form-item__label">{{ $t("account") }}</div>
        <input
          type="text"
          v-model="form.account"
          :placeholder="$t('accountPlaceholder')"
        />
      </div>
      <div class="form-item">
        <div class="form-item__label">{{ $t("password") }}</div>
        <input
          type="text"
          v-model="form.password"
          :placeholder="$t('passwordPlaceholder')"
        />
      </div>
      <div class="form-item hasTextarea">
        <div class="form-item__label">{{ $t("more") }}</div>
        <textarea
          v-model="form.more"
          :placeholder="$t('morePlaceholder')"
        ></textarea>
      </div>
      <div class="form-item">
        <button class="btn-confirm" @click="handleAddClick">
          {{ $t("confirm") }}
        </button>
      </div>
      <div class="form-item">
        <button
          @click="
            $router.push({
              name: 'Keys',
              params: {
                pass: true,
              },
            })
          "
        >
          {{ $t("cancel") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  name: "New",
  props: {
    add: {
      type: Function,
    },
  },
  methods: {
    handleAddClick() {
      if (
        this.$props.add({
          timestamp: Date.now().toString(),
          ...this.form,
        })
      ) {
        this.$router.push({
          name: "Keys",
          params: {
            pass: true,
          },
        });
      }
    },
  },
  setup() {
    const form = ref({
      alias: "",
      account: "",
      password: "",
      more: "",
    });

    return {
      form,
    };
  },
};
</script>

<style lang="stylus" scoped>
@import '../main.styl'

.new
  display flex
  flex-direction column
  align-items center
  // justify-content center
  position relative
  flex-grow 1
  max-width 100%

.form
  max-width 100%
  padding var(--padding)
  box-sizing border-box
  display flex
  flex-direction column
  height 100%
  @media (min-width $screen-tablet-size)
    border var(--border-width) solid var(--color-text-l)
    border-radius var(--border-radius-l)
    box-shadow 0 0 var(--padding-btn) var(--color-text-l)

.form-item
  &:not(:first-child)
    margin-top var(--margin-gap)
  &.title
    padding-bottom var(--padding-input)
    font-size calc(2 * var(--font-size-s))
    line-height var(--line-height-none)
    text-align center
  &__label
    font-size var(--font-size-s)
    line-height var(--line-height-none)
    background-color var(--color-bg)
    transform translate3d(var(--padding-input), calc(0.5 * var(--font-size-s)), 0)
    padding 0 var(--padding-btn)
    width fit-content
  input, textarea
    max-width 100%
    width $input-width
    box-sizing border-box
    background-color var(--color-bg)
    padding calc(var(--padding-input) + 0.25 * var(--font-size-s)) var(--padding-input) var(--padding-input)
    border var(--border-width) solid var(--color-text-l)
    border-radius var(--border-radius)
  button
    max-width 100%
    width $input-width
    height $thumb-size
    border none
    padding var(--padding-btn)
    border-radius var(--border-radius)
    background-color var(--color-gray)
    cursor pointer
  textarea
    min-height calc(var(--font-size) * 10)
    height calc(100% - var(--font-size-s))
  &.hasTextarea
    flex-grow 1

.btn-confirm
  background-color var(--color-text) !important
  color var(--color-text_o) !important
</style>
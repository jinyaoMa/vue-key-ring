<template>
  <div class="record">
    <div class="form">
      <div class="form-item title">
        {{ $t("keyTitle", { timestamp: $props.record.timestamp }) }}
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
      <div v-if="isNoChange" class="form-item">
        <button
          @click="
            $router.push({
              name: 'Home',
            })
          "
        >
          {{ $t("goback") }}
        </button>
      </div>
      <template v-else>
        <div class="form-item">
          <button class="btn-update">{{ $t("update") }}</button>
        </div>
        <div class="form-item">
          <button class="btn-delete">{{ $t("delete") }}</button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  name: "Record",
  props: {
    record: {
      type: Object,
      default() {
        return {
          timestamp: Date.now().toString(),
          alias: "",
          account: "",
          password: "",
          more: "",
        };
      },
    },
  },
  computed: {
    isNoChange() {
      const a = this.form;
      const b = this.$props.record;
      return (
        a.alias == b.alias &&
        a.account == b.account &&
        a.password == b.password &&
        a.more == b.more
      );
    },
  },
  setup(props) {
    const form = ref({
      alias: props.record.alias,
      account: props.record.account,
      password: props.record.password,
      more: props.record.more,
    });

    return {
      form,
    };
  },
};
</script>

<style lang="stylus" scoped>
@import '../main.styl'

.record
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

.btn-update
  background-color var(--color-text) !important
  color var(--color-text_o) !important

.btn-delete
  color var(--color-brown) !important
  font-weight bold
</style>
<template>
  <div class="new">
    <div class="form">
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
      <div class="form-item">
        <div class="form-item__label">{{ $t("more") }}</div>
        <textarea
          v-model="form.more"
          :placeholder="$t('morePlaceholder')"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
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

<style lang="stylus" scoped></style>
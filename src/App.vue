<template>
  <div id="view">
    <router-view
      :keysData="keysData"
      @enterApp="enterApp"
      :add="addFunc"
      :update="updateFunc"
      :delete="deleteFunc"
      @updateSecret="updateSecret"
      :secret="secretFunc"
    />
  </div>
  <div v-if="$route.name != 'Home'" id="nav">
    <router-link
      :to="{
        name: 'Keys',
        params: {
          pass: true,
        },
      }"
    >
      <i class="fas fa-key" />
      <span>{{ $t("keys") }}</span>
    </router-link>
    <router-link
      :to="{
        name: 'About',
        params: {
          pass: true,
        },
      }"
    >
      <i class="fas fa-info-circle" />
      <span>{{ $t("about") }}</span>
    </router-link>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import pkg from "@pkg";
import { keyring } from "./utils";

export default {
  methods: {
    enterApp(secret, error) {
      if (keyring.checkKey(secret)) {
        this.keysData = keyring.loadKeysData(secret);
        this.$router.push({
          name: "Keys",
          params: {
            pass: true,
          },
        });
      } else {
        error();
      }
    },
    addFunc(newKeyData) {
      this.keysData.unshift(newKeyData);
      keyring.addKeyData(this.secret, newKeyData);
      return true;
    },
    updateFunc(id, newKeyData) {
      this.keysData[id] = newKeyData;
      keyring.updateKeyData(this.secret, newKeyData);
      return true;
    },
    deleteFunc(id, timestamp) {
      delete this.keysData[id];
      keyring.deleteKeyData(timestamp);
      return true;
    },
    // undo
    updateSecret(newSecret) {
      console.log("locked!");
    },
    secretFunc() {
      return this.secret;
    },
  },
  setup() {
    const keysData = ref([]);
    const secret = ref(pkg.author);
    keyring.initStorage(secret.value);

    const skin = window.localStorage.getItem("skin");
    if (skin) {
      document.querySelector(":root").classList.add(skin);
    }

    return {
      keysData,
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
  a, input, button, textarea
    font-family Avenir, Helvetica, Arial, sans-serif
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
    &.router-link-active
      color var(--color-text)

#view
  display flex
  box-sizing border-box
  padding var(--padding)
  padding-bottom calc(var(--padding) + var(--border-width) + 3 * var(--padding-btn) + var(--font-size-l) + var(--font-size-s))
  min-height 100vh
</style>

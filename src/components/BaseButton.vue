<template>
  <button
    @click="click"
    :loading="loading"
    :style="{
      color: color,
      fontSize: fontSize,
    }"
  >
    <slot>{{ title }}</slot>
  </button>
</template>

<script>
// import { mapGetters } from 'vuex';
export default {
  name: "v-btn",
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: "Continue",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "default",
    },
    padding: {
      type: String,
      default: "0",
    },
    margin: {
      type: String,
      default: "0",
    },
    width: {
      type: String,
    },
    height: {
      type: String,
      default: "",
    },
    fontSize: {
      type: String,
      default: "14px",
    },
    border: {
      type: String,
      default: "none",
    },
    color: {
      type: String,
      // default: "#fff",
    },
    htype: {
      type: String,
      default: "button",
    },
  },
  computed: {
    className() {
      return {
        disabled: this.disabled,
      };
    },
  },
  methods: {
    async click() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="less" scoped></style>

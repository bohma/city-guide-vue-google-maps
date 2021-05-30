<template>
  <nav>
    <a @click="showMap()" class="show-map">SHOW THE MAP</a>
    <show-map
      :locations="locations"
      v-if="showModal"
      @close="showModal = false"
    ></show-map>
  </nav>
</template>

<script>
import ShowMap from "./ModalMap.vue";
export default {
  components: {
    ShowMap,
  },
  data() {
    return {
      showModal: false,
    };
  },
  props: {
    locations: {
      type: [Array, Object],
      required: true,
    },
  },
  methods: {
    showMap() {
      this.showModal = !this.showModal;
    },
  },
};
</script>

<style lang="less" scoped>
nav {
  width: 100%;
  background: #eeeeee;
  height: 88px;
}
.show-map {
  display: none;
}
@media screen and (max-width: 767px) {
  nav {
    position: sticky;
    top: 0;
    z-index: 10;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 30px;
    .show-map {
      display: block;
      color: #fff;
      background: #cfcfcf;
      padding: 12px 20px;
      transition: 0.6s;
    }
    .show-map:active {
      background: #cfcfcf;
    }
  }
}
</style>

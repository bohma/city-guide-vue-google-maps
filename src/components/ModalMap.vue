<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <google-map :locations="locations"> </google-map>
          <button class="modal-default-button" @click="$emit('close')">
            HIDE THE MAP
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import GoogleMap from "./GoogleMapModal";
export default {
  components: {
    GoogleMap,
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
};
</script>

<style lang="less" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 10px 10px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.modal-default-button {
  display: block;
  padding: 8px 20px;
  margin: 10px 0 0 auto;
  border: none;
  color: #fff;
  background: #cfcfcf;
  transition: 0.6s;
}
.modal-default-button:active {
  background: #cfcfcf;
}
</style>
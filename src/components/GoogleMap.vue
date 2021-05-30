<template>
  <div class="google-map">
    <div ref="googleMap" class="google-map__map"></div>
    <button class="google-map__button" @click="$emit('hidemap')">
      HIDE THE MAP
    </button>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  props: {
    locations: {
      type: [Array, Object],
      required: true,
    },
  },
  data() {
    return {
      // eslint-disable-next-line
      bounds: new google.maps.LatLngBounds(), // Авто масштабирование карты
      mapOptions: {
        center: { lat: -34.397, lng: 140.644 },
        zoomControl: true,
        zoom: 8,
        gestureHandling: "cooperative",
      },
    };
  },
  methods: {
    initMap() {
      const { imgClusterUrl, locations } = this.locations;
      // create map
      // eslint-disable-next-line
      const map = new google.maps.Map(this.$refs.googleMap, {
        ...this.mapOptions,
      });
      // create Markers
      let markers = locations.map((location) => {
        // set locations for auto zoom map
        // eslint-disable-next-line
        const setLocations = new google.maps.LatLng(location.lat, location.lng);
        this.bounds.extend(setLocations);
        // eslint-disable-next-line
        const infoWindow = new google.maps.InfoWindow();

        // set Markers on Map
        // eslint-disable-next-line
        const marker = new google.maps.Marker({
          position: location,
          map: map,
          label: location.name_point,
          title: location.title,
          optimized: false,
        });

        marker.addListener("click", () => {
          infoWindow.close();
          infoWindow.setContent(marker.getTitle());
          infoWindow.open(marker.getMap(), marker);
        });
        return marker;
      });

      // create MarkerClusterer and add Image
      // eslint-disable-next-line
      let markerCluster = new MarkerClusterer(map, markers, {
        imagePath: imgClusterUrl,
      });

      // авто масштабирование
      map.fitBounds(this.bounds);
    },
  },
  mounted() {
    this.initMap();
  },
};
</script>

<style lang="less" scoped>
.google-map {
  width: 100%;
  &__map {
    width: 100%;
    height: calc(100vh - 150px);
    position: relative;
  }
  &__button {
    position: absolute;
    top: 10px;
    left: 10px;
    background: #c7c7c7;
    color: #fff;
    border: none;
    font-size: 15px;
    padding: 12px 20px;
  }
}
@media screen and (max-width: 1023px) {
  .google-map {
    &__button {
      top: 60px;
      left: -30px;
      font-size: 14px;
      padding: 10px 15px;
      transform: rotate(-90deg);
    }
  }
}
@media screen and (max-width: 767px) {
}
</style>

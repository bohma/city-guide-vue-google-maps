<template>
  <div ref="googleMap" class="google-map-modal"></div>
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
.google-map-modal {
  width: 100%;
  height: 500px;
}
</style>

<template>
  <div class="">
    <base-nav :locations="locations"></base-nav>
    <div class="wrap">
      <div class="content" :class="{ 'hide-content': hide }">
        <div class="tabs" :class="{ 'hide-tabs': hide }">
          <base-button
            class="tabs__button"
            @click="activetab = 1"
            :class="{ active: activetab === 1, 'hide-tabs__button': hide }"
            >City guide</base-button
          >
          <base-button
            class="tabs__button"
            @click="activetab = 2"
            :class="{ active: activetab === 2, 'hide-tabs__button': hide }"
          >
            Favorite</base-button
          >
        </div>
        <div class="filters" :class="{ 'hide-filters': hide }">
          <div
            @click="getFilter(index)"
            class="filters__item"
            :class="{
              activeFilter: filter.isPressed,
              'hide-filters__item': hide,
            }"
            v-for="(filter, index) in filters"
            :key="index"
          >
            <p>{{ filter.content }}</p>
          </div>
        </div>
        <div
          v-if="currentPlaces.length"
          class="place"
          :class="{ 'hide-place': hide }"
        >
          <div
            class="place__item"
            :class="{ 'hide-place__item': hide }"
            v-for="item in currentPlaces"
            :key="item.id"
          >
            <div class="place__image" :class="{ 'hide-place__image': hide }">
              <img :src="item.images[0].path" alt="" />
              <a
                class="hide-place__content-favorites"
                v-if="hide"
                @click="addToFavoritesPlaces(item.id)"
                ><svg
                  v-if="!item.favorite"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.1695 0.929596C13.237 0.929596 12.3457 1.14337 11.5205 1.56502C10.9588 1.85199 10.4428 2.23327 10 2.68564C9.5572 2.23327 9.0412 1.85199 8.47946 1.56502C7.65423 1.14337 6.76297 0.929596 5.83043 0.929596C2.61555 0.929596 0 3.54514 0 6.76007C0 9.03714 1.2026 11.4556 3.57435 13.9483C5.55464 16.0296 7.97913 17.7645 9.66429 18.8534L10 19.0704L10.3357 18.8534C12.0209 17.7645 14.4454 16.0296 16.4257 13.9483C18.7974 11.4556 20 9.03714 20 6.76007C20 3.54514 17.3845 0.929596 14.1695 0.929596ZM15.5294 13.0955C13.7596 14.9555 11.6038 16.5368 10 17.5951C8.39616 16.5368 6.24037 14.9555 4.4706 13.0955C2.32499 10.8406 1.23711 8.70902 1.23711 6.76007C1.23711 4.22729 3.29769 2.16671 5.83047 2.16671C7.28866 2.16671 8.62817 2.83652 9.50544 4.00436L10 4.66271L10.4946 4.00436C11.3718 2.83652 12.7113 2.16671 14.1695 2.16671C16.7023 2.16671 18.7629 4.22729 18.7629 6.76007C18.7629 8.70902 17.675 10.8406 15.5294 13.0955Z"
                    fill="#fff"
                  />
                </svg>
                <svg
                  v-if="item.favorite"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.1695 0.929596C13.237 0.929596 12.3457 1.14337 11.5205 1.56502C10.9588 1.85199 10.4428 2.23327 10 2.68564C9.5572 2.23327 9.0412 1.85199 8.47946 1.56502C7.65423 1.14337 6.76297 0.929596 5.83043 0.929596C2.61555 0.929596 0 3.54514 0 6.76007C0 9.03714 1.2026 11.4556 3.57435 13.9483C5.55464 16.0296 7.97913 17.7645 9.66429 18.8534L10 19.0704L10.3357 18.8534C12.0209 17.7645 14.4454 16.0296 16.4257 13.9483C18.7974 11.4556 20 9.03714 20 6.76007C20 3.54514 17.3845 0.929596 14.1695 0.929596ZM15.5294 13.0955C13.7596 14.9555 11.6038 16.5368 10 17.5951C8.39616 16.5368 6.24037 14.9555 4.4706 13.0955C2.32499 10.8406 1.23711 8.70902 1.23711 6.76007C1.23711 4.22729 3.29769 2.16671 5.83047 2.16671C7.28866 2.16671 8.62817 2.83652 9.50544 4.00436L10 4.66271L10.4946 4.00436C11.3718 2.83652 12.7113 2.16671 14.1695 2.16671C16.7023 2.16671 18.7629 4.22729 18.7629 6.76007C18.7629 8.70902 17.675 10.8406 15.5294 13.0955Z"
                    fill="red"
                  />
                </svg>
              </a>
            </div>
            <div
              class="place__content"
              :class="{ 'hide-place__content': hide }"
            >
              <div
                class="place__content-name"
                :class="{ 'hide-place__content-name': hide }"
              >
                <p>{{ item.name }}</p>
                <div class="place__content-name_range">
                  <div v-for="(num, index) in rangePrice" :key="index">
                    <p v-if="num <= item.price_range">$</p>
                    <p v-else class="place__content-name_hidden">$</p>
                  </div>
                </div>
              </div>
              <!-- <div class="place__content-descr" v-html="item.description"></div> -->
              <div
                class="place__content-descr"
                :class="{ 'hide-place__content-descr': hide }"
              >
                This is not your regular hostel – while all you might expect
                are, well, bunk beds, the Circus has a lot more to offer: you
                can
              </div>
              <div class="place__content-buttons" v-if="!hide">
                <base-button class="place__content-button"
                  >Read more</base-button
                >
                <a
                  class="place__content-favorites"
                  @click="addToFavoritesPlaces(item.id)"
                  ><svg
                    v-if="!item.favorite"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.1695 0.929596C13.237 0.929596 12.3457 1.14337 11.5205 1.56502C10.9588 1.85199 10.4428 2.23327 10 2.68564C9.5572 2.23327 9.0412 1.85199 8.47946 1.56502C7.65423 1.14337 6.76297 0.929596 5.83043 0.929596C2.61555 0.929596 0 3.54514 0 6.76007C0 9.03714 1.2026 11.4556 3.57435 13.9483C5.55464 16.0296 7.97913 17.7645 9.66429 18.8534L10 19.0704L10.3357 18.8534C12.0209 17.7645 14.4454 16.0296 16.4257 13.9483C18.7974 11.4556 20 9.03714 20 6.76007C20 3.54514 17.3845 0.929596 14.1695 0.929596ZM15.5294 13.0955C13.7596 14.9555 11.6038 16.5368 10 17.5951C8.39616 16.5368 6.24037 14.9555 4.4706 13.0955C2.32499 10.8406 1.23711 8.70902 1.23711 6.76007C1.23711 4.22729 3.29769 2.16671 5.83047 2.16671C7.28866 2.16671 8.62817 2.83652 9.50544 4.00436L10 4.66271L10.4946 4.00436C11.3718 2.83652 12.7113 2.16671 14.1695 2.16671C16.7023 2.16671 18.7629 4.22729 18.7629 6.76007C18.7629 8.70902 17.675 10.8406 15.5294 13.0955Z"
                      fill="#333333"
                    />
                  </svg>
                  <svg
                    v-if="item.favorite"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.1695 0.929596C13.237 0.929596 12.3457 1.14337 11.5205 1.56502C10.9588 1.85199 10.4428 2.23327 10 2.68564C9.5572 2.23327 9.0412 1.85199 8.47946 1.56502C7.65423 1.14337 6.76297 0.929596 5.83043 0.929596C2.61555 0.929596 0 3.54514 0 6.76007C0 9.03714 1.2026 11.4556 3.57435 13.9483C5.55464 16.0296 7.97913 17.7645 9.66429 18.8534L10 19.0704L10.3357 18.8534C12.0209 17.7645 14.4454 16.0296 16.4257 13.9483C18.7974 11.4556 20 9.03714 20 6.76007C20 3.54514 17.3845 0.929596 14.1695 0.929596ZM15.5294 13.0955C13.7596 14.9555 11.6038 16.5368 10 17.5951C8.39616 16.5368 6.24037 14.9555 4.4706 13.0955C2.32499 10.8406 1.23711 8.70902 1.23711 6.76007C1.23711 4.22729 3.29769 2.16671 5.83047 2.16671C7.28866 2.16671 8.62817 2.83652 9.50544 4.00436L10 4.66271L10.4946 4.00436C11.3718 2.83652 12.7113 2.16671 14.1695 2.16671C16.7023 2.16671 18.7629 4.22729 18.7629 6.76007C18.7629 8.70902 17.675 10.8406 15.5294 13.0955Z"
                      fill="red"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!currentPlaces.length">Sorry no places...</div>
      </div>
      <div class="google-map" :class="{ 'hide-google-map': hide }">
        <google-map :locations="locations" @hidemap="hidemap"> </google-map>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "../components/BaseButton.vue";
import BaseNav from "../components/BaseNav.vue";
import { mapGetters, mapActions } from "vuex";
import GoogleMap from "../components/GoogleMap.vue";

export default {
  name: "Home",
  components: {
    BaseButton,
    BaseNav,
    GoogleMap,
  },
  data() {
    return {
      activetab: 1,
      filters: [
        {
          value: 1,
          content: "$",
          isPressed: false,
        },
        {
          value: 2,
          content: "$$",
          isPressed: false,
        },
        {
          value: 3,
          content: "$$$",
          isPressed: false,
        },
        {
          value: 4,
          content: "$$$$",
          isPressed: false,
        },
        {
          value: 5,
          content: "$$$$$",
          isPressed: false,
        },
        {
          value: 0,
          content: "All",
          isPressed: true,
        },
      ],
      values: [0],
      hide: false,
      rangePrice: [1, 2, 3, 4, 5],
    };
  },
  computed: {
    currentPlaces() {
      if (this.activetab == 1) {
        this.getFilterFavoritePlaces(this.values);
        return this.getAllPlaces;
      } else {
        this.getFilterFavoritePlaces(this.values);
        return this.getFavoritePlaces;
      }
    },
    locations() {
      let locations = this.currentPlaces.map((item, index) => {
        let phone = item.phone ? item.phone : "";
        let address = item.address ? item.address : "";
        let name = item.name ? item.name : "";

        return {
          id: index++,
          lat: item.latitude,
          lng: item.longitude,
          name_point: "",
          title: `<h3 style="text-align: center;">${name}</h3><div style="text-align: center;"><p>${address}</p><p>${phone}</p></div>`,
        };
      });
      return {
        imgClusterUrl:
          "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
        locations,
      };
    },
    ...mapGetters(["getAllPlaces", "getFavoritePlaces"]),
  },
  methods: {
    getMainImage(images) {
      const image = images.find((item) => !item.main).path;
      console.log(image);
    },
    getFilter(index) {
      this.values = [];

      this.filters[index].isPressed = !this.filters[index].isPressed;
      const isAllUpressed = this.filters.find((n) => n.isPressed);
      if (!isAllUpressed) {
        this.filters[index].isPressed = true;
      }
      this.filters.map((item) => {
        if (item.isPressed) {
          this.values.push(item.value);
        }
      });
      if (this.activetab == 1) {
        this.getFilterPlaces(this.values);
      }
      if (this.activetab == 2) {
        this.getFilterFavoritePlaces(this.values);
      }
    },
    hidemap() {
      this.hide = !this.hide;
    },
    updateWidth() {
      this.width = window.innerWidth;
      if (this.width <= 767) {
        this.hide = true;
      }
    },

    ...mapActions([
      "getFilterPlaces",
      "addToFavoritesPlaces",
      "getFilterFavoritePlaces",
    ]),
  },
  created() {
    this.getFilterPlaces([0]);
    window.addEventListener("resize", this.updateWidth);
    this.updateWidth();
  },
};
</script>
<style lang="less">
@block-background: #eeeeee;
.wrap {
  width: 100%;
  display: flex;
  padding: 50px 36px;
}
.content {
  padding: 0 30px;
  width: 100%;
}
.hide-content {
  width: 80%;
  flex-wrap: wrap;
}
.tabs {
  width: 100%;
  height: 50px;
  background: @block-background;
  display: flex;
  justify-content: center;

  &__button {
    cursor: pointer;
    margin: 0 100px;
    border: none;
  }
}
.active {
  border-bottom: 2px solid #c4c4c4;
}
.hide-tabs {
}
.filters {
  margin: 24px 0;
  display: flex;
  justify-content: space-between;
  &__item {
    width: 80px;
    padding: 4px 0;
    background: @block-background;
    border-radius: 14px;
    text-align: center;
    cursor: pointer;
  }
}
.hide-filters {
  justify-content: flex-start;
}
.hide-filters__item {
  margin-right: 24px;
}
.activeFilter {
  background: #34c327;
  color: #fff;
}

.place {
  &__item {
    display: flex;
    align-items: center;
    padding: 26px 16px;
    height: 210px;
    background: @block-background;
    margin: 0 0 16px;
  }
  &__image {
    img {
      max-width: 150px;
      height: 150px;
      object-fit: contain;
      margin: 0 30px 0 0;
    }
  }
  &__content {
    &-name {
      display: flex;
      font-size: 20px;
      font-weight: 700;
      margin: 0 0 4px;
      text-transform: uppercase;
      &_range {
        display: flex;
        margin-left: 20px;
      }
      &_hidden {
        color: #999999;
      }
    }
    &-descr {
      width: 100%;
      margin: 0 0 25px;
      color: #999999;
      p {
        width: 400px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    &-buttons {
      display: flex;
      align-items: center;
    }
    &-button {
      padding: 8px 70px;
      margin-right: 26px;
      border: none;
      background: #333333;
      color: #ffffff;
      font-size: 15px;
    }
    &-favorites {
      cursor: pointer;
    }
  }
}
.hide-place {
  display: flex;
  flex-wrap: wrap;
  &__item {
    display: block;
    width: 300px;
    height: auto;
    margin: 0 15px 25px 0;
    background: #fff;
    padding: 0;
  }
  &__image {
    position: relative;
    img {
      width: 300px;
      max-width: 100%;
      width: 100%;
      height: 200px;
      margin: 0 0 11px 0;
      object-fit: cover;
    }
  }
  &__content {
    &-name {
      justify-content: space-between;
      padding-right: 12px;
      &_hidden {
        color: #999999;
      }
    }
    &-descr {
    }
    &-buttons {
      display: none;
    }
    &-favorites {
      position: absolute;
      cursor: pointer;
      top: 12px;
      right: 20px;
    }
  }
}

.google-map {
  width: 50%;
  position: sticky;
  top: 50px;
}
.hide-google-map {
  width: 30%;
}
@media screen and (max-width: 1440px) {
}
@media screen and (max-width: 1200px) {
  .place {
    &__image {
      img {
        max-width: 120px;
        height: 120px;
        object-fit: contain;
        margin: 0 20px 0 0;
      }
    }
    &__content {
      &-name {
        font-size: 16px;
        &_range {
          display: flex;
          margin-left: 15px;
        }
        &_hidden {
          color: #999999;
        }
      }
      &-descr {
        width: 100%;
        margin: 0 0 25px;
        color: #999999;
        font-size: 14px;

        p {
          width: 400px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      &-buttons {
        display: flex;
        align-items: center;
      }
      &-button {
        padding: 8px 40px;
        margin-right: 26px;
        border: none;
        background: #333333;
        color: #ffffff;
        font-size: 15px;
      }
      &-favorites {
        cursor: pointer;
      }
    }
  }
  .hide-place {
    &__image {
      img {
        width: 300px;
        max-width: 100%;
        width: 100%;
        height: 200px;
        margin: 0 0 11px 0;
        object-fit: cover;
      }
    }
  }
}
@media screen and (max-width: 1023px) {
  .tabs {
    justify-content: center;
    &__button {
      margin: 0 50px;
    }
  }
  .filters {
    &__item {
      width: 60px;
    }
  }

  .hide-content {
    width: 60%;
    flex-wrap: wrap;
  }

  .hide-tabs {
    justify-content: center;
    &__button {
      margin: 0 20px;
    }
  }
  .hide-filters {
    &__item {
      margin-right: 5px;
    }
  }
  .hide-google-map {
    width: 40%;
  }
  .hide-place {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
}
@media screen and (max-width: 767px) {
  .wrap {
    width: 100%;
    display: flex;
    padding: 20px 0;
  }

  .hide-content {
    width: 100%;
    flex-wrap: wrap;
  }
  .hide-tabs {
    justify-content: center;
    &__button {
      margin: 0 40px;
    }
  }
  .hide-filters {
    justify-content: space-between;
    &__item {
      margin-right: 5px;
      width: 100px;
      font-size: 13px;
    }
  }
  .hide-google-map {
    display: none;
  }
}
</style>

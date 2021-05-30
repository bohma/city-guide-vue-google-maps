import Vue from "vue";
import Vuex from "vuex";
import places from "./places";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    places,
    favorites: [],
    filterFavoritePlaces: [],
    filterPlaces: [],
  },
  mutations: {
    getFilterPlaces(state, payload) {
      state.filterPlaces = [];
      if (payload.includes(0)) {
        state.filterPlaces = state.places;
      } else {
        state.filterPlaces = state.places.filter((item) => {
          for (let value of payload) {
            if (item.price_range == value) {
              return item;
            }
          }
        });
      }
    },
    getFilterFavoritePlaces(state, payload) {
      state.filterFavoritePlaces = [];
      if (payload.includes(0)) {
        state.filterFavoritePlaces = state.favorites;
      } else {
        state.filterFavoritePlaces = state.favorites.filter((item) => {
          for (let value of payload) {
            if (item.price_range == value) {
              return item;
            }
          }
        });
      }
    },
    addToFavoritesPlaces(state, id) {
      let elToAddFav = state.filterPlaces.find((item) => {
        if (item.id == id) {
          item.favorite = !item.favorite;
          return item;
        }
      });
      if (elToAddFav.favorite) {
        state.favorites.push(elToAddFav);
      }
      if (!elToAddFav.favorite) {
        state.favorites = state.favorites.filter((item) => {
          if (item.id != elToAddFav.id) {
            return item;
          }
        });
      }
    },
  },
  actions: {
    getFilterPlaces({ commit }, payload) {
      commit("getFilterPlaces", payload);
    },
    getFilterFavoritePlaces({ commit }, payload) {
      commit("getFilterFavoritePlaces", payload);
    },
    addToFavoritesPlaces({ commit }, id) {
      commit("addToFavoritesPlaces", id);
    },
  },
  getters: {
    getAllPlaces(state) {
      return state.filterPlaces;
    },
    getFavoritePlaces(state) {
      return state.filterFavoritePlaces;
    },
  },
  modules: {},
});

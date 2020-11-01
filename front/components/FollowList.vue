<template>
  <v-list>
    <v-list-item v-for="(item, index) in follows" :key="index">
      <span>{{ item }}</span>
      <v-icon @click="onClickDelete({ item, index })">
        mdi-minus-circle-outline
      </v-icon>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  props: {
    follows: {
      type: Array,
      default: () => {},
    },
    followType: {
      type: String,
      required: true,
    },
  },
  methods: {
    onClickDelete(payload) {
      this.$store.dispatch("users/DELETE_FOLLOW", {
        id: payload.index,
        nickname: payload.item,
        type: this.followType,
      });
    },
  },
};
</script>

<style scoped></style>

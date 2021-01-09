<template>
  <v-list>
    <v-col
      v-for="(item, index) in follows"
      :key="index"
      class="d-inline-block"
      cols="12"
      md="4"
    >
      <v-list-item>
        <v-list-item-avatar color="#5C6BC0" class="white--text">
          {{ item.nickname[0] }}
        </v-list-item-avatar>
        <v-list-item-content>
          <span>{{ item.nickname }}</span>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon @click="onClickDelete({ item, index })">
            mdi-minus-circle-outline
          </v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-col>
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

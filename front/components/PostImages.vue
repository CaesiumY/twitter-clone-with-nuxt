<template>
  <div v-if="images.length === 0"></div>
  <div v-else-if="images.length === 1">
    <v-img
      :src="`http://localhost:3085/${images[0].src}`"
      contain
      aspect-ratio="2"
    />
  </div>
  <div v-else-if="images.length === 2" class="d-flex">
    <v-img
      :src="`http://localhost:3085/${images[0].src}`"
      class="flex-grow-1"
      contain
      aspect-ratio="2"
      style="flex: 1"
    />
    <v-img
      :src="`http://localhost:3085/${images[1].src}`"
      class="flex-grow-1"
      contain
      aspect-ratio="2"
      style="flex: 1"
    />
  </div>
  <div v-else-if="images.length > 2" class="d-flex">
    <v-img
      :src="`http://localhost:3085/${images[0].src}`"
      class="flex-grow-1"
      contain
      aspect-ratio="2"
      style="flex: 1"
    />
    <div
      class="d-flex align-center justify-center"
      style="flex: 1; background-color: rgba(0,0,0,0.3)"
    >
      <div style="text-align: center">
        <v-icon>mdi-dots-horizontal</v-icon>
        <div>더보기</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      isrequired: true,
      default: () => [],
    },
  },
};
</script>

<template>
  <div v-if="images.length === 0"></div>
  <div v-else-if="images.length === 1">
    <v-img
      :src="`http://localhost:3085/${images[0].src}`"
      contain
      aspect-ratio="2"
      @click="onOpenZoom"
    />
    <image-zoom v-if="isZoomed" :on-close="onCloseZoom" :images="images" />
  </div>
  <div v-else-if="images.length === 2" class="d-flex">
    <v-img
      :src="`http://localhost:3085/${images[0].src}`"
      class="flex-grow-1"
      contain
      aspect-ratio="2"
      style="flex: 1"
      @click="onOpenZoom"
    />
    <v-img
      :src="`http://localhost:3085/${images[1].src}`"
      class="flex-grow-1"
      contain
      aspect-ratio="2"
      style="flex: 1"
      @click="onOpenZoom"
    />
    <image-zoom v-if="isZoomed" :on-close="onCloseZoom" :images="images" />
  </div>
  <div v-else-if="images.length > 2" class="d-flex">
    <v-img
      :src="`http://localhost:3085/${images[0].src}`"
      class="flex-grow-1"
      contain
      aspect-ratio="2"
      style="flex: 1"
      @click="onOpenZoom"
    />
    <div
      class="d-flex align-center justify-center"
      style="flex: 1; background-color: rgba(0,0,0,0.3)"
      @click="onOpenZoom"
    >
      <div style="text-align: center">
        <v-icon>mdi-dots-horizontal</v-icon>
        <div>더보기</div>
      </div>
    </div>
    <image-zoom v-if="isZoomed" :on-close="onCloseZoom" :images="images" />
  </div>
</template>

<script>
import ImageZoom from "./ImageZoom";

export default {
  components: {
    ImageZoom,
  },
  props: {
    images: {
      type: Array,
      isrequired: true,
      default: () => [],
    },
  },
  data() {
    return {
      isZoomed: false,
    };
  },
  methods: {
    onOpenZoom() {
      this.isZoomed = true;
    },
    onCloseZoom() {
      this.isZoomed = false;
    },
  },
};
</script>

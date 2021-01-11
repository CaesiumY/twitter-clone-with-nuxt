<template>
  <v-container>
    <v-card>
      <v-container>
        <v-form ref="form" v-model="isValid" @submit.prevent="onSubmitForm">
          <v-textarea
            v-model="contents"
            class="mb-2"
            outlined
            auto-grow
            clearable
            label="내용을 적어주세요."
            :hide-details="hideDetails"
            :success="success"
            :success-messages="successMessages"
            :rules="[(v) => !!(v || '').trim() || '내용을 입력하세요.']"
            @input="onChangeTextarea"
          />
          <input
            ref="image-upload"
            type="file"
            accept="image/*"
            hidden
            multiple
            @change="onChangeFile"
          />
          <v-btn type="button" @click="onClickImageUploads">
            이미지 추가
          </v-btn>
          <v-btn color="success" type="submit" absolute right>
            작성하기
          </v-btn>
          <div>
            <div
              v-for="(path, index) in imagePaths"
              :key="index"
              class="ma-2"
              style="display: inline-block;"
            >
              <img
                :src="`http://localhost:3085/${path}`"
                :alt="path"
                width="200"
              />
              <div>
                <button
                  class="px-3"
                  type="button"
                  @click="onClickRemoveImage(index)"
                >
                  &times;
                </button>
              </div>
            </div>
          </div>
        </v-form>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      hideDetails: true,
      success: false,
      successMessages: "",
      isValid: false,
      contents: "",
    };
  },
  computed: {
    ...mapState("users", ["user"]),
    ...mapState("posts", ["imagePaths"]),
  },
  methods: {
    onChangeTextarea() {
      if (this.contents) {
        this.hideDetails = true;
        this.success = false;
        this.successMessages = "";
      }
    },
    onSubmitForm() {
      if (!this.$refs.form.validate()) return;
      this.$store
        .dispatch("posts/ADD", {
          contents: this.contents,
          images: this.imagePaths,
        })
        .then((res) => {
          this.success = true;
          this.hideDetails = false;
          this.successMessages = "등록 성공!";
          this.contents = " ";
          this.$store.commit("users/ADD_POST_LENGTH", { id: res.id });
        })
        .catch((e) => {
          console.error(e);
        });
    },
    onClickImageUploads() {
      this.$refs["image-upload"].click();
    },
    onChangeFile(e) {
      const imageFormData = new FormData();
      [].forEach.call(e.target.files, (file) => {
        imageFormData.append("image", file);
      });

      this.$store.dispatch("posts/UPLOAD_IMAGES", imageFormData);
    },
    onClickRemoveImage(i) {
      this.$store.commit("posts/REMOVE_IMAGE", i);
    },
  },
};
</script>

<style scoped></style>

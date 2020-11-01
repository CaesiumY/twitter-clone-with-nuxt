<template>
  <div>
    <v-form
      ref="form"
      v-model="isValid"
      style="position: relative;"
      @submit.prevent="onSubmitForm"
    >
      <v-textarea
        v-model="contents"
        class="ma-2"
        filled
        auto-grow
        rows="2"
        label="댓글을 적어주세요."
        :success="success"
        :success-messages="successMessages"
        :hide-details="hideDetails"
        @input="onChangeTextarea"
      />
      <v-btn type="submit" color="success" absolute right top>
        작성
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isValid: false,
      contents: "",
      success: false,
      successMessages: "",
      hideDetails: true,
    };
  },
  computed: {
    ...mapState("users", ["user"]),
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
      if (this.$refs.form.validate() && this.contents) {
        this.$store
          .dispatch("posts/ADD_COMMENT", {
            contents: this.contents,
            id: Date.now().toString() + Math.floor(Math.random() * 300),
            createdAt: Date.now(),
            user: {
              nickname: this.user.nickname,
            },
            postId: this.postId,
          })
          .then(() => {
            this.contents = "";
            this.success = true;
            this.successMessages = "댓글 작성 성공";
            this.hideDetails = false;
          });
      }
    },
  },
};
</script>

<style scoped></style>

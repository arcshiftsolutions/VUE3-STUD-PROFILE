import { defineStore } from 'pinia';
import ApiService from '../common/apiService';

export const commentStore = defineStore('comment', {
  state: () => ({
    requestCommentsState: null,
    unsubmittedCommentState: null,
    commentHistoryState: [],
  }),
  getters: {
    requestComments: state => state.requestCommentsState,
    unsubmittedComment: state => state.unsubmittedCommentState,
    commentHistory: state => state.commentHistoryState,
  },
  actions: {
    async setRequestComments(requestComments){
      this.requestCommentsState = requestComments;
    },
    async setUnsubmittedComment(unsubmittedComment){
      this.unsubmittedCommentState = unsubmittedComment;
    },
    async setCommentHistory(commentHistory){
      this.commentHistoryState = commentHistory || [];
    },
    async setCommentSubmitted(documents){
      this.unsubmittedCommentState.documents = documents;
      this.commentHistoryState = [...this.commentHistoryState, ...this.requestCommentsState, this.unsubmittedCommentState];
      this.unsubmittedCommentState = null;
      this.requestCommentsState = null;
    },
    async postComment({commit, rootGetters}, {requestID, comment}){
      const response = await ApiService.postComment(requestID, comment, rootGetters.requestType);
      this.unsubmittedCommentState = response.data;
    },
  }
});

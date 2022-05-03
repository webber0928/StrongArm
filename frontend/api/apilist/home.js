export default ($axios) => ({
  list(data) {
    return $axios.$get(`https://randomuser.me/api/`, data);
  },
});

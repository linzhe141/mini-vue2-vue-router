export default {
  name: "RouterLink",
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  render(h) {
    const slot = this.$slots.default;
    const clickHandle = () => {
      const to = this.to;
      this.$router.push(to);
    };
    return <a onClick={() => clickHandle()}>{slot}</a>;
  },
};

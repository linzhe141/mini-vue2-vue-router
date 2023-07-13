export default {
  name: 'RouterLink',
  props: {
    to: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      active: false
    };
  },
  watch: {
    '$route.path': {
      handler(value) {
        this.active = value === this.to;
      },
      immediate: true
    }
  },
  render() {
    const slot = this.$slots.default;
    const clickHandle = () => {
      const to = this.to;
      this.$router.push(to);
      this.active = true;
    };
    return (
      <a
        class={{ 'router-link-exact-active': this.active }}
        style={{ 'text-decoration': 'underline' }}
        onClick={() => clickHandle()}
      >
        {slot}
      </a>
    );
  }
};

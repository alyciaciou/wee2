const { createApp, ref, onMounted } = Vue
createApp({
  setup() {
    const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
    const apiPath = 'liquor_store';
    const products = ref([]);
    const tempProduct = ref({});

    const checkAdmin = () => {
      const url = `${apiUrl}/api/user/check`;
      axios.post(url)
        .then(() => {
          getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = 'login.html';
        });
    };

    const getData = () => {
      const url = `${apiUrl}/api/${apiPath}/admin/products`;
      axios.get(url)
        .then((response) => {
          products.value = response.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    };

    const openProduct = (item) => {
      tempProduct.value = item;
    };

    onMounted(() => {
      // Retrieve Token
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      axios.defaults.headers.common.Authorization = token;

      checkAdmin();
    });

    return {
      products,
      tempProduct,
      openProduct,
    };
  },
}).mount('#app');
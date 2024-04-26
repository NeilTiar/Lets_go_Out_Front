export const fetchDataMixin = {
  
  methods: {
    async fetchData() {
      try {
        const response = await fetch(`http://localhost:5001/review/home`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        this.reviews = data;
        this.totalItems = data.length;
        this.pagesShown = Math.ceil(this.totalItems / this.itemsPerPage);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
};
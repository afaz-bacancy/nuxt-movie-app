<template>
  <div>
    <h1>Popular Movies today</h1>

    <a-row :gutter="[32, 32]" align="middle">
      <a-col v-for="movie in movies" :key="movie.id" :xs="32" :sm="12" :lg="6">
        <nuxt-link :to="`/movies/${movie.id}`">
          <a-card hoverable>
            <template #cover>
              <img :src="moviePoster(movie)">
            </template>

            <a-card-meta :title="movie.title || movie.original_title">
              <template #description>
                <div>Released <br><small>{{ movie.release_date }}</small></div>
              </template>
            </a-card-meta>
          </a-card>
        </nuxt-link>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',

  async asyncData ({ $moviesApi }) {
    const { results, page, total_pages: totalPages } = await $moviesApi.$get('/movie/popular')

    return { movies: results, page, totalPages }
  },

  data: () => ({
    loadingMode: false
  }),

  head () {
    return {
      title: 'Popular movies today'
    }
  },

  mounted () {
    document.addEventListener('scroll', this.lazyLoadListener)
  },

  beforeDestroy () {
    document.removeEventListener('scroll', this.lazyLoadListener)
  },

  methods: {
    moviePoster (movie) {
      return `http://image.tmdb.org/t/p/w185${movie.poster_path}`
    },

    lazyLoadListener () {
      const threshold = document.documentElement.scrollHeight - document.documentElement.clientHeight - 500

      if (document.documentElement.scrollTop > threshold) {
        this.loadMore()
      }
    },

    async loadMore () {
      if (this.loadingMode || (this.page >= this.totalPages)) {
        return
      }

      this.loadingMode = true

      const { results } = await this.$moviesApi.$get('/movie/popular', {
        params: {
          page: ++this.page
        }
      })

      this.movies.push(...results)

      this.loadingMode = false
    }
  }
}
</script>

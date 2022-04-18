<template>
  <div>
    <h1>Popular Movies today</h1>

    <a-row :gutter="[32, 32]" type="grid" align="middle">
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
    const { results } = await $moviesApi.$get('/movie/popular')

    return { movies: results }
  },

  head () {
    return {
      title: 'Popular movies today'
    }
  },

  methods: {
    moviePoster (movie) {
      return `http://image.tmdb.org/t/p/w185${movie.poster_path}`
    }
  }
}
</script>

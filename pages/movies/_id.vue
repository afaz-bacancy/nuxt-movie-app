<template>
  <div>
    <h1>{{ movie.original_title || movie.title }}</h1>

    <a-row :gutter="[32, 32]" type="flex">
      <a-col :span="8">
        <img class="movie-poster" :src="moviePoster(movie)">
      </a-col>
      <a-col :span="12">
        <p>{{ movie.overview }}</p>
        <p>Rating: {{ movie.vote_average }}/10</p>
        <p>Released: {{ movie.release_date }}</p>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  async asyncData ({ params, $moviesApi }) {
    const { data } = await $moviesApi.get(`/movie/${params.id}`)

    return { movie: data }
  },

  head () {
    return {
      title: this.movie.original_title || this.movie.title
    }
  },

  methods: {
    moviePoster (movie) {
      return `http://image.tmdb.org/t/p/original${movie.poster_path}`
    }
  }
}
</script>

<style scoped>
.movie-poster {
  width: 100%;
  height: auto;
}
</style>

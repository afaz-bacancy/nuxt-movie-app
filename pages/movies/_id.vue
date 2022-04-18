<template>
  <div>
    <a-row :gutter="[32, 32]" type="grid">
      <a-col :sm="16" :md="12">
        <a-card>
          <template #cover>
            <img class="movie-poster" :src="moviePoster(movie)">
          </template>
        </a-card>
      </a-col>
      <a-col :sm="16" :md="12">
        <h1>{{ movie.title || movie.original_title }}</h1>

        <h3>Synopsis:</h3>
        <p>{{ movie.overview }}</p>

        <h3>Rating:</h3>
        <p>{{ movie.vote_average }}/10</p>

        <h3>Released:</h3>
        <p>{{ movie.release_date }}</p>
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
      title: this.movie.title || this.movie.original_title
    }
  },

  methods: {
    moviePoster (movie) {
      return `http://image.tmdb.org/t/p/original${movie.poster_path}`
    }
  }
}
</script>

export default function ({ $axios, env }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    params: {
      api_key: env.movieDBApiKey
    }
  })

  // Set baseURL to something different
  api.setBaseURL('https://api.themoviedb.org/3')

  // Inject to context as $moviesApi
  inject('moviesApi', api)
}

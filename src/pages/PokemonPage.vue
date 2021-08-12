<template>
  <h1 v-if="!pokemon">Espere por favor...</h1>
  <div v-else>
    <h1>¿Quien es este pokemon?</h1>

    <!-- Se puede poner como PokemonPicture o <pokemon-picture></pokemon-picture> -->
    <!-- Las propiedades tambien se pueden poner como pokemon-id en lugar de PokemonId -->
    <PokemonPicture 
      :pokemon-id="pokemon.id" 
      :show-pokemon="showPokemon" />

    <!-- <PokemonOptions 
      :pokemons="pokemonArr"
      @selection="checkAnswer(1, $event)"
    /> -->
    <PokemonOptions 
      :pokemons="pokemonArr"
      @selection="checkAnswer"
    />  
    <template v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>
      <button @click="newGame">
        Nuevo Juego
      </button>
    </template>
  </div>
</template>

<script>
import PokemonOptions from '../components/PokemonOptions.vue'
import PokemonPicture from '../components/PokemonPicture.vue'
import getPokemonOptions from '../helpers/getPokemonOptions'

// console.log(getPokemonOptions())
export default {
  components: { PokemonPicture, PokemonOptions },
  data(){
    return {
      pokemonArr: [],
      pokemon: null, 
      showPokemon: false,
      showAnswer: false,
      message: ''
    }
  },
  methods: {
    async mixPokemonArray (){
      this.pokemonArr = await getPokemonOptions()
      const rndInt = Math.floor( Math.random() * 4 )

      this.pokemon = this.pokemonArr[rndInt]
    },
    checkAnswer(selectedId){
      this.showPokemon = true;
      this.message = selectedId === this.pokemon.id 
                     ? `Adivinate!!!!, es ${ this.pokemon.name }`
                     : `Oops, era ${ this.pokemon.name }` 
      this.showAnswer = true;
    },
    async newGame(){
      this.showAnswer = false;
      this.showPokemon = false;
      this.pokemonArr = []
      this.pokemon = null;
      this.mixPokemonArray()
    }
  },
  mounted(){
    this.mixPokemonArray()
  }
}
</script>

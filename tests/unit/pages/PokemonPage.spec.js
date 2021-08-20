import { shallowMount, mount } from '@vue/test-utils'
import PokemonPage from '@/pages/PokemonPage'
import { pokemons } from '../mocks/pokemons.mock'

describe('PokemonPage', () => {
    let wrapper
    let mixPokemonArraySpy


    jest.clearAllMocks()

    beforeEach(() => {
        mixPokemonArraySpy = jest.spyOn( PokemonPage.methods, 'mixPokemonArray')
        wrapper = shallowMount( PokemonPage )
    })


    test('debe de hacer match con el snapshot', () => {
        expect( wrapper.html()).toMatchSnapshot()    
    })

    test('debe de llamar mixPokemonArray al montar', () => {

        expect(mixPokemonArraySpy).toHaveBeenCalled()
    })
    

    test('debe de hacer match con el snapshot cuando cargan los pokemons', () => {
        const wrapper = shallowMount( PokemonPage, {
            data(){
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0], 
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        expect(wrapper.html()).toMatchSnapshot()

    })
    
    test('debe de mostrar los componentes de PokemonPicture y PokemonOptions', async () => {
        const wrapper = await shallowMount( PokemonPage, {
            data(){
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0], 
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        const picture = wrapper.find('pokemon-picture-stub')
        const options = wrapper.find('pokemon-options-stub')

        expect( picture.exists() ).toBeTruthy()
        expect( picture.attributes('pokemonid')).toBe('5')

        expect( options.exists() ).toBeTruthy()
        expect( options.attributes('pokemons')).toBeTruthy()

    })

    test('pruebas con checkAnswer', async() => {
        const wrapper = await shallowMount( PokemonPage, {
            data(){
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0], 
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        await wrapper.vm.checkAnswer(5)

        expect( wrapper.find('h2').exists()).toBeTruthy()
        expect( wrapper.vm.showPokemon ).toBe(true)
        expect(wrapper.find('h2').text()).toBe(`Adivinate!!!!, es ${ pokemons[0].name }`)

        await wrapper.vm.checkAnswer(10)

        expect(wrapper.vm.message).toBe(`Oops, era ${ pokemons[0].name }`)

    })
    
    
})


import { shallowMount } from '@vue/test-utils'
import PokemonOptions from '@/components/PokemonOptions'
import { pokemons } from '../mocks/pokemons.mock'

describe('PokemonoOptions Component', () => {

    let wrapper

    beforeEach(() => {
        wrapper = shallowMount( PokemonOptions, {
            props: {
                pokemons
            }
        })
    })

    test('debe de hacer match con el snapshot', () => {
        expect( wrapper.html() ).toMatchSnapshot()
    })


    test('debe de mostrar las 4 opciones correctamente', () => {
       
        const items = wrapper.findAll('li')

        const [ p1, p2, p3, p4 ] = items

        expect( items.length ).toBe(4)
        expect( p1.text()).toBe(pokemons[0].name)
        expect( p2.text()).toBe(pokemons[1].name)
        expect( p3.text()).toBe(pokemons[2].name)
        expect( p4.text()).toBe(pokemons[3].name)
    })
    

    test('debe emitir "selection" con sus respectivos parametros al hacer click', () => {
        const [ li1, li2, li3, li4 ] = wrapper.findAll('li');

        li1.trigger('click')
        li2.trigger('click')
        li3.trigger('click')
        li4.trigger('click')

        expect( wrapper.emitted('selection').length).toBe(4)
        expect( wrapper.emitted('selection')[0]).toEqual([5])
        expect( wrapper.emitted('selection')[1]).toEqual([10])
        expect( wrapper.emitted('selection')[2]).toEqual([15])
        expect( wrapper.emitted('selection')[3]).toEqual([20])

    })
    
    
})

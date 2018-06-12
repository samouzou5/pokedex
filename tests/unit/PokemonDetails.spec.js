import PokemonDetails from '@/components/PokemonDetails'
import { mount } from '@vue/test-utils'

describe('PokemonDetails', () => {
  test('snapshot', () => {
    const wrapper = mount(PokemonDetails, {
      propsData: {
        id: 3
      },
      mocks: {
        $route: { params: {id: 3} }
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})

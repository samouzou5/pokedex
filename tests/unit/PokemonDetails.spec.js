import PokemonDetails from '@/components/PokemonDetails'
import { mount } from '@vue/test-utils'

describe('PokemonDetails', () => {
  const mocks = {
    $route: { params: { id: 3 } }
  }

  const stubs = {
    'BaseImage': '<div data-stub-base-image v-bind="$attrs"></div>'
  }
  test('snapshot', () => {
    const wrapper = mount(PokemonDetails, {
      propsData: {
        id: 3
      },
      mocks,
      stubs
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.name')).toBe('Venusaur')
  })

  test('snapshot: pokemon not found', () => {
    const wrapper = mount(PokemonDetails, {
      propsData: {
        id: 'foo'
      },
      mocks,
      stubs
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.empty').text()).toBe('Pokemon not found')
  })

  test('event: toggle-favorite', () => {
    const wrapper = mount(PokemonDetails, {
      propsData: {
        id: 2
      },
      mocks,
      stubs
    })
    wrapper.find('.toggle-favorite').trigger('click')
    expect(wrapper.emitted('toggle-favorite')).toBeTruthy()
    expect(wrapper.emitted('toggle-favorite'))[0].toEqual([2])
  })
})

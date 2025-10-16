import { mount } from '@vue/test-utils'
import { test, expect, it } from 'vitest'
import ButtonComponent from '../../src/components/button-component.vue'

test('renders button name', () => {
  const wrapper = mount(ButtonComponent, {
    props: { buttonName: 'Click Me' }
  })
  expect(wrapper.text()).toContain('Click Me')
})


import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import ModalComponent from '../../src/components/Modal-Signup.vue'

describe('ModalComponent', () => {

  test('renders when show is true', () => {
    const wrapper = mount(ModalComponent, {
      props: { show: true, message: 'Hello Modal' }
    })

    expect(wrapper.find('.modal-box').exists()).toBe(true)

    expect(wrapper.text()).toContain('Hello Modal')
  })


  test('does not render when show is false', () => {

    const wrapper = mount(ModalComponent, {
      props: { show: false, message: 'Hidden Modal' }
    })

    expect(wrapper.find('.modal-box').exists()).toBe(false)
  })



  test('emits close event when overlay is clicked', async () => {
    
    const wrapper = mount(ModalComponent, {
      props: { show: true, message: 'Close me' }
    })

    await wrapper.find('.modal-overlay').trigger('click')
    expect(wrapper.emitted().close).toBeTruthy()
  })



  test('emits close event when close button is clicked', async () => {
    const wrapper = mount(ModalComponent, {
      props: { show: true, message: 'Bye' }
    })

    await wrapper.find('.close-btn').trigger('click')
    expect(wrapper.emitted().close).toBeTruthy()
  })
})

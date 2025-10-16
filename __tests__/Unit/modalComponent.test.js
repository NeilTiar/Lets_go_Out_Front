import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import ModalComponent from '@/components/Modal-Signup.vue'

describe('ModalComponent — Unit Tests', () => {
  // #1 : Le message s’affiche correctement
  test('renders the message when visible', () => {
    const wrapper = mount(ModalComponent, {
      props: { show: true, message: 'Test message' }
    })

    expect(wrapper.text()).toContain('Test message')
    expect(wrapper.find('.modal-overlay').exists()).toBe(true)
  })

  // #2 : La modale n’est pas affichée quand show = false
  test('is hidden when show = false', () => {
    const wrapper = mount(ModalComponent, {
      props: { show: false, message: 'Hidden' }
    })

    expect(wrapper.find('.modal-overlay').exists()).toBe(false)
  })

  // #3 : Émet un événement "close" quand on clique sur le fond
  test('emits close when clicking on overlay background', async () => {
    const wrapper = mount(ModalComponent, {
      props: { show: true, message: 'Test' }
    })

    await wrapper.find('.modal-overlay').trigger('click')
    expect(wrapper.emitted().close).toBeTruthy()
  })

  // #4 : Émet un événement "close" quand on clique sur le bouton X
  test('emits close when clicking the close button', async () => {
    const wrapper = mount(ModalComponent, {
      props: { show: true, message: 'Test' }
    })

    await wrapper.find('.close-btn').trigger('click')
    expect(wrapper.emitted().close).toBeTruthy()
  })

  // #5 : Affiche le contenu du slot
  test('renders slot content', () => {
    const wrapper = mount(ModalComponent, {
      props: { show: true },
      slots: { default: '<div class="slot-content">Hello Slot</div>' }
    })

    expect(wrapper.find('.slot-content').exists()).toBe(true)
    expect(wrapper.text()).toContain('Hello Slot')
  })
})

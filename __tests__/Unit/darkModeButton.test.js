import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import DarkModeButton from '@/components/dark-theme-component.vue'

describe('DarkModeButton.vue — Unit Test', () => {
  let storeMock

  beforeEach(() => {
    // Mock du store Vuex simulé
    storeMock = {
      state: { isDarkMode: false },
      dispatch: vi.fn()
    }
  })

  it('initialise isActive selon la valeur du store', () => {
    storeMock.state.isDarkMode = true

    const wrapper = mount(DarkModeButton, {
      global: {
        mocks: { $store: storeMock }
      }
    })

    expect(wrapper.vm.isActive).toBe(true)
  })

  it('émet "toggle" et met à jour isActive quand on clique sur le bouton', async () => {
    const wrapper = mount(DarkModeButton, {
      global: {
        mocks: { $store: storeMock }
      }
    })

    expect(wrapper.vm.isActive).toBe(false)

    await wrapper.find('button').trigger('click')

    // Vérifie que le toggle a bien modifié l’état
    expect(wrapper.vm.isActive).toBe(true)

    // Vérifie que l’événement "toggle" a été émis
    expect(wrapper.emitted().toggle).toBeTruthy()
    expect(wrapper.emitted().toggle[0]).toEqual([true])
  })

  it('appelle les bonnes actions du store via isDarkModeOn()', async () => {
    const wrapper = mount(DarkModeButton, {
      global: {
        mocks: { $store: storeMock }
      }
    })

    await wrapper.find('button').trigger('click')

    expect(storeMock.dispatch).toHaveBeenCalledWith('setIsDarkMode', true)
    expect(storeMock.dispatch).toHaveBeenCalledWith('isDarkmodeActive')
  })

  it('affiche le bon texte et icône selon le mode', async () => {
    const wrapper = mount(DarkModeButton, {
      global: {
        mocks: { $store: storeMock }
      }
    })

    // Mode sombre (par défaut)
    expect(wrapper.find('.dark-mode-tag').exists()).toBe(true)
    expect(wrapper.find('img[alt="Moon"]').exists()).toBe(true)

    // Passe en mode clair
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('.light-mode-tag').exists()).toBe(true)
    expect(wrapper.find('img[alt="Sun"]').exists()).toBe(true)
  })
})

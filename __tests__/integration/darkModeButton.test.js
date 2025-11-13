import { mount } from '@vue/test-utils';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { createStore } from 'vuex';
import DarkModeButton from '@/components/dark-theme-component.vue';

describe('DarkModeButton.vue — Integration Test', () => {
  let store;

  beforeEach(() => {
    // Vrai store Vuex minimal
    store = createStore({
      state: () => ({
        isDarkMode: false,
      }),
      mutations: {
        SET_DARK_MODE(state, payload) {
          state.isDarkMode = payload;
        },
      },
      actions: {
        setIsDarkMode({ commit }, payload) {
          commit('SET_DARK_MODE', payload);
        },
        isDarkmodeActive: vi.fn(), // mockée pour éviter effets réels
      },
    });
  });

  it('affiche "Thème Sombre" par défaut et bascule au clic', async () => {
    const wrapper = mount(DarkModeButton, {
      global: { plugins: [store] },
    });

    // Par défaut (dark mode désactivé)
    expect(wrapper.find('.dark-mode-tag').exists()).toBe(true);
    expect(store.state.isDarkMode).toBe(false);

    // Clic : active le mode clair
    await wrapper.find('button').trigger('click');

    // Vérifie que le store a été mis à jour
    expect(store.state.isDarkMode).toBe(true);

    // Vérifie que le texte et l’icône changent
    expect(wrapper.find('.light-mode-tag').exists()).toBe(true);
    expect(wrapper.find('img[alt="Sun"]').exists()).toBe(true);
  });

  it('conserve le bon état du store entre les clics', async () => {
    const wrapper = mount(DarkModeButton, {
      global: { plugins: [store] },
    });

    expect(store.state.isDarkMode).toBe(false);

    await wrapper.find('button').trigger('click');
    expect(store.state.isDarkMode).toBe(true);

    await wrapper.find('button').trigger('click');
    expect(store.state.isDarkMode).toBe(false);
  });

  it('utilise la valeur du store au montage (beforeMount)', async () => {
    // Simule que le thème sombre est déjà actif avant le montage
    store.state.isDarkMode = true;

    const wrapper = mount(DarkModeButton, {
      global: { plugins: [store] },
    });

    expect(wrapper.vm.isActive).toBe(true);
    expect(wrapper.find('.light-mode-tag').exists()).toBe(true);
  });
});

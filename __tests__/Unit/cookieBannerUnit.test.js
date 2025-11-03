import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import CookieConsent from '@/components/Cookie-consent.vue'
import { nextTick } from 'vue' 

describe('CookieConsent.vue — Integration Test', () => {
  let appendSpy

  beforeEach(() => {
    // Nettoyer le localStorage et mocks avant chaque test
    localStorage.clear()
    appendSpy = vi.spyOn(document.head, 'appendChild')
  
  })


  it('affiche la bannière si aucun consentement n’est donné', async () => {
    const wrapper = mount(CookieConsent)
    await nextTick()
   
    expect(wrapper.find('.cookie-banner').exists()).toBe(true)
  })
  it('cache la bannière et stocke "accepted" après clic sur Accepter', async () => {
    const wrapper = mount(CookieConsent)
     await nextTick()
    await wrapper.find('.accept').trigger('click')

    expect(localStorage.getItem('cookieConsent')).toBe('accepted')
    expect(wrapper.find('.cookie-banner').exists()).toBe(false)
    expect(appendSpy).toHaveBeenCalled() // Vérifie que le script est chargé
  })

  it('cache la bannière et stocke "refused" après clic sur Refuser', async () => {
    const wrapper = mount(CookieConsent)
     await nextTick()
    await wrapper.find('.refuse').trigger('click')

    expect(localStorage.getItem('cookieConsent')).toBe('refused')
    expect(wrapper.find('.cookie-banner').exists()).toBe(false)
    expect(appendSpy).not.toHaveBeenCalled() // Aucun script ne doit être inséré
  })

  it('charge directement le script si consentement déjà accepté', () => {
    localStorage.setItem('cookieConsent', 'accepted')
    mount(CookieConsent)
    expect(appendSpy).toHaveBeenCalled()
  })
})

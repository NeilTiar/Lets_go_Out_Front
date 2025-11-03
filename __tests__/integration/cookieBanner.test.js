
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import CookieBanner from '../../src/components/Cookie-consent.vue'


/*
est vérifier :

1-L’affichage initial (bannière visible si aucun consentement).

2-Le masquage de la bannière après acceptation.

3-Le masquage de la bannière après refus.

4-L’ajout du script quand les cookies sont acceptés.
*/



describe('CookieBanner', () => {
  let wrapper




   beforeEach(async () => {
    localStorage.clear()
    document.head.innerHTML = '' // Réinitialiser les scripts ajoutés

    wrapper = mount(CookieBanner)

    // Attendre que onMounted() + showBanner soient pris en compte
    await nextTick()
    await nextTick()
  })


 

  
  //#1
  test('shows banner if no consent in localStorage', async () => {
    await nextTick()
    expect(wrapper.find('.cookie-banner').exists()).toBe(true)
  })


  //#2
  test('hides banner when consent is accepted', async () => {
    const acceptButton = wrapper.find('.accept')
    expect(acceptButton.exists()).toBe(true)

    await acceptButton.trigger('click')

    expect(localStorage.getItem('cookieConsent')).toBe('accepted')
    expect(wrapper.find('.cookie-banner').exists()).toBe(false)
  })

  //#3
  test('hides banner when consent is refused', async () => {
    const refuseButton = wrapper.find('.refuse')
    expect(refuseButton.exists()).toBe(true)

    await refuseButton.trigger('click')

    expect(localStorage.getItem('cookieConsent')).toBe('refused')
    expect(wrapper.find('.cookie-banner').exists()).toBe(false)
  })

  //#4
  test('loads script when cookies are accepted', async () => {
    const appendSpy = vi.spyOn(document.head, 'appendChild')

    await wrapper.find('.accept').trigger('click')

    expect(appendSpy).toHaveBeenCalled()
    appendSpy.mockRestore()
  })
})


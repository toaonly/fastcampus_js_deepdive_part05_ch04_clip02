import { expect, vi } from 'vitest'
import db from '../../db/db.json'
import renderApp from '../app'
import api from '../api'

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

describe('app 테스트', () => {
  beforeAll(() => {
    vi.mock('../api.js', () => {
      return {
        default: {
          signin({ id, password } = {}) {
            const user = db.users.find(user => user.id === id && user.password === password)

            if (!user) {
              return Promise.reject(new Error('로그인 실패'))
            }

            return Promise.resolve({ result: true })
          },
        },
      }
    })
  })

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: {
        href: '/',
      },
    })
    document.body.innerHTML = '<div id="app"></div>'
    renderApp()
  })

  describe('form 의 submit 이벤트가 발생했을 경우 테스트', () => {
    it('id, password 가 채워지지 않았을 경우, 아무런 동작을 하지 않는다.', () => {
      const form = document.querySelector('form')
      const spyApiSignin = vi.spyOn(api, 'signin')

      form.onsubmit(new SubmitEvent('submit'))

      expect(spyApiSignin).not.toBeCalled()
    })

    it('id 만 채워졌을 경우, 아무런 동작을 하지 않는다.', () => {
      const form = document.querySelector('form')
      const inputId = document.querySelector('form input[type="text"]')
      const spyApiSignin = vi.spyOn(api, 'signin')

      inputId.value = 'fastcampus_01'
      inputId.dispatchEvent(new InputEvent('input'))
      form.onsubmit(new SubmitEvent('submit'))

      expect(spyApiSignin).not.toBeCalled()
    })

    it('password 만 채워졌을 경우, 아무런 동작을 하지 않는다.', () => {
      const form = document.querySelector('form')
      const inputPassword = document.querySelector('form input[type="password"]')
      const spyApiSignin = vi.spyOn(api, 'signin')

      inputPassword.value = '0000'
      inputPassword.dispatchEvent(new InputEvent('input'))
      form.onsubmit(new SubmitEvent('submit'))

      expect(spyApiSignin).not.toBeCalled()
    })

    it('데이터베이스에 없는 id, password 를 채웠을 경우, 에러가 발생하고 다음 화면으로 넘어가지 않는다', async () => {
      const form = document.querySelector('form')
      const inputId = document.querySelector('form input[type="text"]')
      const inputPassword = document.querySelector('form input[type="password"]')
      const spyApiSignin = vi.spyOn(api, 'signin')

      inputId.value = 'unverified_id'
      inputId.dispatchEvent(new InputEvent('input'))
      inputPassword.value = 'abcd_efgh'
      inputPassword.dispatchEvent(new InputEvent('input'))

      try {
        await form.onsubmit(new SubmitEvent('submit'))
      } catch (error) {
        expect(spyApiSignin).toBeCalled()
        expect(error.message).toBe('로그인 실패')
      }

      expect(location.href).toBe('/')
    })

    it('데이터베이스에 있는 id, password 를 채웠을 경우, 다음 화면으로 이동한다', async () => {
      const form = document.querySelector('form')
      const inputId = document.querySelector('form input[type="text"]')
      const inputPassword = document.querySelector('form input[type="password"]')
      const spyApiSignin = vi.spyOn(api, 'signin')

      inputId.value = db.users[0].id
      inputId.dispatchEvent(new InputEvent('input'))
      inputPassword.value = db.users[0].password
      inputPassword.dispatchEvent(new InputEvent('input'))

      await form.onsubmit(new SubmitEvent('submit'))

      expect(spyApiSignin).toBeCalled()
      expect(location.href).toBe('/main.html')
    })
  })
})

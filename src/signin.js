import createElement from './createElement'
import renderSigninForm from './signinForm'

const CLASSNAME = {
  CONTAINER: 'signin-container',
  get LOGO_WRAPPER() {
    return `${this.CONTAINER}__logo-wrapper`
  },
  get INTRO_WRAPPER() {
    return `${this.CONTAINER}__intro-wrapper`
  },
  get FORM_WRAPPER() {
    return `${this.CONTAINER}__form-wrapper`
  },
  get FORM() {
    return `${this.CONTAINER}__form-wrapper__form`
  },
}

export default function renderSignin() {
  return createElement('div', { className: CLASSNAME.CONTAINER }, [
    createElement('div', { className: CLASSNAME.LOGO_WRAPPER }, [createElement('img', { src: '/logo.svg' }, [])]),
    createElement('div', { className: CLASSNAME.INTRO_WRAPPER }, [
      createElement('div', { className: 'whitespace-pre-line' }, ['인생을 바꾸는 교육,\n패스트캠퍼스.']),
    ]),
    createElement('div', { className: CLASSNAME.FORM_WRAPPER }, [renderSigninForm({ className: CLASSNAME.FORM })]),
  ])
}

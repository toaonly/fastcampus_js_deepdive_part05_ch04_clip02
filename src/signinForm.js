import api from './api'
import createElement from './createElement'

export default function renderSigninForm({ className }) {
  const form = {
    _id: '',
    _password: '',

    set id(id) {
      this._id = id
    },
    get id() {
      return this._id
    },
    set password(password) {
      this._password = password
    },
    get password() {
      return this._password
    },

    toJSON() {
      const { id, password } = this

      return { id, password }
    },
  }
  const onSubmit = async e => {
    e.preventDefault()

    if (!form.id || !form.password) return

    return api.signin(form.toJSON())
  }

  return createElement(
    'form',
    {
      className,
      onsubmit: onSubmit,
    },
    [
      createElement(
        'div',
        {
          className: `${className}__id-wrapper`,
        },
        [
          createElement('input', {
            type: 'text',
            placeholder: '아이디',
            value: form.id,
            required: true,
            oninput: e => (form.id = e.target.value),
          }),
        ]
      ),
      createElement(
        'div',
        {
          className: `${className}__password-wrapper`,
        },
        [
          createElement('input', {
            type: 'password',
            placeholder: '비밀번호',
            autocomplete: true,
            value: form.password,
            required: true,
            oninput: e => (form.password = e.target.value),
          }),
        ]
      ),
      createElement(
        'div',
        {
          className: `${className}__button-wrapper`,
        },
        [createElement('button', {}, ['로그인'])]
      ),
    ]
  )
}

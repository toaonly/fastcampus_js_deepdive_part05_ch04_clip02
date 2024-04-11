import renderSignin from './signin'

export default async function renderApp() {
  const app = document.querySelector('#app')

  app.append(renderSignin())
}

const api = {
  signin({ id, password }) {
    return fetch('http://localhost:3000/user/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, password }),
    })
      .then(res => {
        if (res.status !== 201) {
          throw new Error('로그인 실패')
        }

        return res
      })
      .then(async res => await res.json())
  },
}

export default api

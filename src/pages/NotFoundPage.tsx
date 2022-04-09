import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div>
      <h1>Page not Found</h1>
      <p>
        Чтобы перейти на главную странцу перейдите по <Link to="/">ссылке</Link>.
      </p>
    </div>
  )
}

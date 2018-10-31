
import { Container } from './container'

export function createContainer (map = new Map()) {
  return new Container(map)
}

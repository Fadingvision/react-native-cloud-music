export function handleChange(evt) {
  this.setState({
    [evt.target.name]: evt.target.value
  })
}

export function noop() {}

const throwErr = err => {
  throw err;
};

class Events {
  constructor() {
    this.events = Object.create(null);
  }

  /**
   * add listenr of event
   * @param  {[type]} event  [description]
   * @param  {[type]} handler [description]
   * @return {[type]}         [description]
   */
  on(event, handler) {
    if (Array.isArray(event)) {
      event.forEach(e => this.on(e, handler));
    } else {
      (this.events[event] || (this.events[event] = [])).push(handler);
    }
    return this;
  }

  onceOn(event, handler) {
    if (this.events[event]) return;
    this.on(event, handler);
  }

  once(event, handler) {
    const fn = () => {
      this.off(event, fn);
      handler.call(this);
    };
    this.on(event, fn);
  }

  /**
   * return all the eventNames of this instance
   * @return {array/string} array or string
   */
  eventNames() {
    return Object.keys(this.events);
  }

  off(event, handler) {
    // remove all listeners in all events
    if (!arguments.length) {
      this.events = Object.create(null);
      return this;
    }
    // remove the specific handler of specific event
    const events = this.events[event];
    if (events && handler) {
      events.splice(events.indexOf(handler) >>> 0, 1); // eslint-disable-line
      if (!events.length) delete this.events[event];
      return this;
    }
    // remove the specific event
    if (events) delete this.events[event];
    return this;
  }

  emit(event, ...params) {
    if (!this.events[event]) return false;
    try {
      this.events[event].forEach(handler => handler.apply(this, params));
    } catch (err) {
      if (!this.events.error) this.on('error', throwErr);
      this.emit('error', err);
    }
    return true;
  }
}

export default new Events();

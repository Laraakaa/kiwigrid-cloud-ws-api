class Base {
  constructor(type) {
    this.type = type;
  }

  convertToMessage() {
    const json = JSON.stringify(this);
    const escaped = json.replace(/"/g, '\\"');
    return '["' + escaped + '"]';
  }
}

module.exports = Base;

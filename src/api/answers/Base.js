class Base {
  constructor(msg) {
    if (!msg.startsWith('a[')) {
      throw new Error('Message needs to start with a[');
    }

    const encoded = msg.slice(3, -2);
    const json = encoded.replace(/\\"/g, '"');

    this.data = {
      ...JSON.parse(json)
    };
  }
}

module.exports = Base;

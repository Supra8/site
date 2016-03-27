App.Storage = {

  get: function(Key) {
    return localStorage[Key];
  },

  set: function(Key, Value) {
    localStorage[Key] = Value;
  }

};

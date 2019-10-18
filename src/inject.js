// global: flippingExtMsg

var result; // keep var here for compat
(function(action, payload) {
  switch (action) {
    case 'env':
      const sub = window.location.hostname.match(/^([a-z]*)\.ouicar\.fr$/);
      result = window.location.hostname ===
        'localhost'
        ? 'development'
        : sub && sub[1];
      break;
    case 'read':
      const flipping = localStorage.getItem('flipping');
      result = flipping && JSON.parse(flipping) || {};
      break;
    case 'write':
      localStorage.setItem('flipping', JSON.stringify(payload));
      result = {};
      break;
    case 'delete':
      localStorage.removeItem('flipping');
      result = {};
      break;
    default:
      console.log(`no action given in ${action}`)
  }
})(flippingExtMsg.action || null, flippingExtMsg.payload || null);

result;

// global: flippingExtMsg

console.log(flippingExtMsg)
var result; // keep var here for compat
(function(action, payload) {
  switch (action) {
    case 'read':
      const flipping = localStorage.getItem('flipping');
      result = flipping && JSON.parse(flipping) || {};
      break;
    case 'write':
      localStorage.setItem('flipping', JSON.stringify(payload));
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

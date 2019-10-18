
// chrome plumbering
function getTab(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
    callback(tab[0].id, tab[0].url)
  });
}

function executeScript({action, payload}) {
  return new Promise((resolve, reject) => {
    getTab((tabId) => {
      const exec = chrome.tabs.executeScript;
      exec(tabId, {
        code: `var flippingExtMsg = {action: '${action}', payload: ${JSON.stringify(payload)}};`
      }, () => {
        if (chrome.runtime.lastError) {
          console.log(chrome.runtime.lastError.message)
          reject(chrome.runtime.lastError.message)
          return
        }
        exec(tabId, { file: 'inject.js' }, (response) => {
          resolve(response[0])
        })
      })
    })
  })
}

// helper func
const read = async () => {
  const response = await executeScript({action: 'read', payload: {}})
  console.log('read:', {response})
  return response;
}

const write = async (payload) => {
  const response = await executeScript({action: 'write', payload})
  console.log('write', {response})
  return response
}

const flip = async ({feature, environment}) => {
  console.log('updating', {feature, environment})
  const prevState = await read();
  const nextState = {
    ...prevState,
  }
  nextState[feature][environment] = !nextState[feature][environment]
  write(nextState)
  append(nextState)
}


const render = (payload) => {
  const inner = document.createElement('div')
  inner.className = 'inner'
  Object.keys(payload).forEach(featKey => {
    const feature = document.createElement('div')
    feature.className = 'feature'
    feature.id = featKey
    Object.keys(payload[featKey]).forEach(envKey => {
      const environment = document.createElement('div')
      environment.className = `environment ${payload[featKey][envKey] ? 'active' : ''}`
      environment.id = `${featKey}_${envKey}`
      environment.innerText = featKey // `${featKey}: ${envKey}`
      environment.addEventListener('click', () => {
        flip({feature: featKey, environment: envKey})
      })

      feature.append(environment)
    })
    inner.append(feature)
  })
  return inner
}

const append = (payload) => {
  console.log('append:', {payload})
  const app = document.querySelector('#app')
  while (app.firstChild) {
    app.removeChild(app.firstChild)
  }
  const p = document.createElement('p')
  p.innerHTML = JSON.stringify(payload)
  app.append(render(payload))
  app.append(p)
}

read().then(append)

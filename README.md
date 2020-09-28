<h1 id='summary'>Summary</h1>

- [TODO](#todo)
- [NiceToMeetYou](#nicetomeetyou)
  - [Start Local Server](#start-local-server)
    - [Front-End](#front-end)
  - [Start Production Environment](#start-production-environment)
    - [Front-End](#front-end-1)

# TODO

- [ ] Redirect users to home if not logged in
- [ ] Check joined the room page message logic not to show []
- [ ] Create styled p and pass direction logic
- [ ] create useEffect to delete all event listeners inside videoContainer ref
- [ ] Create room btn and logic
- [ ] Check WebSockets Error => _"WebSocket connection to 'ws://127.0.0.1:3001/socket.io/?EIO=3&transport=websocket&sid=BesaVLCrvbYuTRDyAAAE' failed: Invalid frame header"_
- [x] Proxy Error -> [Solution](https://medium.com/@bryantjiminson/solving-proxy-error-could-not-proxy-request-xxx-from-yyy-from-local-reactjs-app-to-nodejs-app-f28f3548afb9)

# NiceToMeetYou

## Start Local Server

### Front-End

[Go Back to Summary](#summary)

- In `front-end/src/pages/Room/Room.tsx`

  ```JavaScript
    if (store.getState().user) {
        myPeer = new Peer(store.getState().user._id, {
            path: '/peerjs',
            host: '/',
            port: 3001,
        });
    }
  ```

## Start Production Environment

### Front-End

[Go Back to Summary](#summary)

- In `front-end/src/pages/Room/Room.tsx`

  ```JavaScript
    if (store.getState().user) {
        myPeer = new Peer(store.getState().user._id, {
            path: '/peerjs',
            host: url,
            port: 443,
            secure: true,
        });
    }
  ```

- In `front-end/.env.local`

  ```Bash
    REACT_APP_SERVER_URL="<your_app_name_without_https>.herokuapp.com"
  ```

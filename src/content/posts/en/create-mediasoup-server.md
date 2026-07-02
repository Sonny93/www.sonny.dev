---
title: "How to build a Mediasoup server"
description: "Steps to build a Mediasoup server: device, produce/consume transports."
tags: ["webrtc","mediasoup","nodejs"]
publishedAt: 2024-02-24
lang: "en"
urlSlug: "create-mediasoup-server"
---
### To build a mediasoup server, follow these steps

- _Detailed steps below_

### Create a device

- You need to fetch the `rtpCapabilities` exposed by the Router
- Then on the client side, call Device.load with the `router.rtpCapabilities` you just fetched

### Create a transport to produce:

- First create a server-side transport **important**: router.createWebRtcTransport()
- Then on the client, create the device via `new Device()` and load `routerRtpCapabilities` via `newDevice.load({ routerRtpCapabilities })`
- Then create the client-side transport via: device.createSendTransport()
  - On the client, you must subscribe to the connect and produce events
    - Connect: when the event fires client-side, send the `dtlsParameters` exposed by `transport.once("connect")` on the client
      - Once the response is received, call callback() or errback()
    - Produce: when the event fires client-side, send `kind` and `rtpParameters` exposed by `transport.once("produce")` on the client
      - Once the response is received, call `callback({ id: produceId })` or errback()
- To trigger these events, create a stream (audio or video -> getUserMedia or other) then call the `transport.produce` method

```ts
const videoTrack = stream.getTracks()[0];
transport.produce({ track: videoTrack });
```

### Create a transport to consume:

- First create a server-side transport **important**: router.createWebRtcTransport()
- Then on the client, create the device via `new Device()` and load `routerRtpCapabilities` via `newDevice.load({ routerRtpCapabilities })`
- Then create the client-side transport via: device.createRecvTransport()
  - On the client, you must subscribe to the connect event
    - Connect: when the event fires client-side, send the `dtlsParameters` exposed by `transport.once("connect")` on the client
- To trigger this event and consume the transport emitting the stream, send `clientRtpCapabilities` and `producerId`
- On the backend, check that the user can actually consume the stream via:

```ts
router.canConsume({
	producerId,
	rtpCapabilities: clientRtpCapabilities,
});
```

- Once this step is done, consume the `producerId` and `clientRtpCapabilities` on the backend, then return `consumer.id` and `consumer.rtpParameters`
- On the frontend, use these two parameters returned from the backend to consume the stream client-side:

```ts
const consumer = await transport.consume({
	id: consumerId, // consumer.id returned by the backend; consumer = the backend's
	producerId,
	rtpParameters, // consumer.rtpParameters returned by the backend; consumer = the backend's
	kind: 'video',
});
```

- Finally, grab the track via `consumer.track` (frontend side), which you can use like this:

```ts
const stream = new MediaStream([consumer.track]);
videoRef.current.srcObject = stream;
```

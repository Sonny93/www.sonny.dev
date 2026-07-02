---
title: "Comment créer un serveur Mediasoup"
description: "Étapes pour créer un serveur Mediasoup : device, transports produce/consume."
tags: ["webrtc","mediasoup","nodejs"]
publishedAt: 2024-02-24
---
### Pour créer un serveur mediasoup il faut suivre ces étapes

- _Détailler la marche à suivre_

### Créer un device

- Il faut récupérer le `rtpCapabilities` exposé par le Router
- Puis il faut Device.load côté client avec le `router.rtpCapabilities` qu'on vient de récupérer

### Créer un transport pour produce :

- Créer un transport côté serveur en premier **important** : router.createWebRtcTransport()
- Puis on créer côté client le device via `new Device()` puis on load le `routerRtpCapabilities` via `newDevice.load({ routerRtpCapabilities })`
- Ensuite on créer le transport front via : device.createSendTransport()
  - Côté client on doit s'abonner à l'event connect et l'event produce
    - Connect : Quand l'event est déclanché côté client, il faut envoyer `dtlsParameters` exposé par `transport.once("connect")` côté client
      - Une fois la réponse reçue, il faut appeler callback() ou errback()
    - Produce : Quand l'event est déclanché côté client, il faut envoyer `kind` et `rtpParameters` exposés par `transport.once("produce")` côté client
      - Une fois la réponse reçue, il faut appeler `callback({ id: produceId \})` ou errback()
- Pour déclancher ces events, il faut créer un stream (audio ou video -> getUserMedia ou autre) puis appeler la méthode `transport.produce`

```ts
const videoTrack = stream.getTracks()[0];
transport.produce({ track: videoTrack });
```

### Créer un transport pour consume :

- Créer un transport côté serveur en premier **important** : router.createWebRtcTransport()
- Puis on créer côté client le device via `new Device()` puis on load le `routerRtpCapabilities` via `newDevice.load({ routerRtpCapabilities })`
- Ensuite on créer le transport front via : device.createRecvTransport()
  - Côté client on doit s'abonner à l'event connect
    - Connect : Quand l'event est déclanché côté client, il faut envoyer `dtlsParameters` exposé par `transport.once("connect")` côté client
- Pour déclancher cet event et consumer le transport qui emet le flux, il faut envoyer `clientRtpCapabilities` et `producerId`
- Côté back il faut vérifier que le user peut bien consumer le flux via :

```ts
router.canConsume({
	producerId,
	rtpCapabilities: clientRtpCapabilities,
});
```

- Une fois cette étape terminée, on peut consume côté back le `producerId` et `clientRtpCapabilities` puis renvoyer `consumer.id` et `consumer.rtpParameters`
- Côté front, on utilise les deux paramètres que nous venons de retourner du back, pour consumer côté client, le flux :

```ts
const consumer = await transport.consume({
	id: consumerId, // consumer.id renvoyé par le back; consumer = celui du back
	producerId,
	rtpParameters, // consumer.rtpParameters renvoyé par le back; consumer = celui du back
	kind: 'video',
});
```

- Et pour finir, on récupérer le track via `consumer.track` (côté front) que l'on peut utiliser de cette façon :

```ts
const stream = new MediaStream([consumer.track]);
videoRef.current.srcObject = stream;
```

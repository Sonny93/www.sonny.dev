## Linux

- cgroups : permet de limiter l'utilisation des resources pour des process (exemple : permet de bloquer les bombes fork)
- créer un alias : `alias k='kubectl'`

### Détacher un process

- détacher une commande bloquante : `la_commande &`
- `fg` pour récupérer le focus sur le process
- `ctrl+z` pour mettre en pause le process
- `bg` pour repasser le process en arrière-plan

## Outils pour kubernetes

- Pour changer d'environnement kube : `kubectx`
- Pour changer de namespace (sans devoir les spécifier dans chaque commande kubectl) : `kubens`
- Pour changer le context par défaut `kubectl config use-context <context>`

## Debug/dashboard minikube

En local avec minikube, nous pouvons activer un dashboard de contrôle

```bash
# activer les metrics du serveur
minikube addons enable metrics-server
# activer le dashboard
minikube dashboard
```

## Kube

### Explain

Pour obtenir des explications sur des (sous) commandes

```bash
k explain <command>.<subcommand>.<sub...>
```

### Pods

- "Objet" que sait manipuler Kube
- Contient au moins un container
- Les pods sont créés/manipulés par des déploiements
- Pour récupérer un pod via son label

```bash
k get pods -l app=mailpit
```

### Déploiement

- Les déploiements permettent de gérer le rolling update : on attend que le nouveau pod soit health avant de kills les anciennes versions
- Quand on supprime un déploiement, on supprime tous les pods qui en dépendent
- Pour créer un déploiement

```bash
k create deployment mailpit --image=docker.io/axllent/mailpit:v1.14.0
```

- Pour garder une trace de notre déploiement, on peut récupérer le yaml final

```bash
k create deployment mailpit --image=docker.io/axllent/mailpit:v1.14.0 --dry-run=client -o yaml > deployment.yml
```

- pour récupérer l'output d'un deployment kube

```bash
k get deployment maimpit -o yaml > deployment2.yml
```

- rollout annuler un deployment

```bash
k rollout undo deployment mailpit --to-revision=1
```

- pour scaller le nombre de pods

```bash
k scale deployment mailpit --replicas 5
```

### Namespace

- Récupérer un namespace

```bash
k get ns
```

- Créer un namespace

```bash
k create ns <nom_du_namespace>
```

- Créer un deployment dans un namespace précis

```bash
k -n ns_sonny create deployment mailpit --image=docker.io/axllent/mailpit:v1.14.0 --dry-run=client -o yaml > deployment.yml
```

- Récupérer tous les pods de tous les namespaces

```bash
k get pods --all-namespaces
```

### Service

Un service permet d'exposer notre applicatif

- Pour générer notre service :

```bash
k expose deployment/mailpit --port 8025 --dry-run=client -o yaml > mailpit_service.yml
```

- Pour vérifier l'état de nos services

```bash
k get svc
```

- Pour créer un port-forward vers un pod/service

```bash
k port-forward service/mailpit 8025
```

### Healthcheck

- startupProbe
  - On attend le démarrage de l'applicatif
  - Bloque les autres probes
  - One time
  - Kube redémarre le container si y'a un problème
- livenessProbe
  - Vérifie que l'app est en vie
  - Kube redémarre le container si y'a un problème
- readinessProbe
  - Prêt à recevoir du traffic
  - Kube supprime le container du service si y'a un problème

### Reverse Proxy (ingress)

- (Spécifique à minikune) Pour activer l'addon ingress pour minikube

```bash
minikube addons enable ingress
```

- Vérifier l'état des pods et services de l'ingress

```bash
kubectl -n ingress-nginx get pod,svc
```

- Récupérer les informations de l'ingress

```bash
k get ingress
```

### Secret / ConfigMap

#### ConfigMap

- Permet de stocker des variables d'environnement qui pourront être utilisées pour l'applicatif.
- Les données ne sont pas encodées ni chiffrées

#### Secret

- Permet de stocker des variables d'environnement qui contiennent des données sensibles.
- Attention cependant, les données sont juste encodées, elles ne sont pas chiffrées.

Exemple de secretMap

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: mailpit-secret
stringData: # données encodées après apply, sinon il faut utiliser data et encoder manuellement la donnée
  MP_UI_AUTH: sonny:coucou
```

Pour appliquer cette secretMap, il faut utiliser cette commande

```bash
k get secret mailpit-secret -o yaml
```

### StatefulSet

Les stateful-set sont des objets kube généralement réservés pour les bases de données ou ce genre de process, pour lancer un seul pod.

Cela permet d'éviter les conflits : si deux bases de données lisent/enregistrent des données sur le même fichier en même temps, y'aura des conflits.

Ça fonctionne totalement différemment d'un deployment, pas de rolling update, donc si le pod crash, on doit le redémarrer à la mano.

- Pour appliquer un StatefulSet

```bash
k apply -f statefulset.yml
```

- Pour redémarrer le StatefulSet

```bash
k rollout restart statefulset postgres
```

> C'est compliqué tout ça, vaut mieux utiliser ce qui a été fait par d'autres personnes !

### PVC

Volume permettant de stocker des données, de base ne sont pas persistant, attention à bien les configurer.

## Helm

Créer un nouveau Chart Helm

```bash
helm create <nom_du_chart_helm>
```

Installer le Chart Helm

```bash
helm install <nom> <nom_du_chart_helm>
```

Mettre à jour un Chart Helm déjà existant

```bash
helm upgrade <name> <nom_du_chart_helm>
```

Voir les changements avant d'appliquer (nécessite helm-diff)

```bash
helm diff --debug upgrade test mailpit -f mailpit/values.yaml --context 5
```

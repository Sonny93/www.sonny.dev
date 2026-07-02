---
title: "Quelques pro tips pour kubernetes"
description: "Quelques astuces pour mieux utiliser kubernetes : kubectl, helm, best practices, etc."
tags: ["kubernetes","devops","linux"]
publishedAt: 2024-02-29
---
# Kubernetes & Minikube

## 1. Outils CLI

### kubectl (alias recommandé)

```bash
alias k='kubectl'
```

### Gestion des contextes

```bash
kubectl config use-context <context>
```

Outils utiles :

- `kubectx` : changer de cluster rapidement
- `kubens` : changer de namespace courant

## 2. Minikube (local)

### Activer les metrics

```bash
minikube addons enable metrics-server
```

### Dashboard

```bash
minikube dashboard
```

### Ingress (Minikube)

```bash
minikube addons enable ingress
```

Vérification :

```bash
kubectl -n ingress-nginx get pods,svc
```

## 3. Exploration & Debug

### Documentation interne

```bash
k explain pod.spec.containers
```

### Commandes utiles

```bash
k get all
k describe <resource> <name>
k logs <pod>
k exec -it <pod> -- sh
```

## 4. Objets principaux

### 4.1 Pods

- Plus petite unité Kubernetes
- Contient un ou plusieurs containers
- Éphémère
- Rarement manipulé directement

```bash
k get pods
k get pods -l app=mailpit
```

### 4.2 Deployment

#### Rôle

- Gérer les pods
- Assurer la haute dispo
- Rolling updates

#### Création

```bash
k create deployment mailpit --image=docker.io/axllent/mailpit:v1.14.0
```

#### Générer YAML

```bash
k create deployment mailpit \
  --image=docker.io/axllent/mailpit:v1.14.0 \
  --dry-run=client -o yaml > deployment.yaml
```

#### Scaling

```bash
k scale deployment mailpit --replicas=5
```

#### Rollback

```bash
k rollout undo deployment mailpit --to-revision=1
```

#### Historique

```bash
k rollout history deployment mailpit
```

### 4.3 Namespace

#### Lister

```bash
k get ns
```

#### Créer

```bash
k create ns mon-namespace
```

#### Utilisation

```bash
k -n mon-namespace get pods
```

#### Tous les namespaces

```bash
k get pods --all-namespaces
```

### 4.4 Service

#### Rôle

Expose les pods

Types principaux :

- ClusterIP (interne)
- NodePort
- LoadBalancer

#### Génération

```bash
k expose deployment/mailpit \
  --port=8025 \
  --dry-run=client -o yaml > service.yaml
```

#### Lister

```bash
k get svc
```

#### Port-forward

```bash
k port-forward service/mailpit 8025:8025
```

### 4.5 Ingress

#### Rôle

- Reverse proxy HTTP/HTTPS
- Routage par domaine / path
- TLS

#### Lister

```bash
k get ingress
```

### 4.6 ConfigMap

- Stockage de configuration
- Non chiffré

### 4.7 Secret

- Données sensibles
- Encodées en base64 (⚠️ pas du chiffrement)

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: mailpit-secret
stringData:
  MP_UI_AUTH: user:password
```

#### Appliquer

```bash
k apply -f secret.yaml
```

#### Lire

```bash
k get secret mailpit-secret -o yaml
```

### 4.8 StatefulSet

#### Usage

- Bases de données
- Applications avec état

#### Caractéristiques

- Identité stable
- Stockage persistant
- Déploiement ordonné
- Pas équivalent à Deployment

#### Appliquer

```bash
k apply -f statefulset.yaml
```

#### Restart

```bash
k rollout restart statefulset postgres
```

### 4.9 Volumes & PVC

#### Problème

Les pods perdent leurs données

#### Solution

- PersistentVolume (PV)
- PersistentVolumeClaim (PVC)

#### Exemple (structure)

```yaml
kind: PersistentVolumeClaim
```

## 5. Healthchecks (Probes)

### startupProbe

- Vérifie le démarrage
- Bloque les autres probes

### livenessProbe

- Vérifie que l’app tourne
- Redémarre si nécessaire

### readinessProbe

- Vérifie si l’app peut recevoir du trafic
- Retire du service si KO

## 6. Opérations courantes

### Appliquer une config

```bash
k apply -f file.yaml
```

### Supprimer

```bash
k delete -f file.yaml
```

### Supprimer une ressource

```bash
k delete pod <pod>
```

## 7. Helm

### Rôle

Gestionnaire de packages Kubernetes

### Créer un chart

```bash
helm create mon-chart
```

### Installer

```bash
helm install mon-app mon-chart
```

### Upgrade

```bash
helm upgrade mon-app mon-chart
```

### Diff (plugin helm-diff)

```bash
helm diff upgrade mon-app mon-chart -f values.yaml
```

### Désinstaller

```bash
helm uninstall mon-app
```

## 8. Bonnes pratiques

- Versionner tous les YAML
- Ne jamais utiliser `latest`
- Définir `requests` et `limits`
- Utiliser des probes correctement
- Séparer les environnements via namespaces
- Externaliser la config (ConfigMap / Secret)
- Utiliser Helm ou Kustomize pour industrialiser

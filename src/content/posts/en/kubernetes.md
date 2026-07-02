---
title: "A few Kubernetes pro tips"
description: "A few tips to get more out of Kubernetes: kubectl, helm, best practices, etc."
tags: ["kubernetes","devops","linux"]
publishedAt: 2024-02-29
lang: "en"
urlSlug: "kubernetes"
---
# Kubernetes & Minikube

## 1. CLI tools

### kubectl (recommended alias)

```bash
alias k='kubectl'
```

### Context management

```bash
kubectl config use-context <context>
```

Useful tools:

- `kubectx`: quickly switch clusters
- `kubens`: switch current namespace

## 2. Minikube (local)

### Enable metrics

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

Verify:

```bash
kubectl -n ingress-nginx get pods,svc
```

## 3. Exploration & Debug

### Built-in documentation

```bash
k explain pod.spec.containers
```

### Useful commands

```bash
k get all
k describe <resource> <name>
k logs <pod>
k exec -it <pod> -- sh
```

## 4. Core objects

### 4.1 Pods

- Smallest Kubernetes unit
- Contains one or more containers
- Ephemeral
- Rarely handled directly

```bash
k get pods
k get pods -l app=mailpit
```

### 4.2 Deployment

#### Role

- Manage pods
- Ensure high availability
- Rolling updates

#### Creation

```bash
k create deployment mailpit --image=docker.io/axllent/mailpit:v1.14.0
```

#### Generate YAML

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

#### History

```bash
k rollout history deployment mailpit
```

### 4.3 Namespace

#### List

```bash
k get ns
```

#### Create

```bash
k create ns my-namespace
```

#### Usage

```bash
k -n my-namespace get pods
```

#### All namespaces

```bash
k get pods --all-namespaces
```

### 4.4 Service

#### Role

Exposes pods

Main types:

- ClusterIP (internal)
- NodePort
- LoadBalancer

#### Generation

```bash
k expose deployment/mailpit \
  --port=8025 \
  --dry-run=client -o yaml > service.yaml
```

#### List

```bash
k get svc
```

#### Port-forward

```bash
k port-forward service/mailpit 8025:8025
```

### 4.5 Ingress

#### Role

- HTTP/HTTPS reverse proxy
- Routing by domain / path
- TLS

#### List

```bash
k get ingress
```

### 4.6 ConfigMap

- Configuration storage
- Not encrypted

### 4.7 Secret

- Sensitive data
- Base64 encoded (⚠️ not encryption)

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: mailpit-secret
stringData:
  MP_UI_AUTH: user:password
```

#### Apply

```bash
k apply -f secret.yaml
```

#### Read

```bash
k get secret mailpit-secret -o yaml
```

### 4.8 StatefulSet

#### Usage

- Databases
- Stateful applications

#### Characteristics

- Stable identity
- Persistent storage
- Ordered deployment
- Not a Deployment equivalent

#### Apply

```bash
k apply -f statefulset.yaml
```

#### Restart

```bash
k rollout restart statefulset postgres
```

### 4.9 Volumes & PVC

#### Problem

Pods lose their data

#### Solution

- PersistentVolume (PV)
- PersistentVolumeClaim (PVC)

#### Example (structure)

```yaml
kind: PersistentVolumeClaim
```

## 5. Healthchecks (Probes)

### startupProbe

- Checks startup
- Blocks other probes

### livenessProbe

- Checks the app is running
- Restarts if needed

### readinessProbe

- Checks if the app can receive traffic
- Removed from service if failing

## 6. Common operations

### Apply a config

```bash
k apply -f file.yaml
```

### Delete

```bash
k delete -f file.yaml
```

### Delete a resource

```bash
k delete pod <pod>
```

## 7. Helm

### Role

Kubernetes package manager

### Create a chart

```bash
helm create my-chart
```

### Install

```bash
helm install my-app my-chart
```

### Upgrade

```bash
helm upgrade my-app my-chart
```

### Diff (helm-diff plugin)

```bash
helm diff upgrade my-app my-chart -f values.yaml
```

### Uninstall

```bash
helm uninstall my-app
```

## 8. Best practices

- Version all YAML files
- Never use `latest`
- Define `requests` and `limits`
- Use probes correctly
- Separate environments via namespaces
- Externalize config (ConfigMap / Secret)
- Use Helm or Kustomize to industrialize

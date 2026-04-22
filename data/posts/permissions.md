# Gestion des permissions sous Linux

⚠️ **Attention** : une mauvaise gestion des permissions peut exposer vos fichiers à des accès non autorisés. Évitez les permissions trop permissives comme `chmod 777`.

---

## 1. Types de permissions

Les permissions Linux sont basées sur trois droits fondamentaux :

- **Read (r)** → valeur **4** : lecture du fichier
- **Write (w)** → valeur **2** : modification du fichier
- **Execute (x)** → valeur **1** : exécution du fichier

---

## 2. Catégories d’utilisateurs

Les permissions sont attribuées à trois types d’utilisateurs :

- **User (u)** : propriétaire du fichier
- **Group (g)** : groupe associé
- **Other (o)** : tous les autres utilisateurs

---

## 3. Modifier les permissions avec `chmod`

### Syntaxe générale

```bash
chmod <valeur> <fichier>
```

### Exemple en notation numérique

```bash
chmod 755 fichier.sh
```

Correspondance :

- **User** : 7 → (4+2+1) → lecture, écriture, exécution
- **Group** : 5 → (4+1) → lecture, exécution
- **Other** : 5 → (4+1) → lecture, exécution

---

## 4. Notation littérale (symbolique)

Syntaxe :

```bash
chmod [ugoa][+-=][rwx] <fichier>
```

Exemple équivalent à `755` :

```bash
chmod u+rwx,g+rx,o+rx fichier.sh
```

Explication :

- `u+rwx` : tous les droits pour le propriétaire
- `g+rx` : lecture + exécution pour le groupe
- `o+rx` : lecture + exécution pour les autres

💡 Contrairement à l’exemple initial, `g+wx` et `o+w` étaient incorrects.

---

## 5. Modification récursive

Pour appliquer des permissions à un dossier et tout son contenu :

```bash
chmod -R u+rwx,g+rx,o+rx dossier/
```

⚠️ Utiliser `-R` (majuscule), pas `-r`.

---

## 6. Sticky Bit

Le **sticky bit** limite la suppression des fichiers dans un dossier partagé.

### Exemple :

```bash
chmod 1777 /tmp
```

- Le `1` en début = sticky bit
- Les fichiers peuvent être créés par tous
- **Seul le propriétaire peut supprimer ses fichiers**

C’est le cas du dossier `/tmp`.

---

## 7. Setuid et Setgid

⚠️ À ne pas confondre avec le sticky bit.

### Setuid (SUID)

```bash
chmod u+s fichier
```

- Le programme s’exécute avec les droits du propriétaire (souvent root)
- Exemple : `/usr/bin/passwd`

### Setgid (SGID)

```bash
chmod g+s dossier
```

- Les fichiers créés héritent du groupe du dossier

---

## 8. Afficher les permissions

```bash
ls -l fichier
```

Exemple :

```
-rwxr-xr-x 1 user group 1234 fichier
```

Lecture :

- `-` : type (fichier)
- `rwx` : user
- `r-x` : group
- `r-x` : other

---

## 9. Commandes utiles

### `type`

Permet de localiser une commande :

```bash
type ls
```

---

### `man`

Documentation des commandes :

```bash
man 5 passwd
```

Le chiffre correspond à une section :

- 1 : commandes utilisateur
- 5 : formats de fichiers
- 8 : administration système

---

### `touch`

```bash
touch fichier.txt
```

- Crée un fichier s’il n’existe pas
- Met à jour la date sinon

---

### `ls -ltr`

Liste les fichiers :

- `-l` : détails
- `-t` : tri par date
- `-r` : ordre inversé

---

### `getent`

Récupère des informations système :

```bash
getent passwd
```

---

## 10. Fichiers sensibles

### `/etc/shadow`

- Contient les mots de passe hashés
- Accessible uniquement par **root**

---

## 11. Gestion des droits administrateur

### `su`

```bash
su -
```

- Permet de devenir root
- Nécessite le mot de passe root

### `sudo`

```bash
sudo su -
```

- Fonctionne si l’utilisateur est dans `/etc/sudoers`

---

## 12. Permissions par défaut : `umask`

Définit les permissions par défaut lors de la création :

```bash
umask
```

Exemple :

- `022` → fichiers en `644`, dossiers en `755`

---

## 13. Lien symbolique

- Un lien symbolique a généralement **tous les droits affichés**
- Mais les permissions réelles dépendent du fichier cible

---

## 14. Cas particulier : `/tmp`

- Permissions : `drwxrwxrwt`
- Le `t` indique le sticky bit
- Tous peuvent écrire, mais pas supprimer les fichiers des autres

---

## 15. Mémoire swap

- Zone disque utilisée comme extension de la RAM
- Située sur le disque dur
- Gérée automatiquement par le système

---

## Conclusion

Une bonne gestion des permissions repose sur :

- Donner **le minimum nécessaire**
- Éviter `777`
- Comprendre les bits spéciaux (SUID, SGID, sticky)

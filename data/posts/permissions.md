Attention : ne faites pas n'importe quoi avec les permissions de vos fichiers, une personne malveillante pourrait accèder, modifier ou exécuter des fichiers sans votre autorisation ! Donc on évite les chmod 777 et compagnie :)

Les droits linux sont divisés en 3 parties :

- **Read** - valeur binaire : **4** -> droit de lecture
- **Write** - valeur binaire : **2** -> droit d'écriture
- **X'ecution** - valeur binaire : **1** -> droit d'exécution

Pour définir les permissions d'un fichier ou d'un dossier, on utilise la commande `chmod` (exemple : `chmod <valeur> <nom_du_fichier>`)

La `valeur` correspond aux droits que l'on souhaite attribuer pour : **U**ser (*propriétaire*) / **G**roup / **O**ther (*le reste du monde*)

Si je souhaite donner **tous les doits** à l'**auteur** du fichier, les droits de **lecture** et d'**exécution** au **groupe** de l'auteur et uniquement le droit de **lecture** pour les **autres utilisateurs**, on peut s'y prendre de deux façons :

Via la valeur binaire des droits : `chmod 755 <nom_du_fichier>` -> 755 correspond à :
- User : tous les droits (4 + 2 + 1)
- Group : droits de lecture et d'exécution (4 + 0 + 1)
- Other : droits de lecture et d'exécution (4 + 0 + 1)

Cette écriture peut poser problème, il est donc préférable d'utiliser la version "littérale".

La deuxième écriture est la suivante : `chmod u+rwx,g+wx,o+w` :
- `u+rwx` correspond aux droits de **lecture**, **écriture** et d'**exécution** pour le ***USER***
- `g+rx` correspond aux droits de **lecture** et d'**exécution** pour le ***GROUP***
- `o+rx` correspond aux droits de **lecture** et d'**exécution** pour le ***GROUP***

### Changement récursif

Plutôt que de modifier les permissions des fichiers et dossiers contenus dans un même dossier, vous pouvez effectuer ce changement de façon récursif.

Pour cela il vous suffit de faire comme cela : `chmod -r u+rwx,g+wx,o+w <nom_du_dossier>`

### Sticky bit

> À venir


Dans certains cas lorsque vous vérifiez les permissions d'un fichier, vous voyez parfois ceci `1755`. Le `1` au début correspond au sticky bit, c'est à dire

man **number** commande : number -> version différente (permet d'avoir plusieurs descriptions d'une (sub)commande pour dev/admin-sys/etc.

**type** pour l'occaliser un binaire

`chmod 1755` ou U+S -> sticky bit -> le propriétaire du fichier se fait passer pour root (c'est dangereux)

mot de passes stockés dans `/etc/shadow` (y'a que root qui peut lire)

`ls -l <nom du fichier>` pour avoir toutes les infos, human friendly, d'un fichier

par défaut un lien symbolique à tous les droits

ls -ltr

getent

root sans password `su -` ça marche po, `sudo su -` ça marche si mon user est dans le fichier /etc/sudoers

touch pour créer un fichier ___ou___ mettre à jour la date du fichier

umask -> permission par défaut d'un répertoire (pour la session en cours)

dossier tmp -> les fichiers créés sont protégés, seul l'auteur peut modifier, supprimer un fichier/dossier RWX**T**

mémoire swap -> stocké sur le DD
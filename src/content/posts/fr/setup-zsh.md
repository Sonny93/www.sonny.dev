---
title: 'Installation et configuration basique de ZSH'
description: 'Installer et configurer ZSH avec oh-my-zsh, autosuggestions et Tabby.'
tags: ['zsh', 'linux', 'terminal']
publishedAt: 2024-02-27
lang: 'fr'
urlSlug: 'setup-zsh'
---

## Git

Pour télécharger et installer ZSH, il nous faut d'abord installet git et curl

```bash
sudo apt install git curl
```

## ZSH

Les commandes proviennent de cette [source](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH)

```bash
# Installer ZSH
sudo apt install zsh
# Définir ZSH par défaut
chsh -s $(which zsh)
# Installer oh-my-zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## ZSH Autosuggestions

Les commandes viennent de cette [source](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md#oh-my-zsh)

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

Puis modifier le fichier `~/.zshrc`

```bash
plugins=(
  # Autres plugins...
  # Ne pas mettre de `,` pour séparer la liste des plugins
  zsh-autosuggestions
)
```

## Thème ZSH

Pour changer de [thème ZSH](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes), il suffit d'éditer le fichier `.zshrc`

```bash
nano ~/.zshrc

# Puis modifier la ligne suivante avec le nom du thème souhaité
ZSH_THEME="amuse"
```

## Tabby

Bien que le terminal par défaut d'Ubuntu soit fonctionnel, je préfère utiliser [Tabby](https://tabby.sh/) qui correspond davantage à mes besoins.

Pour l'installer, il faut [télécharger](https://github.com/Eugeny/tabby/releases) le fichier qui correspond à son archi (exemple: tabby-XXX-linux-x64.deb), puis l'installer via la commande suivante :

```shell
sudo apt install ./tabby-XXX-linux-x64.deb
```

## Changer le terminal par défaut (Gnome)

Une fois tabby (ou autre terminal) installé, nous allons le définir comme étant le terminal par défaut.

Les commandes proviennent de [cette source](https://github.com/Eugeny/tabby/discussions/6266#discussioncomment-3109933)

```shell
gsettings set org.gnome.desktop.default-applications.terminal exec /usr/bin/tabby
gsettings set org.gnome.desktop.default-applications.terminal exec-arg "-x"
```

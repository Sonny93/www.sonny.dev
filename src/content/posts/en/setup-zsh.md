---
title: 'Basic ZSH installation and configuration'
description: 'Install and configure ZSH with oh-my-zsh, autosuggestions and Tabby.'
tags: ['zsh', 'linux', 'terminal']
publishedAt: 2024-02-27
lang: 'en'
urlSlug: 'setup-zsh'
---

## Git

To download and install ZSH, we first need to install git and curl

```bash
sudo apt install git curl
```

## ZSH

Commands come from this [source](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH)

```bash
# Install ZSH
sudo apt install zsh
# Set ZSH as default shell
chsh -s $(which zsh)
# Install oh-my-zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## ZSH Autosuggestions

Commands come from this [source](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md#oh-my-zsh)

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

Then edit the `~/.zshrc` file

```bash
plugins=(
  # Other plugins...
  # Do not use `,` to separate the plugin list
  zsh-autosuggestions
)
```

## ZSH Theme

To change [ZSH theme](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes), just edit the `.zshrc` file

```bash
nano ~/.zshrc

# Then update the following line with the theme name you want
ZSH_THEME="amuse"
```

## Tabby

Although Ubuntu's default terminal is functional, I prefer using [Tabby](https://tabby.sh/) which better fits my needs.

To install it, [download](https://github.com/Eugeny/tabby/releases) the file matching your architecture (e.g. tabby-XXX-linux-x64.deb), then install it with the following command:

```shell
sudo apt install ./tabby-XXX-linux-x64.deb
```

## Changing the default terminal (Gnome)

Once tabby (or another terminal) is installed, let's set it as the default terminal.

Commands come from [this source](https://github.com/Eugeny/tabby/discussions/6266#discussioncomment-3109933)

```shell
gsettings set org.gnome.desktop.default-applications.terminal exec /usr/bin/tabby
gsettings set org.gnome.desktop.default-applications.terminal exec-arg "-x"
```

---
title: 'Linux permissions — how do they work?'
description: 'How permissions work on Linux filesystems (chmod, sticky bit, etc.).'
tags: ['linux', 'chmod', 'security']
publishedAt: 2024-02-16
lang: 'en'
urlSlug: 'permissions'
---

# Managing permissions on Linux

⚠️ **Warning**: poorly managed permissions can expose your files to unauthorized access. Avoid overly permissive settings like `chmod 777`.

---

## 1. Permission types

Linux permissions rest on three fundamental rights:

- **Read (r)** → value **4**: read the file
- **Write (w)** → value **2**: modify the file
- **Execute (x)** → value **1**: execute the file

---

## 2. User categories

Permissions are assigned to three types of users:

- **User (u)**: file owner
- **Group (g)**: associated group
- **Other (o)**: everyone else

---

## 3. Changing permissions with `chmod`

### General syntax

```bash
chmod <value> <file>
```

### Example in numeric notation

```bash
chmod 755 file.sh
```

Breakdown:

- **User**: 7 → (4+2+1) → read, write, execute
- **Group**: 5 → (4+1) → read, execute
- **Other**: 5 → (4+1) → read, execute

---

## 4. Symbolic notation

Syntax:

```bash
chmod [ugoa][+-=][rwx] <file>
```

Example equivalent to `755`:

```bash
chmod u+rwx,g+rx,o+rx file.sh
```

Explanation:

- `u+rwx`: all rights for the owner
- `g+rx`: read + execute for the group
- `o+rx`: read + execute for others

💡 Unlike the initial example, `g+wx` and `o+w` would be incorrect here.

---

## 5. Recursive changes

To apply permissions to a folder and all its contents:

```bash
chmod -R u+rwx,g+rx,o+rx folder/
```

⚠️ Use `-R` (uppercase), not `-r`.

---

## 6. Sticky Bit

The **sticky bit** restricts file deletion in a shared folder.

### Example:

```bash
chmod 1777 /tmp
```

- The leading `1` = sticky bit
- Files can be created by anyone
- **Only the owner can delete their own files**

This is exactly the case for `/tmp`.

---

## 7. Setuid and Setgid

⚠️ Not to be confused with the sticky bit.

### Setuid (SUID)

```bash
chmod u+s file
```

- The program runs with the owner's rights (often root)
- Example: `/usr/bin/passwd`

### Setgid (SGID)

```bash
chmod g+s folder
```

- Files created inherit the folder's group

---

## 8. Displaying permissions

```bash
ls -l file
```

Example:

```
-rwxr-xr-x 1 user group 1234 file
```

Reading it:

- `-`: type (file)
- `rwx`: user
- `r-x`: group
- `r-x`: other

---

## 9. Useful commands

### `type`

Locate a command:

```bash
type ls
```

---

### `man`

Command documentation:

```bash
man 5 passwd
```

The number refers to a section:

- 1: user commands
- 5: file formats
- 8: system administration

---

### `touch`

```bash
touch file.txt
```

- Creates the file if it doesn't exist
- Updates the timestamp otherwise

---

### `ls -ltr`

Lists files:

- `-l`: details
- `-t`: sort by date
- `-r`: reverse order

---

### `getent`

Fetch system information:

```bash
getent passwd
```

---

## 10. Sensitive files

### `/etc/shadow`

- Contains hashed passwords
- Accessible only by **root**

---

## 11. Administrator rights

### `su`

```bash
su -
```

- Switch to root
- Requires the root password

### `sudo`

```bash
sudo su -
```

- Works if the user is listed in `/etc/sudoers`

---

## 12. Default permissions: `umask`

Sets default permissions on creation:

```bash
umask
```

Example:

- `022` → files at `644`, folders at `755`

---

## 13. Symbolic links

- A symbolic link usually shows **all permissions**
- But actual permissions depend on the target file

---

## 14. Special case: `/tmp`

- Permissions: `drwxrwxrwt`
- The `t` marks the sticky bit
- Everyone can write, but not delete others' files

---

## 15. Swap memory

- Disk area used as RAM extension
- Located on the hard drive
- Managed automatically by the system

---

## Conclusion

Solid permission management rests on:

- Granting **the minimum necessary**
- Avoiding `777`
- Understanding special bits (SUID, SGID, sticky)

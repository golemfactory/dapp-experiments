```bash
sh ▶ ls -al
total 4
drwx------   1 root root   80 Feb  8 11:35 .
drwx------   1 root root   80 Feb  8 11:35 ..
-rw-r--r--   1 root root   21 Jan  1  1970 .cmd
-rwxr-xr-x   1 root root    0 Feb  8 11:18 .dockerenv
-rw-r--r--   1 root root   22 Jan  1  1970 .entrypoint
-rw-r--r--   1 root root  128 Jan  1  1970 .env
drwxr-xr-x   2 root root  920 Feb  2 00:00 bin
drwxr-xr-x   2 root root    3 Dec  9 19:15 boot
drwxr-xr-x   6 root root 1960 Feb  8 11:35 dev
drwxr-xr-x   2 root root  124 Feb  4 09:52 docker-entrypoint.d
-rwxrwxr-x   1 root root 1616 Feb  4 09:52 docker-entrypoint.sh
drwxr-xr-x   1 root root   80 Feb  8 11:18 etc
drwxr-xr-x   2 root root    3 Dec  9 19:15 home
drwxr-xr-x   8 root root  117 Feb  2 00:00 lib
drwxr-xr-x   2 root root   43 Feb  2 00:00 lib64
drwxr-xr-x   2 root root    3 Feb  2 00:00 media
drwxr-xr-x   2 root root    3 Feb  2 00:00 mnt
drwxr-xr-x   2 root root    3 Feb  2 00:00 opt
dr-xr-xr-x 107 root root    0 Feb  8 11:35 proc
drwx------   2 root root   46 Feb  2 00:00 root
drwxr-xr-x   3 root root   39 Feb  2 00:00 run
drwxr-xr-x   2 root root 1019 Feb  2 00:00 sbin
drwxr-xr-x   2 root root    3 Feb  2 00:00 srv
dr-xr-xr-x  13 root root    0 Feb  8 11:35 sys
drwxrwxrwx   2 root root   40 Feb  8 11:35 tmp
drwxr-xr-x  11 root root  153 Feb  2 00:00 usr
drwxr-xr-x   1 root root   60 Feb  2 00:00 var
sh ▶ ls -al /usr
total 0
drwxr-xr-x 11 root root  153 Feb  2 00:00 .
drwx------  1 root root   80 Feb  8 11:35 ..
drwxr-xr-x  2 root root 3176 Feb  4 09:52 bin
drwxr-xr-x  2 root root    3 Dec  9 19:15 games
drwxr-xr-x  2 root root    3 Dec  9 19:15 include
drwxr-xr-x 12 root root  185 Feb  4 09:52 lib
drwxr-xr-x  3 root root   32 Sep 24  2020 libexec
drwxr-xr-x 10 root root  123 Feb  2 00:00 local
drwxr-xr-x  2 root root 1002 Feb  4 09:52 sbin
drwxr-xr-x 44 root root  686 Feb  4 09:52 share
drwxr-xr-x  2 root root    3 Dec  9 19:15 src
sh ▶ ls -al /usr/share
total 0
drwxr-xr-x  44 root root  686 Feb  4 09:52 .
drwxr-xr-x  11 root root  153 Feb  2 00:00 ..
drwxr-xr-x   3 root root   57 Feb  4 09:52 X11
drwxr-xr-x   2 root root   35 Feb  2 00:00 adduser
drwxr-xr-x   2 root root  178 Feb  2 00:00 base-files
drwxr-xr-x   2 root root   56 Feb  2 00:00 base-passwd
drwxr-xr-x   3 root root   34 Jun 10  2021 bash-completion
drwxr-xr-x   4 root root   65 Feb  4 09:52 bug
drwxr-xr-x   3 root root   30 Feb  4 09:52 ca-certificates
drwxr-xr-x   2 root root  255 Feb  2 00:00 common-licenses
drwxr-xr-x   2 root root  131 Feb  2 00:00 debconf
drwxr-xr-x   2 root root   29 Feb  2 00:00 debianutils
drwxr-xr-x   2 root root    3 Dec  9 19:15 dict
drwxr-xr-x 142 root root 2570 Feb  4 09:52 doc
drwxr-xr-x   2 root root   72 Feb  4 09:52 doc-base
drwxr-xr-x   3 root root   90 Feb  2 00:00 dpkg
drwxr-xr-x   3 root root   33 Feb  4 09:52 fontconfig
drwxr-xr-x   3 root root   31 Feb  4 09:52 fonts
drwxr-xr-x   3 root root   29 Jan 10  2021 gcc
drwxr-xr-x   3 root root   32 Jan 10  2021 gdb
drwxr-xr-x   2 root root    3 Feb  2 00:00 info
drwxr-xr-x   2 root root   58 Feb  4 09:52 java
drwxr-xr-x   2 root root  502 Feb  2 00:00 keyrings
drwxr-xr-x   2 root root   36 Feb  2 00:00 libc-bin
drwxr-xr-x   4 root root   48 Feb  2 00:00 lintian
drwxr-xr-x   2 root root    3 Feb  2 00:00 locale
drwxr-xr-x   7 root root   75 Feb  2 00:00 man
drwxr-xr-x   3 root root   26 Feb  4 09:52 maven-repo
drwxr-xr-x   2 root root   39 Feb  2 00:00 menu
drwxr-xr-x   2 root root    3 Dec  9 19:15 misc
drwxr-xr-x   3 root root   27 Feb  4 09:52 nginx
drwxr-xr-x   2 root root  301 Feb  2 00:00 pam
drwxr-xr-x   2 root root   44 Feb  2 00:00 pam-configs
drwxr-xr-x   4 root root   44 Feb  2 00:00 perl5
drwxr-xr-x   2 root root   38 Feb  2 00:00 pixmaps
drwxr-xr-x   3 root root   30 Sep  1 03:38 polkit-1
drwxr-xr-x   2 root root   30 Feb  4 09:52 readline
drwxr-xr-x   3 root root   26 Feb  4 09:52 sensible-utils
drwxr-xr-x   2 root root   66 Feb  2 00:00 tabset
drwxr-xr-x   2 root root    3 Jan  1  2021 terminfo
drwxr-xr-x   2 root root   46 Feb  4 09:52 ucf
drwxr-xr-x   3 root root   33 Feb  4 09:52 xml
drwxr-xr-x  20 root root 1068 Feb  2 00:00 zoneinfo
drwxr-xr-x   3 root root   41 Feb  4 09:52 zsh
sh ▶ ls -al /usr/share/nginx
total 0
drwxr-xr-x  3 root root  27 Feb  4 09:52 .
drwxr-xr-x 44 root root 686 Feb  4 09:52 ..
drwxr-xr-x  2 root root  49 Feb  8 11:17 html
sh ▶ ls -al /usr/share/nginx/html
total 1
drwxr-xr-x 2 root root  49 Feb  8 11:17 .
drwxr-xr-x 3 root root  27 Feb  4 09:52 ..
-rw-r--r-- 1 root root 497 Oct 19 08:02 50x.html
-rw-rw-r-- 1 root root 233 Feb  8 09:58 index.html
```

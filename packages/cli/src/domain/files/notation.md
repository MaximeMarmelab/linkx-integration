# Notation des parties

Une partie s'écrit comme une suite de jetons courts, un par coup, dans l'ordre où ils ont été joués. Rejouer la notation depuis un plateau vide restitue la position exacte : plateau, réserves, joueur au trait et résultat.

```text
4Lr32 3Ir12 3Ir12 3Ir13 4Tr24 4Lr38 3Ir15 15 2r13
```

## Un coup

```text
forme  [s]  [r|l + 1..3]  colonne
```

| Partie | Valeurs | Sens |
| --- | --- | --- |
| forme | `1` `2` `3I` `3L` `4S` `4T` `4L` | nombre de cases, puis silhouette |
| miroir | `s` (facultatif) | retourne la pièce, **avant** la rotation |
| rotation | `r1` `r2` `r3` / `l1` `l2` `l3` (facultatif) | quarts de tour horaires (`r`) ou antihoraires (`l`) |
| colonne | `1` à `9` | colonne de la case la plus à gauche de la pièce posée — toujours le dernier caractère |

La pièce tombe ensuite dans la colonne : la ligne n'est jamais écrite.

## Les formes, sans rotation

```text
1     2      3I      3L     4S     4T      4L
█     ██     ███     ██     ·█     ███     ███
                     █·     ██     ·█·     █··
                            █·
```

Chaque joueur a deux exemplaires de chaque forme.

## Exemples

| Jeton | Coup |
| --- | --- |
| `15` | mono en colonne 5 |
| `27` | domino couché en colonnes 7–8 |
| `2r13` | domino debout en colonne 3 |
| `3Ir11` | barre de trois debout en colonne 1 |
| `4Tr24` | T pointe en haut, ancré en colonne 4 |
| `4Lr32` | grand L tourné de trois quarts de tour horaires, ancré en colonne 2 |
| `4Lsr27` | grand L retourné puis tourné d'un demi-tour, ancré en colonne 7 |
| `--` | tour passé, faute de coup légal |

Le miroir puis la rotation, sur le grand L :

```text
4L1     4Lr11    4Ls1     4Lsr21
███     ██       ███      █··
█··     ·█       ··█      ███
        ·█
```

## Premier joueur

Les bleus jouent en premier par défaut. Pour faire commencer les blancs, préfixer la partie par `w` :

```text
w 2r16 3Ir17 24
```

## Séparateurs et casse

Les jetons se séparent par une espace, une virgule ou un `+`. Le `+` permet de mettre une partie dans une URL sans échappement :

```text
http://localhost:5173/?moves=4Lr32+4Ss3+4Lr32+3Ir12+3Ir13+3Ir14
```

La casse est libre à la lecture (`4lsr23` vaut `4Lsr23`).

## Écriture canonique

Une même pièce posée a une seule écriture canonique, la seule produite à l'écriture. Les variantes redondantes sont acceptées à la lecture puis normalisées :

| Lu | Écrit | Pourquoi |
| --- | --- | --- |
| `2r23` | `23` | un demi-tour ne change pas un domino |
| `1r27` | `17` | le mono ne tourne pas |
| `2l13` | `2r13` | quart antihoraire → quart horaire équivalent |
| `3Ls4` | `3Lr14` | le miroir du petit L est une rotation |
| `4Ssr21` | `4Ss1` | demi-tour sans effet sur le S |

Jetons canoniques possibles, ici en colonne 1 :

| Forme | Jetons |
| --- | --- |
| `1` | `11` |
| `2` | `21` `2r11` |
| `3I` | `3I1` `3Ir11` |
| `3L` | `3L1` `3Lr11` `3Lr21` `3Lr31` |
| `4S` | `4S1` `4Sr11` `4Ss1` `4Ssr11` |
| `4T` | `4T1` `4Tr11` `4Tr21` `4Tr31` |
| `4L` | `4L1` `4Lr11` `4Lr21` `4Lr31` `4Ls1` `4Lsr11` `4Lsr21` `4Lsr31` |

## Passes

Un tour passé est forcé par la position : `--` est facultatif à la lecture, toujours écrit. Un `--` là où le joueur avait un coup légal est refusé.

## Validation

La notation est rejouée coup par coup avec les règles du jeu. Au premier coup impossible, rien n'est appliqué et l'erreur nomme le coup (rang à partir de 1, hors préfixe `w`) et le motif :

- syntaxe invalide
- pièce épuisée
- débordement latéral
- débordement par le haut
- support insuffisant (vide sous la pièce)
- partie déjà terminée
- passe non forcée

```text
Coup 3 (« 4Lr39 ») : la pièce sort du plateau sur les côtés.
```

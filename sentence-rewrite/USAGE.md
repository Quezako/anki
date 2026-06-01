# Usage rapide — sentence-rewrite

Petit guide pour lancer les scripts les plus utiles du répertoire `sentence-rewrite`.

## Prérequis

- Activez l'environnement virtuel du dépôt (Windows bash / Git Bash) : utilisez le Python du `.venv` du projet.

## Commandes utiles (exemples pour `bash.exe` / Git Bash)

- Générer le diff lisible entre la fixture `expected_0-40.csv` et un fichier produit :

```bash
# génère `sentence-rewrite/output/diff_0-40.txt`
.venv/Scripts/python.exe sentence-rewrite/tools/generate_phrase_diffs.py \
  --expected sentence-rewrite/tests/fixtures/expected_0-40.csv \
  --output sentence-rewrite/output/produced_0-40.csv \
  --out sentence-rewrite/output/diff_0-40.txt
```

- Lancer le normaliseur de clés (dry-run; affiche les propositions sans appliquer) :

```bash
.venv/Scripts/python.exe sentence-rewrite/tools/normalize_config_keys.py \
  --file sentence-rewrite/config_maps.json \
  --min-core 6 --verbose
```

- Appliquer les propositions (créera une sauvegarde `config_maps.json.bak`) :

```bash
.venv/Scripts/python.exe sentence-rewrite/tools/normalize_config_keys.py \
  --file sentence-rewrite/config_maps.json \
  --min-core 6 --verbose --backup --apply
```

- Extraire candidates depuis `diff_40-80` et tester/apply safe rules (autotune) :

```bash
.venv/Scripts/python.exe sentence-rewrite/tools/autotune_from_diff40-80.py
```

- Tester des raccourcissements conservateurs (script d'essai) :

```bash
.venv/Scripts/python.exe sentence-rewrite/tools/shorten_configs.py
```

## Remarques / bonnes pratiques

- Toujours exécuter le diff 0-40 après modification de `config_maps.json` pour vérifier qu'il n'y a pas de régression : voyez la commande `generate_phrase_diffs.py` ci-dessus.
- Les scripts créent parfois un backup (`.bak`) quand `--backup` est fourni ; conservez-le jusqu'à validation manuelle.
- Les outils utilisent des remplacements globaux sur les fichiers `produced_*.csv` pour évaluer l'impact sur la fixture — c'est intentionnel et sûr si vous vérifiez le diff 0-40 avant commit.

Si vous souhaitez que j'ajoute d'autres exemples (ex. comment lancer le pipeline complet `rewrite_sentences.py` ou automatiser la validation 0-40/40-80), dites-moi lesquels je documente.

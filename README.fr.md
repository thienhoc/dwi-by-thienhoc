<p align="center">
  <img src="assets/brand/readme-flow.svg" width="960" alt="Flux Dwi : six parcours modulaires convergent à travers une couche humaine avant une action contrôlée">
</p>

<h1 align="center">La couche humaine pour les agents IA</h1>

<p align="center">Une couche humaine modulaire conçue pour réduire la surplanification, le gaspillage de tokens, la perte de contexte et les actions menées sans autorisation claire.</p>

<p align="center"><strong>Research Preview 0.2.0</strong> · dernière version du dépôt validée : v0.2.3 · 6 modules spécialisés + 1 All-in-One facultatif</p>

<p align="center"><a href="README.md">English</a> · <a href="README.vi.md">Tiếng Việt</a> · <a href="README.ja.md">日本語</a> · <a href="README.ko.md">한국어</a> · <a href="README.zh-CN.md">简体中文</a> · <a href="README.hi.md">हिन्दी</a></p>

> **Licences :** le code et les modules installables sont sous Apache-2.0. La documentation et les ressources originales du dépôt sont sous CC BY 4.0. L’usage de la marque suit [TRADEMARKS.md](TRADEMARKS.md).

## Ce que fait Dwi

Les outils de développement assisté par IA contrôlent déjà l’accès aux outils. Dwi rend explicites et vérifiables les contrôles humains souvent laissés implicites : intention, périmètre, effort proportionné, droit d’écriture et niveau de preuve.

Dwi n’est ni un runtime, ni un daemon, ni un serveur MCP supplémentaire. Chaque module peut être inspecté, installé et retiré indépendamment.

## Partir du problème observé

| Situation | Module conseillé | Effet principal |
| --- | --- | --- |
| Les questions de l’agent sont longues ou difficiles à traiter | Dwi • Conduct | Clarifie les termes et propose des choix sûrs |
| Une petite tâche devient un vaste plan | Dwi • Lean | Cherche le chemin minimal suffisant |
| L’usage des tokens ou du temps reste opaque | Dwi • Budget | Fixe des limites et ne rapporte que l’usage observé |
| Claude et Codex doivent coopérer | Dwi • Bridge | Sépare conseil, autorité, effets et preuves |
| Plusieurs agents ont besoin d’une structure commune | Dwi • Arc | Définit des cellules bornées avec un seul rédacteur par périmètre |
| Le résultat paraît certain mais la preuve est floue | Dwi • Evidence | Distingue vérifié, observé, estimé, cible et inconnu |
| Plusieurs problèmes reviennent ensemble | Dwi • All-in-One | N’active que les perspectives Dwi pertinentes |

## Essai sûr

1. Choisissez un seul module.
2. Lisez son fichier `SKILL.md` et son guide en anglais avant l’installation.
3. Testez-le d’abord au niveau du projet, sur une tâche réversible, sans secret ni effet externe.
4. Invoquez-le explicitement et comparez le résultat à votre workflow habituel.
5. Supprimez le dossier du module s’il ne vous aide pas.

Pour les commandes d’installation complètes, la sécurité, l’architecture et la politique de preuve, utilisez actuellement le [README anglais](README.md) ou le [README vietnamien](README.vi.md) comme référence. Les commandes, chemins, empreintes et noms de modules ne doivent pas être traduits.

## État

- Base du contenu des modules Research Preview : `0.2.0`
- Dernière version du dépôt validée : `v0.2.3`
- Cette version répare le contrat d’installation à invocation explicite pour Codex et Claude Code
- Tag `v0.2.2` existant : référence hors publication vers un commit antérieur au correctif ; ne pas l’utiliser pour l’installation corrigée
- Corps des modules canoniques et SHA-256 : inchangés depuis `v0.2.0`
- Contenu installable : 6 modules spécialisés + All-in-One facultatif
- Pour les commandes exactes, suivre la documentation anglaise ou vietnamienne

Contact : [hoc@wi.works](mailto:hoc@wi.works)

#!/usr/bin/env python3
"""Validate structure, metadata, machine-readable examples, and critical assumptions.

No network access, no writes, no external platform connections. Optional `jsonschema`
package enables Draft 2020-12 JSON Schema validation; basic checks need only Python.
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REQUIRED = [
    'README.md', 'AGENTS.md', 'PROJECT_STATE.md',
    'docs/product/PRODUCT-NORTH-STAR.md', 'docs/product/P0-ACCEPTANCE.md',
    'docs/product/SHOWCASE-PRD.md', 'docs/product/COMPETITIONS-PRD.md',
    'docs/product/CHALLENGES-PRD.md', 'docs/product/PITCH-ARENA-PRD.md',
    'docs/product/DIFFERENTIATORS-AND-EXPERIMENTS.md',
    'docs/design/EXPERIENCE-SYSTEM.md', 'docs/design/tokens.json',
    'docs/security/TRUST-MODEL.md', 'docs/ai/AI-POLICY.md',
    'docs/architecture/TECHNICAL-FOUNDATION.md',
    'docs/delivery/PHASES-AND-METRICS.md',
    'docs/research/RESEARCH-PROTOCOL.md',
    'prompts/00-FIRST-CODEX-SESSION.md',
]
SCHEMA_FIXTURES = {
    'schemas/project.schema.json': ('fixtures/demo-projects.json', True),
    'schemas/milestone.schema.json': ('fixtures/demo-milestones.json', True),
    'schemas/competition.schema.json': ('fixtures/demo-competition.json', False),
}
EXPECTED_SKILLS = {
    'innovation-product', 'innovation-ux', 'innovation-showcase',
    'innovation-competitions', 'innovation-pitch-arena',
    'innovation-challenges', 'innovation-trust', 'innovation-ai',
    'innovation-delivery', 'innovation-research-radar', 'innovation-graduation',
    'innovation-integrations', 'innovation-global-experience',
    'innovation-opportunity-exchange', 'innovation-quality-gates',
}


def check() -> list[str]:
    errors: list[str] = []
    for filepath in REQUIRED:
        if not (ROOT / filepath).is_file():
            errors.append(f'Missing required file: {filepath}')

    skillsdir = ROOT / '.agents' / 'skills'
    actual = {p.name for p in skillsdir.iterdir() if p.is_dir()} if skillsdir.is_dir() else set()
    if actual != EXPECTED_SKILLS:
        errors.append(f'Skill directories mismatch: expected {sorted(EXPECTED_SKILLS)}, found {sorted(actual)}')

    for slug in EXPECTED_SKILLS:
        sfile = skillsdir / slug / 'SKILL.md'
        uifile = skillsdir / slug / 'agents/openai.yaml'
        if not sfile.is_file() or not uifile.is_file():
            errors.append(f'Skill {slug}: missing SKILL.md or agents/openai.yaml')
            continue
        content = sfile.read_text(encoding='utf-8')
        meta = re.match(r'\A---\n(.*?)\n---\n', content, re.S)
        if not meta:
            errors.append(f'Skill {slug}: malformed YAML frontmatter')
            continue
        first = meta.group(1)
        fields = re.findall(r'^([A-Za-z_]+):\s*(.*)$', first, re.M)
        names = {key for key, _ in fields}
        if names != {'name', 'description'}:
            errors.append(f'Skill {slug}: metadata should have only name and description, found {names}')
        values = dict(fields)
        if values.get('name') != slug or not values.get('description'):
            errors.append(f'Skill {slug}: wrong name or empty description')
        if len(values.get('description', '')) > 275:
            errors.append(f'Skill {slug}: description too verbose')
        ui = uifile.read_text(encoding='utf-8')
        for key in ('interface:', 'display_name:', 'short_description:', 'default_prompt:'):
            if key not in ui:
                errors.append(f'Skill {slug}: missing UI field {key}')

    for path in (ROOT / 'schemas').glob('*.json'):
        try:
            obj = json.loads(path.read_text(encoding='utf-8'))
            if obj.get('$schema') != 'https://json-schema.org/draft/2020-12/schema':
                errors.append(f'{path.name}: wrong schema draft')
        except (ValueError, UnicodeDecodeError) as exc:
            errors.append(f'{path.name}: invalid JSON: {exc}')
    for path in (ROOT / 'fixtures').glob('*.json'):
        try:
            json.loads(path.read_text(encoding='utf-8'))
        except (ValueError, UnicodeDecodeError) as exc:
            errors.append(f'{path.name}: invalid JSON: {exc}')

    try:
        from jsonschema import Draft202012Validator, FormatChecker
    except ImportError:
        print('INFO: install optional jsonschema package for full example-contract validation')
    else:
        for spath, (fpath, many) in SCHEMA_FIXTURES.items():
            schema = json.loads((ROOT / spath).read_text(encoding='utf-8'))
            Draft202012Validator.check_schema(schema)
            payload = json.loads((ROOT / fpath).read_text(encoding='utf-8'))
            examples = payload if many else [payload]
            for ix, item in enumerate(examples):
                validator = Draft202012Validator(schema, format_checker=FormatChecker())
                for err in validator.iter_errors(item):
                    errors.append(f'{fpath} item {ix}: {err.message}')

    demo_competition = json.loads((ROOT / 'fixtures/demo-competition.json').read_text(encoding='utf-8'))
    rubric = demo_competition.get('rubric', [])
    if abs(sum(x.get('weight', 0) for x in rubric) - 1) > 1e-9:
        errors.append('Demo competition rubric weights do not sum to 1')
    if demo_competition.get('host_claim_status') != 'unverified':
        errors.append('Fictional demo competition must not claim verified host')

    proj = json.loads((ROOT / 'fixtures/demo-projects.json').read_text(encoding='utf-8'))
    ids = {p.get('project_id') for p in proj}
    if len(ids) != len(proj):
        errors.append('Duplicate demo project IDs')
    if any('fictional demo' not in p.get('title', '').lower() for p in proj):
        errors.append('Demo projects must explicitly label fictional status')
    if any(p.get('visibility') != 'public' for p in proj):
        errors.append('Public projection fixtures contain non-public project')
    milestones = json.loads((ROOT / 'fixtures/demo-milestones.json').read_text(encoding='utf-8'))
    if any(m.get('project_id') not in ids for m in milestones):
        errors.append('Demo milestone references an unknown project')

    policies = json.loads((ROOT / 'fixtures/access-policy-cases.json').read_text(encoding='utf-8'))
    cases = policies['cases']
    if len(cases) < 12 or not {'allow', 'deny'}.issubset({x.get('expected') for x in cases}):
        errors.append('Insufficient allow/deny cases in policy fixture')
    for case in cases:
        if case.get('expected') not in ('allow', 'deny'):
            errors.append(f'Unexpected fixture policy result: {case}')
    # High-risk regression anchor — purely checks examples, not actual auth implementation.
    key_denials = {(x['actor'], x['resource']) for x in cases if x['expected'] == 'deny'}
    required_denials = {
        ('anonymous', 'private_project_draft'),
        ('judge_unassigned', 'unassigned_entry_scoring'),
        ('sponsor', 'other_sponsor_private_proposal'),
        ('audience', 'private_pitch_recording'),
    }
    if not required_denials.issubset(key_denials):
        errors.append('Critical authorization-denial fixtures missing')

    # Verify all markdown docs carry readable nonempty text.
    for path in list((ROOT / 'docs').rglob('*.md')) + list((ROOT / 'prompts').glob('*.md')):
        if len(path.read_text(encoding='utf-8').strip()) < 160:
            errors.append(f'Document unexpectedly empty/short: {path.relative_to(ROOT)}')
    return errors


if __name__ == '__main__':
    problems = check()
    if problems:
        print('FAILED project starter validation:')
        for p in problems:
            print(' -', p)
        sys.exit(1)
    print('PASS: all fifteen Codex skills, critical files, JSON assets, contract fixtures and policy example invariants validate.')
    print('NOTE: this does not validate a future application or confer legal/security certification.')

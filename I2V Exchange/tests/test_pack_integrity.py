"""Smoke tests for the starter kit itself. These are not application tests."""
from __future__ import annotations
import importlib.util
import unittest
from pathlib import Path

SCRIPT = Path(__file__).resolve().parents[1] / 'scripts' / 'validate_pack.py'
spec = importlib.util.spec_from_file_location('validate_pack', SCRIPT)
module = importlib.util.module_from_spec(spec)
assert spec and spec.loader
spec.loader.exec_module(module)


class ProjectStarterIntegrityTests(unittest.TestCase):
    def test_all_pack_checks(self):
        self.assertEqual([], module.check())


if __name__ == '__main__':
    unittest.main()
